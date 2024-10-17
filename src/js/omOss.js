import '../css/om-oss.scss'

import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css';

const pharmacySwiper = new Swiper('.oss-pharmacy__slider', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  loop: true
});

function initHistorySwiper() {
  const screenWidth = window.innerWidth;
  const historySwiper = new Swiper('.oss-history__slider-main', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: screenWidth > 991 ? 120 : 80,
    loop: false,
    navigation: {
      nextEl: '.oss-history__slider-next',
      prevEl: '.oss-history__slider-prev',
    },
    on: {
      slideChange: updateYearDiv, // Add the event listener for slide change
    },
  });

  // Add click event listener to each slide
  const slides = document.querySelectorAll('.oss-history__slider .swiper-slide');

  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      // Remove the active class from all slides
      slides.forEach(s => s.classList.remove('swiper-slide-active'));
      
      // Add the active class to the clicked slide
      slide.classList.add('swiper-slide-active');
      
      // Update the year divs after the slide is clicked
      updateYearDiv();
    });
  });
}

// each slide content has data-attribute data-year that has the value of the year
// we then check the active slider year in h3 text element and compare that to the data-year attribute
// and based on that show / hide the slides
function updateYearDiv(){
  setTimeout(() => {
    const activeSlide = document.querySelector('.oss-history__slider .swiper-slide-active');
    const yearElement = activeSlide.querySelector('.oss-history__slide-year');
    const activeYear = yearElement.textContent.trim();

    // Select all divs with data-year attribute
    const yearDivs = document.querySelectorAll('[data-year]');

    yearDivs.forEach(div => {
      // Check if the div's data-year matches the active slide's year
      if (div.getAttribute('data-year') === activeYear) {
        // Show the div if it matches
        div.style.opacity = '1';
        div.style.display = 'grid';
      } else {
        // Hide the div if it doesn't match
        div.style.opacity = '0';
        div.style.display = 'none';
      }
    });
  }, "200");
}

// Initialize Swiper on load
initHistorySwiper();

// Re-initialize Swiper on resize
window.addEventListener('resize', initHistorySwiper);



//////////////////////////////
// we are sorting the people by categoriy first (the order in which they are showed in the filter buttons) and then by order number
// so for example we first show aministration and then sort all administration people by order number
// after that we show the next category and sort it by numbers and so on...
// adding also pagination and logic for selecting certain category only
///////////////////////////////////

const itemsPerPage = 12;  // Set how many items you want per page
let currentPage = 1;
let currentCategory = '';  // Keep track of the active category

const peopleList = document.querySelectorAll('.oss-people__block');
const peopleArray = Array.from(peopleList);  // Convert NodeList to Array
const buttonFilters = document.querySelectorAll('.button-filter');

// Get the order of categories from the button-filter elements inside .oss-people__categories__wrapper
const categoryOrder = Array.from(document.querySelectorAll('.oss-people__categories__wrapper .w-dyn-item .button-filter')).map(button => button.innerText.toLowerCase());

// Sort the people array by category order (based on button-filter) and then by order number (lowest to highest)
function sortPeopleArray(arr) {
    return arr.sort(function (a, b) {
        const categoryA = a.querySelector('.hidden-category').innerText.toLowerCase();
        const categoryB = b.querySelector('.hidden-category').innerText.toLowerCase();
        const orderA = parseInt(a.querySelector('.hidden-order').innerText, 10);
        const orderB = parseInt(b.querySelector('.hidden-order').innerText, 10);

        // First, sort by the order of categories in the categoryOrder array
        const categoryIndexA = categoryOrder.indexOf(categoryA);
        const categoryIndexB = categoryOrder.indexOf(categoryB);

        console.log('categoryIndexA', categoryIndexA)
        console.log('categoryIndexB', categoryIndexB)

        if (categoryIndexA < categoryIndexB) return -1;
        if (categoryIndexA > categoryIndexB) return 1;

      

        // If categories are the same, sort by order (numerically, smallest to largest)
        return orderA - orderB;
    });
}

const sortedPeopleArray = sortPeopleArray(peopleArray);  // Initially sorted people list

const listContainer = document.querySelector('.oss-people__grid');

// Function to show people for the current page and category filter
function showPage(page, category = '') {
    // Create a temporary container to hold the elements in the correct order
    const tempContainer = document.createDocumentFragment();
    
    let filteredArray = sortedPeopleArray;

    // If a category is active, filter the people array by category
    if (category) {
        filteredArray = sortedPeopleArray.filter(person => {
            const personCategory = person.querySelector('.hidden-category').innerText.toLowerCase();
            return personCategory === category.toLowerCase();
        });
    }

    // Update total items and total pages based on the filtered array
    const totalItems = filteredArray.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate start and end index for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Create a list of elements to be displayed for the current page
    filteredArray.slice(startIndex, endIndex).forEach(item => {
        tempContainer.appendChild(item); // Append each item to the temporary container
    });

    // Clear the current displayed items in the list container
    listContainer.innerHTML = ''; // Remove existing elements

    // Append the items from the temporary container to the actual list container
    listContainer.appendChild(tempContainer);

    // Update pagination controls
    updatePaginationControls(totalPages);
}

// Function to update the pagination controls
function updatePaginationControls(totalPages) {
    const paginationContainer = document.querySelector('.pagination-controls');
    if (paginationContainer) paginationContainer.remove(); // Remove old pagination controls

    const newPaginationContainer = document.createElement('div');
    newPaginationContainer.classList.add('pagination-controls');

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', function () {
            currentPage = i;
            showPage(currentPage, currentCategory);
        });

        newPaginationContainer.appendChild(pageButton);
    }

    listContainer.after(newPaginationContainer);  // Add the pagination controls after the list
}

