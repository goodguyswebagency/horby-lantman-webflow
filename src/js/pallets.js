import '../css/pallets.scss'

document.getElementById("quantity").addEventListener("input", function () {
  // Get the values of quantity and prices
  const quantity = parseFloat(this.value);
  const fullPrice = parseFloat(document.getElementById("full-price").textContent);
  const lowPrice = parseFloat(document.getElementById("low-price").textContent);

  // Determine the correct price based on quantity
  let totalPrice;
  if (quantity < 52) {
    totalPrice = quantity * fullPrice;
  } else {
    totalPrice = quantity * lowPrice;
  }

  // Calculate price without VAT and VAT-only price, and round to nearest integer
  const priceNoVAT = Math.round(totalPrice * 0.75);
  const vatPrice = Math.round(totalPrice * 0.25);
  const roundedTotalPrice = Math.round(totalPrice);

  // Update the paragraph texts with calculated values without decimals
  document.getElementById("price-no-vat").textContent = `${priceNoVAT}`;
  document.getElementById("vat-price").textContent = `${vatPrice}`;
  document.getElementById("total-price").textContent = `${roundedTotalPrice}`;
});


// we observe the changes on the text in the submit button that is hidden
// and apply that text to the button text that is visible
const submitButtonText = document.querySelector("#offer-submit .button-text");
const submitButtonWrapper = document.querySelector("#offer-submit-button");

function updateDivContent() {
  submitButtonText.textContent = submitButtonWrapper.value;
}


// Observe for changes to the button text
const observer = new MutationObserver(updateDivContent);
observer.observe(submitButtonWrapper, { attributes: true, attributeFilter: ['value'] });

updateDivContent();

