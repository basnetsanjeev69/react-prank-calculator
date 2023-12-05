import "./App.css";
// import "./style.css";
import "./prank.wav";

import React, { useState } from "react";
import Calculater from "./Calculater";
import CustomButton from "./components/CustomButton";

function App() {
  const displayElem = document.querySelector(".display");

  let [strToDisplay, setStrToDisplay] = useState("");
  // let strToDisplay = "";
  const operators = ["+", "-", "*", "/", "%"];
  const BUTTONS = [
    {
      cls: "btn btn-ac",
      label: "AC",
    },
    {
      cls: "btn btn-c",
      label: "C",
    },
    {
      cls: "btn btn-per",
      label: "%",
    },
    {
      cls: "btn btn-plus",
      label: "+",
    },
    {
      cls: "btn btn-minus",
      label: "-",
    },
    {
      cls: "btn btn-x",
      label: "*",
    },
    {
      cls: "btn btn-dot",
      label: ".",
    },
    {
      cls: "btn btn-divide",
      label: "/",
    },
    {
      cls: "btn btn-equals",
      label: "=",
    },
    {
      cls: "btn btn-1",
      label: "1",
    },
    {
      cls: "btn btn-2",
      label: "2",
    },
    {
      cls: "btn btn-3",
      label: "3",
    },
    {
      cls: "btn btn-4",
      label: "4",
    },
    {
      cls: "btn btn-5",
      label: "5",
    },
    {
      cls: "btn btn-6",
      label: "6",
    },
    {
      cls: "btn btn-4",
      label: "4",
    },
    {
      cls: "btn btn-7",
      label: "7",
    },
    {
      cls: "btn btn-8",
      label: "8",
    },
    {
      cls: "btn btn-9",
      label: "9",
    },
    {
      cls: "btn btn-0",
      label: "0",
    },
  ];

  let lastOperator = "";
  const audio = new Audio("./prank.wav");

  // generate random number between 1 -10
  const randomNumber = () => {
    console.log("Display");
    return Math.round(Math.random() * 10) + 1;
  };

  const handleClick = (value) => {
    displayElem?.classList.remove("prank");
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
      lastOperator = value;
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
      displayElem.classList.add("prank");
      console.log(audio);
      // audio.play();
      totalNumber += random;
    }
    setStrToDisplay(totalNumber.toString());
  };

  return (
    <div className="wrapper">
      <h1>Prank Calculator</h1>
      <small>Disclaimer: Ans might be incorrect in case you are pranked</small>
      <div className="calculator">
        <div className="display">0.00</div>
        {BUTTONS.map((button) => {
          return (
            <CustomButton
              key={button.label}
              cls={button.cls}
              label={button.label}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
