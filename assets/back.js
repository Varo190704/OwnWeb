const $ = (sel, p = document) => p.querySelector(sel);
const $$ = (sel, p = document) => [...p.querySelectorAll(sel)];
const el = (tag, props = {}) => Object.assign(document.createElement(tag), props);
const canvas = $("#bgfx");
const outlet = $("#view");
const YEAR = $("#year");
const theme = $("#themeToggle");
const btnLang = $("#langToggle");
const tagline = $("#tagline");

/* ---------- i18n ---------- */
const I18N = {
  en: {
    tag: "Backend-in-progress · Building Aionis",
    nav: { "/": "Home", "/dev": "Dev", "/aionis": "Aionis", "/ova": "Ova", "/blog": "Blog" },
    home: {
      featured: "Featured Projects",
      heroTitle: "Creator & Developer",
      heroKicker: "I build software, art and a personal AI called Aionis.",
      quick: "Quick Links",
      now: "Now",
      aionis: "Aionis Status",
    },
    dev: { title: "Projects", filter: "Filter", current: "Current", archive: "Archive" },
    aionis: { title: "Aionis — roadmap & status", phase: "Phase", compute: "Compute", storage: "Storage", milestones: "Milestones" },
   ova: {
      title: "About Ovalo",
     long: {
        hero1: "I’m Álvaro (Ovalo). I create software, art, and I surf.",
        hero2: "My work blends engineering, design, and a productive obsession with building useful tools.",

        profileTitle: "General Profile",
        profile: "I study Computer Engineering and spend much of my time designing architectures, training models, and improving my own systems. I’m interested in technologies that scale: AI, personal infrastructure, computer vision, and tools that solve real problems.",

        buildTitle: "What I Build",
        build1: "Aionis, my personal AI designed as a modular system with vision, language, reasoning, and memory (not yet).",
        build2: "TaskTrackPro, a management platform built from scratch with TDD.",
        build3: "A homelab powered by Proxmox, NAS, GPU passthrough, and local models.",

        phTitle: "Philosophy & Vision",
        ph1: "I believe in continuous learning, iteration, and robust systems. My vision is to turn my projects into real, scalable products.",
        ph2: "Long-term, I want to scale my tools and turn Aionis into a complete personal support system.",

        ecoTitle: "My Ecosystem",
        eco1: "Code — my projects and technical background.",
        eco2: "Art — my visual work in Ova.",
        eco3: "AI — the development of Aionis.",
        eco4: "Hardware — homelab, storage, and local experimentation.",

        nowTitle: "Now",
        now: "I'm currently developing new phases of Aionis, training visual models, improving my infrastructure, and studying Engineering.",

        endTitle: "Closing",
        end: "I don’t seek perfection, I seek progress. This website documents my process: my projects, my experiments, and what I’m building long-term."
      }
    },
    blog: { title: "Notes & Articles", empty: "Soon: short posts on tech, surf and life." },
    chipsAll: "All"
  },
  es: {
    tag: "Backend en progreso· Construyendo Aionis",
    nav: { "/": "Inicio", "/dev": "Dev", "/aionis": "Aionis", "/ova": "Ova", "/blog": "Blog" },
    home: {
      featured: "Proyectos destacados",
      heroTitle: "Creador & Desarrollador",
      heroKicker: "Hago software, arte y una IA personal llamada Aionis.",
      quick: "Enlaces rápidos",
      now: "Ahora",
      aionis: "Estado de Aionis",
    },
    dev: { title: "Proyectos", filter: "Filtrar", current: "Actuales", archive: "Archivo" },
    aionis: { title: "Aionis — hoja de ruta y estado", phase: "Fase", compute: "Cómputo", storage: "Almacenamiento", milestones: "Hitos" },
    ova: {
      title: "Sobre Óvalo",
      long: {
        hero1: "Soy Álvaro (Ovalo). Me dedico a crear: software, arte y a surfear.",
        hero2: "Mi trabajo combina ingeniería, diseño y una obsesión productiva por construir herramientas útiles.",
        profileTitle: "Perfil general",
        profile: "Estudio Ingeniería en Computación y paso gran parte del tiempo diseñando arquitecturas, entrenando modelos y mejorando mis propios sistemas. Me interesan las tecnologías que escalan: IA, infraestructura personal, visión computacional y herramientas que resuelven problemas reales.",
        buildTitle: "Lo que construyo",
        build1: "Aionis, mi IA personal diseñada como un sistema modular con visión, lenguaje, razonamiento y memoria (por ahora no).",
        build2: "TaskTrackPro, una plataforma de gestión construida desde cero con TDD.",
        build3: "Un homelab con Proxmox, NAS, GPU passthrough y modelos locales.",
        phTitle: "Filosofía y visión",
        ph1: "Creo en el aprendizaje continuo, la iteración y los sistemas robustos. Mi visión es llevar mis proyectos a productos reales y escalables.",
        ph2: "A largo plazo quiero escalar mis herramientas y convertir Aionis en un sistema completo de soporte personal.",
        ecoTitle: "Mi ecosistema",
        eco1: "Código — mis proyectos y mi formación técnica.",
        eco2: "Arte — mi trabajo en Ova.",
        eco3: "IA — el desarrollo de Aionis.",
        eco4: "Hardware — homelab, almacenamiento y experimentación local.",
        nowTitle: "Ahora",
        now: "Actualmente estoy desarrollando nuevas fases de Aionis, entrenando modelos visuales, mejorando mi infraestructura, estudiando Ingeniería.",
        endTitle: "Cierre",
        end: "No busco perfección, busco progreso. Esta web documenta mi proceso: mis proyectos, mis experimentos y lo que estoy construyendo a largo plazo."
      }
    },
    blog: { title: "Notas & Artículos", empty: "Pronto: mini posts de tech, surf y vida." },
    chipsAll: "Todos"
  }
};