// Function to handle button filter clicks
buttonFilters.forEach(button => {
    button.addEventListener('click', function () {
        // Check if the clicked button already has 'active-category-filter' class
        if (button.classList.contains('active-category-filter')) {
            // If the clicked button is already active, reset all filters
            buttonFilters.forEach(btn => btn.classList.remove('active-category-filter'));
            currentCategory = '';  // Reset the active category filter
            showPage(1);  // Show all people
        } else {
            // If it's a new category, remove 'active-category-filter' class from all buttons
            buttonFilters.forEach(btn => btn.classList.remove('active-category-filter'));
            // Add the 'active-category-filter' class to the clicked button
            button.classList.add('active-category-filter');

            // Get the category of the clicked button
            currentCategory = button.innerText.trim();

            // Show the first page of the filtered list
            currentPage = 1;
            showPage(currentPage, currentCategory);
        }
    });
});

// If no filter is active, show all people
function resetFilters() {
    buttonFilters.forEach(button => {
        button.classList.remove('active-category-filter');
    });
    currentCategory = '';  // Reset the active category filter
    showPage(currentPage);  // Show all people
}

// Initial page load
showPage(currentPage);






// const itemsPerPage = 12;  // Set how many items you want per page
// let currentPage = 1;
// let currentCategory = '';  // Keep track of the active category

// const peopleList = document.querySelectorAll('.oss-people__block');
// const peopleArray = Array.from(peopleList);  // Convert NodeList to Array
// const buttonFilters = document.querySelectorAll('.button-filter');

// // Sort the people array by category and then by order number (lowest to highest)
// function sortPeopleArray(arr) {
//     return arr.sort(function (a, b) {
//         const categoryA = a.querySelector('.hidden-category').innerText.toLowerCase();
//         const categoryB = b.querySelector('.hidden-category').innerText.toLowerCase();
//         const orderA = parseInt(a.querySelector('.hidden-order').innerText, 10);
//         const orderB = parseInt(b.querySelector('.hidden-order').innerText, 10);

//         // First, sort by category (alphabetically)
//         if (categoryA < categoryB) return -1;
//         if (categoryA > categoryB) return 1;

//         // If categories are the same, sort by order (numerically, smallest to largest)
//         return orderA - orderB;
//     });
// }

// const sortedPeopleArray = sortPeopleArray(peopleArray);  // Initially sorted people list

// const listContainer = document.querySelector('.oss-people__grid');

// // Function to show people for the current page and category filter
// function showPage(page, category = '') {
//     // Create a temporary container to hold the elements in the correct order
//     const tempContainer = document.createDocumentFragment();
    
//     let filteredArray = sortedPeopleArray;

//     // If a category is active, filter the people array by category
//     if (category) {
//         filteredArray = sortedPeopleArray.filter(person => {
//             const personCategory = person.querySelector('.hidden-category').innerText.toLowerCase();
//             return personCategory === category.toLowerCase();
//         });
//     }

//     // Update total items and total pages based on the filtered array
//     const totalItems = filteredArray.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);

//     // Calculate start and end index for the current page
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;

//     // Create a list of elements to be displayed for the current page
//     filteredArray.slice(startIndex, endIndex).forEach(item => {
//         tempContainer.appendChild(item); // Append each item to the temporary container
//     });

//     // Clear the current displayed items in the list container
//     listContainer.innerHTML = ''; // Remove existing elements

//     // Append the items from the temporary container to the actual list container
//     listContainer.appendChild(tempContainer);

//     // Update pagination controls
//     updatePaginationControls(totalPages);
// }

// // Function to update the pagination controls
// function updatePaginationControls(totalPages) {
//     const paginationContainer = document.querySelector('.pagination-controls');
//     if (paginationContainer) paginationContainer.remove(); // Remove old pagination controls

//     const newPaginationContainer = document.createElement('div');
//     newPaginationContainer.classList.add('pagination-controls');

//     for (let i = 1; i <= totalPages; i++) {
//         const pageButton = document.createElement('button');
//         pageButton.innerText = i;
//         pageButton.classList.add('pagination-button');
//         if (i === currentPage) {
//             pageButton.classList.add('active');
//         }
//         pageButton.addEventListener('click', function () {
//             currentPage = i;
//             showPage(currentPage, currentCategory);
//         });

//         newPaginationContainer.appendChild(pageButton);
//     }

//     listContainer.after(newPaginationContainer);  // Add the pagination controls after the list
// }

// // Function to handle button filter clicks
// buttonFilters.forEach(button => {
//     button.addEventListener('click', function () {
//         // Check if the clicked button already has 'active-category-filter' class
//         if (button.classList.contains('active-category-filter')) {
//             // If the clicked button is already active, reset all filters
//             buttonFilters.forEach(btn => btn.classList.remove('active-category-filter'));
//             currentCategory = '';  // Reset the active category filter
//             showPage(1);  // Show all people
//         } else {
//             // If it's a new category, remove 'active-category-filter' class from all buttons
//             buttonFilters.forEach(btn => btn.classList.remove('active-category-filter'));
//             // Add the 'active-category-filter' class to the clicked button
//             button.classList.add('active-category-filter');

//             // Get the category of the clicked button
//             currentCategory = button.innerText.trim();

//             // Show the first page of the filtered list
//             currentPage = 1;
//             showPage(currentPage, currentCategory);
//         }
//     });
// });

// // If no filter is active, show all people
// function resetFilters() {
//     buttonFilters.forEach(button => {
//         button.classList.remove('active-category-filter');
//     });
//     currentCategory = '';  // Reset the active category filter
//     showPage(currentPage);  // Show all people
// }

// // Initial page load
// showPage(currentPage);


