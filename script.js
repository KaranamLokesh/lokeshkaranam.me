// Mobile nav toggle
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Scroll progress bar
const progress = document.getElementById("scrollProgress");
const updateProgress = () => {
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  progress.style.width = max > 0 ? (el.scrollTop / max) * 100 + "%" : "0%";
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Scrollspy — highlight the nav link of the section in view
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const spyTargets = navAnchors
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
spyTargets.forEach((t) => spy.observe(t));

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
