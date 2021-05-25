import React from "react";
import userEvent from "@testing-library/user-event";
import Event from "./Event";
import { render, waitFor, act } from "../../test-utils";
import * as AuthContext from "../../context/AuthContext";
import Fire from "../../firebase.config";

describe("Event", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("displays the not authorized page when no charity data is found associated to the user email", async () => {
      AuthContext.useAuth = () => ({
        currentUser: {
          email: "test1@test.com",
        },
      });
      Fire.db = {
        getCollection: () => ({
          where: () => ({
            get: jest.fn().mockResolvedValue({}),
          }),
        }),
      };
      const { getByText } = render(<Event />);
      await waitFor(() => {
        expect(getByText("Not authorized to view this page")).toBeInTheDocument();
      });
    });
    it("displays the right view when charity data could be found", async () => {
      AuthContext.useAuth = () => ({
        currentUser: {
          email: "test1@test.com",
        },
      });
      Fire.db = {
        getCollection: () => ({
          where: () => ({
            get: jest.fn().mockResolvedValue({
              docs: [
                {
                  data: () => ({
                    type: "charity",
                    username: "test user name",
                  }),
                },
              ],
            }),
          }),
        }),
      };
      const { queryByText, getByText } = render(<Event />);
      await waitFor(() => {
        expect(getByText("Schedule an Event")).toBeInTheDocument();
        expect(queryByText("Not authorized to view this page")).not.toBeInTheDocument();
      });
    });
    describe("Functionality", () => {
      it("displays the error when the user data couldnt be retireved", async () => {
        AuthContext.useAuth = () => ({
          currentUser: {
            email: "test1@test.com",
          },
        });
        Fire.db = {
          getCollection: () => ({
            where: () => ({
              get: jest.fn().mockRejectedValue({
                message: "user fetching failed",
              }),
            }),
          }),
        };
        const { queryByText, getByText } = render(<Event />);
        await waitFor(() => {
          expect(queryByText("Not authorized to view this page")).toBeInTheDocument();
          expect(getByText("user fetching failed")).toBeInTheDocument();
        });
      });
      it("submits the form correctly", async () => {
        AuthContext.useAuth = () => ({
          currentUser: {
            email: "test1@test.com",
          },
        });
        Fire.db = {
          getCollection: () => ({
            where: () => ({
              get: jest.fn().mockResolvedValue({
                docs: [
                  {
                    data: () => ({
                      type: "charity",
                      username: "test user name",
                    }),
                  },
                ],
              }),
            }),
            doc: () => ({
              set: jest.fn().mockResolvedValue({
                status: 200,
              }),
            }),
          }),
        };
        const { getByTestId, getByText } = render(<Event />);
        await act(async () => {
          await waitFor(() => {
            expect(getByText("Schedule an Event")).toBeInTheDocument();
          });
          userEvent.type(getByTestId("event-address"), "address");
          userEvent.type(getByTestId("event-item-list"), "item 1, item 2, item 3");
          userEvent.type(getByTestId("event-date"), "20/11/2020");
          userEvent.type(getByTestId("event-people-count"), "10");
          userEvent.click(getByTestId("event-post"));
          await waitFor(() => {
            expect(getByText("Event successfully created")).toBeInTheDocument();
          });
        });
      });
      it("shows the error when the writing of event fails", async () => {
        AuthContext.useAuth = () => ({
          currentUser: {
            email: "test1@test.com",
          },
        });
        Fire.db = {
          getCollection: () => ({
            where: () => ({
              get: jest.fn().mockResolvedValue({
                docs: [
                  {
                    data: () => ({
                      type: "charity",
                      username: "test user name",
                    }),
                  },
                ],
              }),
            }),
            doc: () => ({
              set: jest.fn().mockRejectedValue({
                message: "Event saving failed",
              }),
            }),
          }),
        };
        const { getByTestId, getByText } = render(<Event />);
        await act(async () => {
          await waitFor(() => {
            expect(getByText("Schedule an Event")).toBeInTheDocument();
          });
          userEvent.type(getByTestId("event-address"), "address");
          userEvent.type(getByTestId("event-item-list"), "item 1, item 2, item 3");
          userEvent.type(getByTestId("event-date"), "20/11/2020");
          userEvent.type(getByTestId("event-people-count"), "10");
          userEvent.click(getByTestId("event-post"));
          await waitFor(() => {
            expect(getByText("Event saving failed")).toBeInTheDocument();
          });
        });
      });
    });
  });
});