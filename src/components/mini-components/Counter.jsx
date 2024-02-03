import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Counter(props) {
  let count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const handleCount = () => {
    dispatch({ type: "increment", payload: count + 1 });
  };
  const handleMinus = () => {
    dispatch({ type: "decrement", payload: count - 1 });
  };
  const handleReset = () => [dispatch({ type: "reset", payload: 0 })];
  return (
    <div>
      <div>{count}</div>
      <button onClick={handleCount}>увеличить</button>
      <button onClick={handleMinus}>уменшить</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
}

export default Counter;
