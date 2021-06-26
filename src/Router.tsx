import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Result from "./Result";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={App} />
        <Route path="/result" component={Result} />
        {/* Not Found */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
