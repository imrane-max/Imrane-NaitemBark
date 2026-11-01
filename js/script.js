/* ===== Editable settings: fill in your real links here ===== */
const CONFIG = {
  email:   "",   // e.g. "name@example.com"
  github:  "https://github.com/imrane-max",
  instagram: "https://www.instagram.com/imranemax/",
  discord: "https://discord.com/users/1560947075162837023",
  website: ""
};

/* ===== Editable data: add or edit projects here. Leave url "" until the link exists ===== */
const PROJECTS = [
  { title: "VonoXNG", desc: "A modern and customizable search engine (SearXNG).", tags: ["Python", "Docker"],
    img: "assets/images/vonoxng.png", alt: "VonoXNG logo", url: "" },
  { title: "Vono Launcher", desc: "A feature-rich Minecraft launcher.", tags: ["Python", "CustomTkinter"],
    img: "assets/images/vono-launcher.png", alt: "Game controller illustration", url: "" },
  { title: "Imrane Portfolio", desc: "My personal portfolio website with a modern design.", tags: ["HTML", "CSS", "JS"],
    img: "assets/images/imrane-portfolio.png", alt: "Glowing blue and purple cube", url: "" }
];

/* Skills use Devicon classes (https://devicon.dev) */
const SKILLS = [
  ["Python", "devicon-python-plain colored"], ["JavaScript", "devicon-javascript-plain colored"],
  ["HTML", "devicon-html5-plain colored"], ["CSS", "devicon-css3-plain colored"],
  ["Godot", "devicon-godot-plain colored"], ["Blender", "devicon-blender-original colored"],
  ["Git", "devicon-git-plain colored"], ["Flask", "devicon-flask-original"],
  ["Docker", "devicon-docker-plain colored"], ["VS Code", "devicon-vscode-plain colored"]
];

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

/* ----- Render skills and projects ----- */
$("#skill-grid").innerHTML = SKILLS.map(([name, icon]) =>
  `<li><i class="${icon}" aria-hidden="true"></i>${name}</li>`).join("");

$("#project-grid").innerHTML = PROJECTS.map(p => {
  const href = p.url ? `href="${p.url}" target="_blank" rel="noopener"` : `href="#projects" aria-disabled="true" title="Link not added yet"`;
  const tags = p.tags.map(t => `<span class="tag ${t.toLowerCase()}">${t}</span>`).join("");
  return `<article class="project">
    <img src="${p.img}" alt="${p.alt}" loading="lazy">
    <div><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${tags}</div></div>
    <a class="arrow stretch" ${href} aria-label="Open ${p.title}"><i class="fa-solid fa-arrow-right"></i></a>
  </article>`;
}).join("");

/* ----- Social + email links from CONFIG ----- */
$$("[data-social]").forEach(a => {
  const url = CONFIG[a.dataset.social];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  else a.title = "Add this link in js/script.js";
});
const mail = $("#email-link");
if (CONFIG.email) mail.href = "mailto:" + CONFIG.email; else mail.title = "Add your email in js/script.js";

/* ----- Theme toggle (saved in localStorage) ----- */
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem("theme") || "dark"; } catch (e) {}
$("#theme").addEventListener("click", () => {
  root.classList.add("theming"); setTimeout(() => root.classList.remove("theming"), 500);
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

/* ----- Mobile menu ----- */
const menu = $("#menu"), burger = $("#burger");
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.innerHTML = `<i class="fa-solid ${open ? "fa-xmark" : "fa-bars"}"></i>`;
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

/* ----- Active section highlight ----- */
const links = $$("#menu a");
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.hash === "#" + en.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
links.forEach(l => { const s = $(l.hash); if (s) spy.observe(s); });

/* ----- Scroll reveal ----- */
const reveal = new IntersectionObserver((entries, obs) => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
}), { threshold: .12 });
$$(".reveal").forEach(el => reveal.observe(el));

/* ----- Back to top ----- */
const toTop = $("#to-top");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 600), { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ----- Animation helpers ----- */
// --i gives each item its own entrance delay (staggered effect)
["#skill-grid > *", ".project", ".timeline > *", ".hero-text > *"].forEach(sel =>
  $$(sel).forEach((el, i) => el.style.setProperty("--i", i)));

// Nav shadow/compact state and scroll progress bar
const nav = $(".nav"), bar = $("#progress");
const onScroll = () => {
  nav.classList.toggle("scrolled", scrollY > 20);
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ----- Cursor glow on cards (devices with a mouse) ----- */
if (matchMedia("(hover:hover)").matches) {
  $$(".card").forEach(card => card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  }));
}

// Spotlight glow that follows the cursor inside each card
$$(".card").forEach(card => card.addEventListener("pointermove", e => {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", e.clientX - r.left + "px");
  card.style.setProperty("--my", e.clientY - r.top + "px");
}));
