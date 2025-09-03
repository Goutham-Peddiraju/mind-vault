//authSlices

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/api";

export const registerUser = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await API.post("/api/auth/register", data);
    sessionStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await API.post("/api/auth/login", data);
    sessionStorage.setItem("token", res.data.token);
    return res.data;

  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});


// export const changePassword = createAsyncThunk(
//   "auth/change-password",
//   async ({ oldPassword, newPassword }, { rejectWithValue }) => {
//     try {
//       console.log('line 30')
//       const token = sessionStorage.getItem("token");
//       console.log(token);
//       const res = await API.post(
//         "/auth/change-password",
//         { oldPassword, newPassword },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // .addCase(changePassword.pending, (state) => {state.loading = true;state.error = null;})
      // .addCase(changePassword.fulfilled, (state) => {state.loading = false;})
      // .addCase(changePassword.rejected, (state, action) => {state.loading = false;state.error = action.payload;});
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