/* ---------- Content data (edit) ---------- */
const DATA = {
  links: [
    { label: "GitHub", url: "https://github.com/Varo190704" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/alvaroredomotta" },
    { label: "Email", url: "mailto:varo19704@gmail.com" },
    { label: "CV (PDF)",  url: "Docs/CV.pdf", download: "Alvaro-CV.pdf"  },
    { label: "Instagram", url: "https://www.instagram.com/_alvo1_" }
  ],
  now_en: [
    "Studying Backend fundamentals (C# / Python / Java)",
    "Building Aionis v2",
    "Designing ovacode.dev"
  ],
  now_es: [
    "Estudiando fundamentos de Backend (C# / Python / Java)",
    "Armando Aionis v2",
    "Diseñando ovacode.dev"
  ],
  projects: {
    current: [
      { name: "TaskTrackPro", desc_en: ".NET 8 tasks & alerts with tests", desc_es: "Tareas y alertas en .NET 8 con tests", stack: ["C#", ".NET", "xUnit"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/C%23/TaskTrack" },
      { name: "Pocket Balance", desc_en: "Personal savings management site (work in progress)", desc_es: "Sitio para gestion de ahorro de dinero (todavia en produción)", stack: ["Nothing at the moment"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/C%23/PocketBalance" },
      { name: "OBL Java", desc_en: "Academic Java project (developed for university)", desc_es: "Desarrollo hecho en JAVA (hecho para la facultad)", stack: ["Java"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/Java/obl" },
      { name: "OBL2 Java", desc_en: "Second Academic Java project (developed for university)", desc_es: "Segundo Desarrollo hecho en JAVA (hecho para la facultad)", stack: ["Java"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/Java/Obligatorio2_P2" },
      { name: "Lesson Manager", desc_en: "Public school lesson management system (developed for university)", desc_es: "Desarrollo para administración de lecciones para escuelas publicas (hecho para la facultad)", stack: ["JS", "CSS", "HTML", "Bootstrap"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/Js%26Html/fis2-main" },
      { name: "Aionis Core", desc_en: "Foundations for personal AI assistant", desc_es: "Fundaciones de mi asistente de IA personal", stack: ["LLMs", "Proxmox", "Linux"], url: "https://ovacode.dev/#/aionis" },
      { name: "NAS", desc_en: "My own NAS server", desc_es: "Servidor NAS propio", stack: ["Proxmox", "NAS"], url: "" },
      { name: "Task Manager", desc_en: "A primitive TaskManager + UI", desc_es: "Un gestor de Tareas primitivo + UI", stack: ["Python", "Py Library"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/Python/Task%20manager" },
      { name: "Task Manager Only Script", desc_en: "A primitive TaskManager + UI", desc_es: "Gestor de tareas primitivo", stack: ["Python"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/Python/Task%20Manager%20Only%20script" },
      { name: "Weather", desc_en: "App to check site weather (API integration and Library)", desc_es: "App para verificar clima de sitio (conexion con API y uso de libreria)", stack: ["Python", "API", "Py Library"], url: "https://github.com/Varo190704/Portfolio/tree/main/Portfolio/Python/Weather" },
      { name: "Odds BI Platform", desc_en: "A lightweight Business Intelligence platform for analyzing sports odds volatility through a custom ETL pipeline and SQLite storage. It provides interactive Plotly dashboards, KPI tracking, volatility spike detection, and a clean Streamlit Cloud deployment.", desc_es: "Una plataforma ligera de Business Intelligence que analiza la volatilidad de cuotas deportivas utilizando un pipeline ETL propio, SQLite y Streamlit. Incluye KPIs, detección de picos de volatilidad, visualizaciones interactivas con Plotly y un dashboard limpio desplegado en Streamlit Cloud.", stack: ["Python", "Pandas", "SQLite", "ETL", "Streamlit"], url: "https://github.com/Varo190704/odds-bi" },
      { name: "Own Web", desc_en: "This site for ovacode.dev", desc_es: "Este sitio para ovacode.dev", stack: ["HTML", "CSS", "JS"], url: "ovacode.dev" }
    ],
    archive: []
  },
  aionis: {
    phase_en: "v2 – Integration beetween some LLMs, LoRA training, vision models, and AI photoGen",
    phase_es: "v2 – Integración entre LLMs, entrenamiento LoRA, modelos de visión y AI photoGen",
    compute_en: "i9 14900k / 6900tx / 128gb Ram DDR5 / Zero Project",
    compute_es: "i9 14900k / 6900tx / 128gb Ram DDR5 / Zero Project",
    software_en: "Proxmox / Docker / Python / Ollama / Ubuntu",
    storage_en: "5 TB → target 30 TB (NAS)",
    storage_es: "5 TB → objetivo 30 TB (NAS)",
    badges: ["Local-first", "Privacy", "Homelab"],
    milestones_en: [
      "Intregation between some LLMs",
      "Integration between my own CNN and decoder models",
      "Host PC setup and backups",
      "Using Tailscale for remote access",
      "Training vision models",
      "LoRA training pipelines",
      "AI photoGen integration",
    ],
    milestones_es: [
      "Integración entre algunos LLMs",
      "Integración entre mis propios modelos CNN y decodificadores",
      "Configuración de PC host y backups",
      "Uso de Tailscale para acceso remoto",
      "Entrenamiento de modelos de visión",
      "Pipelines de entrenamiento LoRA",
      "Integración de AI photoGen",
    ]
  },
  
};

/* ---------- State ---------- */
const state = {
  lang: localStorage.getItem("lang") || "en",
  theme: localStorage.getItem("theme") || "dark",
  route: "/",
  stackFilter: null,
  stacks: null
};

/* ---------- Theme ---------- */
function setTheme(next) {
  state.theme = next;
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", next === "dark" ? "#0b0b0f" : "#f6f7fb");
  theme.textContent = next === "dark" ? "☾" : "☼";
}

/* ---------- Language ---------- */
function setLang(newLang) {

  state.lang = newLang;
  localStorage.setItem("lang", newLang);
  document.documentElement.setAttribute("lang", newLang === "es" ? "es" : "en");
  const t = I18N[newLang];
  if (tagline) tagline.textContent = t.tag;
  $$(".navlink").forEach(a => {
    const path = a.dataset.route || "/";
    a.textContent = t.nav[path] || t.nav["/"];
  });
  if (btnLang) btnLang.textContent = (newLang === "en" ? "ES" : "EN");
  render();
  highlightNav();
}

/* ---------- Router ---------- */
function navigate(path) {
  if (!path.startsWith("/")) path = "/";
  state.route = path;
  location.hash = path;
  render();
  highlightNav();
}

function highlightNav() {
  $$(".navlink").forEach(a => a.classList.toggle("active", a.dataset.route === state.route));
}

window.addEventListener("hashchange", () => {
  state.route = location.hash.replace("#", "") || "/";
  render();
  highlightNav();
});

/* ---------- Builders ---------- */
function chip(text, onClick, active = false) {
  const b = el("button", { className: "chip card-hover btn text-muted", textContent: text });
  b.classList.add("chip", "chip-hover", "btn", "text-muted");
  if (active) b.classList.add("chip--active");
  b.style.color = "var(--text-muted)";
  b.addEventListener("click", onClick);
  return b;
}

function pillStat(label, value, mono = false) {
  const wrap = el("div", { className: "pill" });
  const l = el("div", { className: "text-muted", textContent: label });
  const v = el("div", { className: mono ? "mono" : "", textContent: value });
  v.style.fontSize = "1.1rem";
  v.style.fontWeight = "600";
  wrap.append(l, v);
  return wrap;
}

function cardProject(p) {
  const card = el("article", { className: "pill card-hover" });
  const h3 = el("h3");
  const a = el("a", { href: p.url, target: "_blank", rel: "noopener", textContent: p.name });
  a.className = "hover-underline";
  h3.appendChild(a);

  const desc = state.lang === "es" ? (p.desc_es || p.desc_en) : (p.desc_en || p.desc_es);
  const pdesc = el("p", { textContent: desc || "" });
  pdesc.className = "text-muted";

  const tags = el("div", { className: "tags" });
  tags.style.display = "flex";
  tags.style.flexWrap = "wrap";
  tags.style.gap = "0.4rem";
  (p.stack || []).forEach(s => tags.appendChild(chip(s, () => { state.stackFilter = s; render(); }, false)));

  card.append(h3, pdesc, tags);
  return card;
}

/* ---------- Views ---------- */
function viewHome() {
  state.stackFilter = null; 
  const t = I18N[state.lang];

  const grid = el("div");
  grid.className = "grid-home fade-enter fade-in";

  const left = el("aside");
  left.className = "col-left space-vertical";
  const quick = panel(t.home.quick);
  const qgrid = el("div");
  qgrid.className = "grid-links";
  DATA.links.forEach(l => {
    const a = el("a", { className: "btn card-hover justify-between", href: l.url, target: "_blank", rel: "noopener" });
    a.innerHTML = `<span class="mono">${l.label}</span><span class="text-muted">→</span>`;
    qgrid.appendChild(a);
  });
  quick.body.appendChild(qgrid);

  // Now
  const now = panel(t.home.now);
  const ul = el("ul");
  ul.className = "list-now";
  const nowList = state.lang === "es" ? DATA.now_es : DATA.now_en;
  nowList.forEach(item => {
    const li = el("li", { textContent: item });
    ul.appendChild(li);
  });
  now.body.appendChild(ul);

  // Aionis mini (for the future)
  const aionisMini = panel(t.home.aionis);
  const badgeRow = el("div");
  badgeRow.className = "row-badges";
  DATA.aionis.badges.forEach(b => badgeRow.appendChild(chip(b, () => {}, true)));
  const stats = el("div");
  stats.className = "grid-stats";
  stats.append(
    pillStat(I18N[state.lang].aionis.phase, state.lang === "es" ? DATA.aionis.phase_es : DATA.aionis.phase_en),
    pillStat(I18N[state.lang].aionis.compute, state.lang === "es" ? DATA.aionis.compute_es : DATA.aionis.compute_en, true),
    pillStat(I18N[state.lang].aionis.storage, state.lang === "es" ? DATA.aionis.storage_es : DATA.aionis.storage_en, true)
  );
  aionisMini.body.append(badgeRow, stats);

  left.append(quick.wrap, now.wrap, aionisMini.wrap);

  // Right column
  const right = el("section");
  right.className = "col-right space-vertical";

  const hero = el("div", { className: "glass ring-soft block hero" });
  const kicker = el("div", { className: "mono text-muted", textContent: t.home.heroKicker });
  const title = el("h2", { textContent: t.home.heroTitle });
  title.style.fontSize = "1.6rem";
  title.style.fontWeight = "600";
  hero.append(title, kicker);
  const featured = el("div", { className: "glass ring-soft block grid-cards" });
  featured.appendChild(el("h3", { className: "title", textContent: t.home.featured }));
  DATA.projects.current.forEach(p => featured.appendChild(cardProject(p)));

  right.append(hero, featured);

  grid.append(left, right);
  return grid;
}

function viewDev() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });

  const head = el("div", { className: "glass ring-soft block row-between" });
  const title = el("div", { className: "title", textContent: t.dev.title });
  const filterWrap = el("div", { className: "row gap" });
  const filterLabel = el("span", { className: "text-muted", textContent: t.dev.filter });
  const filters = el("div", { id: "filters", className: "row gap" });
  filterWrap.append(filterLabel, filters);
  head.append(title, filterWrap);

  // Lists
  const cur = el("div", { id: "dev-cur", className: "glass ring-soft block grid-cards" });
  const arc = el("div", { id: "dev-arc", className: "glass ring-soft block grid-cards" });

  // Render filters + lists
  renderProjectFilters(filters, cur, arc);

  wrap.append(head, cur, arc);
  return wrap;
}

function viewaionis() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });

  const panel = el("div", { className: "glass ring-soft block space-vertical" });
  const h2 = el("h2", { textContent: t.aionis.title });
  h2.style.fontWeight = "600";
  panel.appendChild(h2);

  const stats = el("div", { className: "grid-stats" });
  stats.append(
    pillStat(t.aionis.phase, state.lang === "es" ? DATA.aionis.phase_es : DATA.aionis.phase_en),
    pillStat(t.aionis.compute, state.lang === "es" ? DATA.aionis.compute_es : DATA.aionis.compute_en, true),
    pillStat(t.aionis.storage, state.lang === "es" ? DATA.aionis.storage_es : DATA.aionis.storage_en, true)
  );

  const mTitle = el("h3", { textContent: t.aionis.milestones });
  mTitle.style.fontWeight = "600";
  const ol = el("ol");
  ol.className = "list-ordered";
  (state.lang === "es" ? DATA.aionis.milestones_es : DATA.aionis.milestones_en)
    .forEach(m => ol.appendChild(el("li", { textContent: m })));

  const badges = el("div", { className: "row-badges" });
  DATA.aionis.badges.forEach(b => badges.appendChild(chip(b, () => {}, true)));

  panel.append(stats, mTitle, ol, badges);
  wrap.appendChild(panel);
  return wrap;
}

function viewOva() {
  const t = I18N[state.lang];
  const L = t.ova.long;
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });
  const card = el("div", { className: "glass ring-soft block" });
  const h2 = el("h2", { textContent: t.ova.title }); h2.style.fontWeight = "600";
  const sectionTitle = (txt) =>
    el("h3", { textContent: txt, className: "mt-4", style: "font-weight:600;" });
  const sectionText = (txt) =>
    el("p", { textContent: txt, className: "text-muted" });
  card.append(
    h2,
    sectionText(L.hero1),
    sectionText(L.hero2),
    sectionTitle(L.profileTitle),
    sectionText(L.profile),
    sectionTitle(L.buildTitle),
    sectionText(L.build1),
    sectionText(L.build2),
    sectionText(L.build3),
    sectionTitle(L.phTitle),
    sectionText(L.ph1),
    sectionText(L.ph2),
    sectionTitle(L.ecoTitle),
    sectionText(L.eco1),
    sectionText(L.eco2),
    sectionText(L.eco3),
    sectionText(L.eco4),
    sectionTitle(L.nowTitle),
    sectionText(L.now),
    sectionTitle(L.endTitle),
    sectionText(L.end),
  );
  wrap.appendChild(card);
  return wrap;
}

function viewBlog() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });
  const card = el("div", { className: "glass ring-soft block" });
  const h2 = el("h2", { textContent: t.blog.title }); h2.style.fontWeight = "600";
  const p = el("p", { className: "text-muted", textContent: t.blog.empty });
  card.append(h2, p);
  wrap.appendChild(card);
  return wrap;
}

/* ---------- Panels ---------- */
function panel(titleText) {
  const wrap = el("div", { className: "glass ring-soft block" });
  const title = el("h2", { className: "title", textContent: titleText });
  title.style.marginBottom = ".5rem";
  const body = el("div");
  wrap.append(title, body);
  return { wrap, body };
}

/* ---------- Projects filters ---------- */
function computeStacks() {
  if (state.stacks) return state.stacks;
  const all = [...DATA.projects.current, ...DATA.projects.archive].flatMap(p => p.stack);
  state.stacks = [...new Set(all)];
  return state.stacks;
}

function renderProjectFilters(mount, cur, arc) {
  mount.innerHTML = "";
  const t = I18N[state.lang];

  const allBtn = chip(t.chipsAll, () => {
    state.stackFilter = null;
    renderProjectLists(cur, arc);
    renderProjectFilters(mount, cur, arc);
  }, state.stackFilter === null);
  mount.appendChild(allBtn);

  computeStacks().forEach(s => {
    const active = state.stackFilter === s;
    const b = chip(s, () => {
      state.stackFilter = active ? null : s;
      renderProjectLists(cur, arc);
      renderProjectFilters(mount, cur, arc);
    }, active);
    mount.appendChild(b);
  });

  renderProjectLists(cur, arc);
}

function renderProjectLists(cur, arc) {
  const flt = state.stackFilter;
  const C = !flt ? DATA.projects.current : DATA.projects.current.filter(p => p.stack.includes(flt));
  const A = !flt ? DATA.projects.archive : DATA.projects.archive.filter(p => p.stack.includes(flt));
  cur.innerHTML = ""; A.forEach(()=>{});
  C.forEach(p => cur.appendChild(cardProject(p)));
  arc.innerHTML = "";
  A.forEach(p => arc.appendChild(cardProject(p)));
}

/* ---------- Render entry ---------- */
function render() {
  render.last = state.route;
  outlet.innerHTML = "";
  let node;
   switch (state.route) {
    case "/":     node = viewHome(); break;
    case "/dev":  node = viewDev(); break;
    case "/aionis": node = viewaionis(); break;
    case "/ova":  node = viewOva(); break;
    case "/blog": node = viewBlog(); break;
    default:      node = viewHome(); break;
  }

  outlet.appendChild(node);
}

/* ---------- Events ---------- */
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-route]");
  if (!a) return;
  e.preventDefault();
  navigate(a.dataset.route);
});

theme.addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));
if (btnLang) btnLang.addEventListener("click", () => setLang(state.lang === "en" ? "es" : "en"));

