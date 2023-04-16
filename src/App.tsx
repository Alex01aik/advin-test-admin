import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import historyService from "./services/historyService";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router history={historyService.history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/dashboard" component={UsersPage} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </BrowserRouter>
  );
};

export default App;
