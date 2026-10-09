document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = document.querySelector(".lightbox-close");

  if (lightbox && lightboxImage) {
    const items = document.querySelectorAll("[data-lightbox]");

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
      document.body.style.overflow = "";
    };

    items.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();

        const image = item.querySelector("img");
        const caption = item.dataset.caption || "";

        if (!image) return;

        lightboxImage.src = item.href;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = caption;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
});


/* Interactive layer for the dark technical identity */
document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  const canvas = document.getElementById("network-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(52, Math.max(20, Math.floor((width * height) / 30000)));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: (index * 71) % Math.max(width, 1),
        y: (index * 113) % Math.max(height, 1),
        vx: (index % 2 ? 0.08 : -0.08) * (0.7 + (index % 5) * 0.08),
        vy: (index % 3 ? 0.06 : -0.05) * (0.7 + (index % 4) * 0.1),
        r: 1.2 + (index % 3) * 0.45
      }));
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.18;
            ctx.strokeStyle = "rgba(75, 142, 216, " + alpha + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = "rgba(100, 174, 236, 0.32)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
    }
  }
});
