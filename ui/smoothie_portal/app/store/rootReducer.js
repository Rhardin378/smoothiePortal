import { combineReducers } from "redux";

import authReducer from "./slices/authSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
