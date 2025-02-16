import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  clearError,
  addBulkCampaigns,
} from "./redux/campaignSlice";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid2";

import SearchFilter from "./components/SearchFilter";
import DateRangeFilter from "./components/DateRangeFilter";
import CampaignTable from "./components/CampaignTable";
import AddCampaignForm from "./components/AddCampaignForm";

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.campaigns.status);
  const error = useSelector((state) => state.campaigns.error);

  useEffect(() => {
    dispatch(fetchUsers());

    window.AddCampaigns = (newCampaigns) => {
      if (!Array.isArray(newCampaigns)) {
        console.error("AddCampaigns expects an array of campaigns.");
        return;
      }
      dispatch(addBulkCampaigns(newCampaigns));
      console.log("New campaigns added:", newCampaigns);
    };
  }, [dispatch]);

  useEffect(() => {
    if (error && error.length > 0) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error]);

  return (
    <Container fixed>
      <Typography variant="h4" align="center" sx={{ marginY: 4 }}>
        📢 Campaign Manager
      </Typography>

      <Grid container spacing={3} sx={{ flexGrow: 1, mb: 3 }}>
        <Grid
          size={{ xs: 12, sm: 8 }}
          offset={"auto"}
          sx={{ textAlign: "right" }}
        >
          {status === "failed" && (
            <Alert severity="error">{`${error} while fetching user details`}</Alert>
          )}
        </Grid>
        <Grid
          size={{ xs: 12, sm: 4 }}
          offset={"auto"}
          sx={{ textAlign: "right" }}
        >
          <AddCampaignForm />
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DateRangeFilter />
        </Grid>
        <Grid offset={{ xs: 0, md: 2 }} size={{ xs: 12, md: 4 }}>
          <SearchFilter />
        </Grid>
      </Grid>
      <CampaignTable status={status} />
    </Container>
  );
};

export default App;
