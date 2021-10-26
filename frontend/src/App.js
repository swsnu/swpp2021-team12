import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import SignInPage from './containers/pages/auth/SignInPage/SignInPage';
import SignUpPage from './containers/pages/auth/SignUpPage/SignUpPage';
import MainPage from './containers/pages/meeting/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/sign_in" exact component={SignInPage} />
          <Route path="/sign_up" exact component={SignUpPage} />
          <Route path="/main" exact component={MainPage} />
          <Redirect from="/" to="/sign_in" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
