document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Config ---------- */
  const loop = true;
  const slideTransition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
  const resizeDebounceMs = 120;
  const barAnimationDelay = 600; // matches CSS animation timing

  /* ---------- Navbar toggle ---------- */
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.querySelector("nav");

  if (menuIcon && navMenu) {
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("bx-x");
      navMenu.classList.toggle("active");
    });
  }

  /* ---------- Section navigation with Bars animation ---------- */
  const navLinks = Array.from(document.querySelectorAll("nav a"));
  const sections = Array.from(document.querySelectorAll("section"));
  const barsBox = document.querySelector(".bars-box");

  function playBarsAnimation(callback) {
    if (!barsBox) {
      callback();
      return;
    }

    barsBox.classList.add("active");
    setTimeout(() => {
      barsBox.classList.remove("active");
      callback();
    }, barAnimationDelay);
  }

  function showSectionById(id) {
    const target = document.getElementById(id);
    if (!target) return;

    playBarsAnimation(() => {
      sections.forEach(s => s.classList.remove("active", "fade-in"));

      target.classList.add("active");
      requestAnimationFrame(() => target.classList.add("fade-in"));

      navLinks.forEach(a =>
        a.classList.toggle("active", a.getAttribute("href").substring(1) === id)
      );

      if (menuIcon) menuIcon.classList.remove("bx-x");
      if (navMenu) navMenu.classList.remove("active");
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      showSectionById(id);
    });
  });

  const initial = sections.find(s => s.classList.contains("active")) || sections[0];
  if (initial) requestAnimationFrame(() => initial.classList.add("fade-in"));

  /* ---------- Resume buttons ---------- */
  const resumeBtns = Array.from(document.querySelectorAll(".resume-btn"));
  const resumeDetails = Array.from(document.querySelectorAll(".resume-detail"));

  resumeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      resumeBtns.forEach(b => b.classList.remove("active"));
      resumeDetails.forEach(d => d.classList.remove("active", "fade-in"));

      btn.classList.add("active");
      const detail = resumeDetails[idx];
      if (detail) {
        detail.classList.add("active");
        requestAnimationFrame(() => detail.classList.add("fade-in"));
      }
    });
  });

  /* ---------- Portfolio carousel ---------- */
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  const imgSlide = document.querySelector(".img-slide");
  const slides = imgSlide ? Array.from(imgSlide.children) : [];
  const portfolioDetails = Array.from(document.querySelectorAll(".portfolio-detail"));

  if (imgSlide && slides.length > 0) {
    const pageCount = Math.min(slides.length, Math.max(1, portfolioDetails.length || slides.length));
    let currentIndex = 0;

    function getGapPx() {
      const cs = getComputedStyle(imgSlide);
      return parseFloat(cs.gap || cs.columnGap || "0px") || 0;
    }

    function getSlideWidthPx() {
      return slides[0] ? slides[0].getBoundingClientRect().width : 0;
    }

    function updateNavButtonsState() {
      if (!arrowLeft || !arrowRight) return;
      if (loop) {
        arrowLeft.classList.remove("disabled");
        arrowRight.classList.remove("disabled");
      } else {
        arrowLeft.classList.toggle("disabled", currentIndex === 0);
        arrowRight.classList.toggle("disabled", currentIndex === pageCount - 1);
      }
    }

    function updatePortfolio(animate = true) {
      const slideW = getSlideWidthPx();
      const gap = getGapPx();
      const offset = Math.round(currentIndex * (slideW + gap));

      imgSlide.style.transition = animate ? slideTransition : "none";
      imgSlide.style.transform = `translateX(-${offset}px)`;

      portfolioDetails.forEach((detail, i) => {
        const isActive = i === currentIndex;
        detail.classList.toggle("active", isActive);
        if (isActive) {
          detail.classList.add("fade-in");
          setTimeout(() => detail.classList.remove("fade-in"), 700);
        } else {
          detail.classList.remove("fade-in");
        }
      });

      updateNavButtonsState();
    }

    if (arrowRight) {
      arrowRight.addEventListener("click", () => {
        if (pageCount <= 1) return;
        if (loop) currentIndex = (currentIndex + 1) % pageCount;
        else currentIndex = Math.min(pageCount - 1, currentIndex + 1);
        updatePortfolio(true);
      });
    }

    if (arrowLeft) {
      arrowLeft.addEventListener("click", () => {
        if (pageCount <= 1) return;
        if (loop) currentIndex = (currentIndex - 1 + pageCount) % pageCount;
        else currentIndex = Math.max(0, currentIndex - 1);
        updatePortfolio(true);
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (pageCount <= 1) return;
        if (loop) currentIndex = (currentIndex + 1) % pageCount;
        else currentIndex = Math.min(pageCount - 1, currentIndex + 1);
        updatePortfolio(true);
      } else if (e.key === "ArrowLeft") {
        if (pageCount <= 1) return;
        if (loop) currentIndex = (currentIndex - 1 + pageCount) % pageCount;
        else currentIndex = Math.max(0, currentIndex - 1);
        updatePortfolio(true);
      }
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => updatePortfolio(false), resizeDebounceMs);
    });

    imgSlide.style.willChange = "transform";
    updatePortfolio(false);
  } else if (portfolioDetails.length) {
    portfolioDetails.forEach((d, i) => d.classList.toggle("active", i === 0));
  }

  /* ---------- Contact form submission ---------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      try {
        const response = await fetch("https://portfolio-website-0qy9.onrender.com/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, subject, message })
        });

        const data = await response.json();
        if (data.success) {
          alert("✅ Message sent successfully!");
          contactForm.reset();
        } else {
          alert("❌ Failed to send message.");
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Error sending message.");
      }
    });
  }
});   // 👈 important closing line
















