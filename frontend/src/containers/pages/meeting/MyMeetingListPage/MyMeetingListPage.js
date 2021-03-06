import React, { useState, useEffect } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import * as axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import MyMeetingList from '../../../../components/meeting/MyMeetingList/MyMeetingList';

function MyMeetingListPage(props) {
  const [myMeetings, setMyMeetings] = useState(null);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));
  const { history } = props;

  useEffect(() => {
    axios.get(`/api/meeting/joined/`).then((res) => {
      setMyMeetings(res.data);
    });
  }, []);

  return (
    <div className="MyMeetingListPage">
      <PageTemplate>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible
            width="thin"
          >
            <Menu.Item
              id="item_meetinglist"
              as="a"
              onClick={() => history.push('/meeting')}
            >
              <Icon name="list" />
              Show Whole Meetings
            </Menu.Item>
            <Menu.Item
              id="mymeeting-item"
              as="a"
              onClick={() => history.push('/meeting/mylist')}
            >
              <Icon name="calendar alternate" />
              My Meetnigs
            </Menu.Item>
            <Menu.Item
              id="myclublist-item"
              as="a"
              onClick={() => history.push('/club')}
            >
              <Icon name="address book outline" />
              My Club List
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment
              textAlign="center"
              vertical
              style={{ minHeight: 1000, padding: '1em 0em' }}
            >
              <MyMeetingList
                currentUser={parseInt(currentUser, 10)}
                myMeetingList={myMeetings}
                history={history}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default MyMeetingListPage;
