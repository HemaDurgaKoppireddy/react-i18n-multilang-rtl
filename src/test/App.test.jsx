import { render, screen } from "@testing-library/react";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";  // adjust path if needed

test("renders language switcher", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  expect(screen.getByText(/English/i)).toBeInTheDocument();
});
