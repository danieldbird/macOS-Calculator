/* 
Author: Daniel Bird
Version: 1.0.0
Date: 03/02/2020
*/

// get elements
const keypad = document.querySelector(".keypad");
const display = document.querySelector(".display");

// initialise variables
let num1 = "0";
let num2 = "0";
let operator = null;
display.innerHTML = "0";

// define keys of the calculator
const keys = {
  function: ["C", "<", "&plusmn;"],
  number: ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."],
  operator: ["&divide;", "&times;", "&minus;", "&plus;", "&equals;"]
};

// log variables to the console
function logAllData() {
  console.log("N1: " + num1);
  console.log("OP: " + operator);
  console.log("N2: " + num2);
  console.log("DI: " + display.innerHTML);
}

// reset all variables
function resetVariables() {
  display.innerHTML = "0";
  num1 = "0";
  num2 = "0";
  operator = null;
}

// create buttons from 'keys' object
function createBtns(obj) {
  for (let keys in obj) {
    for (i = 0; i < obj[keys].length; i++) {
      let tmp = document.createElement("BUTTON");
      tmp.innerHTML = obj[keys][i];
      tmp.className = keys + " " + obj[keys][i];
      tmp.addEventListener("click", e => {
        clickEvents(e);
      });
      document.querySelector("." + keys).appendChild(tmp);
    }
  }
}

function clickEvents(e) {
  // FUNCTION BUTTONS -------------------------------------------------------------------------------------------

  if (e.target.className.split(" ")[0] === "function") {
    // "C" CLEAR: clear the calculator variables and update the display
    if (e.target.innerHTML === "C") {
      resetVariables();
    }

    // "<" BACK: remove last character on the string, or replace with "0" if only one digit positive or negative
    if (e.target.innerHTML === "&lt;") {
      // if dealing with first number
      if (!operator) {
        // edge cases first, if only one character left, or one character and a minus (negative -n) sign
        if (
          display.innerHTML.length === 1 ||
          display.innerHTML.match(/^-\d$/)
        ) {
          num1 = "0";
          display.innerHTML = "0";
        }
        // else, simply remove last digit
        else {
          num1 = num1.slice(0, -1);
          display.innerHTML = num1;
        }
      }
      // if dealing with second number
      else {
        // edge cases first, if only one character left, or one character and a minus (negative -n) sign
        if (
          display.innerHTML.length === 1 ||
          display.innerHTML.match(/^-\d$/)
        ) {
          num2 = "0";
          display.innerHTML = "0";
        }
        // else, simply remove last digit
        else {
          num2 = num2.slice(0, -1);
          display.innerHTML = num2;
        }
      }
    }

    // "±" POSITIVE / NEGATIVE: transform number into the opposite either positive or negative
    if (e.target.innerHTML === "±") {
      // if dealing with first number
      if (!operator) {
        // if positive, make negative
        if (num1 > 0) {
          num1 = String(-Math.abs(num1));
          display.innerHTML = num1;
        }
        // if negative make positive
        else {
          num1 = String(Math.abs(num1));
          display.innerHTML = num1;
        }
      }
      // if dealing with second number
      else {
        if (num2 > 0) {
          // if positive, make negative
          num2 = String(-Math.abs(num2));
          display.innerHTML = num2;
        }
        // if negative make positive
        else {
          num2 = String(Math.abs(num2));
          display.innerHTML = num2;
        }
      }
    }
  }

  // NUMBER BUTTONS -------------------------------------------------------------------------------------------

  if (e.target.className.split(" ")[0] === "number") {
    // [0.] CLICK "0" OR "."
    if (e.target.innerHTML === "0" || e.target.innerHTML === ".") {
      // if dealing with first number
      if (!operator) {
        // if clicked "0"
        if (e.target.innerHTML === "0") {
          // if display zero
          if (num1 === "0") {
            num1 = "0";
            display.innerHTML = "0";
          }
          // if display not zero
          else {
            num1 += e.target.innerHTML;
            display.innerHTML = num1;
          }
        }

        // if clicked "."
        if (e.target.innerHTML === "." && !num1.includes(".")) {
          // if display is "0"
          if (num1 === "0") {
            num1 = "0" + e.target.innerHTML;
            display.innerHTML = num1;
          }
          /// if display not zero
          else {
            num1 += e.target.innerHTML;
            display.innerHTML = num1;
          }
        }
      }
      // if dealing with second number
      else {
        // if clicked "0"
        if (e.target.innerHTML === "0") {
          // if display zero
          if (num2 === "0") {
            num2 = "0";
            display.innerHTML = "0";
          }
          // if display not zero
          else {
            num2 += e.target.innerHTML;
            display.innerHTML = num2;
          }
        }
        // if clicked "."
        if (e.target.innerHTML === "." && !num2.includes(".")) {
          // if display is "0"
          if (num2 === "0") {
            num2 = "0" + e.target.innerHTML;
            display.innerHTML = num2;
          }
          /// if display not zero
          else {
            num2 += e.target.innerHTML;
            display.innerHTML = num2;
          }
        }
      }
    }

    // "[1-9] clicked a regular number
    else {
      // if dealing with first number
      if (!operator) {
        // if number is "0"
        if (num1 === "0") {
          num1 = e.target.innerHTML;
          display.innerHTML = num1;
        }
        // if number not "0"
        else {
          num1 += e.target.innerHTML;
          display.innerHTML = num1;
        }
      }
      // if dealing with second number
      else {
        // if number is "0"
        if (num2 === "0") {
          num2 = e.target.innerHTML;
          display.innerHTML = num2;
        }
        // if number not "0"
        else {
          num2 += e.target.innerHTML;
          display.innerHTML = num2;
        }
      }
    }
  }

  // OPERATOR BUTTONS -------------------------------------------------------------------------------------------

  if (e.target.className.split(" ")[0] === "operator") {
    // "=" EQUALS: if clicked the equals button
    if (e.target.innerHTML === "=") {
      // calculate total
      switch (operator) {
        // division
        case "÷":
          num1 = Number(num1) / Number(num2);
          num2 = "0";
          display.innerHTML = num1;
          operator = null;
          break;
        // multiplication
        case "×":
          num1 = Number(num1) * Number(num2);
          num2 = "0";
          display.innerHTML = num1;
          operator = null;
          break;
        // subtraction
        case "−":
          num1 = Number(num1) - Number(num2);
          num2 = "0";
          display.innerHTML = num1;
          operator = null;
          break;
        // addition
        case "+":
          num1 = Number(num1) + Number(num2);
          num2 = "0";
          display.innerHTML = num1;
          operator = null;
          break;
      }
    }
    // if it wasn't the equals button, save the operator type
    else {
      operator = e.target.innerHTML;
    }
  }
  // log all data on each click
  // logAllData();
}

createBtns(keys);
