import '../css/bygg-butik.scss'
import '../css/components/_campaign.scss'

// match value of custom attribute "data-category" between the button and the content block
function handleFilterClick() {
  // Select all button filters
  const buttonFilters = document.querySelectorAll('.button-filter');
  
  buttonFilters.forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'active-category-filter' class from all button filters
      document.querySelectorAll('.active-category-filter').forEach(activeButton => {
        activeButton.classList.remove('active-category-filter');
      });
      
      // Add 'active-category-filter' class to the clicked button
      button.classList.add('active-category-filter');
      
      // Get the data-category value of the clicked button
      const filterCategory = button.getAttribute('data-category');
      
      // Remove 'active-category' class from all category blocks
      document.querySelectorAll('.active-category').forEach(activeBlock => {
        activeBlock.classList.remove('active-category');
      });
      
      // Find the matching bygg-category__block and add 'active-category' class
      document.querySelectorAll('.bygg-category__block').forEach(block => {
        if (block.getAttribute('data-category') === filterCategory) {
          block.classList.add('active-category');
        }
      });
    });
  });
}

// Call the function on page load
handleFilterClick();
