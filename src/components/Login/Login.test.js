import React from "react";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import firebase from "firebase";
import { render, waitFor, act } from "../../test-utils";
import Login from "./Login";

describe("Login", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("displays the necessary fields", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("login-email")).toBeInTheDocument();
      expect(getByTestId("login-password")).toBeInTheDocument();
      expect(getByTestId("login-submit-button")).toBeInTheDocument();
    });
  });
  describe("Functionality", () => {
    // faced  https://github.com/jsdom/jsdom/issues/2898. Hence form invalid cases are not written
    it("submits the form when the form fields are populated", async () => {
      const signInWithEmailAndPasswordMock = jest.fn().mockResolvedValueOnce({
        status: "OK",
      });
      firebase.auth = () => {
        return { signInWithEmailAndPassword: signInWithEmailAndPasswordMock };
      };
      const historyMock = createMemoryHistory({ initialEntries: ["/login"] });
      const { getByTestId } = render(<Login />, { contexts: { history: historyMock } });
      userEvent.type(getByTestId("login-email"), "test@test.com");
      userEvent.type(getByTestId("login-password"), "password");
      userEvent.click(getByTestId("login-submit-button"));
      await waitFor(() => {
        expect(getByTestId("login-submit-button")).toBeDisabled();
        expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith("test@test.com", "password");
        expect(historyMock.location.pathname).toEqual("/");
      });
    });
    it("displays an error when the api call is unsuccessful", async () => {
      const signInWithEmailAndPasswordMock = jest.fn().mockRejectedValueOnce({
        message: "something went wrong",
      });
      firebase.auth = () => {
        return { signInWithEmailAndPassword: signInWithEmailAndPasswordMock };
      };
      const { getByTestId, getByText } = render(<Login />);
      userEvent.type(getByTestId("login-email"), "test@test.com");
      userEvent.type(getByTestId("login-password"), "password");
      userEvent.click(getByTestId("login-submit-button"));
      expect(getByTestId("login-submit-button")).toBeDisabled();
      await act(async () => {
        await waitFor(() => {
          expect(getByTestId("login-alert")).toBeInTheDocument();
          expect(getByText("something went wrong")).toBeInTheDocument();
        });
      });
    });
  });
});