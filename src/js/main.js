
// CSS import
import '../css/main.scss'

// JavaScript import 
import './components/navbar.js'

import gsap from 'gsap';



/////////////////////////////////////////
// Adding titles to images
////////////////////////////////////////
$('img').each(function(){
  // take alt text of each image
  let imageAltText = $(this).attr('alt');
  // add as title to each image
  $(this).attr('title', imageAltText);
});
  

/////////////////////////////////////////
// Disable submitting form fields during development
////////////////////////////////////////
// $('form').submit(function() {
//   alert('Form submissions have been disabled during development.');
//   return false;
// });
  

/////////////////////////////////////////
// No follow external links
////////////////////////////////////////
function setRelAttribute() {
  var elems = document.body.getElementsByTagName('a');
  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i]
    var re = /mydomain.com/
    var isInternal = re.test(elem.href)
    if (!isInternal) {
      elem.rel= 'noopener noreferrer nofollow'
    }
  }
}
setRelAttribute();


/////////////////////////////////////////
// Remove webflow responsive images
////////////////////////////////////////
$('img').each(function(){
  $(this).removeAttr('sizes');
  $(this).removeAttr('srcset');
});
  

/////////////////////////////////////////
// select input
////////////////////////////////////////
let selectElements = document.querySelectorAll('.form-input.w-select');

// Loop through all select elements
selectElements.forEach(function(selectElement) {
  // Detect click event
  selectElement.addEventListener('click', function() {
    // Check if the dropdown-open class is already present
    if (this.classList.contains('input-dropdown-open')) {
      this.classList.remove('input-dropdown-open'); // Remove the class if it's present
    } else {
      this.classList.add('input-dropdown-open'); // Otherwise, add the class
    }
  });

  // Detect when the select is closed
  selectElement.addEventListener('blur', function() {
    this.classList.remove('input-dropdown-open');
  });
});

/////////////////////////////////////////
// CTA image movement
////////////////////////////////////////
// Function to generate a random position within a 20px radius
function getRandomPosition() {
  return Math.random() * 20 - 10; // Generate a random number between -20 and 20
}

// Function to generate a random duration between 5 and 7 seconds
function getRandomDuration() {
  return Math.random() * 2 + 5; // Random number between 5 and 7
}

// Function to animate each icon
function animateIcon(icon) {
  // Store the original position
  const originalX = parseFloat(getComputedStyle(icon).left);
  const originalY = parseFloat(getComputedStyle(icon).top);

  function move() {
    // Random new position within a 20px radius
    const newX = originalX + getRandomPosition();
    const newY = originalY + getRandomPosition();

    // Animate the icon to the new position
    gsap.to(icon, {
      x: newX - originalX, // Offset from the original position
      y: newY - originalY,
      duration: getRandomDuration(), // Duration of 2 seconds for the transition
      ease: "power1.inOut", // Smooth easing for the movement
      onComplete: move // Call move again when the animation is done to repeat
    });
  }

  move(); // Start the initial movement
}

// Select all elements with the class "hero-dev_media-icon" and animate them
const icons = document.querySelectorAll(".cta__content__media");
if(icons.length > 0){
  icons.forEach(icon => animateIcon(icon));
}

