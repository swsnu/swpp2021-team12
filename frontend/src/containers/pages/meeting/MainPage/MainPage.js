import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Main from '../../../../components/meeting/Main';

import PageTemplate from '../../../common/PageTemplate';

function MainPage(props) {
  const { history } = props;

  const tmpMeetings = [
    {
      id: 1,
      title: '방앗간',
      content: '펌프한판',
      author: '박준혁',
      current_members: 2,
      max_members: 10,
      location: { lat: 37.480355481455156, lng: 126.95128715205064 },
    },
    {
      id: 2,
      title: '셔틀',
      content: '학교가자',
      author: '나',
      current_members: 0,
      max_members: 10,
      location: { lat: 37.47983733098333, lng: 126.95239554362205 },
    },
    {
      id: 3,
      title: 't1',
      content: 'ttt',
      author: 'auth',
      current_members: 0,
      max_members: 10,
      location: { lat: 37.47890503607602, lng: 126.95105980352197 },
    },
  ];
  const tmpRooms = [
    {
      id: 1,
      title: '준혁텔',
      content: '꺼져',
      location: { lat: 37.478436428086965, lng: 126.94871550291282 },
    },
  ];

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
            <Menu.Item as="a">
              <Icon name="calendar alternate" />
              My Meetnigs
            </Menu.Item>
            <Menu.Item as="a">
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
              <Main meetings={tmpMeetings} rooms={tmpRooms} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default MainPage;
