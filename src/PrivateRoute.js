import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import {  AuthContext } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {

  const { token } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            //to={{ pathname: "/login", state: { referer: props.location } }}
            to="/login"
          />
        )
      }
    />
  );
}

export default PrivateRoute;