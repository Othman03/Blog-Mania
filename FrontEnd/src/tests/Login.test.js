import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../components/Login";

// Mock react-cookie to avoid actual cookie operations during tests
jest.mock("react-cookie", () => ({
  useCookies: () => [{}, jest.fn()],
}));

// Mock axios to avoid actual HTTP requests during tests
jest.mock("axios");

describe("Login component", () => {
  it("renders login form and handles submit", async () => {
    // Render the component
    render(<Login />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText("enter your username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByPlaceholderText("enter your password"), {
      target: { value: "testpassword" },
    });

    // Mock the axios.post method to resolve with a mock response
    require("axios").post.mockResolvedValue({
      data: { accessToken: "mockToken" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("log in"));

    // Wait for the submit handler to finish (e.g., asynchronous operations)
    await waitFor(() => {
      // Assert that setIsLogged and setCookie were called
      expect(
        require("../context/authContext").setIsLogged
      ).toHaveBeenCalledWith(true);
      expect(require("react-cookie").useCookies[1]).toHaveBeenCalledWith(
        "jwtToken",
        "mockToken",
        {
          path: "/",
        }
      );

      // Assert that navigation occurred
      expect(require("react-router-dom").useNavigate).toHaveBeenCalledWith(
        "/dashboard"
      );
    });
  });
});
