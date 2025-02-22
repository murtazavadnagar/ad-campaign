import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/components/test-utils";
import AddCampaignForm from "../components/AddCampaignForm";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "../redux/campaignSlice";
import userEvent from "@testing-library/user-event";

describe("AddCampaignForm Integration Test", () => {
  it("should update Redux store when adding a campaign", async () => {
    const { store } = renderWithProviders(<AddCampaignForm />, {
      store: configureStore({ reducer: { campaigns: campaignReducer } }),
    });

    fireEvent.click(screen.getByText(/Add Campaign/i));

    const nameInput = screen.getByPlaceholderText("Enter Campaign Name");
    const startDateInput = screen.getByPlaceholderText("Enter Start Date");
    const endDateInput = screen.getByPlaceholderText("Enter End Date");
    const budgetInput = screen.getByPlaceholderText("Enter Budget");
    const userIdInput = screen.getByPlaceholderText("Enter User ID");

    await userEvent.type(nameInput, "Integration Test Campaign");
    await userEvent.type(startDateInput, "2024-05-01");
    await userEvent.type(endDateInput, "2024-06-01");
    await userEvent.type(budgetInput, "8000");
    await userEvent.type(userIdInput, "3");

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      const state = store.getState();
      expect(state.campaigns.campaigns).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Integration Test Campaign",
            startDate: "01/05/2024",
            endDate: "01/06/2024",
            Budget: 8000,
            userId: 3,
          }),
        ])
      );
    });
  });
});
