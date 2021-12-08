import React, { useEffect, useState } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import axios from 'axios';
import Main from '../../../../components/meeting/Main/Main';
import PageTemplate from '../../../common/PageTemplate';
import * as meetingAPI from '../../../../lib/api/meetings';
import roomAPI from '../../../../lib/api/room';

function MainPage(props) {
  const [meetings, setMeetings] = useState(null);
  const [rooms, setRooms] = useState(null);
  const { history } = props;

  useEffect(() => {
    const meetingReducer = [];
    const roomReducer = [];
    axios
      .get(meetingAPI.meetings)
      .then((res) => {
        res.data.forEach((meeting) => {
          meetingReducer.push({ ...meeting, open: false });
        });
      })
      .then(() => {
        setMeetings(meetingReducer);
      });

    axios
      .get(roomAPI)
      .then((res) => {
        res.data.forEach((room) => {
          roomReducer.push({ ...room, open: false });
        });
      })
      .then(() => setRooms(roomReducer));
  }, []);

  return (
    <div className="MainPage">
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
              <Main meetings={meetings} rooms={rooms} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default MainPage;
