/* =========================================
   KEII PORTFOLIO — INTERACTIONS & LOGIC
   ========================================= */

// 1. LIGHT / DARK THEME TOGGLE & TOAST
(function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");
  const themeToast = document.getElementById("themeToast");

  function showToast(message) {
    if (!themeToast) return;
    themeToast.textContent = message;
    themeToast.classList.add("show");
    setTimeout(() => themeToast.classList.remove("show"), 2500);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("keii-theme", theme);

    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  }

  const savedTheme = localStorage.getItem("keii-theme") || "dark";
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }
})();

// 2. THREE.JS 3D BACKGROUND & VIDEO DUST OVERLAY
(function init3DAndVideo() {
  function startEffects() {
    // A. Phát Video Dust Overlay
    const video = document.getElementById("videoOverlay");
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        document.addEventListener("click", () => video.play(), { once: true });
      });
    }

    // B. Khởi tạo Three.js Canvas 3D
    const canvas = document.getElementById("bg3d");
    if (!canvas || typeof THREE === "undefined") return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Tạo 900 hạt sao 3D màu xanh neon
      const count = 900;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 16;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x64ffda,
        transparent: true,
        opacity: 0.85
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 3;

      let mouseX = 0, mouseY = 0;
      window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      });

      function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    } catch (err) {
      console.warn("3D Background Error:", err);
    }
  }

  if (document.readyState === "complete") {
    startEffects();
  } else {
    window.addEventListener("load", startEffects);
  }
})();

