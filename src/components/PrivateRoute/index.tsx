import React, { ReactNode } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import authService from "../../services/authService";
import styles from "./styles.module.css";

export interface IRouteProps extends RouteProps {
  defaultComponent?: ReactNode;
  component: React.FC<any>;
}

const PrivateRoute: React.FC<IRouteProps> = ({
  component: Component,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(props) =>
        authService.isAuth() ? (
          <>
            <button
              className={styles.logoutButton}
              onClick={authService.logout}
            >
              Log out
            </button>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
