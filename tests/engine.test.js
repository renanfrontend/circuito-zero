// Rode com: node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");
const data = require("../data.js");
const E = require("../engine.js");

const built = E.buildIndex(data);
const ids = (text) => [...E.findSkills(text, built.patterns)].sort();

test("normaliza acentos e caixa", () => {
  assert.equal(E.normalize("Acessibilidade e LOGÍSTICA"), "acessibilidade e logistica");
});

test("sinônimo mais longo vence: React Native não vira React", () => {
  assert.deepEqual(ids("Experiência com React Native"), ["rn"]);
  assert.deepEqual(ids("React Three Fiber"), ["three"]);
});

test("não confunde palavras parecidas", () => {
  assert.deepEqual(ids("next steps"), []);
  assert.deepEqual(ids("JavaScript"), ["js"]);
  assert.ok(!ids("JavaScript").includes("java"));
});

test("diferenciais pesam 1 e requisitos pesam 2", () => {
  const job = E.parseJob("Requisitos:\n- React\nDiferenciais:\n- GraphQL\n- Storybook", built.patterns);
  const w = Object.fromEntries(job.requirements.map((r) => [r.id, r.weight]));
  assert.deepEqual(w, { react: 2, graphql: 1, storybook: 1 });
});

test("diferencial na mesma linha também pesa 1", () => {
  const job = E.parseJob("Vaga\n- TypeScript\n- Diferencial: GraphQL", built.patterns);
  assert.equal(job.requirements.find((r) => r.id === "graphql").weight, 1);
  assert.equal(job.requirements.find((r) => r.id === "ts").weight, 2);
});

test("detecta senioridade", () => {
  assert.equal(E.parseJob("Desenvolvedor Front-end Sênior", built.patterns).seniority, "Sênior");
  assert.equal(E.parseJob("Dev Pleno React", built.patterns).seniority, "Pleno");
});

test("React tem entrega profissional e tempo somado sem contar mês duas vezes", () => {
  const r = E.analyze("Requisitos: React", data, built).requirements[0];
  assert.equal(r.level, E.LEVEL.exp);
  assert.ok(r.evidence.exp.some((e) => e.expId === "mwm"));
  // Smartest 8 + Clude 25 + SAFIRA 18 + Olos 8 + MWM 12 = 71 meses
  assert.equal(r.months, 71);
});

test("lacuna aparece com competência próxima, sem contar como prova", () => {
  const r = E.analyze("Requisitos: GraphQL", data, built).requirements[0];
  assert.equal(r.level, E.LEVEL.none);
  assert.equal(r.strength, 0);
  assert.deepEqual(r.near, ["APIs REST"]);
});

test("cobertura segue a fórmula visível", () => {
  // React (2 × 1) + GraphQL diferencial (1 × 0) = 2 / 3
  const res = E.analyze("Requisitos:\n- React\nDiferenciais:\n- GraphQL", data, built);
  assert.equal(res.coverage.total, 67);
  assert.equal(res.coverage.required, 100);
  assert.equal(res.coverage.optional, 0);
  assert.equal(res.coverage.gaps, 1);
});

test("projetos são reordenados pela vaga", () => {
  const res = E.analyze("Requisitos:\n- Three.js e WebGL\n- Playwright", data, built);
  assert.equal(res.projects[0].id, "manor-escape");
  assert.ok(res.projects[0].matched.includes("Testes E2E"));
});

test("vagas de exemplo geram título, requisitos e resumo", () => {
  for (const ex of data.examples) {
    const res = E.analyze(ex.text, data, built);
    assert.ok(res.requirements.length >= 8, ex.id);
    assert.ok(res.headline.startsWith("Frontend sênior"), ex.id);
    const summary = E.recruiterSummary(res, data.person, "https://exemplo.dev/#vaga=z");
    assert.match(summary, /Cobertura de evidências: \d+%/);
  }
});

test("texto sem competência não quebra", () => {
  const res = E.analyze("Olá, tudo bem?", data, built);
  assert.equal(res.requirements.length, 0);
  assert.equal(res.coverage.total, 0);
  assert.equal(res.headline, null);
});
