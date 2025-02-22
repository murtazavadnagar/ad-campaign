/**
 * @vitest-environment jsdom
 */
import React from "react";
import * as redux from "react-redux";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { setFilterText } from "../redux/campaignSlice";
import SearchFilter from "../components/SearchFilter";
import { renderWithProviders } from "../utils/components/test-utils";

describe("SearchFilter Component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    // jest.spyOn(redux, "useDispatch").mockReturnValue(dispatchMock);
  });

  it("should render the search input", () => {
    renderWithProviders(
        <SearchFilter />
    );

    expect(screen.getByPlaceholderText("Search Campaign")).toBeInTheDocument();
  });

//   it("should update Redux state when typing in search box", () => {
//     renderWithProviders(
//         <SearchFilter />
//     );

//     const searchInput = screen.getByPlaceholderText("Search Campaign");

//     fireEvent.change(searchInput, { target: { value: "Test Campaign" } });

//     expect(dispatchMock).toHaveBeenCalledWith(setFilterText("Test Campaign"));
//   });

//   it("should clear input and reset Redux state when clicking clear button", () => {
//     renderWithProviders(
//         <SearchFilter />
//     );

//     const searchInput = screen.getByPlaceholderText("Search Campaign");

//     // Type in search box
//     fireEvent.change(searchInput, { target: { value: "New Search" } });
//     expect(dispatchMock).toHaveBeenCalledWith(setFilterText("New Search"));

//     // Click clear button
//     const clearButton = screen.getByRole("button");
//     fireEvent.click(clearButton);

//     expect(dispatchMock).toHaveBeenCalledWith(setFilterText(""));
//   });
});
