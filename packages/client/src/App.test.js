import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.adapter = require("axios/lib/adapters/http");

import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import nock from "nock";
import { baseUrl } from "./config/config";

describe("submit", () => {
  it("should render form", async () => {
    const div = document.createElement("div");
    const { queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );

    expect(queryByTestId("form")).toBeTruthy();
  });

  describe("success", () => {
    beforeEach(() => {
      nock(baseUrl)
        .post("/user")
        .reply(200, { data: "Hello Dhiti Painter!" });
    });
    it("should show success  message", async () => {
      const firstName = 'Dhiti';
      const lastName = 'Painter';
      const successResult = `Hello ${firstName} ${lastName}!`;
      const div = document.createElement("div");
      const { queryByTestId } = render(
        <Provider store={store}>
          <App />
        </Provider>,
        div
      );
      // set input values
      queryByTestId("firstName").getElementsByTagName("input")[0].value = firstName;
      queryByTestId("lastName").getElementsByTagName("input")[0].value = lastName
      // act
      fireEvent.click(queryByTestId("button"));
      await waitForDomChange(() => {});
      // assert
      expect(queryByTestId("button").textContent).toBe("Submit");
      expect(queryByTestId("message").textContent).toBe(successResult);
    });
  });

  describe("error", () => {
    beforeEach(() => {
      beforeEach(() => {
        jest.spyOn(toast, 'openToasterInfo').mockReturnValue(123);
        jest.spyOn(toast, 'closeToasterSuccess').mockReturnValue();
        jest.spyOn(toast, 'closeToasterFail');
      });
      nock(baseUrl)
        .post("/user")
        .reply(422, {
          errors: [
            {
              value: "d",
              msg: "Invalid value",
              param: "firstName",
              location: "body",
            },
            {
              value: "k",
              msg: "Invalid value",
              param: "lastName",
              location: "body",
            },
          ],
        });
    });
    it("error message", async () => {
      const div = document.createElement("div");
      const { queryByTestId } = render(
        <Provider store={store}>
          <div data-testid="error">{toast.configure()}</div>
          <App />
        </Provider>,
        div
      );

      expect(queryByTestId("button").textContent).toBe("Submit");
      fireEvent.click(queryByTestId("button"));
      await waitForDomChange(() => {});
     
      expect(queryByTestId("error")).toBeTruthy();
      expect(toast.done(123));
    });
  });
});
