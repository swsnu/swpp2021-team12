import React, { useState, useEffect } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import * as axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import ClubList from '../../../../components/club/ClubList/ClubList';

function ClubListPage(props) {
  const [clubs, setClubs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));
  const { history } = props;

  useEffect(() => {
    axios.get('/api/club/').then((res) => {
      setClubs(
        res.data.filter(
          (club) =>
            club.author.id === currentUser ||
            club.members.find((member) => member.id === currentUser),
        ),
      );
    });
  }, [refresh]);

  return (
    <div className="ClubListPage">
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
              <ClubList
                currentUser={parseInt(currentUser, 10)}
                // clubs={tempClubs}
                clubs={clubs}
                history={history}
                onClickDeleteButton={(id) => {
                  axios
                    .delete(`/api/club/${id}/`)
                    .then(setRefresh(!refresh))
                    .catch(() => {
                      window.alert('Error occured while deletion');
                    });
                }}
                onClickQuitButton={(id) => {
                  axios
                    .put(`/api/club/${id}/toggle/`, { joinOrQuit: 0 })
                    .then(setRefresh(!refresh))
                    .catch(() => {
                      window.alert('Error occured while quitting club');
                    });
                }}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </PageTemplate>
    </div>
  );
}

export default ClubListPage;
