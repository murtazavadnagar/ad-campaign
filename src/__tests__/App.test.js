/**
 * @vitest-environment jsdom
 */
import React from "react";
import { screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, {
  fetchUsers,
  addBulkCampaigns,
} from "../redux/campaignSlice";
import App from "../App";
import { renderWithProviders } from "../utils/components/test-utils";
import * as redux from "react-redux";

// Mock Redux hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("App Component", () => {
  let store;
  let dispatchMock;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        campaigns: campaignReducer,
      },
    });

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

  // it("should expose a global function `AddCampaigns`", async () => {
  //   renderWithProviders(<App />);

  //   expect(typeof window.AddCampaigns).toBe("function");

  //   const newCampaigns = [
  //     {
  //       id: 100,
  //       name: "TestCampaign",
  //       startDate: "2024-02-01",
  //       endDate: "2024-03-01",
  //       Budget: 5000,
  //       userId: 3,
  //     },
  //   ];

  //   act(() => {
  //     window.AddCampaigns(newCampaigns);
  //   });

  //   await waitFor(() =>
  //     expect(dispatchMock).toHaveBeenCalledWith(addBulkCampaigns(newCampaigns))
  //   );
  // });
});
