/* =================================================================
   IFCAR SOLUTIONS — Proposition 4 — interactions
   ================================================================= */
(function () {
  "use strict";

  /* ---- Header: shrink + hide on scroll-down / show on scroll-up ---- */
  const header = document.querySelector(".site-header");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("scrolled", y > 12);
      const menuOpen = document.body.classList.contains("nav-open");
      if (!menuOpen && y > 260 && y > lastY + 6) header.classList.add("nav-hidden");
      else if (y < lastY - 6 || y < 260) header.classList.remove("nav-hidden");
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile full-screen nav ---- */
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  const setMobile = (open) => {
    if (!mobileNav || !burger) return;
    mobileNav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (burger && mobileNav) {
    burger.addEventListener("click", () =>
      setMobile(burger.getAttribute("aria-expanded") !== "true")
    );
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setMobile(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobile(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) setMobile(false);
    });
  }

  /* ---- Active link highlighting ---- */
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-page]").forEach((a) => {
    if (a.getAttribute("data-page") === page) a.classList.add("active");
  });

  /* ---- Content accordions (service pages) ---- */
  document.querySelectorAll(".accordion").forEach((acc) => {
    const single = acc.dataset.single === "true";
    acc.querySelectorAll(".acc-item").forEach((item) => {
      const head = item.querySelector(".acc-head");
      const body = item.querySelector(".acc-body");
      if (!head || !body) return;
      if (item.classList.contains("open")) body.style.maxHeight = body.scrollHeight + "px";
      head.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        if (single) {
          acc.querySelectorAll(".acc-item.open").forEach((o) => {
            o.classList.remove("open");
            o.querySelector(".acc-body").style.maxHeight = null;
          });
        }
        if (isOpen) {
          item.classList.remove("open");
          body.style.maxHeight = null;
        } else {
          item.classList.add("open");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });
  });
  window.addEventListener("resize", () => {
    document.querySelectorAll(".acc-item.open .acc-body").forEach((b) => {
      b.style.maxHeight = b.scrollHeight + "px";
    });
  });

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1500;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent =
          (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            co.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => co.observe(c));
  }

  /* ---- Forms (demo handler — connect to backend / Formspree later) ---- */
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      if (msg) {
        msg.textContent =
          "✓ Merci ! Votre demande a bien été enregistrée. Notre équipe vous recontactera sous 24 h ouvrées.";
        msg.classList.add("ok");
        msg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });

  /* ---- Footer year ---- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
