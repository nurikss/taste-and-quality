import { combineReducers } from "redux";
import { reducer } from "./todo.reducer";
import { userReducer } from "./user.reducer";

export const rooReducer = combineReducers({
  todos: reducer,
  users: userReducer,
});
