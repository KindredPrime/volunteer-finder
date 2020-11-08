import ReactDOM from "react-dom";
import { BrowserRouter, Router, MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { dummyUsers } from "../dummyData";
import Login from "./Login";
import App from "../App";
import { after, before } from "lodash";

// Taken from React Router example on testing library website
// I don't understand the parameter syntax
function renderWithRouter(ui, { route = "/" } = {}) {
  window.history.pushState({}, "Start page", "/");
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
}

describe("Login Component", () => {
  const origStoredId = window.localStorage.getItem("userId");

  beforeAll(() => {
    if (origStoredId) {
      window.localStorage.removeItem("userId");
    }
  });

  let history;
  beforeEach(() => {
    history = createMemoryHistory();
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
        <Login history={history} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("redirects to user page on correct login", () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const user = dummyUsers[0];
    userEvent.type(screen.getByLabelText("Username"), user.username);
    userEvent.type(screen.getByLabelText("Password"), user.password);
    userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(document.body).toMatchSnapshot();
  });

  it("displays an error when incorrect username or password", () => {
    history.push("/login");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    userEvent.type(screen.getByLabelText("Username"), "wrong");
    userEvent.type(screen.getByLabelText("Password"), "wrongpassword");
    userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      screen.getByText("Invalid username and password combination")
    ).toBeInTheDocument();
  });
});
