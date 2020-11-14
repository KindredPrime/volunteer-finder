import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import App from "../App";

describe("Nav Component", () => {
  const origStoredId = window.localStorage.getItem("userId");

  beforeAll(() => {
    if (origStoredId) {
      window.localStorage.removeItem("userId");
    }
  });

  afterEach(() => {
    if (window.localStorage.getItem("userId")) {
      window.localStorage.removeItem("userId");
    }
  });

  afterAll(() => {
    if (origStoredId) {
      window.localStorage.setItem("userId", origStoredId);
    }
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("expands and closes nav menu when 'Menu' is clicked", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.body).toMatchSnapshot();

    userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.body).toMatchSnapshot();
  })

  // Finish this test after the API is created
  it.skip("changes the nav when a user logs out", () => {
    window.localStorage.setItem("userId", 1);
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    userEvent.click(screen.getByText("Logout"));
    expect(screen.getByRole("navigation")).toMatchInlineSnapshot(`
      <nav
        class="Nav"
      >
        <a
          aria-current="page"
          class="active"
          href="/"
        >
          Home
        </a>
        <a
          href="/org-search"
        >
          Search Organizations
        </a>
        <a
          href="/login"
        >
          Login
        </a>
        <a
          href="/signup"
        >
          Sign Up
        </a>
      </nav>
    `);
  });
});
