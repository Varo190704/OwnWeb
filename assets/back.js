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
    tag: "Backend-in-progress · Tattoo artist (Bako) · Building Lyra",
    nav: { "/": "Home", "/dev": "Dev", "/lyra": "Lyra", "/bako": "Bako", "/ova": "Ova", "/blog": "Blog" },
    home: {
      heroTitle: "Creator & Developer",
      heroKicker: "I build software, art and a personal AI called Lyra.",
      quick: "Quick Links",
      now: "Now",
      lyra: "Lyra Status",
    },
    dev: { title: "Projects", filter: "Filter", current: "Current", archive: "Archive" },
    lyra: { title: "Lyra — roadmap & status", phase: "Phase", compute: "Compute", storage: "Storage", milestones: "Milestones" },
    bako: { title: "Bako — tattoo portfolio", empty: "Gallery coming soon." },
    ova: { title: "Ova — art & textiles", empty: "Lookbook coming soon." },
    blog: { title: "Notes & Articles", empty: "Soon: short posts on tech, surf and life." },
    chipsAll: "All"
  },
  es: {
    tag: "Backend en progreso · Tatuador (Bako) · Construyendo Lyra",
    nav: { "/": "Inicio", "/dev": "Dev", "/lyra": "Lyra", "/bako": "Bako", "/ova": "Ova", "/blog": "Blog" },
    home: {
      heroTitle: "Creador & Desarrollador",
      heroKicker: "Hago software, arte y una IA personal llamada Lyra.",
      quick: "Enlaces rápidos",
      now: "Ahora",
      lyra: "Estado de Lyra",
    },
    dev: { title: "Proyectos", filter: "Filtrar", current: "Actuales", archive: "Archivo" },
    lyra: { title: "Lyra — hoja de ruta y estado", phase: "Fase", compute: "Cómputo", storage: "Almacenamiento", milestones: "Hitos" },
    bako: { title: "Bako — portfolio de tatuajes", empty: "Galería pronto." },
    ova: { title: "Ova — arte y textiles", empty: "Lookbook pronto." },
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
    "Building Lyra v0 roadmap",
    "Designing ovacode.dev"
  ],
  now_es: [
    "Estudiando fundamentos de Backend (C# / Python / Java)",
    "Armando la hoja de ruta de Lyra v0",
    "Diseñando ovacode.dev"
  ],
  projects: {
    current: [
      { name: "TaskTrackPro", desc_en: ".NET 8 tasks & alerts with tests", desc_es: "Tareas y alertas en .NET 8 con tests", stack: ["C#", ".NET", "xUnit"], url: "https://github.com/your-user/tasktrackpro" },
      { name: "Lyra Core", desc_en: "Foundations for personal AI assistant", desc_es: "Fundaciones de mi asistente de IA personal", stack: ["Nothing at the moment"], url: "https://github.com/your-user/lyra-core" },
      { name: "Own Web", desc_en: "This site for ovacode.dev", desc_es: "Este sitio para ovacode.dev", stack: ["HTML", "CSS", "JS"], url: "#" }
    ],
    archive: [
      { name: "Uni Utilities", desc_en: "Helpers for coursework", desc_es: "Utilidades para la facultad", stack: ["Java", "C++"], url: "#" }
    ]
  },
  lyra: {
    phase_en: "v0 – Planning",
    phase_es: "v0 – Planificación",
    compute_en: "i9 14900k / 6900tx / 128gb Ram DDR5",
    compute_es: "i9 14900k / 6900tx / 128gb Ram DDR5",
    storage_en: "6 TB → target 100 TB (NAS)",
    storage_es: "6 TB → objetivo 100 TB (NAS)",
    badges: ["Local-first", "Privacy", "Homelab"],
    milestones_en: [
      "Define v0 goals and constraints",
      "Set up mini PC host & backups",
      "Prototype prompt router + logging",
      "Plan NAS integration (media + datasets)"
    ],
    milestones_es: [
      "Definir objetivos y límites de v0",
      "Configurar PC host y backups",
      "Prototipo de router de prompts + logging",
      "Plan de integración con NAS (media + datasets)"
    ]
  }
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
function setLang(newlang) {
  state.lang = newlang;
  localStorage.setItem("lang", newlang);
  const t = I18N[newlang];

  tagline.textContent = t.tag;
  $$(".navlink").forEach(a => {
    const path = a.dataset.route || "/";
    a.textContent = t.nav[path] || t.nav["/"];
  });
  if (BTN_LANG) BTN_LANG.textContent = newLang.toUpperCase();
  render();
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

  // Lyra mini (for the future)
  const lyraMini = panel(t.home.lyra);
  const badgeRow = el("div");
  badgeRow.className = "row-badges";
  DATA.lyra.badges.forEach(b => badgeRow.appendChild(chip(b, () => {}, true)));
  const stats = el("div");
  stats.className = "grid-stats";
  stats.append(
    pillStat(I18N[state.lang].lyra.phase, state.lang === "es" ? DATA.lyra.phase_es : DATA.lyra.phase_en),
    pillStat(I18N[state.lang].lyra.compute, state.lang === "es" ? DATA.lyra.compute_es : DATA.lyra.compute_en, true),
    pillStat(I18N[state.lang].lyra.storage, state.lang === "es" ? DATA.lyra.storage_es : DATA.lyra.storage_en, true)
  );
  lyraMini.body.append(badgeRow, stats);

  left.append(quick.wrap, now.wrap, lyraMini.wrap);

  // Right column
  const right = el("section");
  right.className = "col-right space-vertical";

  const hero = el("div", { className: "glass ring-soft block hero" });
  const kicker = el("div", { className: "mono text-muted", textContent: t.home.heroKicker });
  kicker.style.marginBottom = ".4rem";
  const title = el("h2", { textContent: t.home.heroTitle });
  title.style.fontSize = "1.6rem";
  title.style.fontWeight = "600";
  hero.append(kicker, title);

  const featured = el("div", { className: "glass ring-soft block grid-cards" });
  DATA.projects.current.slice(0, 2).forEach(p => featured.appendChild(cardProject(p)));

  right.append(hero, featured);

  grid.append(left, right);
  return grid;
}

