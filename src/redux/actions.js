import { ADD_TODO, DELETE_TODO } from "./types";

export const addTodoAction = (value) => async (dispatch) => {
  dispatch({
    type: ADD_TODO,
    payload: { todo: value, id: Date.now() },
  });
};
export const deleteTodoAction = (value) => async (dispatch) => {
  dispatch({
    type: DELETE_TODO,
    payload: {},
  });
};
