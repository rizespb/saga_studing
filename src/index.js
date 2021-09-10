import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./pages/App";
import store from "./redux/index";
import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import { Switch } from "react-router-dom";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

window.store = store;
