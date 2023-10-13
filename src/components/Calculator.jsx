import { useState } from "react";
import "../styles/calc.css";
const values = { val1: "", val2: "", action: null };

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [middleRes, setMiddleRes] = useState("");

  const handleButtonClick = (value, sign) => {
    if (sign === 0) {
      if (display === "0") {
        setDisplay(value);
        values.val1 = value;
      } else {
        if (values.action === null) {
          if (values.val1 === "") setDisplay(value);
          else setDisplay(display + value);
          values.val1 = values.val1 + value;
        } else {
          if (values.val2 === "") {
            setDisplay(display + value);
            values.val2 = values.val2 + value;
          } else {
            if (values.val2 !== "0") {
              setDisplay(display + value);
              values.val2 = values.val2 + value;
            }
          }
          handleResultClick(value, false);
        }
      }
    } else {
      if (values.val1 !== "") {
        if (values.action !== null) {
          if (values.val2 !== "") handleResultClick(value, true);
          else setDisplay(display.slice(0, -1) + value);
          if (middleRes !== "Error") values.action = sign;
        } else {
          setDisplay(display + value);
          values.action = sign;
        }
      } else {
        if (display !== "0") {
          values.val1 = display;
          values.action = sign;
          setDisplay(display + value);
        }
      }
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setMiddleRes("");
    values.val1 = "";
    values.val2 = "";
    values.action = null;
  };

  const handleDeleteLast = () => {
    if (middleRes === "Error") setMiddleRes("");
    if (display !== "0") {
      if (display.length === 1) setDisplay("0");
      else setDisplay(display.slice(0, -1));
    }
    if (values.val2 !== "") values.val2 = values.val2.slice(0, -1);
    else {
      if (values.action !== null) values.action = null;
      else if (values.val1 !== "") {
        values.val1 = values.val1.slice(0, -1);
      }
    }
    handleResultClick("", false);
  };

  const handleResultClick = (actionType, finalResult) => {
    if (middleRes !== "Error") {
      if (values.val1 !== "" && values.val2 !== "" && values.action !== null) {
        let result;
        switch (values.action) {
          case 1:
            values.val2 === "0"
              ? (result = "Error")
              : (result = Number(values.val1) / Number(values.val2));
            break;
          case 2:
            result = Number(values.val1) * Number(values.val2);
            break;
          case 3:
            result = Number(values.val1) - Number(values.val2);
            break;
          case 4:
            result = Number(values.val1) + Number(values.val2);
            break;
          default:
            break;
        }
        if (result !== "Error") {
          result = String(result);
          if (finalResult) {
            setMiddleRes("");
            values.val2 = "";
            if (actionType === "") {
              setDisplay(result);
              values.val1 = "";
              values.action = null;
            } else {
              setDisplay(result + actionType);
              values.val1 = result;
            }
          } else setMiddleRes(result);
        } else setMiddleRes("Error");
      } else setMiddleRes("");
    }
  };

  return (
    <div className="calc">
      <div className="calc-display">{display}</div>
      <div className="calc-display-help">{middleRes}</div>
      <div className="calc-line">
        <button onClick={() => handleButtonClick("7", 0)}>7</button>
        <button onClick={() => handleButtonClick("8", 0)}>8</button>
        <button onClick={() => handleButtonClick("9", 0)}>9</button>
        <button
          onClick={() => handleButtonClick("÷", 1)}
          className="calc-action"
        >
          ÷
        </button>
      </div>
      <div className="calc-line">
        <button onClick={() => handleButtonClick("4", 0)}>4</button>
        <button onClick={() => handleButtonClick("5", 0)}>5</button>
        <button onClick={() => handleButtonClick("6", 0)}>6</button>
        <button
          onClick={() => handleButtonClick("×", 2)}
          className="calc-action"
        >
          ×
        </button>
      </div>
      <div className="calc-line">
        <button onClick={() => handleButtonClick("1", 0)}>1</button>
        <button onClick={() => handleButtonClick("2", 0)}>2</button>
        <button onClick={() => handleButtonClick("3", 0)}>3</button>
        <button
          onClick={() => handleButtonClick("–", 3)}
          className="calc-action"
        >
          –
        </button>
      </div>
      <div>
        <button
          onClick={() => handleButtonClick("0", 0)}
          className="calc-button button-3x"
        >
          0
        </button>
        <button
          onClick={() => handleButtonClick("+", 4)}
          className="calc-button calc-action"
        >
          +
        </button>
      </div>
      <div>
        <button onClick={handleClearClick} className="calc-button calc-clear">
          C
        </button>
        <button onClick={handleDeleteLast} className="calc-button calc-clear">
          «
        </button>
        <button
          onClick={() => handleResultClick("", true)}
          className="calc-button calc-action button-2x"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;