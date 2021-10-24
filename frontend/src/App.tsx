import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import SignInPage from './containers/pages/SignInPage/SignInPage';
import SignUpPage from './containers/pages/SignUpPage/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/sign_in" exact component={SignInPage} />
          <Route path="/sign_up" exact component={SignUpPage} />
          <Redirect from="/" to="/sign_in" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
