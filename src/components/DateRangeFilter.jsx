import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Clear from "@mui/icons-material/Clear";

import { setFilterDateRange } from "../redux/campaignSlice";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleClear = (value) => {
    setDateRange({ ...dateRange, [value]: "" });
    dispatch(setFilterDateRange({ ...dateRange, [value]: "" }));
  };

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    dispatch(
      setFilterDateRange({ ...dateRange, [e.target.name]: e.target.value })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body1">Start Date</Typography>
        <TextField
          value={dateRange.start}
          type="date"
          fullWidth
          name="start"
          onChange={handleChange}
          size="small"
          variant="outlined"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body1">End Date</Typography>
        <TextField
          value={dateRange.end}
          type="date"
          fullWidth
          name="end"
          onChange={handleChange}
          size="small"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default DateRangeFilter;
