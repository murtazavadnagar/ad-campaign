import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import SearchFilter from "../components/SearchFilter";
import { renderWithProviders } from "../utils/components/test-utils";

describe("SearchFilter Component", () => {
  it("should render the search input", () => {
    renderWithProviders(<SearchFilter />);

    expect(screen.getByPlaceholderText("Search Campaign")).toBeInTheDocument();
  });
});
