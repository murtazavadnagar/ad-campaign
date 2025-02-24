import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import DateRangeFilter from "../components/DateRangeFilter";
import { renderWithProviders } from "../utils/components/test-utils";

describe("DateRangeFilter Component", () => {
  it("should allow selecting a start date", () => {
    renderWithProviders(<DateRangeFilter />);

    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
  });
});
