import {
  CalculatorNumbers,
  CalculatorOps,
  CalculatorButtons,
  CalculatorScreen,
} from "./CalculatorParts";
import { useCallback, useReducer } from "react";
import styles from "./Calculator.module.css";

const Calculate = (state, action) => {
  let currentNumber = state.numbers[state.numbers.length - 1];
  let newNumbers = [...state.numbers];
  let newSymbols = [...state.symbols];
  let newAnswer = null;
  let goToNextNumber = false;

  if (action.type === "ADD_DIGIT") {
    currentNumber = currentNumber * 10 + action.payload;
  } else if (action.type === "REMOVE_DIGIT") {
    currentNumber = Math.floor(currentNumber / 10);
  } else if (action.type === "CLEAR") {
    return {
      numbers: [0],
      symbols: [],
      answer: null,
    };
  } else if (action.type === "CALCULATE") {
    //Create Math String like "20 + 5"
    let mathNotation = [];
    for (const key in newNumbers) {
      mathNotation.push(newNumbers[key]);
      if (key < newSymbols.length) {
        mathNotation.push(newSymbols[key]);
      }
    }

    const mathString = mathNotation.join(' ');
    if (/[A-Za-z]/.test(mathString)) {
      alert('That is not very nice! XSS is very rude, ya know!');
    }
    // DO NOT USE EVAL IN PRODUCTION ENIVRONMENT - very bad practice
    // Use/Make a parser instead.
    // Even VS Code hates this
    newAnswer = eval(mathString);

    newNumbers = [];
    newSymbols = [];
    currentNumber = newAnswer;
  } else if (action.type === "ADD_SYMBOL") {
    newSymbols = [...newSymbols, action.payload];
    goToNextNumber = true;
  }

  newNumbers.pop(); //remove last element
  newNumbers.push(currentNumber);

  if (goToNextNumber) {
    newNumbers.push(0);
  }

  return {
    numbers: newNumbers,
    symbols: newSymbols,
    answer: newAnswer,
  };
};

// '92' + dispatch ({type: 'ADD_DIGIT', payload: 9 }) => '929'
const Calculator = () => {
  const [numbers, dispatch] = useReducer(Calculate, {
    numbers: [0],
    symbols: [],
    answer: null,
  });

  const addDigitHandler = useCallback((digit) => {
    dispatch({ type: "ADD_DIGIT", payload: digit });
  }, []);

  const addSymbolHandler = useCallback((symbol) => {
    dispatch({ type: "ADD_SYMBOL", payload: symbol });
  }, []);

  const calculateHandler = useCallback(() => {
    dispatch({ type: "CALCULATE" });
  }, []);

  const removeDigitHandler = useCallback(() => {
    dispatch({ type: "REMOVE_DIGIT" });
  }, []);

  const clearHandler = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  return (
    <div className={styles["container"]}>
      <CalculatorScreen
        style={styles["screen"]}
        items={numbers}
        answer={numbers.answer}
      />
      <div className={styles["top-buttons-grid"]}>
        <CalculatorNumbers
          style={styles["number-grid"]}
          onAddDigit={addDigitHandler}
        />
        <CalculatorOps style={styles["ops"]} onAddSymbol={addSymbolHandler} />
      </div>
      <CalculatorButtons
        style={styles["bottom-buttons"]}
        onCalculate={calculateHandler}
        onRemoveDigit={removeDigitHandler}
        onClear={clearHandler}
      />
    </div>
  );
};

export default Calculator;
