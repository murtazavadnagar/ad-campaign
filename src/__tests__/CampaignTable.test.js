import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import CampaignTable from "../components/CampaignTable";
import { renderWithProviders } from "../utils/components/test-utils";

describe("CampaignTable Component", () => {
  it("should render campaign table headers", () => {
    renderWithProviders(<CampaignTable status="idle" />);

    // expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Budget/i)).toBeInTheDocument();
    expect(screen.getByText(/User Name/i)).toBeInTheDocument();
  });
});
