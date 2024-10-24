import '../css/offertformular.scss'

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

//////////
// email confirm validation
//////////
function validateEmailConfirm() {
  const email = document.getElementById('e-post-field').value;
  const emailConfirm = document.getElementById('e-post-confirm').value;
  const submitButton = document.getElementById('offer-submit');

  // Disable validation if e-post-confirm is empty
  if (emailConfirm === '') {
      document.getElementById('e-post-confirm').classList.remove('invalid-mail');
      submitButton.classList.remove('invalid-input');
      return; // Exit the function
  }

  // Perform validation if e-post-confirm is not empty
  if (email !== emailConfirm) {
      document.getElementById('e-post-confirm').classList.add('invalid-mail');
      submitButton.classList.add('invalid-input');
  } else {
      document.getElementById('e-post-confirm').classList.remove('invalid-mail');
      submitButton.classList.remove('invalid-input');
  }
}

validateEmailConfirm()

// Run the validation when user types in e-post-confirm input field
document.getElementById('e-post-confirm').addEventListener('input', validateEmailConfirm);