function viewDev() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });

  // Header
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

function viewLyra() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });

  const panel = el("div", { className: "glass ring-soft block space-vertical" });
  const h2 = el("h2", { textContent: t.lyra.title });
  h2.style.fontWeight = "600";
  panel.appendChild(h2);

  const stats = el("div", { className: "grid-stats" });
  stats.append(
    pillStat(t.lyra.phase, state.lang === "es" ? DATA.lyra.phase_es : DATA.lyra.phase_en),
    pillStat(t.lyra.compute, state.lang === "es" ? DATA.lyra.compute_es : DATA.lyra.compute_en, true),
    pillStat(t.lyra.storage, state.lang === "es" ? DATA.lyra.storage_es : DATA.lyra.storage_en, true)
  );

  const mTitle = el("h3", { textContent: t.lyra.milestones });
  mTitle.style.fontWeight = "600";
  const ol = el("ol");
  ol.className = "list-ordered";
  (state.lang === "es" ? DATA.lyra.milestones_es : DATA.lyra.milestones_en)
    .forEach(m => ol.appendChild(el("li", { textContent: m })));

  const badges = el("div", { className: "row-badges" });
  DATA.lyra.badges.forEach(b => badges.appendChild(chip(b, () => {}, true)));

  panel.append(stats, mTitle, ol, badges);
  wrap.appendChild(panel);
  return wrap;
}

function viewBako() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });
  const card = el("div", { className: "glass ring-soft block" });
  const h2 = el("h2", { textContent: t.bako.title }); h2.style.fontWeight = "600";
  const p = el("p", { className: "text-muted", textContent: t.bako.empty });
  card.append(h2, p);
  wrap.appendChild(card);
  return wrap;
}

function viewOva() {
  const t = I18N[state.lang];
  const wrap = el("div", { className: "space-vertical fade-enter fade-in" });
  const card = el("div", { className: "glass ring-soft block" });
  const h2 = el("h2", { textContent: t.ova.title }); h2.style.fontWeight = "600";
  const p = el("p", { className: "text-muted", textContent: t.ova.empty });
  card.append(h2, p);
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
  outlet.innerHTML = "";
  let node;
  if (state.route === "/") node = viewHome();
  else if (state.route === "/dev") node = viewDev();
  else if (state.route === "/lyra") node = viewLyra();
  else if (state.route === "/bako") node = viewBako();
  else if (state.route === "/ova") node = viewOva();
  else if (state.route === "/blog") node = viewBlog();
  else node = viewHome();

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
    const routes = ["/", "/dev", "/lyra", "/bako", "/ova", "/blog"];
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
