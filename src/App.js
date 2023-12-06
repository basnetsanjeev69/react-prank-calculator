import "./App.css";
import prankSound from "./prank.wav";

import React, { useState } from "react";
import Calculater from "./Calculater";
import CustomButton from "./components/CustomButton";
import { BUTTONS } from "./utils";

function App() {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [isprank, setIsPrank] = useState(false);
  const [lastOperator, setLastOperator] = useState("");
  const operators = ["+", "-", "*", "/", "%"];

  const audio = new Audio(prankSound);

  // generate random number between 1 -10
  const randomNumber = () => {
    console.log("Display");
    return Math.round(Math.random() * 10) + 1;
  };

  const handleClick = (value) => {
    console.log(value);
    setIsPrank(false);
    // Clear Screen
    if (value === "AC") {
      setStrToDisplay("");
      return;
    }

    // C should remove the last char
    if (value === "C") {
      setStrToDisplay(strToDisplay.slice(0, -1));
      return;
    }

    // Get total
    if (value === "=") {
      return getTotal();
    }

    if (value === ".") {
      // If anyone pressed . in the beginning
      if (strToDisplay === "") {
        setStrToDisplay(strToDisplay + "0.");
      }

      //   If anyone pressed . twice in a row
      const lastChar = strToDisplay.slice(-1);
      if (lastChar === ".") {
        return;
      }
      //
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

    // If operators is pressed in the begging
    if (strToDisplay.length === 0 && operators.includes(value)) {
      return;
    }

    // Operator conditions
    if (operators.includes(value)) {
      setLastOperator(value);
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        return;
      }
      if (lastChar === ".") {
        setStrToDisplay(strToDisplay + "0.");
      }
    }

    // for operation if regular number is pressed

    setStrToDisplay(strToDisplay + value);
  };

  const getTotal = () => {
    const random = randomNumber();

    const lastChar = strToDisplay.slice(-1);
    if (operators.includes(lastChar)) {
      // remove the last char operator
      setStrToDisplay(strToDisplay.slice(0, -1));
    }
    //   Eval will always give a number back, converting number to string
    let totalNumber = eval(strToDisplay);
    //   Prank Case
    if (random < 4) {
      setIsPrank(true);
      audio.play();
      totalNumber += random;
    }
    setStrToDisplay(totalNumber.toString());
  };

  return (
    <div className="wrapper">
      <h1>Prank Calculator</h1>
      <small>Disclaimer: Ans might be incorrect in case you are pranked</small>
      <div className="calculator">
        <div className={isprank ? "display prank" : "display"}>
          {strToDisplay}
        </div>
        {BUTTONS.map((button) => {
          return (
            <CustomButton
              key={button.label}
              cls={button.cls}
              label={button.label}
              clickHandler={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
