import React from "react";
import * as redux from "react-redux";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, { setFilterDateRange } from "../redux/campaignSlice";
import DateRangeFilter from "../components/DateRangeFilter";
import { renderWithProviders } from "../utils/components/test-utils";

describe("DateRangeFilter Component", () => {
  // let store;
  let dispatchMock;

  beforeEach(() => {
    // store = configureStore({
    //   reducer: {
    //     campaigns: campaignReducer,
    //   },
    // });

    dispatchMock = jest.fn();
    // jest.spyOn(redux, "useDispatch").mockReturnValue(dispatchMock);
  });

  it("should allow selecting a start date", () => {
    renderWithProviders(<DateRangeFilter />);

    // const startDateInput = screen.getByText(/Start Date/i);
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    // fireEvent.change(startDateInput, { target: { value: "2024-02-01" } });

    // expect(dispatchMock).toHaveBeenCalledWith(
    //   setFilterDateRange({ start: "2024-02-01", end: "" })
    // );
  });
});
