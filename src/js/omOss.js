import '../css/om-oss.scss'

import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css';

//////////////////////////////
// PHARMACY SLIDER
//////////////////////////////

const pharmacySwiper = new Swiper('.oss-pharmacy__slider', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  loop: true,
});

//////////////////////////////
// HISTORY SLIDER (prev/next arrows, no year tabs)
//////////////////////////////

function initHistorySlider() {
  const slider = document.querySelector('.oss-history__slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.oss-history__slider__content'));
  const prevBtn = slider.querySelector('.oss-history__slider-prev');
  const nextBtn = slider.querySelector('.oss-history__slider-next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function render() {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.style.display = isActive ? 'grid' : 'none';
      slide.style.opacity = isActive ? '1' : '0';
    });
    prevBtn.classList.toggle('swiper-button-disabled', index === 0);
    nextBtn.classList.toggle('swiper-button-disabled', index === slides.length - 1);
  }

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      render();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (index < slides.length - 1) {
      index++;
      render();
    }
  });

  render();
}

initHistorySlider();

//////////////////////////////
// PEOPLE — sort by category order, then order number, with pagination + filters
//////////////////////////////

const itemsPerPage = 12;
let currentPage = 1;
let currentCategory = '';

const peopleList = document.querySelectorAll('.oss-people__block');
const peopleArray = Array.from(peopleList);
const buttonFilters = document.querySelectorAll('.button-filter');

const categoryOrder = Array.from(
  document.querySelectorAll('.oss-people__categories__wrapper .w-dyn-item .button-filter')
).map((button) => button.innerText.toLowerCase());

function scrollToGrid() {
  const grid = document.querySelector('.oss-people__grid');
  if (grid) {
    const offset = 100;
    const top = grid.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function sortPeopleArray(arr) {
  return arr.sort((a, b) => {
    const categoryA = a.querySelector('.hidden-category').innerText.toLowerCase();
    const categoryB = b.querySelector('.hidden-category').innerText.toLowerCase();
    const orderA = parseInt(a.querySelector('.hidden-order').innerText, 10);
    const orderB = parseInt(b.querySelector('.hidden-order').innerText, 10);

    const categoryIndexA = categoryOrder.indexOf(categoryA);
    const categoryIndexB = categoryOrder.indexOf(categoryB);

    if (categoryIndexA < categoryIndexB) return -1;
    if (categoryIndexA > categoryIndexB) return 1;

    return orderA - orderB;
  });
}

const sortedPeopleArray = sortPeopleArray(peopleArray);
const listContainer = document.querySelector('.oss-people__grid');

function showPage(page, category = '') {
  const tempContainer = document.createDocumentFragment();

  let filteredArray = sortedPeopleArray;

  if (category) {
    filteredArray = sortedPeopleArray.filter((person) => {
      const personCategory = person.querySelector('.hidden-category').innerText.toLowerCase();
      return personCategory === category.toLowerCase();
    });
  }

  const totalItems = filteredArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  filteredArray.slice(startIndex, endIndex).forEach((item) => {
    tempContainer.appendChild(item);
  });

  listContainer.innerHTML = '';
  listContainer.appendChild(tempContainer);

  updatePaginationControls(totalPages);
}

function updatePaginationControls(totalPages) {
  const paginationContainer = document.querySelector('.pagination-controls');
  if (paginationContainer) paginationContainer.remove();

  const newPaginationContainer = document.createElement('div');
  newPaginationContainer.classList.add('pagination-controls');

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.classList.add('pagination-button');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      currentPage = i;
      showPage(currentPage, currentCategory);
      scrollToGrid();
    });

    newPaginationContainer.appendChild(pageButton);
  }

  listContainer.after(newPaginationContainer);
}

buttonFilters.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active-category-filter')) {
      buttonFilters.forEach((btn) => btn.classList.remove('active-category-filter'));
      currentCategory = '';
      currentPage = 1;
      showPage(1);
      scrollToGrid();
    } else {
      buttonFilters.forEach((btn) => btn.classList.remove('active-category-filter'));
      button.classList.add('active-category-filter');

      currentCategory = button.innerText.trim();

      currentPage = 1;
      showPage(currentPage, currentCategory);
      scrollToGrid();
    }
  });
});

function resetFilters() {
  buttonFilters.forEach((button) => {
    button.classList.remove('active-category-filter');
  });
  currentCategory = '';
  showPage(currentPage);
}

showPage(currentPage);
