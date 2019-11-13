import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/myReducer";

export default createStore(
rootReducer, 
applyMiddleware(thunk)
);