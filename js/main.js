/* ==================================================
Project description: Pay Calculator
Author: Lone Mortensen
Description: 
Built with: 

===== *** =====

================================================== */


// Can all of these global var be moved inside the function for encapsulation? calculateButton likely an issue...
// Consider encapsulation with IIFE instead...
const form = document.getElementById("workhours-form");
const errorDisplay = document.getElementById("error");
const errorMessage = document.querySelector(".error-message");
const numberInputField = document.getElementById("number-input"); 
const calculateButton = document.querySelector(".calculate-button");
const resultMessage = document.querySelector(".result-message");
const regularHourlyRate = 50; 
const overtimeHourlyRate = 70;  

const calculateTotalPay = () => {
  const hours = numberInputField.value;
  console.log(hours); // works
  
  /*Verification of user input:*/
  const inputPattern = /^\d+(\.\d+)?$/; // Regular expression defines a search pattern used to check that input is only numbers; allows decimals, but no negative numbers.
  // The test() method returns true or false, depending on result.
  const verifyInput = inputPattern.test(hours); // Checks user input against pattern specified in regular expression.
  console.log(verifyInput); // works

  if (!hours) {
    errorDisplay.classList.remove("hide-error");
    errorDisplay.classList.add("error-wrapper");
    errorMessage.classList.add("error-icon");
    numberInputField.classList.add("error-border-input-field");
    errorMessage.innerText = "Please enter a number";
  }
  else if (!verifyInput) {
    errorDisplay.classList.remove("hide-error");
    errorDisplay.classList.add("error-wrapper");
    errorMessage.classList.add("error-icon");
    numberInputField.classList.add("error-border-input-field");
    errorMessage.innerText = "Please enter a number greater than or equal to zero";
  }
  else if (hours <= 40) {
    const regularPay = hours * regularHourlyRate;
    console.log(regularPay); // works
    resultMessage.innerText = `${regularPay}`;
  }
  else {
    const overtimeHours = hours - 40;
    console.log(overtimeHours); // works
    const overtimePay = overtimeHours * overtimeHourlyRate;
    console.log(overtimePay); // works
    const totalPay = (40 * regularHourlyRate) + overtimePay;
    console.log(totalPay); // works
    resultMessage.innerText = `${totalPay}`;
  }
};

calculateButton.addEventListener("click", () => {
  errorMessage.innerText = "";
  resultMessage.innerText = "";
  errorDisplay.classList.remove("error-wrapper");
  errorDisplay.classList.add("hide-error");
  errorMessage.classList.remove("error-icon");
  numberInputField.classList.remove("error-border-input-field");
  calculateTotalPay();
  form.reset(); 
});













