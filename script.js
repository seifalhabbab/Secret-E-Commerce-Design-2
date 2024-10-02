'use strict';

// Add event on element

const addEventOnElement = (element, type, callback) => {
  if (element.length > 1) {
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener(type, callback);
    }
  } else {
    element.addEventListener(type, callback);
  }
};


// navbar toggle

const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navbar = document.querySelector('[data-navbar]');
const navbarLinks = document.querySelectorAll('[data-nav-link]')
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
};

addEventOnElement(navTogglers, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
};

addEventOnElement(navbarLinks, 'click', closeNavbar);

// Header Sticky  and back to top button activate

const header = document.querySelector("[data-header]");
const backToTopBtn = document.querySelector("[data-back-top-btn]");


const headerActive = function () {
  header.classList.add("active");
};

const headerInactive = function () {
  header.classList.remove("active");
};

const headerActivity = function () {
  if (window.scrollY > 150) {
    headerActive();
    navbar.classList.add("scroll");
    backToTopBtn.classList.add("active");
  } else {
    headerInactive();
    navbar.classList.remove("scroll");
    backToTopBtn.classList.remove("active");
  }
}

addEventOnElement(window, 'scroll', headerActivity);
// Header disappear on scroll down

let lastScrolledPos = 0;

const headerSticky = function () {
  const currentScrollPos = window.scrollY;
  if(currentScrollPos < lastScrolledPos) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }
  lastScrolledPos = currentScrollPos;
}

addEventOnElement(window, 'scroll', headerSticky)


// make a countdown
// Get the countdown element
const countdownElement = document.querySelector('.countdown');

// Get the individual time elements
const daysElement = countdownElement.querySelector('[aria-label="days"]');
const hoursElement = countdownElement.querySelector('[aria-label="hours"]');
const minutesElement = countdownElement.querySelector('[aria-label="minutes"]');
const secondsElement = countdownElement.querySelector('[aria-label="secondes"]');

// Set the countdown end date
const endDate = new Date('2024-10-07T23:59:59'); // Replace with your desired end date

// Update the countdown every second
setInterval(() => {
  const now = new Date();
  const timeLeft = endDate.getTime() - now.getTime();

  // Calculate the time left in days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update the time elements
  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}, 1000);

// Scroll Reveal

const sections = document.querySelectorAll('[data-section]');

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight) {
      sections[i].classList.add('active');
    }
  }
};
scrollReveal();

addEventOnElement(window, 'scroll', scrollReveal);

document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector(".landing .has-scrollbar");
  const items = document.querySelectorAll(".landing .scrollbar-item");
  const totalItems = items.length;
  let currentIndex = 0;

  // Function to switch to the next slide
  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalItems; // Update index
    const nextItem = items[currentIndex];
    const containerWidth = container.clientWidth;
    const itemOffsetLeft = nextItem.offsetLeft;

    // Smoothly scroll to the next item
    container.scrollTo({
      left: itemOffsetLeft - containerWidth / 2 + nextItem.clientWidth / 2,
      behavior: "smooth"
    });
  }

  // Auto-scroll every 5 seconds
  setInterval(showNextSlide, 5000);
});



document.addEventListener("DOMContentLoaded", function() {
  // Function to create a smooth slider for any given container
  function createSlider(container) {
    const items = container.querySelectorAll(".scrollbar-item");
    const totalItems = items.length;
    let currentIndex = 0;

    // Function to switch to the next slide
    function showNextSlide() {
      currentIndex = (currentIndex + 1) % totalItems; // Update index
      const nextItem = items[currentIndex];
      const containerWidth = container.clientWidth;
      const itemOffsetLeft = nextItem.offsetLeft;

      // Smoothly scroll to the next item
      container.scrollTo({
        left: itemOffsetLeft - containerWidth / 2 + nextItem.clientWidth / 2,
        behavior: "smooth"
      });
    }

    // Auto-scroll every 5 seconds
    setInterval(showNextSlide, 5000);
  }

  // Apply the smooth slider for the landing section
  const landingSection = document.querySelector(".landing .has-scrollbar");
  if (landingSection) {
    createSlider(landingSection);
  }

  // Apply the smooth slider for each shop section
  const shopSections = document.querySelectorAll(".shop .has-scrollbar");
  shopSections.forEach((section) => {
    createSlider(section);
  });
});