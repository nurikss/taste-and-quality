import { ADD_USER } from "../types";

const initialState = {
  users: [],
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};
