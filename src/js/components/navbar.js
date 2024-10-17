import '../../css/components/_navbar.scss'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let dropdowns = document.querySelectorAll('.nav__menu__dropdown');
let overlay = document.querySelector('.nav__overlay');

// Define event handler functions for click, mouseenter, and mouseleave
function handleDropdownClick(e) {
  const currentDropdown = e.currentTarget;

  if (currentDropdown.classList.contains('dropdown-open')) {
    currentDropdown.classList.remove('dropdown-open');
    overlay.classList.remove('active-overlay');
  } else {
    overlay.classList.add('active-overlay');

    let openNavbars = document.querySelectorAll('.dropdown-open');
    if (openNavbars.length > 0) {
      openNavbars.forEach(el => {
        el.classList.remove('dropdown-open');
      });
      setTimeout(() => {
        currentDropdown.classList.add('dropdown-open');
      }, 300);
    } else {
      currentDropdown.classList.add('dropdown-open');
    }
  }
}

function handleMouseEnter(e) {
  e.currentTarget.classList.add('dropdown-open');
  overlay.classList.add('active-overlay');
}

function handleMouseLeave(e) {
  e.currentTarget.classList.remove('dropdown-open');
  overlay.classList.remove('active-overlay');
}

// Add and remove event listeners based on screen size
function handleEvents() {
  if (window.innerWidth <= 991) {
    // Remove mouseenter/mouseleave listeners if present
    dropdowns.forEach(dropdown => {
      dropdown.removeEventListener('mouseenter', handleMouseEnter);
      dropdown.removeEventListener('mouseleave', handleMouseLeave);
    });

    // Add click listeners
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', handleDropdownClick);
    });

    overlay.addEventListener('click', () => {
      overlay.classList.remove('active-overlay');
      let openNavbars = document.querySelectorAll('.dropdown-open');
      openNavbars.forEach(el => {
        el.classList.remove('dropdown-open');
      });
    });
  } else {
    // Remove click listeners if present
    dropdowns.forEach(dropdown => {
      dropdown.removeEventListener('click', handleDropdownClick);
    });

    // Add mouseenter/mouseleave listeners
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', handleMouseEnter);
      dropdown.addEventListener('mouseleave', handleMouseLeave);
    });
  }
}

// Initialize the proper event listeners based on the current screen size
handleEvents();

// Reinitialize on window resize
window.addEventListener('resize', handleEvents);



/****************************************
 disable scroll when the main menu is open
*******************************************/

const navigationButton = document.getElementById("w-nav-button");
navigationButton.addEventListener('click', function (event) {
  let areaExpanded = navigationButton.getAttribute("aria-expanded")


  if (areaExpanded === 'false') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction= "none";
  } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction= "auto";
  }
 });


/****************************************
 Peekaboo navigation on scroll
*******************************************/
let lastScrollTop = 0;
const menu = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add or remove the "navbar-scrolled" class when scrolled more than 100px
  if (scrollTop > 100) {
    menu.classList.add('navbar-scrolled');
  } else {
    menu.classList.remove('navbar-scrolled');
  }
  
  // If scrolling down and scrolled more than 100px
  if (scrollTop > 100 && scrollTop > lastScrollTop) {
    // Scroll down - hide menu
    gsap.to(menu, { y: '-100%', duration: 0.3, ease: 'power2.out' });
  } else {
    // Scroll up or back to the top - show menu
    gsap.to(menu, { y: '0%', duration: 0.3, ease: 'power2.out' });
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
});