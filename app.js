const steps = document.querySelectorAll(".step");
const progress = document.getElementById("progress");
const caption = document.getElementById("stageCaption");
const tables = document.querySelectorAll(".tbl");

const captions = {
  0: "Four parcels on one plan",
  1: "Four Vicmap products · what we use",
  2: "V_PARCEL_MP · 4 rows for PS838178",
  3: "Count distinct private lots → 3",
  4: "LGA_CODE 303 = Banyule City Council",
  5: "PARCEL_PFI → PROPERTY_PFI (8 links)",
  6: "PROPERTY_PFI → five addresses",
  7: "Prefer 1/6 over ALFREDA AVENUE",
  8: "Centroid within GRZ",
  9: "One headline row",
  10: "Victorian totals · what we can answer",
  11: "Same path · 45,057 plans",
};

const srcOn = {
  0: [],
  1: ["parcel", "lga", "bridge", "addr", "zone"],
  2: ["parcel"],
  3: ["parcel"],
  4: ["parcel", "lga"],
  5: ["parcel", "bridge"],
  6: ["parcel", "bridge", "addr"],
  7: ["bridge", "addr"],
  8: ["parcel", "zone"],
  9: ["parcel", "lga", "bridge", "addr", "zone"],
  10: ["parcel", "lga", "bridge", "addr", "zone"],
  11: ["parcel", "lga", "bridge", "addr", "zone"],
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const step = Number(entry.target.dataset.step);
      document.body.dataset.active = String(step);
      caption.textContent = captions[step] || "";
      const on = new Set(srcOn[step] || []);
      tables.forEach((el) => {
        el.classList.toggle("on", on.has(el.dataset.src));
      });
    });
  },
  { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
);

steps.forEach((step) => io.observe(step));

window.addEventListener(
  "scroll",
  () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${pct}%`;
  },
  { passive: true }
);
