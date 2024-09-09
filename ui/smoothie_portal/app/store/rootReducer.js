import { combineReducers } from "redux";

import authReducer from "./slices/authSlice.js";
import inventoryReducer from "./slices/inventorySlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
});

export default rootReducer;