// 3. UI INTERACTIONS (DOM LOADED)
document.addEventListener("DOMContentLoaded", () => {
  // Current Year
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Mobile Navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navItems.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  // Scroll Reveal Elements
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Interactive Keyboard Skills
  const keyboard = document.getElementById("skillKeyboard");
  const keys = document.querySelectorAll(".key[data-skill]");

  const skillData = {
    html: { title: "HTML", category: "FRONTEND", icon: "</>", description: "Learning how to structure web pages with semantic HTML.", status: "Learning", index: "01" },
    css: { title: "CSS", category: "FRONTEND", icon: "✳", description: "Exploring layouts, responsive design, transitions and details.", status: "Learning", index: "02" },
    javascript: { title: "JavaScript", category: "PROGRAMMING", icon: "JS", description: "Practising programming logic and web interactivity.", status: "Learning", index: "03" },
    python: { title: "Python", category: "PROGRAMMING", icon: "Py", description: "Building fundamentals and learning problem solving.", status: "Exploring", index: "04" },
    sql: { title: "SQL", category: "DATABASE", icon: "▦", description: "Learning how to query and manage relational data.", status: "Learning", index: "05" },
    git: { title: "Git", category: "DEVELOPER TOOLS", icon: "⌘", description: "Practising version control to track changes confidently.", status: "Learning", index: "06" },
    frontend: { title: "Frontend", category: "WEB DEVELOPMENT", icon: "▤", description: "Working towards clean user interfaces with modern tech.", status: "In progress", index: "07" },
    backend: { title: "Backend", category: "SOFTWARE DEVELOPMENT", icon: "{ }", description: "Exploring server-side programming and APIs.", status: "Exploring", index: "08" },
    github: { title: "GitHub", category: "COLLABORATION", icon: "GH", description: "Publishing code and documenting learning projects.", status: "Learning", index: "09" },
    debugging: { title: "Debugging", category: "PROBLEM SOLVING", icon: "⌕", description: "Investigating errors and fixing problems step by step.", status: "Practising", index: "10" },
    learning: { title: "Continuous learning", category: "MY APPROACH", icon: "↗", description: "Practising regularly and improving through feedback.", status: "Always on", index: "11" },
    about: { title: "Keep learning.", category: "MY JOURNEY", icon: "✳", description: "Building foundation one step at a time.", status: "In progress", index: "00" },
    future: { title: "What's next?", category: "FUTURE GOALS", icon: "↗", description: "Stronger fundamentals and practical projects.", status: "Planned", index: "12" }
  };

  const skillIcon = document.getElementById("skillIcon");
  const skillCategory = document.getElementById("skillCategory");
  const skillTitle = document.getElementById("skillTitle");
  const skillDescription = document.getElementById("skillDescription");
  const skillStatus = document.getElementById("skillStatus");
  const skillIndex = document.getElementById("skillIndex");
  const detailLine = document.querySelector(".detail-line span");

  function selectSkill(key) {
    const skill = skillData[key];
    if (!skill) return;

    keys.forEach((button) => {
      const isActive = button.dataset.skill === key;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (skillIcon) skillIcon.textContent = skill.icon;
    if (skillCategory) skillCategory.textContent = skill.category;
    if (skillTitle) skillTitle.textContent = skill.title;
    if (skillDescription) skillDescription.textContent = skill.description;
    if (skillStatus) skillStatus.textContent = skill.status;
    if (skillIndex) skillIndex.textContent = skill.index;

    if (detailLine) {
      detailLine.style.width = key === "about" ? "28%" : key === "future" ? "18%" : key === "learning" ? "65%" : "42%";
    }
  }

  keys.forEach((button) => button.addEventListener("click", () => selectSkill(button.dataset.skill)));

  // Roadmap Filters
  const filterButtons = document.querySelectorAll("[data-roadmap-filter]");
  const roadmapCards = document.querySelectorAll(".roadmap-card[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.roadmapFilter;
      filterButtons.forEach((f) => f.classList.toggle("is-active", f === button));
      roadmapCards.forEach((card) => {
        const matches = selectedCategory === "all" || card.dataset.category === selectedCategory || card.classList.contains("roadmap-note");
        card.classList.toggle("is-filtered-out", !matches);
      });
    });
  });

  // Avatar Switch Effect
  const avatar = document.getElementById("keiiAvatar");
  if (avatar) {
    const firstImage = "images/keii-avatar.jpg";
    const secondImage = "images/keii-avatar2.jpg";

    avatar.addEventListener("mouseenter", () => {
      avatar.classList.add("is-blurring");
      setTimeout(() => {
        avatar.src = secondImage;
        avatar.classList.remove("is-blurring");
      }, 150);
    });

    avatar.addEventListener("mouseleave", () => {
      avatar.classList.add("is-blurring");
      setTimeout(() => {
        avatar.src = firstImage;
        avatar.classList.remove("is-blurring");
      }, 150);
    });
  }

  // Background Music Player
  const music = document.getElementById("backgroundMusic");
  const toggle = document.getElementById("musicToggle");
  const mute = document.getElementById("musicMute");
  const progress = document.getElementById("musicProgress");

  if (music) {
    music.volume = 0.25;
    if (toggle) {
      toggle.addEventListener("click", () => {
        if (music.paused) {
          music.play();
          toggle.textContent = "⏸";
        } else {
          music.pause();
          toggle.textContent = "▶";
        }
      });
    }
    if (mute) {
      mute.addEventListener("click", () => {
        music.muted = !music.muted;
        mute.textContent = music.muted ? "×" : "♪";
      });
    }
    if (progress) {
      music.addEventListener("timeupdate", () => {
        if (music.duration) progress.value = (music.currentTime / music.duration) * 100;
      });
      progress.addEventListener("input", () => {
        if (music.duration) music.currentTime = (progress.value / 100) * music.duration;
      });
    }
  }

  // Contact Form Submission (Web3Forms)
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const formSubmitBtn = document.getElementById("formSubmitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (formStatus) formStatus.textContent = "Sending...";
      if (formSubmitBtn) formSubmitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.textContent = "✓ Message sent successfully!";
            formStatus.className = "copy-feedback success";
          }
          contactForm.reset();
        } else {
          throw new Error("Failed");
        }
      } catch (err) {
        if (formStatus) {
          formStatus.textContent = "✕ Failed to send. Please try again.";
          formStatus.className = "copy-feedback error";
        }
      } finally {
        if (formSubmitBtn) formSubmitBtn.disabled = false;
      }
    });
  }
});