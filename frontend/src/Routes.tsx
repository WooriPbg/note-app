import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFount";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path='/login'>
          <Login />
      </Route>

      {/* 404 Page */}
      <Route>
          <NotFound />
      </Route>
    </Switch>
  );
}