import React from "react";
import * as redux from "react-redux";
import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/components/test-utils";
import AddCampaignForm from "../components/AddCampaignForm";
import { addCampaign } from "../redux/campaignSlice";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("AddCampaignForm Component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    redux.useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Add Campaign button", () => {
    renderWithProviders(<AddCampaignForm />);
    expect(screen.getByText(/Add Campaign/i)).toBeInTheDocument();
  });

  it("should open the form dialog when clicking the Add Campaign button", async () => {
    renderWithProviders(<AddCampaignForm />);

    fireEvent.click(screen.getByText(/Add Campaign/i));
    expect(screen.getByText(/Add New Campaign/i)).toBeInTheDocument();
  });

  it("should validate and submit form", async () => {
    renderWithProviders(<AddCampaignForm />);

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
          type: "campaigns/addCampaign",
          payload: expect.objectContaining({
            name: "Test Campaign",
            startDate: "01/02/2024",
            endDate: "01/03/2024",
            Budget: "5000",
            userId: "2",
          }),
        })
      )
    );
  });
});
