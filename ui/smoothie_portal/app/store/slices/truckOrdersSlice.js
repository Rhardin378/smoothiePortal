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
  async ({ userId, pageNumber = 1 }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        params: {
          pageNumber: pageNumber,
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
// async thunk for getting a single truck Order
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
        `${BASE_URL}users/${userId}/truckOrders/${id}`,
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

//async thunk for editing an order
export const updateProductToOrder = createAsyncThunk(
  "truckOrders/editProductToOrder",
  async ({ userId, truckOrderId, productId, count }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      const updatedCount = { count: count };
      const response = axios.put(
        `${BASE_URL}users/${userId}/truckOrders/${truckOrderId}/productsToOrder/${productId}`,
        updatedCount,
        config
      );

      return response.data;
    } catch (error) {
      console.error(err);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductToOrder = createAsyncThunk(
  "truckOrders/deleteProductToOrder",
  async ({ userId, truckOrderId, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };

      const response = axios.delete(
        `${BASE_URL}users/${userId}/truckOrders/${truckOrderId}/productsToOrder/${productId}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error(err);
      return rejectWithValue(error.response.data);
    }
  }
);
//async thunk for editing an order
export const addProductToOrder = createAsyncThunk(
  "truckOrders/addProductToOrder",
  async (
    { truckOrderId, productId, storeId, count, name },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };
      const date = new Date();
      const product = {
        name: name,
        count: count,
        product: productId,
        lastUpdated: date,
      };
      const response = axios.post(
        `${BASE_URL}stores/${storeId}/truckOrders/${truckOrderId}/productsToOrder/`,
        product,
        config
      );

      return response.data;
    } catch (error) {
      console.error(err);
      return rejectWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(updateProductToOrder.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload && action.payload.productToOrder) {
          // find the object I'm updating and replace it with the new object
          const updatedProductId = action.payload.productToOrder._id;
          const productIndex = state.singleTruckOrder.purchaseOrder.findIndex(
            (product) => product._id === updatedProductId
          );
          if (productIndex !== -1) {
            state.singleTruckOrder.purchaseOrder[productIndex] =
              action.payload.productToOrder;
          } else {
            state.error = "Product not found in truck Order";
          }
        } else {
          state.error = "Invalid payload structure";
        }
      })
      .addCase(updateProductToOrder.pending, (state, action) => {
        state.status = "Pending";
        state.errorMessage = null;
      })
      .addCase(updateProductToOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage =
          action.payload || "failed to update product in truck order";
      })
      .addCase(addProductToOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addProductToOrder.pending, (state, action) => {
        state.status = "Pending";
        state.errorMessage = null;
      })
      .addCase(addProductToOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage =
          action.payload.message || "failed to create a new truck order";
      })
      .addCase(deleteProductToOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.status = "succeeded";

        // const deletedProductId = action.payload.productToOrderId; // Use the returned ID
        // state.singleTruckOrder.purchaseOrder =
        //   state.singleTruckOrder.purchaseOrder.filter(
        //     (product) => product._id !== deletedProductId
        //   );
      })

      .addCase(deleteProductToOrder.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.errorMessage = action.payload;
      })
      .addCase(deleteProductToOrder.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
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
