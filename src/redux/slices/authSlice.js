import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  profile: null,
  loading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const {
  setAuthUser,
  setProfile,
  setLoading,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;