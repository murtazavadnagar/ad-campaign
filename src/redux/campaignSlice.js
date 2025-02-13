import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users from API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

// Initial Campaign Data
const initialCampaigns = [
  {
    id: 1,
    name: "Divavu",
    startDate: "2021-09-19",
    endDate: "2023-03-09",
    Budget: 88377,
    userId: 3,
  },
  {
    id: 2,
    name: "Jaxspan",
    startDate: "2023-11-21",
    endDate: "2024-02-21",
    Budget: 608715,
    userId: 6,
  },
  {
    id: 3,
    name: "Miboo",
    startDate: "2022-11-01",
    endDate: "2022-06-20",
    Budget: 239507,
    userId: 7,
  },
  {
    id: 4,
    name: "Trilith",
    startDate: "2022-08-25",
    endDate: "2022-11-30",
    Budget: 179838,
    userId: 1,
  },
  {
    id: 5,
    name: "Layo",
    startDate: "11/28/2017",
    endDate: "3/10/2023",
    Budget: 837850,
    userId: 9,
  },
  {
    id: 6,
    name: "Photojam",
    startDate: "7/25/2019",
    endDate: "6/23/2021",
    Budget: 858131,
    userId: 3,
  },
  {
    id: 7,
    name: "Blogtag",
    startDate: "6/27/2019",
    endDate: "1/15/2021",
    " Budget": 109078,
    userId: 2,
  },
  {
    id: 8,
    name: "Rhyzio",
    startDate: "10/13/2020",
    endDate: "1/25/2022",
    Budget: 272552,
    userId: 4,
  },
  {
    id: 9,
    name: "Zoomcast",
    startDate: "9/6/2021",
    endDate: "11/10/2023",
    Budget: 301919,
    userId: 8,
  },
  {
    id: 10,
    name: "Realbridge",
    startDate: "3/5/2021",
    endDate: "10/2/2026",
    Budget: 505602,
    userId: 5,
  },
];

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    campaigns: initialCampaigns,
    users: [],
    filterText: "",
    filterDateRange: { start: null, end: null },
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilterText, setFilterDateRange, addCampaign } =
  campaignSlice.actions;
export default campaignSlice.reducer;
