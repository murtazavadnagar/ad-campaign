import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, { addCampaign } from "./src/redux/campaignSlice";
import AddCampaignForm from "./src/components/AddCampaignForm";
import userEvent from "@testing-library/user-event";
import * as redux from "react-redux";

// Mock Redux dispatch
jest.mock("../redux/campaignSlice", () => ({
  addCampaign: jest.fn(),
}));

describe("AddCampaignForm Component", () => {
  let store;
  let dispatchMock;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        campaigns: campaignReducer,
      },
    });

    dispatchMock = jest.fn();
    jest.spyOn(redux, "useDispatch").mockReturnValue(dispatchMock);
  });

  it("should render the Add Campaign button", () => {
    render(
      <Provider store={store}>
        <AddCampaignForm />
      </Provider>
    );
    expect(screen.getByText(/Add Campaign/i)).toBeInTheDocument();
  });

  it("should validate and submit form", async () => {
    render(
      <Provider store={store}>
        <AddCampaignForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Campaign/i));

    const nameInput = screen.getByPlaceholderText("Enter Campaign Name");
    const startDateInput = screen.getByPlaceholderText("Enter Start Date");
    const endDateInput = screen.getByPlaceholderText("Enter End Date");
    const budgetInput = screen.getByPlaceholderText("Enter Budget");
    const userIdInput = screen.getByPlaceholderText("Enter User ID");

    await userEvent.type(nameInput, "Test Campaign");
    await userEvent.type(startDateInput, "2024-02-01");
    await userEvent.type(endDateInput, "2024-03-01");
    await userEvent.type(budgetInput, "5000");
    await userEvent.type(userIdInput, "2");

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Campaign",
          startDate: "01/02/2024",
          endDate: "01/03/2024",
          Budget: "5000",
          userId: "2",
        })
      )
    );
  });
});
