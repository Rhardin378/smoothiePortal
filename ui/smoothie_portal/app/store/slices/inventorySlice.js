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
  async ({ storeId, productName, pageNumber = 1 }, { isRejectedWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        params: {
          productName: productName,
          pageNumber: pageNumber,
        },
      };
      const response = await axios.get(
        `${BASE_URL}stores/${storeId}/inventory`,
        config
      );

      return response.data;
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
    count: 0,
    errorMessage: "",
    singleProduct: {},
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(getInventory.fulfilled, (state, action) => {
      state.inventory = action.payload.inventory;
      state.count = action.payload.count;
    });
  },
});

export default inventorySLice.reducer;
