/* ==================================================
Project description: Pay Calculator
Author: Lone Mortensen
Description: The Pay Calculator is a simple web app that 
takes, verifies, and processes user input and publishes 
a response to the user interface. The user inputs the 
number of hours they worked and - using fixed and 
entirely fictitious hourly and overtime rates - the app 
calculates and returns the user's pay. 
Design: The project uses the input html element to
capture the input entered by the user on the front end.
The type attributes of the input and button html elements 
have been modified to allow for JavaScript handling of 
the input. In the script, a regular expression verifies 
the input and if statements control the updating of the 
user interface with two types of error messages or the 
calculated pay, depending on the input.    
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

/**
 * Adds outline styling around input field.
 * Removes outline styling around input field if error styling is applied: 
*/

// const checkFocus = () => {
//   numberInputField.addEventListener("focus", () => {
//     console.log("Check input field"); // Works
//     const hasErrorBorder = numberInputField.classList.contains("error-border-input-field"); // Returns true or false.
//     if (!hasErrorBorder) {
//       numberInputField.classList.add("remove-default-focus");
//       numberInputField.classList.add("focus");
//     } else {
//       numberInputField.classList.remove("focus");
//     }
//   });
// };
// checkFocus();

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
 * Eventlisteners call handler on both focus and click events.
 * Click event serves as fallback if mobile browser fails to trigger focus event. 
*/
// const checkFocus = () => {
//   console.log("Check input field"); // Works
//   numberInputField.addEventListener("focus", addFocusStyling);
//   numberInputField.addEventListener("click", addFocusStyling);
// };
//checkFocus();

/**
 * Applies styling for error messages:
*/ 
const addErrorStyling = () => {
  errorDisplay.classList.remove("hide-error");
  errorDisplay.classList.add("error-wrapper-styling");
  errorMessage.classList.add("error-icon");
  numberInputField.classList.add("error-border-input-field");
  //checkFocus();
  addFocusStyling();
};

/**
 * Removes styling for error messages:
*/
const removeErrorStyling = () => {
  errorDisplay.classList.remove("error-wrapper-styling");
  errorDisplay.classList.add("hide-error");
  errorMessage.classList.remove("error-icon");
  numberInputField.classList.remove("error-border-input-field");
};


/**
 * DO I NEED THIS????
 * Removes outline styling around input field: NOTE: Why can't I use checkFocus????
*/
const removeFocus = () => {
  console.log("REMOVEs focus on input field"); // Works
  numberInputField.classList.remove("focus");
};

/** 
 * Calculates the pay based on the number of hours entered by the user.
 * Gets and verifies user input.
 * Handles user interface display of error messages and calculated pay result.  
*/
const calculateTotalPay = () => {
  const regularHourlyRate = 50; 
  const overtimeHourlyRate = 70; 
  const hours = numberInputField.value.trim(); // Gets input entered by user. 
  console.log(hours); // works

  // Verifies user input.
  // Regular expression search pattern allows numbers only (decimals included, but no negative numbers). 
  // The test() method checks input against the search pattern.
  // @param input - The value from the input field. 
  // @return - The test() method returns true or false.

  // const inputPattern = /^\d+(\.\d+)?$/; 
  // const verifyInput = inputPattern.test(hours); 
  // console.log(verifyInput); // works

  const verifyUserInput = (input) => {
    const inputPattern = /^\d+(\.\d+)?$/; 
    const verifiedInput = inputPattern.test(input); 
    return verifiedInput;
  };
  
  // Displays error message in case of no or invalid input.
  // Calculates and displays pay result if input is valid.
  if (!hours) {
    addErrorStyling();
    errorMessage.innerText = "Please enter a number";
  }
  // else if (!verifyInput) {
  //   addErrorStyling();
  //   errorMessage.innerText = "Please enter a number greater than or equal to zero";
  // }
  else if (!verifyUserInput(hours)) { // Calls function to verify user input.
    addErrorStyling();
    errorMessage.innerText = "Please enter a number greater than or equal to zero";
  }
  else if (hours <= 40) {
    const regularPay = hours * regularHourlyRate;
    console.log(regularPay); // works
    resultMessage.scrollIntoView();
    resultMessage.innerText = `${regularPay}`;
  }
  else {
    const overtimeHours = hours - 40;
    console.log(overtimeHours); // works
    const overtimePay = overtimeHours * overtimeHourlyRate;
    console.log(overtimePay); // works
    const totalPay = (40 * regularHourlyRate) + overtimePay;
    console.log(totalPay); // works
    resultMessage.scrollIntoView();
    resultMessage.innerText = `${totalPay}`;
  }
};

/**
 * Detect interaction with input field.
 * Eventlisteners call handler on both focus and click events.
 * Click event serves as fallback if mobile browser fails to trigger focus event. 
*/
numberInputField.addEventListener("focus", addFocusStyling);
numberInputField.addEventListener("click", addFocusStyling);

/** 
 * Detects when user clicks or touches the calculate button.
 * Applies button animation styling to handle both mouse clicks and touch interaction.    
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
  //removeFocus();
});












