import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userAgent } from "next/server";

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

      console.log(response, response.data.email);
      !isServer && localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      console.log(config);
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
    email: null,
    name: null,
    role: null,
    store: {},
    truckOrders: null,
  },
  reducers: {
    signout: (state) => {
      !isServer && localStorage.removeItem("token");
      state.authenticated = "";
      state.email = null;
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
      })
      .addCase(signin.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        state.name = action.payload.name;
        state.role = action.payload.role;
        state.store = action.payload.store;
      });
  },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
