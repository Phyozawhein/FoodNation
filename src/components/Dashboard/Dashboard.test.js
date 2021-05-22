import { getAllByTestId, render, screen, waitFor } from "@testing-library/react";
// import ShallowRenderer from "react-test-renderer/shallow";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  test("renders charities if request succeeds", async () => {
    render(<Dashboard />);

    const cC = await waitFor(() => screen.getByTestId("card"));

    console.log(cC);
  });
});
