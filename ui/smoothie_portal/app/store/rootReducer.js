import { combineReducers } from "redux";

import authReducer from "./slices/authSlice.js";
import inventoryReducer from "./slices/inventorySlice.js";
import truckOrdersReducer from "./slices/truckOrdersSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
  truckOrders: truckOrdersReducer,
});

export default rootReducer;