document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === "t") setTheme(state.theme === "dark" ? "light" : "dark");
  if (k === "l") setLang(state.lang === "en" ? "es" : "en");
  if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
    const routes = ["/", "/dev", "/aionis", "/ova", "/blog"];
    navigate(routes[Number(e.key) - 1] || "/");
  }
});

/* ---------- Init ---------- */
(function init() {
  if (YEAR) YEAR.textContent = new Date().getFullYear();
  setTheme(state.theme);
  setLang(state.lang);
  state.route = "/";
  render();
  highlightNav();

  // UTM/ref (client-only) + simple visit count
  const params = new URLSearchParams(location.search);
  const ref = params.get("ref") || params.get("utm_source");
  if (ref) localStorage.setItem("ref_source", ref);
  const key = "visits_count";
  const n = parseInt(localStorage.getItem(key) || "0", 10) + 1;
  localStorage.setItem(key, n);
})();

/* ---------- Background particles (lightweight) ---------- */
(function particles() {
  const c = canvas;
  if (!c) return;
  const ctx = c.getContext("2d");
  let w = (c.width = innerWidth), h = (c.height = innerHeight);

  const dots = Array.from({ length: 90 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.5 + 0.5
  }));

  function step() {
    ctx.clearRect(0, 0, w, h);
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
    ctx.fillStyle = ink === "#000000" ? "rgba(0,0,0,0.28)" : "rgba(255,255,255,0.5)";
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(step);
  }

  addEventListener("resize", () => { w = c.width = innerWidth; h = c.height = innerHeight; });
  step();
})();
