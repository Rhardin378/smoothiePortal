import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

// Async action creators using createAsyncThunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, formProps);

      !isServer && localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/signin`, formProps);

      !isServer && localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to sign in. Please try again."
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(`${BASE_URL}/auth/current_user`, config);
      !isServer && localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: !isServer ? localStorage.getItem("token") : "",
    errorMessage: "",
    status: "idle",
    userId: null,
    email: null,
    name: null,
    role: null,
    store: {},
    truckOrders: null,
  },
  reducers: {
    resetAuth: (state) => {
      state.status = "idle";
      state.errorMessage = null;
    },
    signout: (state) => {
      !isServer && localStorage.removeItem("token");
      state.authenticated = "";
      state.userId = null;
      state.email = null;
      state.name = null;
      state.role = null;
      state.store = {};
      state.truckOrders = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        state.status = "success";
      })
      .addCase(signin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signin.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.status = "idle";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.userId = action.payload.userId;
        state.email = action.payload.email || null;
        state.name = action.payload.name;
        state.role = action.payload.role;
        state.store = action.payload.store;
      });
  },
});

export const { signout } = authSlice.actions;
export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
