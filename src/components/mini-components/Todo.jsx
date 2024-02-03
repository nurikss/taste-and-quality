import React, { useState } from "react";

function Todo({ todos, todo, setTodos, handleDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editInputValue, setEditInputValue] = useState(todo.text);
  const handleSaveTodo = (todoId) => {
    const newArr = [...todos];
    todos.forEach(({ id, text }, index) => {
      if (id === todoId) {
        newArr[index] = { id, text: editInputValue };
      }
    });
    setTodos(newArr);
    setIsEdit(false);
  };
  return (
    <div>
      {isEdit ? (
        <input
          value={editInputValue}
          onChange={(event) => setEditInputValue(event.target.value)}
        />
      ) : (
        todo.text
      )}
      <button onClick={() => handleDelete(todo.id)}>удалить</button>{" "}
      {isEdit ? (
        <button onClick={() => handleSaveTodo(todo.id)}>save</button> 
      ) : (
        <button onClick={() => setIsEdit(true)}>edit</button>
      )}
    </div>
  );
}

export default Todo;
