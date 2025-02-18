import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, { setFilterText } from "./src/redux/campaignSlice";
import SearchFilter from "./src/components/SearchFilter";
import * as redux from "react-redux";

describe("SearchFilter Component", () => {
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

  it("should render the search input", () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search Campaign")).toBeInTheDocument();
  });

  it("should update Redux state when typing in search box", () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search Campaign");

    fireEvent.change(searchInput, { target: { value: "Test Campaign" } });

    expect(dispatchMock).toHaveBeenCalledWith(setFilterText("Test Campaign"));
  });

  it("should clear input and reset Redux state when clicking clear button", () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search Campaign");

    // Type in search box
    fireEvent.change(searchInput, { target: { value: "New Search" } });
    expect(dispatchMock).toHaveBeenCalledWith(setFilterText("New Search"));

    // Click clear button
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(dispatchMock).toHaveBeenCalledWith(setFilterText(""));
  });
});
