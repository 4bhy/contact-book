import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {  
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

const userLoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLogout: (state, action) => {
      state.userInfo = null;
      state.error = null;
    },
  },
});

export default userLoginSlice.reducer;
export const { userLoginSuccess, userLogout } =
  userLoginSlice.actions;
