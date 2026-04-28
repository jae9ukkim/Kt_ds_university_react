import { useState } from "react";

const Calc = () => {
  // const [firstNum, setFirstNum] = useState(0);
  // const [secondNum, setSecondNum] = useState(0);
  // const [resultNum, setCalc] = useState(0);
  const [{ firstNum, secondNum, resultNum }, setNums] = useState({
    firstNum: 10,
    secondNum: 20,
    resultNum: 30,
  });

  const onFirstNumberChangeHandler = (event) => {
    // setFirstNum(parseFloat(event.target.value));
    setNums((prevNums) => {
      const newNums = { ...prevNums, firstNum: parseFloat(event.target.value) };
      return newNums;
    });
  };

  const onSecondNumberChangeHandler = (event) => {
    // setSecondNum(parseFloat(event.target.value));
    setNums((prevNums) => {
      const newNums = {
        ...prevNums,
        secondNum: parseFloat(event.target.value),
      };
      return newNums;
    });
  };

  const onCalcButtonClickHandler = (operator) => {
    // console.log(event, operator);
    let resultNum = 0;

    if (operator === "+") {
      // setCalc(firstNum + secondNum);
      resultNum = firstNum + secondNum;
    } else if (operator === "-") {
      // setCalc(firstNum - secondNum);
      resultNum = firstNum - secondNum;
    } else if (operator === "*") {
      // setCalc(firstNum * secondNum);
      resultNum = firstNum * secondNum;
    } else if (operator === "/") {
      // setCalc(firstNum / secondNum);
      resultNum = firstNum / secondNum;
    }

    setNums((prevNums) => {
      const newNums = { ...prevNums, resultNum };
      return newNums;
    });
  };

  return (
    <div className="wrapper calc">
      <input
        type="number"
        onChange={onFirstNumberChangeHandler}
        value={firstNum}
      />
      <div className="operator">
        <button onClick={onCalcButtonClickHandler.bind(this, "+")}>+</button>
        <button onClick={onCalcButtonClickHandler.bind(this, "-")}>-</button>
        <button onClick={onCalcButtonClickHandler.bind(this, "*")}>*</button>
        <button onClick={onCalcButtonClickHandler.bind(this, "/")}>/</button>
      </div>
      <input
        type="number"
        onChange={onSecondNumberChangeHandler}
        value={secondNum}
      />
      =<div className="result">{resultNum}</div>
    </div>
  );
};

export default Calc;
