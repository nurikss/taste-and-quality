import { applyMiddleware, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { rooReducer } from "./reducers/root.reducer";

export const store = legacy_createStore(rooReducer, applyMiddleware(thunk));
