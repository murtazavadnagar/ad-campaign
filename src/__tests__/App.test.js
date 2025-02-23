import React from "react";
import * as redux from "react-redux";
import { screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fetchUsers, addBulkCampaigns } from "../redux/campaignSlice";
import App from "../App";
import { renderWithProviders } from "../utils/components/test-utils";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../redux/campaignSlice", () => ({
  ...jest.requireActual("../redux/campaignSlice"),
  fetchUsers: jest.fn(),
  addBulkCampaigns: jest.fn(),
}));

describe("App Component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    redux.useDispatch.mockReturnValue(dispatchMock);
    redux.useSelector.mockReturnValue({
      status: "idle",
      error: null,
      campaigns: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Campaign Manager heading", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/📢 Campaign Manager/i)).toBeInTheDocument();
  });

  it("should dispatch `fetchUsers` when app loads", async () => {
    renderWithProviders(<App />);

    await waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith(fetchUsers())
    );
  });

  it("should expose a global function `AddCampaigns`", async () => {
    renderWithProviders(<App />);

    expect(typeof window.AddCampaigns).toBe("function");

    const newCampaigns = [
      {
        id: 100,
        name: "TestCampaign",
        startDate: "2024-02-01",
        endDate: "2024-03-01",
        Budget: 5000,
        userId: 3,
      },
    ];

    act(() => {
      window.AddCampaigns(newCampaigns);
    });

    await waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith(addBulkCampaigns(newCampaigns))
    );
  });
});
