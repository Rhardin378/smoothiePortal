import {
  createSlice,
  createSelector,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//async thunk for getting all orders

export const getAllTruckOrders = createAsyncThunk(
  "truckOrders/getTruckOrders",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        `${BASE_URL}/users/${userId}/truckOrders`,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getTruckOrderById = createAsyncThunk(
  "truckOrders/getTruckOrderById",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      //   "/users/:userId/truckOrders/:truckOrderId",

      const response = await axios.get(
        `${BASE_URL}/users/${userId}/truckOrders/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const createTruckOrder = createAsyncThunk(
  "truckOrders/createTruckorder",
  async ({ storeId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };

      const response = await axios.post(
        `${BASE_URL}/stores/${storeId}/truckOrders`,
        {},
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

//async thunk for adding an order

//async thunk for editing an order

const truckOrderSlice = createSlice({
  name: "TruckOrders",
  initialState: {
    truckOrders: [],
    date: null,
    count: 0,
    errorMessage: "",
    singleTruckOrder: {},
    truckOrderId: "",
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTruckOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.truckOrders = action.payload.truckOrders;

        state.count = action.payload.count;
      })
      .addCase(getAllTruckOrders.pending, (state, action) => {
        state.status = "Pending";
        state.errorMessage = null;
      })
      .addCase(getAllTruckOrders.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage =
          action.payload || "failed to fetch all Truck Orders";
      })
      .addCase(createTruckOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.truckOrders.push(action.payload.truckOrder);
        state.truckOrderId = action.payload.truckOrder._id;
      })
      .addCase(createTruckOrder.pending, (state, action) => {
        state.status = "Pending";
        state.errorMessage = null;
      })
      .addCase(createTruckOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage =
          action.payload || "failed to create a new truck order";
      })
      .addCase(getTruckOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleTruckOrder = action.payload;
      })
      .addCase(getTruckOrderById.pending, (state, action) => {
        state.status = "Pending";
        state.errorMessage = null;
      })
      .addCase(getTruckOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload || "failed to fetch truck order";
      });
  },
});

// Selector to compute total cases for each truck order
export const selectTruckOrdersWithTotalCases = createSelector(
  (state) => state.truckOrders.truckOrders,
  (truckOrders) =>
    truckOrders.map((truckOrder) => ({
      ...truckOrder,
      totalCases: truckOrder.purchaseOrder.reduce(
        (acc, curr) => acc + curr.count,
        0
      ),
    }))
);

export default truckOrderSlice.reducer;
