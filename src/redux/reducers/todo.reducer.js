import { ADD_TODO, DELETE_TODO } from "../types";

const initialState = {
  todos: [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case DELETE_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};
