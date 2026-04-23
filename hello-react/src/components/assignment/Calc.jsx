import { useState } from "react";

const Calc = () => {
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [calcResult, setCalc] = useState(0);

  const onFirstNumberChangeHandler = (event) => {
    setFirstNum(parseFloat(event.target.value));
  };

  const onSecondNumberChangeHandler = (event) => {
    setSecondNum(parseFloat(event.target.value));
  };

  const onAddButtonHandler = () => {
    // console.log(typeof firstNum);
    // console.log(typeof secondNum);
    setCalc(firstNum + secondNum);
  };
  const onSubtractButtonHandler = () => {
    setCalc(firstNum - secondNum);
  };
  const onMultiplyButtonHandler = () => {
    setCalc(firstNum * secondNum);
  };
  const onDivideButtonHandler = () => {
    setCalc(firstNum / secondNum);
  };

  return (
    <div className="wrapper calc">
      <input type="number" onChange={onFirstNumberChangeHandler} />
      <div className="operator">
        <button onClick={onAddButtonHandler}>+</button>
        <button onClick={onSubtractButtonHandler}>-</button>
        <button onClick={onMultiplyButtonHandler}>*</button>
        <button onClick={onDivideButtonHandler}>/</button>
      </div>
      <input type="number" onChange={onSecondNumberChangeHandler} />=
      <div className="result">{calcResult}</div>
    </div>
  );
};

export default Calc;
