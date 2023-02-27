import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "./App";

describe("Given the App component", () => {
  describe("When it is render", () => {
    test('Then it should write in the screen "test"', () => {
      render(<App></App>);
      const element = screen.getByText(/test/i);
      expect(element).toBeInTheDocument();
    });
  });
});
