import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import SignInPage from './containers/pages/auth/SignInPage/SignInPage';
import SignUpPage from './containers/pages/auth/SignUpPage/SignUpPage';
import MainPage from './containers/pages/meeting/MainPage/MainPage';
import MeetingListPage from './containers/pages/meeting/MeetingListPage/MeetingListPage';
import MyMeetingListPage from './containers/pages/meeting/MyMeetingListPage/MyMeetingListPage';
import MeetingCreatePage from './containers/pages/meeting/MeetingCreatePage/MeetingCreatePage';
import MeetingEditPage from './containers/pages/meeting/MeetingEditPage/MeetingEditPage';
import MyProfilePage from './containers/pages/room/MyProfilePage/MyProfilePage';
import MyProfileEditPage from './containers/pages/room/MyProfileEditPage/MyProfileEditPage';
import MyRoomPage from './containers/pages/room/MyRoomPage/MyRoomPage';
import MyRoomRegisterPage from './containers/pages/room/MyRoomRegisterPage/MyRoomRegisterPage';
import MyRoomEditPage from './containers/pages/room/MyRoomEditPage/MyRoomEditPage';
import MyRoomPendingPage from './containers/pages/room/MyRoomPending/MyRoomPendingPage';
import RoomDetailPage from './containers/pages/room/RoomDetailPage/RoomDetailPage';
import MeetingDetailPage from './containers/pages/meeting/MeetingDetailPage/MeetingDetailPage';
import ClubListPage from './containers/pages/club/ClubListPage/ClubListPage';
import ClubCreatePage from './containers/pages/club/ClubCreatePage/ClubCreatePage';
import ClubEditPage from './containers/pages/club/ClubEditPage/ClubEditPage';
import ClubSearchPage from './containers/pages/club/ClubSearchPage/ClubSearchPage';
import ClubPendingPage from './containers/pages/club/ClubPendingPage/ClubPendingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/sign_in" exact component={SignInPage} />
          <Route path="/sign_up" exact component={SignUpPage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/meeting" exact component={MeetingListPage} />
          <Route path="/meeting/mylist" exact component={MyMeetingListPage} />
          <Route path="/meeting/create" exact component={MeetingCreatePage} />
          <Route path="/meeting/:id" exact component={MeetingDetailPage} />
          <Route path="/meeting/:id/edit" exact component={MeetingEditPage} />
          <Route path="/mypage" exact component={MyProfilePage} />
          <Route path="/mypage/edit" exact component={MyProfileEditPage} />
          <Route path="/mypage/room" exact component={MyRoomPage} />
          <Route
            path="/mypage/room/register"
            exact
            component={MyRoomRegisterPage}
          />
          <Route path="/mypage/room/edit" exact component={MyRoomEditPage} />
          <Route
            path="/mypage/room/pending"
            exact
            component={MyRoomPendingPage}
          />
          <Route path="/room/:id" exact component={RoomDetailPage} />
          <Route path="/club" exact component={ClubListPage} />
          <Route path="/club/create" exact component={ClubCreatePage} />
          <Route path="/club/:id/edit" exact component={ClubEditPage} />
          <Route path="/club/:id/pending" exact component={ClubPendingPage} />
          <Route path="/club/search" exact component={ClubSearchPage} />
          <Redirect from="/" to="/sign_in" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
