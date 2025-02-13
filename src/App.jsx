import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./redux/campaignSlice";
import CampaignTable from "./components/CampaignTable";
import SearchFilter from "./components/SearchFilter";
import DateRangeFilter from "./components/DateRangeFilter";
import AddCampaignForm from "./components/AddCampaignForm";

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.campaigns.status);
  const error = useSelector((state) => state.campaigns.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Campaign Manager</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <SearchFilter />
      <DateRangeFilter />
      <AddCampaignForm />
      <CampaignTable />
    </div>
  );
};

export default App;
