(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function initProgress() {
    const bar = document.querySelector(".scroll-progress span");
    if (!bar) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initReveals() {
    const revealItems = qsa(".reveal");
    const stencilItems = qsa(".font-stencil-word, .font-stencil-kicker");
    const valueChains = qsa(".value-chain");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("active"));
      valueChains.forEach((chain) => chain.classList.add("animated"));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-in");
        textObserver.unobserve(entry.target);
      });
    }, { threshold: 0.22 });

    stencilItems.forEach((item) => {
      item.classList.add("motion-pending");
      textObserver.observe(item);
    });

    const chainObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("animated");
        chainObserver.unobserve(entry.target);
      });
    }, { threshold: 0.28 });

    valueChains.forEach((chain) => chainObserver.observe(chain));
  }

  function initCounters() {
    const counters = qsa(".stat-number");
    if (!counters.length) return;

    const runCounter = (counter) => {
      const target = Number(counter.dataset.target || 0);
      if (!target) return;

      if (reducedMotion) {
        counter.textContent = String(target);
        return;
      }

      const start = performance.now();
      const duration = 1200;

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    counters.forEach((counter) => observer.observe(counter));
  }

  function initButtons() {
    qsa(".btn-ripple").forEach((button) => {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        button.style.setProperty("--y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    });
  }

  function initAnchorScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const selector = anchor.getAttribute("href");
        const target = selector && selector.length > 1 ? document.querySelector(selector) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  function init() {
    initProgress();
    initReveals();
    initCounters();
    initButtons();
    initAnchorScroll();
  }

  window.BusinessWave = {
    qsa,
    reducedMotion,
    ready(callback) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback);
      } else {
        callback();
      }
    }
  };

  window.BusinessWave.ready(init);
})();
