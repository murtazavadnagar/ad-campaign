import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, { setFilterDateRange } from "./src/redux/campaignSlice";
import DateRangeFilter from "./src/components/DateRangeFilter";
import * as redux from "react-redux";

describe("DateRangeFilter Component", () => {
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

  it("should allow selecting a start date", () => {
    render(
      <Provider store={store}>
        <DateRangeFilter />
      </Provider>
    );

    const startDateInput = screen.getByLabelText(/Start Date/i);
    fireEvent.change(startDateInput, { target: { value: "2024-02-01" } });

    expect(dispatchMock).toHaveBeenCalledWith(
      setFilterDateRange({ start: "2024-02-01", end: "" })
    );
  });
});
