/* Interface do Circuito Zero: liga o formulário ao motor e redesenha a página. */
(function () {
  const data = window.CZ_DATA;
  const E = window.CZ_ENGINE;
  const built = E.buildIndex(data);
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (url) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; } };

  let current = null;

  /* ---------- link compartilhável: texto comprimido depois do # ---------- */
  const toB64 = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const fromB64 = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
  const pipe = async (bytes, stream) => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());

  async function encodeJob(text) {
    const bytes = new TextEncoder().encode(text);
    if ("CompressionStream" in window) return "z" + toB64(await pipe(bytes, new CompressionStream("deflate-raw")));
    return "p" + toB64(bytes);
  }
  async function decodeJob(code) {
    const bytes = fromB64(code.slice(1));
    const raw = code[0] === "z" ? await pipe(bytes, new DecompressionStream("deflate-raw")) : bytes;
    return new TextDecoder().decode(raw);
  }
  const baseUrl = () => location.href.split("#")[0];

  /* ---------- render ---------- */
  function setStatus(msg) { $("status").textContent = msg; if (msg) setTimeout(() => { if ($("status").textContent === msg) $("status").textContent = ""; }, 4000); }

  function renderGauge(cov) {
    $("gauge-value").textContent = cov ? `${cov.total}%` : "—";
    $("gauge-fill").style.strokeDasharray = `${cov ? cov.total : 0} 100`;
    $("gauge").classList.toggle("on", !!cov);
    $("gauge-stats").hidden = !cov;
    if (!cov) return;
    $("stat-required").textContent = `${cov.required}%`;
    $("stat-optional").textContent = cov.optional || cov.optional === 0 ? `${cov.optional}%` : "—";
    $("stat-gaps").textContent = String(cov.gaps);
  }

  function evidenceHtml(r) {
    const parts = [];
    for (const e of r.evidence.exp) {
      const quotes = e.quotes.length ? e.quotes.map((q) => `<q>${esc(q)}</q>`).join("") : `<q class="muted">Na stack usada na empresa.</q>`;
      parts.push(`<li class="ev ev3"><span class="ev-kind">${esc(e.company)} · ${esc(e.role)} · ${esc(e.period)}</span>${quotes}</li>`);
    }
    const projs = r.evidence.proj.slice(0, 3);
    for (const p of projs) {
      parts.push(`<li class="ev ev2"><span class="ev-kind">Projeto · ${esc(p.title)}</span><q>${esc(p.quote)}</q>
        <span class="ev-links"><a href="${esc(p.live)}" target="_blank" rel="noopener">Abrir ${esc(host(p.live))} ↗</a><a href="${esc(p.repo)}" target="_blank" rel="noopener">Código ↗</a></span></li>`);
    }
    if (r.evidence.proj.length > 3) parts.push(`<li class="ev ev2 more"><span class="ev-kind">+ ${r.evidence.proj.length - 3} outros projetos usam isso</span></li>`);
    if (!r.evidence.exp.length && !r.evidence.proj.length) for (const d of r.evidence.decl) parts.push(`<li class="ev ev1"><span class="ev-kind">Formação / perfil</span><q>${esc(d.label)}</q></li>`);
    if (!parts.length) {
      const near = r.near.length ? ` Próximo do que já mostro: <b>${esc(r.near.join(", "))}</b>.` : "";
      parts.push(`<li class="ev ev0"><span class="ev-kind">Sem prova pública</span><q class="muted">Não tenho entrega ou projeto que comprove isso.${near}</q></li>`);
    }
    return parts.join("");
  }

  function summaryLine(r) {
    if (r.evidence.exp.length) {
      const names = r.evidence.exp.map((e) => e.company.split(",")[0]);
      const shown = names.slice(0, 3).join(", ") + (names.length > 3 ? ` +${names.length - 3}` : "");
      return `${shown}${r.time ? ` · ${r.time} somados` : ""}`;
    }
    if (r.evidence.proj.length) return `${r.evidence.proj.map((p) => p.title).slice(0, 3).join(", ")}`;
    if (r.evidence.decl.length) return r.evidence.decl[0].label;
    return r.near.length ? `Próximo: ${r.near.join(", ")}` : "Ainda não tenho prova disso";
  }

  function renderCircuit(result) {
    const list = $("wires");
    list.innerHTML = result.requirements.map((r, i) => `
      <li class="wire-row lvl${r.level}" style="--i:${i}">
        <button type="button" class="wire-toggle" aria-expanded="false" aria-controls="ev-${r.id}">
          <span class="node req">
            <span class="tag ${r.weight === 2 ? "must" : "nice"}">${r.weight === 2 ? "REQUISITO" : "DIFERENCIAL"}</span>
            <strong>${esc(r.label)}</strong>
            <small title="Trecho da vaga">“${esc(r.snippet)}”</small>
          </span>
          <span class="wire-line" aria-hidden="true"><i></i></span>
          <span class="node proof">
            <span class="lv lv${r.level}">${esc(r.levelLabel)}</span>
            <strong>${esc(summaryLine(r))}</strong>
          </span>
          <span class="chev" aria-hidden="true">+</span>
        </button>
        <ul class="ev-list" id="ev-${r.id}" hidden>${evidenceHtml(r)}</ul>
      </li>`).join("");
    if (!result.requirements.length) {
      list.innerHTML = `<li class="empty">Não reconheci competências técnicas neste texto. Tente colar a parte de requisitos da vaga.</li>`;
    }
  }

  function renderGaps(result) {
    const gaps = result.requirements.filter((r) => r.level === E.LEVEL.none);
    $("gaps").hidden = !gaps.length;
    $("gap-list").innerHTML = gaps.map((r) => `
      <li><strong>${esc(r.label)}</strong><span>${r.weight === 2 ? "Requisito" : "Diferencial"}</span>
      <p>${r.near.length ? `Base próxima: ${esc(r.near.join(", "))}. É o próximo estudo natural, mas não conto como prova.` : "Sem base próxima no portfólio. Fica registrado como ponto a desenvolver."}</p></li>`).join("");
  }

  function renderProjects(projects, matchedMode) {
    $("project-grid").innerHTML = projects.map((p) => `
      <article class="project ${matchedMode && !p.score ? "dim" : ""}" style="view-transition-name: proj-${p.id}">
        <div class="project-top">
          <h3>${esc(p.title)}</h3>
          ${matchedMode && p.score ? `<span class="score-badge">liga ${p.matched.length} ${p.matched.length === 1 ? "requisito" : "requisitos"}</span>` : ""}
        </div>
        <p>${esc(p.summary)}</p>
        <ul class="tags">${(matchedMode ? p.matched : p.tech.slice(0, 5)).map((t) => `<li class="${matchedMode ? "hit" : ""}">${esc(t)}</li>`).join("")}</ul>
        <div class="project-links">
          <a href="${esc(p.live)}" target="_blank" rel="noopener">Abrir ↗</a>
          <a href="${esc(p.repo)}" target="_blank" rel="noopener">Código ↗</a>
        </div>
      </article>`).join("");
  }

  function renderTimeline(experiences, matchedMode) {
    $("timeline").innerHTML = experiences.map((e) => `
      <li class="job ${matchedMode && !e.score ? "dim" : ""}">
        <div class="job-head">
          <span class="period">${esc(e.start.slice(0, 4))}–${esc(e.end.slice(0, 4))}</span>
          <h3>${esc(e.company)}</h3>
          <span class="role">${esc(e.role)}</span>
          ${matchedMode && e.matched.length ? `<span class="score-badge">${e.matched.length} ${e.matched.length === 1 ? "requisito" : "requisitos"}</span>` : ""}
        </div>
        <ul>${e.highlights.map((h, i) => `<li class="${matchedMode ? (e.lit[i] ? "lit" : "off") : ""}">${esc(h)}</li>`).join("")}</ul>
      </li>`).join("");
  }

  function paint(result) {
    const on = !!result;
    $("headline").textContent = on && result.headline ? result.headline : data.person.base;
    $("hero-eyebrow").textContent = on ? `Renan Augusto × ${result.job.title || "vaga colada"}` : "Renan Augusto · desenvolvedor frontend sênior";
    $("hero-intro").textContent = on
      ? `${result.coverage.proven} de ${result.coverage.count} itens desta vaga têm prova em empresa ou projeto publicado. ${result.coverage.gaps ? `${result.coverage.gaps} ainda não têm, e estão listados abaixo.` : "Nenhuma lacuna encontrada."}`
      : "Cole a descrição de uma vaga. O portfólio se reorganiza para ela: cada requisito acende uma prova real, e o que falta aparece também.";
    renderGauge(on ? result.coverage : null);

    $("circuito").hidden = !on;
    if (on) { renderCircuit(result); renderGaps(result); } else $("gaps").hidden = true;

    $("projects-sub").textContent = on ? "na ordem desta vaga" : "publicados";
    $("projects-intro").textContent = on ? "Reordenados pelo peso dos requisitos que cada um comprova." : "Tudo no ar, com código aberto no GitHub.";
    renderProjects(on ? result.projects : data.projects, on);
    $("exp-intro").textContent = on ? "Os destaques acesos são os que conversam com esta vaga." : "Oito empresas, de e-commerce a saúde, telecom, indústria e logística.";
    renderTimeline(on ? result.experiences : data.experiences, on);

    $("job-form").hidden = on;
    $("job-bar").hidden = !on;
    document.querySelector(".examples").hidden = on;
    if (on) {
      $("job-title").textContent = result.job.title || "Vaga colada";
      $("job-seniority").hidden = !result.job.seniority;
      $("job-seniority").textContent = result.job.seniority || "";
    }
  }

  function morph(result) {
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(() => paint(result));
    else paint(result);
  }

  async function run(text, { updateUrl = true } = {}) {
    const clean = text.trim();
    if (!clean) { setStatus("Cole o texto de uma vaga primeiro."); $("job-text").focus(); return; }
    current = { text: clean, result: E.analyze(clean, data, built) };
    morph(current.result);
    if (updateUrl) history.replaceState(null, "", `#vaga=${await encodeJob(clean)}`);
    document.title = `Renan Augusto × ${current.result.job.title || "vaga"} · Circuito Zero`;
  }

  function reset() {
    current = null;
    history.replaceState(null, "", baseUrl());
    document.title = "Circuito Zero — o portfólio que se molda à vaga";
    morph(null);
    $("job-text").focus();
  }

  async function copy(text, okMsg) {
    try { await navigator.clipboard.writeText(text); setStatus(okMsg); }
    catch { window.prompt("Copie o texto:", text); }
  }

  /* ---------- eventos ---------- */
  const examples = document.querySelector(".examples");
  for (const ex of data.examples) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = ex.label;
    b.addEventListener("click", () => { $("job-text").value = ex.text; run(ex.text); });
    examples.appendChild(b);
  }

  $("job-form").addEventListener("submit", (e) => { e.preventDefault(); run($("job-text").value); });
  $("job-text").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) run($("job-text").value); });
  $("clear-button").addEventListener("click", () => { $("job-text").value = ""; $("job-text").focus(); });
  $("edit-button").addEventListener("click", reset);
  $("share-button").addEventListener("click", async () => {
    if (!current) return;
    copy(`${baseUrl()}#vaga=${await encodeJob(current.text)}`, "Link copiado. Quem abrir vê o portfólio já moldado para esta vaga.");
  });
  $("summary-button").addEventListener("click", async () => {
    if (!current) return;
    const url = `${baseUrl()}#vaga=${await encodeJob(current.text)}`;
    copy(E.recruiterSummary(current.result, data.person, url.startsWith("http") ? url : null), "Resumo copiado.");
  });
  $("wires").addEventListener("click", (e) => {
    const btn = e.target.closest(".wire-toggle");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    $(btn.getAttribute("aria-controls")).hidden = open;
  });

  async function fromHash() {
    const m = location.hash.match(/vaga=([zp][A-Za-z0-9_-]+)/);
    if (!m) { paint(null); return; }
    try {
      const text = await decodeJob(m[1]);
      $("job-text").value = text;
      await run(text, { updateUrl: false });
    } catch {
      paint(null);
      setStatus("Não consegui ler a vaga deste link. Cole o texto de novo.");
    }
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
