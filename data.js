/*
 * Dados do Circuito Zero.
 * Tudo aqui vem do portfólio publicado (renan-portfolio/src/content), sem métricas novas.
 * Para atualizar: edite os textos abaixo; o motor encontra as competências sozinho.
 */
(function (root) {
  const gh = (repo) => `https://github.com/renanfrontend/${repo}`;

  const person = {
    name: "Renan Augusto",
    role: "Desenvolvedor frontend sênior",
    since: "2018-10",
    base: "Frontend sênior com visão de produto e de processo.",
    links: {
      linkedin: "https://www.linkedin.com/in/renan-augusto-santos/",
      github: "https://github.com/renanfrontend",
      email: "contato@renanaugusto.com.br",
    },
  };

  /* Experiências: frases do portfólio (algumas unem o resumo da empresa ao destaque). */
  const experiences = [
    {
      id: "mwm", company: "MWM Motores e Geradores", role: "Senior Frontend Engineer",
      start: "2025-09", end: "2026-09",
      highlights: [
        "Construí SPAs e PWAs em React, TypeScript e Vite para o MWM Portal e o Bio Plantas.",
        "Entreguei dashboards de logística e qualidade que centralizaram a gestão de portaria, cooperados e dados operacionais.",
        "Modernizei interfaces legadas para Tailwind CSS e Shadcn/UI, com mais responsividade e acessibilidade.",
        "Automatizei build e deploy com Docker, Azure Container Apps, ACR e pipelines no Azure DevOps.",
        "Integrei o frontend a APIs REST em Java Spring Boot e configurei servidores Nginx.",
      ],
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Shadcn/UI", "Docker", "Azure", "Spring Boot"],
    },
    {
      id: "portal-telemedicina", company: "Portal Telemedicina", role: "Frontend Engineer Sênior",
      start: "2024-10", end: "2025-01",
      highlights: [
        "Desenvolvi interfaces responsivas e acessíveis com Angular e TypeScript para uma plataforma de telemedicina.",
        "Traduzi layouts em código, aplicando princípios de UI/UX e testes.",
        "Integrei APIs e serviços com entrega contínua via GitHub Actions.",
      ],
      stack: ["Angular", "TypeScript", "GitHub Actions"],
    },
    {
      id: "olos", company: "Olos Tecnologia", role: "Frontend Engineer Pleno",
      start: "2023-10", end: "2024-06",
      highlights: [
        "Desenvolvi interfaces com React, Next.js, TypeScript, Styled Components e Material UI.",
        "Implementei layouts responsivos seguindo boas práticas de UI/UX.",
        "Mantive pipelines de CI/CD no GitHub Actions.",
      ],
      stack: ["React", "Next.js", "TypeScript", "Material UI"],
    },
    {
      id: "safira", company: "SAFIRA Soluções & Tecnologia", role: "Frontend Engineer Pleno",
      start: "2022-03", end: "2023-09",
      highlights: [
        "Único desenvolvedor frontend do produto: defini a stack e estruturei a arquitetura frontend de ponta a ponta.",
        "Criei uma biblioteca de componentes reutilizáveis em React e TypeScript, autenticação JWT e integrações REST.",
        "Tomei decisões técnicas de performance, escalabilidade e segurança e orientei desenvolvedores juniores.",
        "Atuei com cloud AWS e Azure e esteiras de CI/CD.",
      ],
      stack: ["React", "TypeScript", "JWT", "AWS", "Azure"],
    },
    {
      id: "clude", company: "Clude, Cartão de Saúde 360°", role: "Analista Desenvolvedor Frontend",
      start: "2020-02", end: "2022-03",
      highlights: [
        "Desenvolvi aplicações web de saúde, responsivas, com React, JavaScript, Sass e Bootstrap.",
        "Entreguei soluções focadas em usabilidade e experiência do usuário.",
      ],
      stack: ["React", "JavaScript", "Sass", "Bootstrap"],
    },
    {
      id: "saraiva", company: "Saraiva", role: "Desenvolvedor Frontend",
      start: "2019-12", end: "2020-02",
      highlights: [
        "Desenvolvi páginas e componentes de e-commerce com HTML, Sass, JavaScript (jQuery) e Vue.js.",
        "Trabalhei com o VTEX Admin (CMS, Checkout, Master Data) e as APIs da VTEX: catálogo, checkout, logística, marketplace, OMS e vale-presente.",
      ],
      stack: ["VTEX", "Vue.js", "JavaScript", "jQuery", "Sass", "Gulp"],
    },
    {
      id: "edulabzz", company: "Edulabzz", role: "Desenvolvedor Frontend",
      start: "2019-07", end: "2019-10",
      highlights: [
        "Desenvolvi interfaces web com HTML5, Sass, JavaScript, jQuery, Bootstrap e Material Design.",
        "Automatizei tarefas de build e gerenciei pacotes com npm e Yarn.",
      ],
      stack: ["JavaScript", "jQuery", "Sass", "Bootstrap", "Material Design"],
    },
    {
      id: "smartest", company: "Smartest IT Solutions", role: "Desenvolvedor Frontend (Freelancer)",
      start: "2018-10", end: "2019-06",
      highlights: [
        "Analisei e corrigi bugs e desenvolvi novas funcionalidades com JavaScript, React, Vue.js, TypeScript e Node.js.",
        "Consumi APIs REST, usei Firebase e MySQL e publiquei aplicações estáticas com Webpack.",
      ],
      stack: ["React", "Vue.js", "TypeScript", "Node.js", "Firebase", "MySQL", "Webpack"],
    },
  ];

  /* Projetos públicos: resumo e uma prova, copiados do portfólio. */
  const projects = [
    {
      id: "visionstock-ai", title: "VisionStock", live: "https://visionstock-ai-nine.vercel.app", repo: gh("visionstock-ai"),
      summary: "Prova de conceito de catálogo para e-commerce: da foto do produto ao cadastro preenchido por IA, estoque endereçado em 3D, vitrine e relatórios XML.",
      proof: "Provedor de IA intercambiável (Gemini ou Anthropic) atrás de uma mesma interface; saída do modelo validada com Zod e regras de negócio testadas sem renderizar a interface.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Three Fiber", "Zod", "Vitest", "Gemini API", "LLM", "arquitetura em camadas"],
    },
    {
      id: "logiflow-3d", title: "LogiFlow 3D", live: "https://renanfrontend.github.io/logiflow-3d/", repo: gh("logiflow-3d"),
      summary: "Centro de distribuição interativo em 3D para simular decisões operacionais de logística, com indicadores e cenários comparáveis.",
      proof: "Cena procedural em React Three Fiber com regras em camadas inspiradas em Clean Architecture, atalhos de teclado acessíveis e fallback sem WebGL.",
      tech: ["React", "TypeScript", "Three.js", "React Three Fiber", "Vite", "Cloudflare Workers", "dashboard", "CI"],
    },
    {
      id: "lazuli-arcade", title: "Lazuli Arcade", live: "https://renanfrontend.github.io/lazuli-arcade/", repo: gh("lazuli-arcade"),
      summary: "Arcade de jogos casuais para o celular, com lobby e dois jogos originais, publicado como PWA instalável que funciona offline.",
      proof: "125 testes automatizados de regras, saves e navegação rodando no CI antes de cada deploy; narração para leitores de tela e movimento reduzido.",
      tech: ["React", "TypeScript", "Vite", "PWA", "Web Animations API", "Web Audio API", "Vitest", "GitHub Actions", "acessibilidade"],
    },
    {
      id: "barbershop", title: "Barber Shop", live: "https://barbershop-seven-pi.vercel.app", repo: gh("barbershop"),
      summary: "Aplicação de agendamento de barbearias com login Google e reservas persistidas em PostgreSQL.",
      proof: "Next.js com autenticação Google via NextAuth e persistência com Prisma e PostgreSQL.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth"],
    },
    {
      id: "gemini-beyond-prompts", title: "Gemini Beyond Prompts", live: "https://gemini-beyond-prompts.vercel.app", repo: gh("gemini-beyond-prompts"),
      summary: "Protótipo de painel de IA que reúne chat com o Google Gemini e telas de análise de documentos (RAG) e de agentes.",
      proof: "Chat funcional com a API do Gemini; banco modelado no Supabase com pgvector para a busca semântica.",
      tech: ["React", "Vite", "TypeScript", "Gemini API", "LLM", "RAG", "Supabase", "Tailwind CSS"],
    },
    {
      id: "upbeats-karaoke-player", title: "UP! BEATS Karaokê", live: "https://renanfrontend.github.io/upbeats-karaoke-player/", repo: gh("upbeats-karaoke-player"),
      summary: "Karaokê no navegador: letra sincronizada, remoção da voz em tempo real e microfone com eco, tudo processado no aparelho.",
      proof: "Um único grafo da Web Audio API, integração com as APIs do iTunes e do LRCLIB e interface em três idiomas (i18n).",
      tech: ["React", "TypeScript", "Web Audio API", "Vite", "Tailwind CSS", "TanStack Query", "i18next", "GitHub Actions", "APIs REST"],
    },
    {
      id: "manor-escape", title: "Manor Escape", live: "https://renanfrontend.github.io/manor-escape/", repo: gh("manor-escape"),
      summary: "Escape room vitoriano jogável no navegador, com quatro enigmas encadeados e um cofre interativo em 3D.",
      proof: "Fluxo em máquina de estados XState, estado em Zustand, Clean Architecture e walkthrough E2E completo com Playwright.",
      tech: ["React", "TypeScript", "Three.js", "React Three Fiber", "XState", "Zustand", "Vitest", "Playwright"],
    },
    {
      id: "fnaf-web", title: "Five Nights at Freddy's Web", live: "https://renanfrontend.github.io/fnaf-web/", repo: gh("fnaf-web"),
      summary: "Remaster no navegador de um projeto de fã, com motor de jogo novo, testes automatizados e deploy contínuo.",
      proof: "Migração de legado para Vite 6 e React 18, motor reescrito e 20 testes automatizados com Vitest.",
      tech: ["React", "Vite", "JavaScript", "Vitest", "GitHub Actions", "acessibilidade"],
    },
    {
      id: "escudo-cidadao", title: "Escudo Cidadão", live: "https://escudo-cidadao.netlify.app/", repo: gh("escudo-cidadao"),
      summary: "Aplicação B2C de cibersegurança para ajudar o cidadão a se proteger de fraudes digitais.",
      proof: "Frontend em React com Material UI e API própria em Node.js e Express.",
      tech: ["React", "TypeScript", "Vite", "Material UI", "Node.js", "Express"],
    },
    {
      id: "aster-ct", title: "Aster Centro Terapêutico", live: "https://renanfrontend.github.io/aster-ct/", repo: gh("aster-ct"),
      summary: "Site institucional para uma clínica terapêutica, com blog, contato e cuidados de SEO e LGPD.",
      proof: "Projeto profissional publicado, feito com HTML, Tailwind CSS e JavaScript.",
      tech: ["HTML", "Tailwind CSS", "JavaScript", "SEO"],
    },
  ];

  /* Formação e competências declaradas (contam menos que entregas). */
  const declared = [
    { label: "Pós-graduação em Inteligência Artificial e Ciência de Dados (em andamento)", text: "inteligência artificial ciência de dados IA" },
    { label: "Tecnólogo em Logística", text: "logística" },
    { label: "Pós-graduação em Administração Empresarial", text: "administração gestão negócio" },
    { label: "Certificação Acessibilidade com React (Rocketseat)", text: "acessibilidade React" },
    { label: "Certificação Interação Humano-Computador e UX", text: "UX usabilidade" },
    { label: "Competências do perfil", text: "Redux React Query Figma Claude Code Gemini GitHub Copilot Prompt Engineering LLMs RAG Docker Azure DevOps Nginx" },
  ];

  /*
   * Taxonomia: cada competência tem sinônimos (PT e EN, sem acento) e, se for o caso,
   * competências próximas que ajudam a explicar uma lacuna, sem contar como evidência.
   * generic: true deixa a competência fora do título gerado (é básica demais para destacar).
   */
  const skills = [
    { id: "react", label: "React", cat: "Frontend", aliases: ["react", "react.js", "reactjs"] },
    { id: "next", label: "Next.js", cat: "Frontend", aliases: ["next.js", "nextjs", "next js"] },
    { id: "ts", label: "TypeScript", cat: "Frontend", aliases: ["typescript"] },
    { id: "js", generic: true, label: "JavaScript", cat: "Frontend", aliases: ["javascript", "es6", "ecmascript", "jquery"] },
    { id: "angular", label: "Angular", cat: "Frontend", aliases: ["angular"] },
    { id: "rxjs", label: "RxJS", cat: "Frontend", aliases: ["rxjs", "ngrx"], near: ["angular"] },
    { id: "vue", label: "Vue.js", cat: "Frontend", aliases: ["vue", "vue.js", "vuejs", "nuxt"] },
    { id: "rn", label: "React Native", cat: "Frontend", aliases: ["react native"], near: ["react", "pwa"] },
    { id: "htmlcss", generic: true, label: "HTML e CSS", cat: "Interface", aliases: ["html", "html5", "css", "css3", "sass", "scss", "bootstrap"] },
    { id: "tailwind", label: "Tailwind CSS", cat: "Interface", aliases: ["tailwind", "tailwind css", "tailwindcss"] },
    { id: "ds", label: "Design system e componentes", cat: "Interface", aliases: ["design system", "design systems", "biblioteca de componentes", "component library", "componentes reutilizaveis", "reusable components", "material ui", "mui", "styled components", "material design", "shadcn/ui"] },
    { id: "storybook", label: "Storybook", cat: "Interface", aliases: ["storybook"], near: ["ds"] },
    { id: "a11y", label: "Acessibilidade", cat: "Interface", aliases: ["acessibilidade", "acessiveis", "acessivel", "accessibility", "accessible", "wcag", "a11y", "leitores de tela", "screen reader"] },
    { id: "ux", generic: true, label: "UI/UX", cat: "Interface", aliases: ["ui/ux", "ux", "usabilidade", "experiencia do usuario", "user experience", "figma", "layouts em codigo"] },
    { id: "responsive", generic: true, label: "Responsividade", cat: "Interface", aliases: ["responsivo", "responsiva", "responsivas", "responsivos", "responsividade", "responsive", "mobile first", "mobile-first"] },
    { id: "state", label: "Gerenciamento de estado", cat: "Frontend", aliases: ["redux", "zustand", "xstate", "gerenciamento de estado", "state management", "context api", "maquina de estados"] },
    { id: "query", label: "React Query / TanStack", cat: "Frontend", aliases: ["react query", "tanstack query", "tanstack"] },
    { id: "tests", label: "Testes automatizados", cat: "Qualidade", aliases: ["testes", "teste unitario", "testes unitarios", "testes automatizados", "unit test", "unit tests", "unit testing", "jest", "vitest", "testing library", "tdd", "automated tests"] },
    { id: "e2e", label: "Testes E2E", cat: "Qualidade", aliases: ["playwright", "cypress", "e2e", "end-to-end", "end to end"], near: ["tests"] },
    { id: "perf", label: "Performance web", cat: "Qualidade", aliases: ["performance", "web vitals", "core web vitals", "lighthouse", "otimizacao de performance"] },
    { id: "pwa", label: "PWA e offline", cat: "Frontend", aliases: ["pwa", "pwas", "progressive web app", "service worker", "offline"] },
    { id: "rest", label: "APIs REST", cat: "Integração", aliases: ["api rest", "apis rest", "rest api", "rest apis", "restful", "integracoes rest", "apis", "integracao de apis", "consumo de apis"] },
    { id: "graphql", label: "GraphQL", cat: "Integração", aliases: ["graphql", "apollo"], near: ["rest"] },
    { id: "auth", label: "Autenticação", cat: "Integração", aliases: ["jwt", "autenticacao", "authentication", "oauth", "nextauth", "login google"] },
    { id: "node", label: "Node.js", cat: "Integração", aliases: ["node", "node.js", "nodejs", "express"] },
    { id: "java", label: "Java / Spring (integração)", cat: "Integração", aliases: ["java", "spring", "spring boot"] },
    { id: "db", label: "Banco de dados", cat: "Integração", aliases: ["sql", "postgresql", "postgres", "mysql", "prisma", "supabase", "firebase", "banco de dados", "database", "pgvector"] },
    { id: "cicd", label: "CI/CD", cat: "Entrega", aliases: ["ci/cd", "ci", "cd", "pipeline", "pipelines", "esteiras", "github actions", "azure devops", "integracao continua", "entrega continua", "deploy continuo", "continuous integration", "continuous delivery"] },
    { id: "docker", label: "Docker e containers", cat: "Entrega", aliases: ["docker", "container", "containers", "azure container apps", "kubernetes", "k8s"] },
    { id: "azure", label: "Azure", cat: "Entrega", aliases: ["azure"] },
    { id: "aws", label: "AWS", cat: "Entrega", aliases: ["aws", "amazon web services"], near: ["azure"] },
    { id: "build", generic: true, label: "Build e bundlers", cat: "Entrega", aliases: ["vite", "webpack", "gulp", "bundler", "bundlers", "npm", "yarn", "pnpm"] },
    { id: "nginx", label: "Nginx", cat: "Entrega", aliases: ["nginx"] },
    { id: "git", generic: true, label: "Git e GitHub", cat: "Entrega", aliases: ["git", "github", "gitlab", "versionamento"] },
    { id: "three", label: "3D na web (Three.js)", cat: "Visual", aliases: ["three.js", "threejs", "webgl", "react three fiber", "r3f", "3d"] },
    { id: "audio", label: "Áudio no navegador", cat: "Visual", aliases: ["web audio", "web audio api"] },
    { id: "dash", label: "Dashboards e dados", cat: "Produto", aliases: ["dashboard", "dashboards", "painel", "paineis", "indicadores", "kpis", "visualizacao de dados", "data visualization", "dataviz", "graficos", "charts"] },
    { id: "ai", label: "LLMs em produto", cat: "IA", aliases: ["llm", "llms", "ia generativa", "generative ai", "genai", "gemini", "gemini api", "openai", "gpt", "anthropic", "rag", "prompt engineering", "agentes de ia", "ai agents", "inteligencia artificial", "ia", "ai"] },
    { id: "aitools", label: "IA no dia a dia de engenharia", cat: "IA", aliases: ["copilot", "github copilot", "claude code", "cursor", "ai-assisted", "assistentes de codigo"] },
    { id: "arch", label: "Arquitetura frontend", cat: "Liderança", aliases: ["arquitetura", "arquitetura frontend", "architecture", "clean architecture", "arquitetura em camadas", "escalabilidade", "scalability", "defini a stack"] },
    { id: "mfe", label: "Micro-frontends", cat: "Liderança", aliases: ["micro-frontend", "micro-frontends", "microfrontend", "microfrontends", "module federation"], near: ["arch"] },
    { id: "lead", label: "Mentoria e liderança técnica", cat: "Liderança", aliases: ["mentoria", "mentoring", "mentor", "orientei", "lideranca tecnica", "tech lead", "technical leadership", "code review", "revisao de codigo"] },
    { id: "legacy", label: "Modernização de legado", cat: "Liderança", aliases: ["legado", "legadas", "legacy", "modernizacao", "modernizei", "migracao", "migration"] },
    { id: "security", label: "Segurança", cat: "Liderança", aliases: ["seguranca", "security", "owasp", "lgpd", "ciberseguranca"] },
    { id: "agile", label: "Métodos ágeis", cat: "Processo", aliases: ["scrum", "kanban", "agil", "ageis", "agile", "sprints"] },
    { id: "i18n", label: "Internacionalização", cat: "Produto", aliases: ["i18n", "i18next", "internacionalizacao", "multi-idioma", "tres idiomas"] },
    { id: "seo", label: "SEO", cat: "Produto", aliases: ["seo"] },
    { id: "ecom", label: "E-commerce", cat: "Domínio", aliases: ["e-commerce", "ecommerce", "vtex", "loja virtual", "varejo", "marketplace", "checkout", "catalogo"] },
    { id: "logistics", label: "Logística e operação", cat: "Domínio", aliases: ["logistica", "supply chain", "wms", "centro de distribuicao", "armazem", "estoque"] },
    { id: "health", label: "Saúde", cat: "Domínio", aliases: ["saude", "healthcare", "health", "telemedicina", "healthtech"] },
    { id: "english", label: "Inglês", cat: "Idioma", aliases: ["ingles", "english", "fluent", "fluente em ingles"] },
  ];

  /* Vagas de exemplo (fictícias) para demonstrar sem colar nada. */
  const examples = [
    {
      id: "react-fintech", label: "Front-end Sênior · React",
      text: `Pessoa Desenvolvedora Front-end Sênior (React) — Fintech
Sobre a vaga: buscamos alguém para evoluir nosso app web de investimentos.
Requisitos:
- Experiência sólida com React, TypeScript e Next.js
- Testes automatizados com Jest e Testing Library
- Acessibilidade (WCAG) e responsividade
- Design system e componentes reutilizáveis
- Integração com APIs REST e CI/CD
- Experiência com Micro-frontends
Diferenciais:
- GraphQL
- Storybook
- Inglês avançado`,
    },
    {
      id: "angular-health", label: "Front-end · Angular (saúde)",
      text: `Engenheiro(a) Front-end Pleno/Sênior — Healthtech
Você vai construir telas de prontuário e agendamento para clínicas.
O que esperamos:
- Angular e TypeScript
- RxJS
- Consumo de APIs REST e autenticação
- Testes unitários
- Cloud Azure e pipelines no Azure DevOps
Seria legal ter:
- Vivência em saúde ou telemedicina
- Docker
- Métodos ágeis (Scrum)`,
    },
    {
      id: "ai-product", label: "Product Engineer · IA aplicada",
      text: `Product Engineer — IA aplicada (remoto)
Queremos alguém que transforme protótipos de IA em produto.
Requisitos:
- React e TypeScript no front-end
- Integração com LLMs (OpenAI, Gemini ou Anthropic) e RAG
- Node.js e PostgreSQL
- Dashboards e visualização de dados
- Arquitetura e escalabilidade
Diferenciais:
- Three.js ou WebGL
- PWA
- Experiência com e-commerce ou logística`,
    },
  ];

  const data = { person, experiences, projects, declared, skills, examples };
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else root.CZ_DATA = data;
})(typeof globalThis !== "undefined" ? globalThis : this);
