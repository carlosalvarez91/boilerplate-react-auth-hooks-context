import React from "react";
import { BrowserRouter as Router,  Route, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./context/auth"
import LoginView from "./views/LoginView";
import StepsView from "./views/StepsView";
import './App.css';

function App(props) {

  return (
    <div className="app-container">
    <AuthProvider>
      <Router>
          <Route path="/login" component={LoginView} />
          <Route render={() => <Redirect to="/install" />} /> 
          <PrivateRoute exact path="/install" component={StepsView} />
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
