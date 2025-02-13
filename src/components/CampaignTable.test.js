import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import CampaignTable from "../components/CampaignTable";

test("renders CampaignTable correctly", () => {
  render(
    <Provider store={store}>
      <CampaignTable />
    </Provider>
  );

  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Budget")).toBeInTheDocument();
});
