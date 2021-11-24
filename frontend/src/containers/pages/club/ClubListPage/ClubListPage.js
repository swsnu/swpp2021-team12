import React from 'react';

import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import PageTemplate from '../../../common/PageTemplate';
import ClubList from '../../../../components/club/ClubList';

function ClubListPage(props) {
  const { history } = props;

  return (
    <div>
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
            <Menu.Item as="a" onClick={() => history.push('/meeting/mylist')}>
              <Icon name="calendar alternate" />
              My Meetnigs
            </Menu.Item>
            <Menu.Item as="a" onClick={() => history.push('/club')}>
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
              <ClubList history={history} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default ClubListPage;
