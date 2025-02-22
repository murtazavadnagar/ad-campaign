import React from "react";
import { waitFor, act } from "@testing-library/react";
import { renderWithProviders } from "../utils/components/test-utils";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "../redux/campaignSlice";
import App from "../App";

describe("App Integration Test", () => {
  it("should load users and display them correctly", async () => {
    const { store } = renderWithProviders(<App />, {
      store: configureStore({ reducer: { campaigns: campaignReducer } }),
    });

    await waitFor(() =>
      expect(store.getState().campaigns.status).toBe("succeeded")
    );
  });

  it("should update Redux store when calling `AddCampaigns`", async () => {
    const { store } = renderWithProviders(<App />, {
      store: configureStore({ reducer: { campaigns: campaignReducer } }),
    });

    expect(typeof window.AddCampaigns).toBe("function");

    const newCampaigns = [
      {
        id: 100,
        name: "Integration Test Campaign",
        startDate: "01/02/2024",
        endDate: "03/02/2024",
        Budget: "8000",
        userId: "3",
      },
    ];

    act(() => {
      window.AddCampaigns(newCampaigns);
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.campaigns.campaigns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 100,
            name: "Integration Test Campaign",
            startDate: "01/02/2024",
            endDate: "03/02/2024",
            Budget: "8000",
            userId: "3",
          }),
        ])
      );
    });
  });
});
