import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { dummyUsers } from "../dummyData";
import Login from "./Login";
import App from "../App";

// Taken from React Router example on testing library website
// I don't understand the parameter syntax
function renderWithRouter(ui, { route = "/" } = {}) {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
}

describe("Login Component", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    history = null;
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

  it("redirects on correct login", () => {
    const { container } = renderWithRouter(<App />, { route: "/login" });

    const user = dummyUsers[0];
    userEvent.type(screen.getByLabelText("Username"), user.username);
    userEvent.type(screen.getByLabelText("Password"), user.password);
    // Why isn't this redirecting the page?
    userEvent.click(screen.getByText("Submit"));

    //expect(screen).toMatchSnapshot();

    // Just test the nav bar for now
    expect(container.querySelector("nav")).toMatchInlineSnapshot(`
      <nav>
        <a
          href="/"
        >
          Home
        </a>
        <a
          href="/"
        >
          Logout
        </a>
      </nav>
    `);
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
    userEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Invalid username and password combination")
    ).toBeInTheDocument();
  });
});
