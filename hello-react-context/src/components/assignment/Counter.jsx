import { useState } from "react";
// Cache 사용하도록 변경.
// 함수 하나만 사용하도록 변경.
const Counter = () => {
  const MIN_VAL = 0;
  const MAX_VAL = 100;
  const [count, setCount] = useState(0);

  const onButtonClickHandler = (event) => {
    const className = event.target.classList.value;

    setCount((prevCount) => {
      if (className.includes("decrease")) {
        if (prevCount === 0) {
          return prevCount;
        }
        return prevCount - 1;
      } else if (className.includes("increase")) {
        if (prevCount === 100) {
          return prevCount;
        }
        return prevCount + 1;
      }

      return prevCount;
    });
  };

  return (
    <div className="wrapper counter">
      <button className="decrease" onClick={onButtonClickHandler}>
        -
      </button>
      <div>{count}</div>
      <button className="increase" onClick={onButtonClickHandler}>
        +
      </button>
    </div>
  );
};

export default Counter;
