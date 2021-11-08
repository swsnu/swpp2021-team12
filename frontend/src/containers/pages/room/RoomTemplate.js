import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import PageTemplate from '../../common/PageTemplate';

function RoomTemplate(props) {
  const { history, children } = props;

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
              id="item_myprofile"
              as="a"
              onClick={() => history.push('/mypage')}
            >
              <Icon name="list" />
              My Profile
            </Menu.Item>
            <Menu.Item
              id="item_myroom"
              as="a"
              onClick={() => history.push('/mypage/room')}
            >
              <Icon name="address book outline" />
              My Room
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment
              textAlign="center"
              vertical
              style={{ minHeight: 1000, padding: '1em 0em' }}
            >
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default withRouter(RoomTemplate);
