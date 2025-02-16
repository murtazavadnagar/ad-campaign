import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterText } from "../redux/campaignSlice";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Clear from "@mui/icons-material/Clear";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const [onFilterText, setOnFilterText] = useState("");

  const handleFilterText = (e) => {
    setOnFilterText(e.target.value);
    dispatch(setFilterText(e.target.value));
  };

  const handleClear = () => {
    setOnFilterText("");
    dispatch(setFilterText(""));
  };

  return (
    <>
      <Typography variant="label" sx={{ visibility: "hidden" }}>
        Search
      </Typography>
      <TextField
        value={onFilterText}
        placeholder="Search Campaign"
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleFilterText}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                sx={{
                  visibility: onFilterText.length > 0 ? "visible" : "hidden",
                }}
              >
                <IconButton onClick={handleClear}>
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export default SearchFilter;
