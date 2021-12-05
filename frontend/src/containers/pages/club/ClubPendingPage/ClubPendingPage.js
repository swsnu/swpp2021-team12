import React, { useState, useEffect } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
// import { useSelector } from 'react-redux';

import * as axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import ClubPending from '../../../../components/club/ClubPending/ClubPending';

function ClubPendingPage(props) {
  const [pendings, setPendings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // const { currentUser } = useSelector(({ auth }) => ({
  //   currentUser: parseInt(auth.auth, 10),
  // }));
  const { history } = props;
  const { params } = props.match;

  useEffect(() => {
    axios.get(`/api/club/${params.id}/pending/`).then((res) => {
      setPendings(res.data);
    });
  }, [refresh]);
  return (
    <div className="ClubPendingPage">
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
              <ClubPending
                pendings={pendings}
                history={history}
                onClickHandleButton={(id, acceptOrRefuse) => {
                  axios
                    .put(`/api/club/${params.id}/pending/`, {
                      pending_id: id,
                      accept_or_refuse: acceptOrRefuse,
                    })
                    .then(setRefresh(!refresh))
                    .catch(() => {
                      window.alert(
                        'Error occured while handling a pending request',
                      );
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

export default ClubPendingPage;
