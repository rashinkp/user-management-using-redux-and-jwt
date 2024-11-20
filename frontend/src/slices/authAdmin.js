import { createSlice } from "@reduxjs/toolkit";

// Safely get data from localStorage
const getInitialAdminInfo = () => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    return adminInfo ? JSON.parse(adminInfo) : null;
  } catch (error) {
    console.error("Error parsing admin info from localStorage:", error);
    return null;
  }
};

const initialState = {
  adminInfo: getInitialAdminInfo(),
};

const authAdminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.adminInfo = action.payload; 
      try {
        localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    adminLogout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { adminLogin, adminLogout } = authAdminSlice.actions;

export default authAdminSlice.reducer;
