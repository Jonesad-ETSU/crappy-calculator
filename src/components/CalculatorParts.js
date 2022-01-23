import Button from "@mui/material/Button";
import { memo } from "react";

const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const opArray = ["+", "-", "*", "/"];

const genFunc = (func, param) => {
  return () => {
    func(param);
  };
};

export const CalculatorNumbers = memo((props) => {
  return (
    <div className={props.style}>
      {numArray.map((num) => {
        return (
          <Button onClick={genFunc(props.onAddDigit, num)} variant="contained">
            {num}
          </Button>
        );
      })}
    </div>
  );
});

export const CalculatorOps = memo((props) => (
  <div className={props.style}>
    {opArray.map((op) => (
      <Button onClick={genFunc(props.onAddSymbol, op)} variant="contained" sx={{width: '50%'}}>
        {op}
      </Button>
    ))}
  </div>
));

export const CalculatorButtons = memo((props) => (
  <div className={props.style}>
    <Button onClick={genFunc(props.onRemoveDigit)} variant="contained">
      BACK
    </Button>
    <Button onClick={genFunc(props.onClear)} variant="contained">
      CLEAR
    </Button>
    <Button onClick={genFunc(props.onCalculate)} variant="contained">
      CALC
    </Button>
  </div>
));

export const CalculatorScreen = (props) => (
  <div className={props.style}>
    {props.items.numbers.map((number, i) => {
      if (i < props.items.symbols.length) {
        return (
          <span key={Math.random()}>
            {number}
            {props.items.symbols[i]}
          </span>
        );
      }
      return number;
    })}
  </div>
);

