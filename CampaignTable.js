import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./src/redux/campaignSlice";
import CampaignTable from "./src/components/CampaignTable";

describe("CampaignTable Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        campaigns: campaignReducer,
      },
    });
  });

  it("should render campaign table headers", () => {
    render(
      <Provider store={store}>
        <CampaignTable status="idle" />
      </Provider>
    );

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Budget/i)).toBeInTheDocument();
    expect(screen.getByText(/User Name/i)).toBeInTheDocument();
  });
});
