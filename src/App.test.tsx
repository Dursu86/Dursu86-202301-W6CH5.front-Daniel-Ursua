import { render, screen } from "@testing-library/react";
import { App } from "./app";

describe("Given the App component", () => {
  describe("When it is render", () => {
    test('Then it should write in the screen "test"', () => {
      render(<App></App>);
      const element = screen.getByText(/test/i);
      expect(element).toBeInTheDocument();
    });
  });
});
