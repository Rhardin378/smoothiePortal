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
      return isRejectedWithValue;
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "inventory/getSingleProduct",
  async ({ storeId, productId }, { isRejectedWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        `${BASE_URL}stores/${storeId}/inventory/${productId}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return isRejectedWithValue;
    }
  }
);

export const editInventoryItem = createAsyncThunk(
  "inventory, editInventoryItem",
  async (updatedProduct, { isRejectedWithValue }) => {
    const { productId, storeId } = updatedProduct;
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };

      const response = axios.put(
        `${BASE_URL}stores/${storeId}/inventory/${productId}`,
        updatedProduct,
        config
      );

      return response.data;
    } catch (error) {
      console.error(err);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addItemToInventory = createAsyncThunk(
  "inventory/addItemToInventory",
  async (
    { storeId, name, category, neededWeekly, inStock, units },
    { isRejectedWithValue }
  ) => {
    try {
      const newProduct = {
        name,
        category,
        neededWeekly,
        inStock,
        units,
      };
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.post(
        `${BASE_URL}stores/${storeId}/inventory`,
        newProduct,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
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
    builder
      .addCase(getInventory.fulfilled, (state, action) => {
        state.inventory = action.payload.inventory;
        state.count = action.payload.count;
      })

      .addCase(addItemToInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToInventory.fulfilled, (state, action) => {
        state.inventory.push(action.payload);
        state.count += 1;
        state.status = "succeeded";
      })
      .addCase(addItemToInventory.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage =
          action.payload || "Failed to add item to inventory";
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload.inventory;
        state.status = "succeeded";
      })
      .addCase(getSingleProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status("failed");
        state.errorMessage =
          action.payload || "failed to fetch item from inventory";
      })
      .addCase(editInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInventoryItem.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        if (action.payload && action.payload.product) {
        } else {
          state.error = "Invalid payload structure";
        }
      })
      .addCase(editInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inventorySLice.reducer;
