import React, { useState, useEffect } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import ClubSearch from '../../../../components/club/ClubSearch';

function ClubSearchPage(props) {
  const [clubList, setClubList] = useState([]);
  //* const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));
  const { history } = props;

  useEffect(() => {
    axios
      .get('/api/club/')
      .then((res) => {
        setClubList(res.data);
      })
      .catch(() => {
        alert('Error while getting club list!!');
      });
  }, []);

  return (
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
            <ClubSearch
              currentUser={parseInt(currentUser, 10)}
              clubList={clubList}
              history={history}
              onClickDeleteButton={(id) => {
                axios
                  .delete(`/api/club/${id}/`)
                  .then(() => {
                    setClubList(clubList.filter((x) => x.id !== id));
                  })
                  .catch(() => {
                    window.alert('Error occured while deletion');
                  });
              }}
              onClickToggleButton={(id, joinOrQuit) => {
                if (joinOrQuit) {
                  if (window.confirm('Sending join request to this club')) {
                    axios
                      .put(`/api/club/${id}/toggle/`, {
                        join_or_quit: joinOrQuit,
                      })
                      .then(() => {
                        window.location.replace('/club/search');
                      })
                      .catch(() => {
                        window.alert('error occured while joining club!');
                      });
                  }
                } else if (window.confirm('Are you sure quitting this club?')) {
                  axios
                    .put(`/api/club/${id}/toggle/`, {
                      join_or_quit: joinOrQuit,
                    })
                    .then(() => {
                      window.location.replace('/club/search');
                    })
                    .catch(() => {
                      window.alert('error occured while quitting club!');
                    });
                }
              }}
            />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </PageTemplate>
  );
}
export default ClubSearchPage;
