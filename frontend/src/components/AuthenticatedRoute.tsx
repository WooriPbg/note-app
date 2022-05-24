import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext, Authentication } from "../lib/contextLib";


export default function AuthenticatedRoute({ children, ...rest }: any) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext() as Authentication;
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}