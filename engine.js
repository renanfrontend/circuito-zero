/*
 * Motor do Circuito Zero: lê a descrição de uma vaga e liga cada requisito
 * a evidências do portfólio. Funções puras, sem DOM, testadas em tests/.
 */
(function (root) {
  const LEVEL = { exp: 3, proj: 2, decl: 1, none: 0 };
  const STRENGTH = { 3: 1, 2: 0.7, 1: 0.3, 0: 0 };
  const LEVEL_LABEL = { 3: "Entrega profissional", 2: "Projeto publicado", 1: "Estudo ou declarada", 0: "Sem evidência" };

  const OPTIONAL_HEAD = /(diferencia|desejave|nice[ -]to[ -]have|bonus|seria legal|seria um plus|e um plus|bom ter|preferencia|preferred|plus:)/;
  const REQUIRED_HEAD = /(requisito|obrigatori|requirements|must[ -]have|o que esperamos|qualificac|o que buscamos|what you|voce precisa|precisa ter|responsabilidades|atividades|stack)/;

  const normalize = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

  function compile(skills) {
    const patterns = [];
    for (const skill of skills) {
      for (const alias of skill.aliases) {
        const a = normalize(alias);
        patterns.push({ id: skill.id, len: a.length, re: new RegExp(`(?<![a-z0-9])${escapeRe(a)}(?![a-z0-9])`, "g") });
      }
    }
    // Sinônimos mais longos primeiro: "react native" vence "react".
    patterns.sort((x, y) => y.len - x.len);
    return patterns;
  }

  /** Competências citadas num trecho. Um pedaço de texto conta para uma competência só. */
  function findSkills(text, patterns) {
    const norm = normalize(text);
    const taken = [];
    const found = [];
    for (const p of patterns) {
      p.re.lastIndex = 0;
      let m;
      while ((m = p.re.exec(norm))) {
        const start = m.index, end = start + m[0].length;
        if (taken.some(([s, e]) => start < e && end > s)) continue;
        taken.push([start, end]);
        found.push([start, p.id]);
      }
    }
    // Na ordem em que aparecem no texto.
    return new Set(found.sort((a, b) => a[0] - b[0]).map(([, id]) => id));
  }

  function detectSeniority(norm) {
    if (/(?<![a-z])(staff|principal|tech lead|lead)(?![a-z])/.test(norm)) return "Liderança";
    if (/(?<![a-z])(senior|sr\.?)(?![a-z])/.test(norm)) return "Sênior";
    if (/(?<![a-z])(pleno|mid-level|mid level)(?![a-z])/.test(norm)) return "Pleno";
    if (/(?<![a-z])(junior|jr\.?|estagio|estagiari)(?![a-z])/.test(norm)) return "Júnior";
    return null;
  }

  /** Lê a vaga: requisitos (peso 2) e diferenciais (peso 1), com o trecho de onde saíram. */
  function parseJob(text, patterns) {
    const lines = String(text || "").split(/\r?\n/);
    const reqs = new Map();
    let mode = 2;
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      const norm = normalize(line);
      const ids = findSkills(line, patterns);
      const optional = OPTIONAL_HEAD.test(norm);
      const required = !optional && REQUIRED_HEAD.test(norm);
      if (!ids.size) {
        if (optional) mode = 1;
        else if (required) mode = 2;
        continue;
      }
      const weight = optional ? 1 : mode;
      for (const id of ids) {
        const prev = reqs.get(id);
        if (!prev) reqs.set(id, { id, weight, order: reqs.size, snippet: line.replace(/^[-•*·\s]+/, "") });
        else if (weight > prev.weight) Object.assign(prev, { weight, snippet: line.replace(/^[-•*·\s]+/, "") });
      }
    }
    const firstLine = lines.map((l) => l.trim()).find(Boolean) || "";
    return {
      title: firstLine.length > 90 ? firstLine.slice(0, 87) + "…" : firstLine,
      seniority: detectSeniority(normalize(text)),
      requirements: [...reqs.values()],
    };
  }

  const monthIndex = (ym) => { const [y, m] = ym.split("-").map(Number); return y * 12 + (m - 1); };

  function formatMonths(n) {
    if (!n) return "";
    if (n < 12) return `${n} ${n === 1 ? "mês" : "meses"}`;
    const years = Math.round((n / 12) * 2) / 2;
    return `${String(years).replace(".", ",")} ${years === 1 ? "ano" : "anos"}`;
  }

  /** Índice competência → evidências. Calculado uma vez a partir dos dados. */
  function buildIndex(data) {
    const patterns = compile(data.skills);
    const index = new Map(data.skills.map((s) => [s.id, { exp: [], proj: [], decl: [], months: new Set() }]));
    const add = (id, kind, item) => index.get(id) && index.get(id)[kind].push(item);

    for (const exp of data.experiences) {
      const period = `${exp.start.slice(0, 4)}–${exp.end.slice(0, 4)}`;
      const hits = new Map();
      exp.highlights.forEach((h, i) => {
        for (const id of findSkills(h, patterns)) {
          if (!hits.has(id)) hits.set(id, []);
          hits.get(id).push(i);
        }
      });
      for (const id of findSkills(exp.stack.join(" · "), patterns)) if (!hits.has(id)) hits.set(id, []);
      const months = [];
      for (let m = monthIndex(exp.start); m < monthIndex(exp.end); m++) months.push(m);
      for (const [id, idx] of hits) {
        add(id, "exp", { expId: exp.id, company: exp.company, role: exp.role, period, quotes: idx.map((i) => exp.highlights[i]) });
        months.forEach((m) => index.get(id) && index.get(id).months.add(m));
      }
    }

    for (const proj of data.projects) {
      const inProof = findSkills(proj.proof, patterns);
      const inSummary = findSkills(proj.summary, patterns);
      const all = new Set([...inProof, ...inSummary, ...findSkills(proj.tech.join(" · "), patterns)]);
      for (const id of all) {
        const label = data.skills.find((s) => s.id === id).label;
        const quote = inProof.has(id) ? proj.proof : inSummary.has(id) ? proj.summary : `Usa ${label} na stack do projeto.`;
        add(id, "proj", { projId: proj.id, title: proj.title, live: proj.live, repo: proj.repo, quote });
      }
    }

    for (const d of data.declared) for (const id of findSkills(d.text, patterns)) add(id, "decl", { label: d.label });

    for (const entry of index.values()) entry.months = entry.months.size;
    return { patterns, index, skills: new Map(data.skills.map((s) => [s.id, s])) };
  }

  function levelOf(ev) {
    if (ev.exp.length) return LEVEL.exp;
    if (ev.proj.length) return LEVEL.proj;
    if (ev.decl.length) return LEVEL.decl;
    return LEVEL.none;
  }

  const pct = (num, den) => (den ? Math.round((100 * num) / den) : 0);

  /** Análise completa de uma vaga. */
  function analyze(text, data, built = buildIndex(data)) {
    const job = parseJob(text, built.patterns);
    const requirements = job.requirements.map((r) => {
      const skill = built.skills.get(r.id);
      const ev = built.index.get(r.id);
      const level = levelOf(ev);
      const near = level === LEVEL.none
        ? (skill.near || []).filter((n) => levelOf(built.index.get(n)) >= LEVEL.proj).map((n) => built.skills.get(n).label)
        : [];
      return {
        ...r, label: skill.label, cat: skill.cat, generic: !!skill.generic, level, levelLabel: LEVEL_LABEL[level],
        strength: STRENGTH[level], months: ev.months, time: formatMonths(ev.months),
        evidence: { exp: ev.exp, proj: ev.proj, decl: ev.decl }, near,
      };
    }).sort((a, b) => b.weight - a.weight || b.level - a.level || b.months - a.months);

    const sum = (list, f) => list.reduce((acc, x) => acc + f(x), 0);
    const req = requirements.filter((r) => r.weight === 2);
    const opt = requirements.filter((r) => r.weight === 1);
    const coverage = {
      total: pct(sum(requirements, (r) => r.weight * r.strength), sum(requirements, (r) => r.weight)),
      required: pct(sum(req, (r) => r.strength), req.length),
      optional: pct(sum(opt, (r) => r.strength), opt.length),
      proven: requirements.filter((r) => r.level >= LEVEL.proj).length,
      gaps: requirements.filter((r) => r.level === LEVEL.none).length,
      count: requirements.length,
    };

    const projects = data.projects.map((p, order) => {
      const matched = requirements.filter((r) => r.evidence.proj.some((e) => e.projId === p.id));
      return { ...p, order, matched: matched.map((r) => r.label), score: sum(matched, (r) => r.weight) };
    }).sort((a, b) => b.score - a.score || a.order - b.order);

    const reqIds = new Set(requirements.map((r) => r.id));
    const experiences = data.experiences.map((e) => {
      const lit = e.highlights.map((h) => [...findSkills(h, built.patterns)].some((id) => reqIds.has(id)));
      const matched = requirements.filter((r) => r.evidence.exp.some((x) => x.expId === e.id));
      return { ...e, lit, matched: matched.map((r) => r.label), score: sum(matched, (r) => r.weight) };
    });

    return { job, requirements, coverage, projects, experiences, headline: buildHeadline(job, requirements) };
  }

  function joinPt(list) {
    if (list.length <= 1) return list.join("");
    return `${list.slice(0, -1).join(", ")} e ${list[list.length - 1]}`;
  }

  function buildHeadline(job, requirements) {
    if (!requirements.length) return null;
    const strong = requirements
      .filter((r) => r.level >= LEVEL.proj && !r.generic && r.cat !== "Domínio" && r.cat !== "Idioma")
      .sort((a, b) => b.weight - a.weight || a.order - b.order)
      .slice(0, 3).map((r) => r.label);
    const domain = requirements.find((r) => r.cat === "Domínio" && r.level === LEVEL.exp);
    const role = "Frontend sênior";
    let line = strong.length ? `${role}: ${joinPt(strong)} na prática` : `${role} com visão de produto`;
    if (domain) line += `, com vivência em ${domain.label.toLowerCase()}`;
    return line + ".";
  }

  /** Texto curto para o recrutador colar num e-mail ou ATS. */
  function recruiterSummary(result, person, url) {
    const lines = [];
    lines.push(`${person.name} × ${result.job.title || "vaga"}`);
    lines.push(`Cobertura de evidências: ${result.coverage.total}% (${result.coverage.proven} de ${result.coverage.count} requisitos com prova pública ou profissional).`);
    lines.push("");
    for (const r of result.requirements) {
      const tag = r.weight === 2 ? "Requisito" : "Diferencial";
      let proof = "sem evidência pública ainda";
      if (r.evidence.exp.length) proof = `${r.evidence.exp.map((e) => e.company).join(", ")}${r.time ? ` (${r.time})` : ""}`;
      else if (r.evidence.proj.length) proof = `projeto ${r.evidence.proj[0].title}: ${r.evidence.proj[0].live}`;
      else if (r.evidence.decl.length) proof = r.evidence.decl[0].label;
      lines.push(`• ${tag} · ${r.label}: ${proof}`);
    }
    lines.push("");
    if (url) lines.push(`Versão interativa: ${url}`);
    lines.push(`LinkedIn: ${person.links.linkedin}`);
    return lines.join("\n");
  }

  const api = { normalize, compile, findSkills, parseJob, buildIndex, analyze, recruiterSummary, formatMonths, LEVEL, LEVEL_LABEL, STRENGTH };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CZ_ENGINE = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
