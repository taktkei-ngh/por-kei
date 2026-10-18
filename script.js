/* =========================================
   KEII PORTFOLIO — INTERACTIONS & LOGIC
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Current Year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation
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
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navItems.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // 3. Reveal Elements on Scroll
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
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // 4. Active Navigation Indicator Based on Visible Section
  const observedSections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #contact"
  );

  if ("IntersectionObserver" in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navItems.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${sectionId}`;
            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    observedSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 5. Interactive Keyboard Skills
  const keyboard = document.getElementById("skillKeyboard");
  const keys = document.querySelectorAll(".key[data-skill]");

  const skillData = {
    html: {
      title: "HTML",
      category: "FRONTEND",
      icon: "</>",
      description: "Learning how to structure web pages with semantic HTML and accessible markup.",
      status: "Learning",
      index: "01"
    },
    css: {
      title: "CSS",
      category: "FRONTEND",
      icon: "✳",
      description: "Exploring layouts, responsive design, typography, transitions and visual details.",
      status: "Learning",
      index: "02"
    },
    javascript: {
      title: "JavaScript",
      category: "PROGRAMMING",
      icon: "JS",
      description: "Practising programming logic and using JavaScript to make web interfaces interactive.",
      status: "Learning",
      index: "03"
    },
    python: {
      title: "Python",
      category: "PROGRAMMING",
      icon: "Py",
      description: "Building programming fundamentals and learning to solve problems with Python.",
      status: "Exploring",
      index: "04"
    },
    sql: {
      title: "SQL",
      category: "DATABASE",
      icon: "▦",
      description: "Learning how to query, organise and manage structured data in relational databases.",
      status: "Learning",
      index: "05"
    },
    git: {
      title: "Git",
      category: "DEVELOPER TOOLS",
      icon: "⌘",
      description: "Practising version control to track changes and manage code more confidently.",
      status: "Learning",
      index: "06"
    },
    frontend: {
      title: "Frontend",
      category: "WEB DEVELOPMENT",
      icon: "▤",
      description: "Working towards building clean, responsive user interfaces with modern web technologies.",
      status: "In progress",
      index: "07"
    },
    backend: {
      title: "Backend",
      category: "SOFTWARE DEVELOPMENT",
      icon: "{ }",
      description: "Exploring server-side programming, APIs and the logic that powers applications.",
      status: "Exploring",
      index: "08"
    },
    github: {
      title: "GitHub",
      category: "COLLABORATION",
      icon: "GH",
      description: "Using GitHub to publish code, manage repositories and document learning projects.",
      status: "Learning",
      index: "09"
    },
    debugging: {
      title: "Debugging",
      category: "PROBLEM SOLVING",
      icon: "⌕",
      description: "Learning to read errors, investigate unexpected behaviour and fix problems step by step.",
      status: "Practising",
      index: "10"
    },
    learning: {
      title: "Continuous learning",
      category: "MY APPROACH",
      icon: "↗",
      description: "Breaking large goals into smaller tasks, practising regularly and improving through feedback.",
      status: "Always on",
      index: "11"
    },
    about: {
      title: "Keep learning.",
      category: "MY JOURNEY",
      icon: "✳",
      description: "Every skill starts with curiosity. I'm building my foundation one step at a time.",
      status: "In progress",
      index: "00"
    },
    future: {
      title: "What's next?",
      category: "FUTURE GOALS",
      icon: "↗",
      description: "My next steps are stronger fundamentals, more practical projects and a gradual path towards full-stack development.",
      status: "Planned",
      index: "12"
    }
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
      const progress =
        key === "about"
          ? "28%"
          : key === "future"
          ? "18%"
          : key === "learning"
          ? "65%"
          : "42%";

      detailLine.style.width = progress;
    }
  }

  keys.forEach((button) => {
    button.addEventListener("click", () => {
      selectSkill(button.dataset.skill);
    });
  });

  if (keyboard) {
    keyboard.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) {
        return;
      }

      const availableKeys = Array.from(keys);
      const currentIndex = availableKeys.indexOf(document.activeElement);

      if (currentIndex < 0) return;

      event.preventDefault();

      const goingBack = event.key === "ArrowLeft" || event.key === "ArrowUp";
      const nextIndex = goingBack
        ? (currentIndex - 1 + availableKeys.length) % availableKeys.length
        : (currentIndex + 1) % availableKeys.length;

      availableKeys[nextIndex].focus();
      selectSkill(availableKeys[nextIndex].dataset.skill);
    });
  }

  // 6. Perspective Effect on Keyboard
  const keyboardStage = document.querySelector(".keyboard-stage");

  if (
    keyboard &&
    keyboardStage &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    keyboardStage.addEventListener("pointermove", (event) => {
      const bounds = keyboardStage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      const rotateY = (x - 0.5) * 3;
      const rotateX = (0.5 - y) * 2;

      keyboard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    keyboardStage.addEventListener("pointerleave", () => {
      keyboard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // 7. Technology Roadmap Filters
  const filterButtons = document.querySelectorAll("[data-roadmap-filter]");
  const roadmapCards = document.querySelectorAll(".roadmap-card[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.roadmapFilter;

      filterButtons.forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("is-active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });

      roadmapCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const isNote = card.classList.contains("roadmap-note");
        const matches =
          selectedCategory === "all" ||
          cardCategory === selectedCategory ||
          isNote;

        card.classList.toggle("is-filtered-out", !matches);
      });
    });
  });

  // 8. Profile Card Motion
  const orbitScene = document.getElementById("orbitScene");
  const profileCard = document.getElementById("profileCard");

  if (
    orbitScene &&
    profileCard &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    orbitScene.addEventListener("pointermove", (event) => {
      const bounds = orbitScene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 5;

      profileCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    orbitScene.addEventListener("pointerleave", () => {
      profileCard.style.transform = "";
    });
  }

  // 9. Avatar Switch Effect (Blur Animation)
  const avatar = document.getElementById("keiiAvatar");
  if (avatar) {
    const firstImage = "images/keii-avatar.jpg";
    const secondImage = "images/keii-avatar2.jpg";

    let active = false;
    let showingSecond = false;
    let timer = null;

    // Preload ảnh thứ 2 sẵn vào bộ nhớ đệm
    const preload = new Image();
    preload.src = secondImage;

    function swapImageWithBlur() {
      // 1. Thêm class blur hình ảnh
      avatar.classList.add("is-blurring");

      // 2. Chờ 150ms khi ảnh mờ đi thì mới tráo ảnh
      setTimeout(() => {
        showingSecond = !showingSecond;
        avatar.src = showingSecond ? secondImage : firstImage;

        // 3. Bỏ class blur để ảnh rõ nét trở lại
        setTimeout(() => {
          avatar.classList.remove("is-blurring");
        }, 50);
      }, 150);
    }

    function startEffect() {
      if (active) return;
      active = true;
      swapImageWithBlur();

      // Chuyển đổi định kỳ mỗi 1.2 giây khi di chuột vào
      timer = setInterval(swapImageWithBlur, 1200);
    }

    function stopEffect() {
      active = false;
      clearInterval(timer);
      timer = null;
      showingSecond = false;
      avatar.classList.remove("is-blurring");
      avatar.src = firstImage;
    }

    avatar.addEventListener("mouseenter", startEffect);
    avatar.addEventListener("mouseleave", stopEffect);

    avatar.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        if (active) {
          stopEffect();
        } else {
          startEffect();
        }
      },
      { passive: false }
    );
  }
  // 10. Background Music Player
  const music = document.getElementById("backgroundMusic");
  const toggle = document.getElementById("musicToggle");
  const mute = document.getElementById("musicMute");
  const progress = document.getElementById("musicProgress");

  if (music) {
    music.volume = 0.25;

    music.addEventListener(
      "loadedmetadata",
      () => {
        music.currentTime = 180; // Bắt đầu từ phút thứ 3
      },
      { once: true }
    );

    music.addEventListener("ended", () => {
      music.currentTime = 180;
      music.play().catch(() => {});
      if (toggle) toggle.textContent = "▶";
      if (progress) progress.value = 0;
    });

    music.play().catch(() => {
      // Autoplay bị chặn bởi trình duyệt
    });

    if (progress) {
      music.addEventListener("timeupdate", () => {
        if (Number.isFinite(music.duration) && music.duration > 0) {
          progress.value = (music.currentTime / music.duration) * 100;
        }
      });

      progress.addEventListener("input", () => {
        if (Number.isFinite(music.duration) && music.duration > 0) {
          music.currentTime = (Number(progress.value) / 100) * music.duration;
        }
      });
    }

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
        mute.setAttribute(
          "aria-label",
          music.muted ? "Unmute music" : "Mute music"
        );
      });
    }
  }

  // 11. Light / Dark Mode Toggle & Toast
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
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  // 12. Contact Form Submission via Web3Forms
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const formSubmitBtn = document.getElementById("formSubmitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (formStatus) {
        formStatus.textContent = "Sending...";
        formStatus.className = "copy-feedback";
      }
      if (formSubmitBtn) formSubmitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
            formStatus.className = "copy-feedback success";
          }
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        if (formStatus) {
          formStatus.textContent = "✕ Failed to send. Please try again or email directly.";
          formStatus.className = "copy-feedback error";
        }
      } finally {
        if (formSubmitBtn) formSubmitBtn.disabled = false;
      }
    });
  }
});