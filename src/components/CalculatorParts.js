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
        /* return (
          <Button
            sx={{ backgroundColor: "#cf8907" }}
            onClick={genFunc(props.onAddDigit, num)}
            variant="contained"
          >
            {num}
          </Button>
        ); */
        return <button onClick={genFunc(props.onAddDigit, num)}>{num}</button>;
      })}
    </div>
  );
});

export const CalculatorOps = memo((props) => (
  <div className={props.style}>
    {opArray.map((op) => (
      /* <Button
        onClick={genFunc(props.onAddSymbol, op)}
        variant="contained"
        sx={{ backgroundColor: "#cf8907", width: "50%" }}
      >
        {op}
      </Button> */
      <button onClick={genFunc(props.onAddSymbol, op)}>{op}</button>
    ))}
  </div>
));

export const CalculatorButtons = memo((props) => (
  <div className={props.style}>
    {/* <Button
      sx={{ backgroundColor: "#cf8907" }}
      onClick={genFunc(props.onRemoveDigit)}
      variant="contained"
    >
      BACK
    </Button> */}
    <button onClick={genFunc(props.onRemoveDigit)}>BACK</button>
    {/* <Button
      sx={{ backgroundColor: "#cf8907" }}
      onClick={genFunc(props.onClear)}
      variant="contained"
    >
      CLEAR
    </Button> */}
    <button onClick={genFunc(props.onClear)}>CLEAR</button>
    {/* <Button
      sx={{ backgroundColor: "#cf8907" }}
      onClick={genFunc(props.onCalculate)}
      variant="contained"
    >
      CALC
    </Button> */}
    <button onClick={genFunc(props.onCalculate)}>CALC</button>
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
