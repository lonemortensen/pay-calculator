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
 * Calculates the pay based on the number of hours entered by the user.
 * Gets and verifies user input.
 * Handles user interface display of error messages and calculated pay result.  
*/
const calculateTotalPay = () => {
  const regularHourlyRate = 50; 
  const overtimeHourlyRate = 70; 
  const hours = numberInputField.value; // Gets input entered by user. 
  console.log(hours); // works
  
  // Verifies user input.
  // The regular expression search pattern allows numbers only (decimals included, but no negative numbers). 
  // The test() method checks input against the search pattern and returns true or false. 
  const inputPattern = /^\d+(\.\d+)?$/; 
  const verifyInput = inputPattern.test(hours); 
  console.log(verifyInput); // works

  // Displays error message in case of no or invalid input.
  // Calculates and displays pay result if input is valid.
  if (!hours) {
    errorDisplay.classList.remove("hide-error");
    errorDisplay.classList.add("error-wrapper-styling");
    errorMessage.classList.add("error-icon");
    errorMessage.innerText = "Please enter a number";
    numberInputField.classList.add("error-border-input-field");
  }
  else if (!verifyInput) {
    errorDisplay.classList.remove("hide-error");
    errorDisplay.classList.add("error-wrapper-styling");
    errorMessage.classList.add("error-icon");
    errorMessage.innerText = "Please enter a number greater than or equal to zero";
    numberInputField.classList.add("error-border-input-field");
    
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
 * Detects when user clicks the calculate button.
 * Calls event handler to handle user input and calculate pay.
 * Clears message and results fields and removes error styling. 
 * Hides error display field from view.
 * Clears input field.  
*/
calculateButton.addEventListener("click", () => {
  errorMessage.innerText = "";
  resultMessage.innerText = "";
  errorDisplay.classList.remove("error-wrapper-styling");
  errorDisplay.classList.add("hide-error");
  errorMessage.classList.remove("error-icon");
  numberInputField.classList.remove("error-border-input-field");
  calculateTotalPay();
  form.reset(); 
});













