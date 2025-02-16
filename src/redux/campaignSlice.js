import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialCampaigns from "../utils/constants/campaign.json";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users = response.data.map((key) => {
    return { id: key.id, name: key.name };
  });
  return users;
});

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    campaigns: initialCampaigns,
    users: [],
    filterText: "",
    filterDateRange: { start: null, end: null },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    setFilterDateRange: (state, action) => {
      state.filterDateRange = action.payload;
    },
    addCampaign: (state, action) => {
      state.campaigns.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
    addBulkCampaigns: (state, action) => {
      state.campaigns.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setFilterText,
  setFilterDateRange,
  addCampaign,
  clearError,
  addBulkCampaigns,
} = campaignSlice.actions;
export default campaignSlice.reducer;
