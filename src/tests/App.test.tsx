import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("<App/>", () => {
  test("should add items and remove then", async () => {
    const user = userEvent.setup();
    render(<App />);
    //search for the input
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();

    //search fot the form
    const form = screen.getByRole("form");
    expect(form).toBeDefined();

    const button = form.querySelector("button");
    expect(button).toBeDefined();

    const randomText = crypto.randomUUID();

    await user.type(input, randomText);
    await user.click(button!);

    //should have a list
    const list = screen.getByRole("list");
    expect(list).toBeDefined();

    expect(list.children.length).toBe(1);

    //should remove the item
    const item = screen.getByText(randomText);
    const removeBtn = item.querySelector("button");
    expect(removeBtn).toBeDefined();

    await user.click(removeBtn!);

    const noResult = screen.getByText("There are not items in the list");
    expect(noResult).toBeDefined();
  });
});
