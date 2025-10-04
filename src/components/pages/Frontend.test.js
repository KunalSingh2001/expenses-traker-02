import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Frontend from "./Frontend";


describe("Frontend component", () => {
  test("renders important texts", () => {
    render(
      <Provider store={store}>
        <Frontend />
      </Provider>
    );

    expect(screen.getByText("Add Expense"));
    expect(screen.getByText("Expense List"));
    expect(screen.getByText("Title"));
    expect(screen.getByText("Money Spent"));
    expect(screen.getByText("Category"));
    expect(screen.getByText("Actions"));
    expect(screen.getByText("Pizza"));
    expect(screen.getByText("500"));
    expect(screen.getByText("Food"));
    expect(screen.getByText("Add Expense"));
  });
});
