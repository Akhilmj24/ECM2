import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./cartService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  cartItems: [],
  amount: "",
  quantity: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
// export const cartAdd = createAsyncThunk(
//   "cart/add",
//   async (user, thunkAPI) => {
//     try {
//       return await authService.addCart(user);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // update: (state, action) => {
    //   state.amount = state.amount + 1;
    // },
    addcartStart: (state) => {
      state.isLoading = true;
    },
    addcartSuccess: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    addcartError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    updateStart: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    updateError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    removeSuccess: (state, action) => {
      state.isLoading = false;
      state.quantity = state.quantity + 1;
    },
  },
  // reducers: {
  //   reset: (state) => {
  //     state.isLoading = false;
  //     state.isSuccess = false;
  //     state.isError = false;
  //     state.message = "";
  //   },
  // },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(cartAdd.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(cartAdd.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = true;
  //       state.user = action.payload;
  //     })
  //     .addCase(cartAdd.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload;
  //       state.user = null;
  //     });
  // },
});
// export const { reset } = cartSlice.actions;
export const {
  updateError,
  updateStart,
  updateSuccess,
  addcartError,
  addcartStart,
  addcartSuccess,

  removeSuccess,
} = cartSlice.actions;
export default cartSlice.reducer;
