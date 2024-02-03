import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO } from "../../redux/types";
import { addTodoAction } from "../../redux/actions";

function TodoRedux(props) {
  const [inputValue, setInputValue] = useState("");
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const handleAddTodo = () => {
    dispatch(addTodoAction(inputValue));
  };
  return (
    <div>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={handleAddTodo}>add todo</button>

      {todos && todos.map((el) => <div>{el.todo}</div>)}
    </div>
  );
}

export default TodoRedux;
