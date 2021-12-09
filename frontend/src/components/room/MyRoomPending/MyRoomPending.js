import React, { useEffect, useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../../UserInfo';

function Pending({ pending, pendingList, setPendingList }) {
  return (
    <Segment>
      <Segment.Group horizontal style={{ marginLeft: '10em' }}>
        <Segment>
          <UserInfo user={pending.requester} />
        </Segment>
        {/* <Segment>
          <h3>Content</h3>
          {pending.content}
        </Segment> */}
        <Segment>
          <h3>Time</h3>
          {pending.date.substr(0, 10)}
        </Segment>
        <Segment compact>
          <Button.Group vertical>
            <Button
              onClick={() => {
                axios
                  .put(`/api/room/host/pending/`, {
                    pending_id: pending.id,
                    accept_or_refuse: 1,
                  })
                  .then(() => {
                    setPendingList(
                      pendingList.filter((x) => x.id !== pending.id),
                    );
                  })
                  .then(() => {
                    window.alert('Successfully accepted!');
                    window.location.replace('/room');
                  })
                  .catch(() => {
                    'Error occured while handling a pending request';
                  });
              }}
              primary
            >
              Accept
            </Button>
            <Button
              onClick={() => {
                axios
                  .put(`/api/room/host/pending/`, {
                    pending_id: pending.id,
                    accept_or_refuse: 0,
                  })
                  .then(() => {
                    setPendingList(
                      pendingList.filter((x) => x.id !== pending.id),
                    );
                  })
                  .catch(() => {
                    'Error occured while handling a pending request';
                  });
              }}
            >
              Refuse
            </Button>
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Segment>
  );
}

function MyRoomPending(props) {
  const [pendingList, setPendingList] = useState(null);
  const { history, pendinglist } = props;
  useEffect(() => {
    if (pendinglist) {
      setPendingList(pendinglist);
    }
  }, [pendinglist]);
  return (
    <div>
      <Segment>
        {pendingList &&
          pendingList.map((pending) => (
            <Pending
              history={history}
              pending={pending}
              key={pending.id}
              pendingList={pendingList}
              setPendingList={setPendingList}
            />
          ))}
      </Segment>
      {/* <Button
        className="BackButton"
        onClick={() => history.push('/mypage/room')}
      >
        {' '}
        Back{' '}
      </Button> */}
    </div>
  );
}

export default withRouter(MyRoomPending);
