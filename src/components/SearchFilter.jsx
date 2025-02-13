import React from "react";
import { useDispatch } from "react-redux";
import { setFilterText } from "../redux/campaignSlice";

const SearchFilter = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Search Campaign..."
      onChange={(e) => dispatch(setFilterText(e.target.value))}
    />
  );
};

export default SearchFilter;
