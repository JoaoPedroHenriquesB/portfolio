/**
 * Main initialization function.
 */
function init() {
  initSmoothScrolling();
  initScrollEffects();
  initIntersectionObserver();
  initTypewriterEffect();
  initSkillTagHover();
  initButtonRippleEffect();
  initThemeToggle();
  initMobileMenu();
  initBackToTopButton();
}

/**
 * Sets up smooth scrolling for anchor links.
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/**
 * Handles navbar styling and active link highlighting on scroll.
 */
function initScrollEffects() {
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  window.addEventListener("scroll", () => {
    // Navbar styling
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 70) {
        // Adjusted offset
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Sets up Intersection Observer for scroll-in animations.
 */
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".project-card, .contact-item")
    .forEach((element) => {
      observer.observe(element);
    });
}

/**
 * Initializes the typewriter effect on the hero title.
 */
function initTypewriterEffect() {
  const heroTitle = document.querySelector(".hero-content h1");
  if (!heroTitle) return;

  const originalText = heroTitle.textContent;
  heroTitle.innerHTML = ""; // Clear for typing
  let i = 0;

  function type() {
    if (i < originalText.length) {
      heroTitle.innerHTML += originalText.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 500);
}

/**
 * Adds hover effect to skill tags.
 */
function initSkillTagHover() {
  // This is now handled by CSS :hover pseudo-class for better performance and separation of concerns.
}

/**
 * Adds a ripple effect to buttons on click.
 */
function initButtonRippleEffect() {
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add("ripple");
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * Manages the light/dark theme toggle and persists the choice.
 */
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const savedTheme = localStorage.getItem("theme") || "dark";

  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "🌙" : "☀️";

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
    localStorage.setItem("theme", newTheme);
  });
}

/**
 * Initializes the mobile hamburger menu.
 */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/**
 * Manages the "Back to Top" button visibility and functionality.
 */
function initBackToTopButton() {
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    // Use classes for better separation of concerns
    window.scrollY > 300
      ? backToTopBtn.classList.add("show")
      : backToTopBtn.classList.remove("show");
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Run all initialization functions after the DOM is loaded.
document.addEventListener("DOMContentLoaded", init);
