import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import PageTemplate from './PageTemplate';

function PageTemplateWithSidebar(props) {
  const { children, history, type } = props;

  const meetingItems = () => (
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
  );

  const clubItems = () => (
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
        id="item_clublist"
        as="a"
        onClick={() => history.push('/club/search')}
      >
        <Icon name="calendar alternate" />
        Show Whole Club List
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
  );

  const roomItems = () => (
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
  );

  function ChooseSideBar() {
    if (type === 'meeting') {
      return meetingItems();
    }
    if (type === 'club') {
      return clubItems();
    }
    if (type === 'room') {
      return roomItems();
    }
  }

  return (
    <div>
      <PageTemplate>
        <Sidebar.Pushable as={Segment}>
          <ChooseSideBar />
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

export default withRouter(PageTemplateWithSidebar);
