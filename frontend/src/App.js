import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import SignInPage from './containers/pages/auth/SignInPage/SignInPage';
import SignUpPage from './containers/pages/auth/SignUpPage/SignUpPage';
import MainPage from './containers/pages/meeting/MainPage/MainPage';
import MeetingDetailPage from './containers/pages/meeting/MeetingDetailPage/MeetingDetailPage';
import MeetingListPage from './containers/pages/meeting/MeetingListPage/MeetingListPage';
import MeetingCreatePage from './containers/pages/meeting/MeetingCreatePage/MeetingCreatePage';
import MeetingEditPage from './containers/pages/meeting/MeetingEditPage/MeetingEditPage';
import MyProfilePage from './containers/pages/room/MyProfilePage/MyProfilePage';
import MyProfileEditPage from './containers/pages/room/MyProfileEditPage/MyProfileEditPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/sign_in" exact component={SignInPage} />
          <Route path="/sign_up" exact component={SignUpPage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/meeting" exact component={MeetingListPage} />
          <Route path="/meeting/:id" exact component={MeetingDetailPage} />
          <Route path="/meeting/:id/edit" exact component={MeetingEditPage} />
          <Route path="/meeting/create" exact component={MeetingCreatePage} />
          <Route path="/mypage" exact component={MyProfilePage} />
          <Route path="/mypage/edit" exact component={MyProfileEditPage} />
          <Redirect from="/" to="/sign_in" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
