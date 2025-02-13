import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterDateRange } from "../redux/campaignSlice";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    dispatch(
      setFilterDateRange({ ...dateRange, [e.target.name]: e.target.value })
    );
  };

  return (
    <div>
      <input type="date" name="start" onChange={handleChange} />
      <input type="date" name="end" onChange={handleChange} />
    </div>
  );
};

export default DateRangeFilter;
