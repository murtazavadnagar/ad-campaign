import { useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

const CampaignTable = () => {
  const { campaigns, filterText, filterDateRange, users } = useSelector(
    (state) => state.campaigns
  );

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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell
                style={{
                  color:
                    new Date() >= new Date(campaign.startDate) &&
                    new Date() <= new Date(campaign.endDate)
                      ? "green"
                      : "red",
                }}
              >
                {new Date() >= new Date(campaign.startDate) &&
                new Date() <= new Date(campaign.endDate)
                  ? "Active"
                  : "Inactive"}
              </TableCell>
              <TableCell>${campaign.Budget}</TableCell>
              <TableCell>
                {users.find((user) => user.id === campaign.userId)?.name ||
                  "Unknown User"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignTable;
