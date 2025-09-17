"use strict";

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

let timeout;
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelector(".company-list");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        clearTimeout(timeout);
        serviceCards.classList.add("visible");
      } else {
        timeout = setTimeout(() => {
          serviceCards.classList.remove("visible");
        }, 300);
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(serviceCards);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in, .case-item");
  animatedElements.forEach((el) => observer.observe(el));
});

// Universal Scroll Animation System
class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
      animateOnce: true,
      ...options,
    };

    this.observer = null;
    this.init();
  }

  init() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Stop observing if animateOnce is true
          if (this.options.animateOnce) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.options.animateOnce) {
          // Remove visible class if element is out of view and animateOnce is false
          entry.target.classList.remove("visible");
        }
      });
    }, this.options);

    // Start observing elements
    this.observe();
  }

  observe() {
    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => this.observer.observe(el));
  }

  // Method to add new elements dynamically
  addElement(element) {
    this.observer.observe(element);
  }

  // Method to refresh/re-observe all elements
  refresh() {
    this.observe();
  }

  // Method to destroy observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const scrollAnimations = new ScrollAnimations({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    animateOnce: false,
  });

  // Make it globally available for dynamic content
  window.scrollAnimations = scrollAnimations;
});

// Example of adding animations to dynamic content
function addDynamicContent() {
  const newElement = document.createElement("div");
  newElement.className = "scroll-animate fade-up";
  newElement.innerHTML = "<p>I was added dynamically!</p>";

  document.body.appendChild(newElement);
  window.scrollAnimations.addElement(newElement);
}

//Our Team
let allTeamVisible = false;

function showAllTeam() {
  const hiddenMembers = document.querySelectorAll(".hidden-mobile");
  const button = document.querySelector(".see-all-btn");

  if (!allTeamVisible) {
    hiddenMembers.forEach((member) => {
      member.classList.add("show");
    });
    button.textContent = "Show less";
    allTeamVisible = true;
  } else {
    hiddenMembers.forEach((member) => {
      member.classList.remove("show");
    });
    button.textContent = "See all team";
    allTeamVisible = false;
  }
}

// Reset visibility on window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    const hiddenMembers = document.querySelectorAll(".hidden-mobile");
    hiddenMembers.forEach((member) => {
      member.classList.remove("show");
    });
    allTeamVisible = false;
    document.querySelector(".see-all-btn").textContent = "See all team";
  }
});

//Testimonial
let currentSlide = 0;
const testimonialCards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showSlide(index) {
  // Hide all testimonials
  testimonialCards.forEach((card) => (card.style.display = "none"));

  // Show only one testimonial at a time
  if (testimonialCards[index]) {
    testimonialCards[index].style.display = "block";
  }

  // Update dots
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonialCards.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = currentSlide - 1;
  if (currentSlide < 0) {
    currentSlide = testimonialCards.length - 1;
  }
  showSlide(currentSlide);
}

// Event listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Handle window resize
window.addEventListener("resize", () => {
  showSlide(currentSlide);
});

// Initialize
showSlide(currentSlide);

// Auto-play functionality (optional)
setInterval(() => {
  nextSlide();
}, 5000);

// FAQ functionality
document.querySelectorAll(".process-question").forEach((question) => {
  question.addEventListener("click", function () {
    const faqItem = this.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".process-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});
