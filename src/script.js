const displayElem = document.querySelector(".display");
const btnElems = document.querySelectorAll(".btn");
const audio = new Audio("./prank.wav");

let strToDisplay = "";
const operators = ["+", "-", "*", "/", "%"];
let lastOperator = "";
// Basic way to do, tedious
// const numOneElem = document.querySelector(".btn-1");
// numOneElem.addEventListener("click", () => {
//   displayElem.innerText = 1;
// });

const display = (str) => {
  displayElem.innerText = str || "0.00";
};

// generate random number between 1 -10
const randomNumber = () => {
  return Math.round(Math.random() * 10) + 1;
};

const getTotal = () => {
  const random = randomNumber();
  console.log("Random", random);
  const lastChar = strToDisplay.slice(-1);
  if (operators.includes(lastChar)) {
    // remove the last char operator
    strToDisplay = strToDisplay.slice(0, -1);
  }
  //   Eval will always give a number back, converting number to string
  let totalNumber = eval(strToDisplay);
  //   Prank Case
  if (random < 4) {
    displayElem.classList.add("prank");
    audio.play();
    totalNumber += random;
  }
  strToDisplay = totalNumber.toString();
  return display(strToDisplay);
};

btnElems.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;
    displayElem?.classList.remove("prank");
    // Clear screen
    if (value === "AC") {
      strToDisplay = "";
      return display(strToDisplay);
      //   displayElem.innerText = strToDisplay;
    }

    // C should remove the last char
    if (value === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
      //   displayElem.innerText = strToDisplay;
    }

    // Get total
    if (value === "=") {
      return getTotal();
    }
    // stsToDisplay = "1.2"
    // value = "."
    // . conditions
    if (value === ".") {
      // If anyone pressed . in the beginning
      if (strToDisplay === "") {
        strToDisplay += "0.";
        return display(strToDisplay);
      }

      //   If anyone pressed . twice in a row
      const lastChar = strToDisplay.slice(-1);
      if (lastChar === ".") {
        return;
      }
      //    Do not allow . if there is already . in string
      //   if (strToDisplay.includes(".")) {
      //     return;
      //   }
      //   Check if . exists in string to dispay after lastOperator
      if (!lastOperator) {
        if (strToDisplay.includes(".")) {
          return;
        }
      }
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
      if (lastNumberSet.includes(".")) {
        return;
      }
    }

    // Define all the problems, negative scenarios
    //  Solve the problem one at a time.

    // If operators is pressed in the begging
    if (strToDisplay.length === 0 && operators.includes(value)) {
      return;
    }

    // Operator conditions
    if (operators.includes(value)) {
      lastOperator = value;
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        return;
      }
      if (lastChar === ".") {
        strToDisplay += "0";
      }
    }

    strToDisplay += value;
    display(strToDisplay);
    // displayElem.innerText = strToDisplay;
    // if someone click on something then do somethhing.
  });
});
