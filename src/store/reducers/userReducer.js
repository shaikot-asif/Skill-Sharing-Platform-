import { createSlice } from "@reduxjs/toolkit";

const userInitState = { userInfo: null };

const useSlice = createSlice({
  name: "user",
  initialState: userInitState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state, action) {
      state.userInfo = null;
    },
  },
});

const userActions = useSlice.actions;
const userReducer = useSlice.reducer;

export { userReducer, userActions };
