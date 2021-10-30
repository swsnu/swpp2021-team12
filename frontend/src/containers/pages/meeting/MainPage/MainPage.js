import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Main from '../../../../components/meeting/Main';

import PageTemplate from '../../../common/PageTemplate';

function MainPage() {
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
            <Menu.Item as="a">
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
              teatAlign="center"
              vertical
              style={{ minHeight: 1000, padding: '1em 0em' }}
            >
              <Main />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default MainPage;
