import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

// make get request async thunk, account for being able to search by name

export const getInventory = createAsyncThunk(
  "inventory/getInventory",
  async ({ storeId, productName }, { isRejectedWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        `${BASE_URL}stores/${storeId}/inventory`,
        config
      );

      return response.data.inventory;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
const inventorySLice = createSlice({
  name: "inventory",
  initialState: {
    inventory: [],
    errorMessage: "",
    singleProduct: {},
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(getInventory.fulfilled, (state, action) => {
      state.inventory = action.payload;
    });
  },
});

export default inventorySLice.reducer;
