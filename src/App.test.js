import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { DATA } from "../Data/Data";
import BlogPosts from "./components/BlogPosts";
import NewPost from "./components/NewPost";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(DATA),
  });
});

describe("Test <App /> component", () => {

  it("render <App /> with api request", async () => {
    render(<App />);
  });

  it("return each title after fatch", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    DATA.forEach((d) => expect(screen.getByText(d.title)));
  });


  it("post data to api", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    userEvent.type(screen.getByRole("textbox"), "my blog 6");
    userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("button")).not.toHaveTextContent;
    });
    expect(screen.getByText(/my blog 6/i));
  });

  it("button change after post the data", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    userEvent.type(screen.getByRole("textbox"), "my blog 6");
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent;
  });
});
