import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import CustomNoRowsOverlay from "./FallbackRowOverlay";
import { formatCurrency } from "../utils/collection";

const CampaignTable = (props) => {
  const { campaigns, filterText, filterDateRange, users } = useSelector(
    (state) => state.campaigns
  );
  const { status } = props;

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesText = campaign.name
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);

    const withinDateRange =
      (!filterDateRange.start ||
        startDate >= new Date(filterDateRange.start)) &&
      (!filterDateRange.end || endDate <= new Date(filterDateRange.end));

    return matchesText && withinDateRange;
  });

  const columns = [
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    {
      field: "userId",
      headerName: "User Name",
      flex: 1,
      valueGetter: (params) => {
        const userName = users.find((user) => user.id === params);
        return userName ? userName.name : "Unknown User";
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      sortable: true,
      valueFormatter: (params) => moment(params).format("DD/MM/YYYY"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      sortable: true,
      valueFormatter: (params) => moment(params).format("DD/MM/YYYY"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        const isActive =
          new Date() >= new Date(params.row.startDate) &&
          new Date() <= new Date(params.row.endDate);
        return (
          <Chip
            label={isActive ? "Active" : "Inactive"}
            color={isActive ? "success" : "error"}
          />
        );
      },
    },
    {
      field: "Budget",
      headerName: "Budget (USD)",
      flex: 1,
      type: "number",
      sortable: true,
      valueFormatter: (params) => formatCurrency(params),
    },
  ];

  // console.log("filteredCampaigns", filteredCampaigns);

  return (
    <Box sx={{ height: "auto", width: "100%", marginTop: 4 }}>
      <DataGrid
        rows={filteredCampaigns}
        columns={columns}
        disableSelectionOnClick
        sortingOrder={["desc", "asc"]}
        loading={status === "loading"}
        initialState={{
          ...filteredCampaigns,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{ "--DataGrid-overlayHeight": "300px" }}
      />
    </Box>
  );
};

export default CampaignTable;
