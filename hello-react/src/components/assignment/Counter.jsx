import { useState } from "react";

const Counter = () => {
  const MIN_VAL = 0;
  const MAX_VAL = 100;
  const [counter, setCounter] = useState(0);

  const onIncreaseCounterHandler = () => {
    if (counter >= MAX_VAL) {
      return;
    }
    setCounter(counter + 1);
  };

  const onDecreaseCounterHandler = () => {
    if (counter <= MIN_VAL) {
      return;
    }
    setCounter(counter - 1);
  };

  return (
    <div className="wrapper counter">
      <button onClick={onDecreaseCounterHandler}>-</button>
      <div>{counter}</div>
      <button onClick={onIncreaseCounterHandler}>+</button>
    </div>
  );
};

export default Counter;
