/* ==================================================
Project description: Pay Calculator
Author: Lone Mortensen
Description: A simple web app that takes, verifies, and 
processes user input and publishes a response to the 
user interface. The user inputs the number of hours 
they worked and - using fixed and fictitious hourly 
and overtime rates - the app calculates and 
returns the user's pay. 
Design: The project uses the input html element to
capture input entered by the user. The type attributes 
of the input and button html elements are set to
allow for JavaScript handling and client-side 
verification of the input. A regular expression and 
the test() method verify the input, and an if/else 
statement controls the updating of the user interface 
with error messages or the calculated pay,
depending on the input.    
Built with: HTML, CSS, JavaScript.

===== *** =====

================================================== */

/**
 * Global variables. 
*/
const form = document.getElementById("workhours-form");
const errorDisplay = document.querySelector(".error-wrapper");
const errorMessage = document.querySelector(".error-message");
const numberInputField = document.getElementById("number-input");
const calculateButton = document.querySelector(".calculate-button");
const resultMessage = document.querySelector(".result-message");
const regularHourlyRate = 50; 
const overtimeHourlyRate = 70; 

/**
 * Adds outline styling on input field to indicate focus.
 * Removes outline styling on input field if error styling is applied. 
*/
const addFocusStyling = () => {
  const hasErrorBorder = numberInputField.classList.contains("error-border-input-field"); // Returns true or false.
  if (!hasErrorBorder) {
    numberInputField.classList.add("remove-default-focus");
    numberInputField.classList.add("focus");
  } else {
    numberInputField.classList.remove("focus");
  }
};

/**
 * Removes outline styling on input field. 
*/
const removeFocusStyling = () => {
  numberInputField.classList.remove("focus");
};

/**
 * Adds styling for error messages.
*/ 
const addErrorStyling = () => {
  errorDisplay.classList.remove("hide-error");
  errorDisplay.classList.add("error-wrapper-styling");
  errorMessage.classList.add("error-icon");
  numberInputField.classList.add("error-border-input-field");
  addFocusStyling();
};

/**
 * Removes styling for error messages.
*/
const removeErrorStyling = () => {
  errorDisplay.classList.remove("error-wrapper-styling");
  errorDisplay.classList.add("hide-error");
  errorMessage.classList.remove("error-icon");
  numberInputField.classList.remove("error-border-input-field");
};

/**
 * Verifies user input.
 * Regular expression search pattern allows numbers only (decimals included; no negative numbers). 
 * The test() method checks input against the search pattern.
 * @param input - The value entered by user in the input field. 
 * @return - The test() method returns true or false.
*/
const verifyUserInput = (input) => {
  const inputPattern = /^\d+(\.\d+)?$/; 
  const verifiedInput = inputPattern.test(input); 
  return verifiedInput;
};

/** 
 * Calculates the pay based on the number of hours entered by the user.
 * Calls function to verify user input.
 * Displays error message in case of missing or invalid input.
 * Calculates and displays pay result if input is valid.
*/
const calculateTotalPay = () => {
  const hours = numberInputField.value.trim(); // Gets input entered by user. 
 
  if (!hours) {
    addErrorStyling();
    errorMessage.innerText = "Please enter a number";
  }
  else if (!verifyUserInput(hours)) { // Calls function to verify user input. 
    addErrorStyling();
    errorMessage.innerText = "Please enter a number greater than or equal to zero";
  }
  else if (hours <= 40) {
    const regularPay = hours * regularHourlyRate;
    resultMessage.scrollIntoView();
    resultMessage.innerText = `${regularPay}`;
  }
  else {
    const overtimeHours = hours - 40;
    const overtimePay = overtimeHours * overtimeHourlyRate;
    const totalPay = (40 * regularHourlyRate) + overtimePay;
    resultMessage.scrollIntoView();
    resultMessage.innerText = `${totalPay}`;
  }
};

/**
 * Detect interaction with and inside input field.
 * Call handler on both focus and click events.
 * Click event serves as fallback if mobile browser fails to trigger focus event. 
*/
numberInputField.addEventListener("focus", addFocusStyling);
numberInputField.addEventListener("click", addFocusStyling);

/**
 * Detect interaction outside the input field.
 * Call handler on both focus and click events.
 * Click event serves as fallback if mobile browser fails to trigger blur event. 
*/
numberInputField.addEventListener("blur", removeFocusStyling);
numberInputField.addEventListener("click", (event) => {
  if (event.target !== numberInputField) {
    removeFocusStyling();
  }
});

/** 
 * Detects when user clicks or touches the calculate button.
 * Adds button animation styling to handle both mouse clicks and touch interaction.    
*/
calculateButton.addEventListener ("pointerdown", () => {
  calculateButton.classList.add("active");
});

calculateButton.addEventListener ("pointerup", () => {
  calculateButton.classList.remove("active");
});

/** 
 * Detects when user clicks the calculate button.
 * Calls handler to process user input and calculate pay.
 * Clears message and results fields.  
 * Removes error styling and hides error display field from view.
 * Clears input field.  
*/
calculateButton.addEventListener("click", () => {
  errorMessage.innerText = "";
  resultMessage.innerText = "";
  removeErrorStyling();  
  calculateTotalPay();
  form.reset(); // Clears input field.
});












