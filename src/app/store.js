
import { createStore, combineReducers } from "redux";
import { courseReducer } from "./reducers/CourseReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    course: courseReducer,
  })

export default createStore(reducer, composeWithDevTools());
