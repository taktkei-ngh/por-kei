
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let lenis;

if (!reduceMotion) {
  // Smooth scrolling
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Hero entrance: animate specific groups, not every nested element
  const intro = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.12,
  });

  intro
    .from(".availability", {
      y: 18,
      opacity: 0,
      duration: 0.65,
    })
    .from(".hero-copy > .eyebrow", {
      y: 18,
      opacity: 0,
      duration: 0.6,
    }, "-=0.38")
    .from(".hero h1", {
      y: 35,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.9,
      clearProps: "filter",
    }, "-=0.35")
    .from(".hero-role, .hero-description", {
      y: 20,
      opacity: 0,
      duration: 0.65,
      stagger: 0.12,
    }, "-=0.45")
    .from(".hero-actions .button", {
      y: 15,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1,
    }, "-=0.35")
    .from(".hero-socials", {
      y: 12,
      opacity: 0,
      duration: 0.5,
    }, "-=0.25")
    .from(".hero-visual", {
      x: 25,
      opacity: 0,
      duration: 1,
    }, 0.15);

  // Section headings reveal on scroll
  gsap.utils.toArray(".section-heading").forEach((heading) => {
    gsap.from(heading.children, {
      y: 25,
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 82%",
        once: true,
      },
    });
  });

  // Cards and content reveal in small groups
  gsap.utils.toArray(
    ".about-panel, .detail-card, .quote-card, .project-card, .skills-panel, .learning-panel, .contact-box, .projects-note"
  ).forEach((element, index) => {
    gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: (index % 3) * 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
    });
  });

  // Skill list stagger
  gsap.from(".skill-item", {
    x: -18,
    opacity: 0,
    duration: 0.55,
    stagger: 0.09,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".skill-list",
      start: "top 85%",
      once: true,
    },
  });

  // Gentle floating image movement
  const portrait = document.querySelector(".avatar-frame img");

  if (portrait) {
    gsap.to(portrait, {
      y: -5,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Floating chips
  gsap.utils.toArray(".floating-chip").forEach((chip, index) => {
    gsap.to(chip, {
      y: index === 0 ? -8 : 8,
      duration: 2.5 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // 3D tilt for cards, only on devices with a precise pointer
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const tiltCards = document.querySelectorAll(
      ".project-card, .detail-card, .skills-panel, .learning-panel"
    );

    tiltCards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        gsap.to(card, {
          rotateY: (x - 0.5) * 4,
          rotateX: (0.5 - y) * 4,
          transformPerspective: 1000,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });

        card.style.setProperty("--mouse-x", `${x * 100}%`);
        card.style.setProperty("--mouse-y", `${y * 100}%`);
      });

      card.addEventListener("pointerleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.55,
          ease: "power3.out",
          overwrite: true,
        });
      });
    });

    // Magnetic buttons
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - rect.left - rect.width / 2;
        const dy = event.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: dx * 0.08,
          y: dy * 0.08,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });
      });

      button.addEventListener("pointerleave", () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.5)",
          overwrite: true,
        });
      });
    });
  }

  // Ambient glow parallax
  const glows = document.querySelectorAll(".page-glow");

  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    gsap.to(glows, {
      x,
      y,
      duration: 1.5,
      ease: "power2.out",
      overwrite: true,
    });
  }, { passive: true });

  // Animate the contact orb very subtly
  gsap.to(".contact-orb", {
    scale: 1.12,
    duration: 4,
    repeat: -1,
    yoyo: true,
    stagger: 1,
    ease: "sine.inOut",
  });

  // Keep scroll triggers aligned after fonts/images settle
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}
