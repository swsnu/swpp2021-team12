import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import UserInfo from '../../UserInfo';

function Pending({ pending, onClickHandleRequest }) {
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
            <Button onClick={() => onClickHandleRequest(pending.id, 1)} primary>
              Accept
            </Button>
            <Button onClick={() => onClickHandleRequest(pending.id, 0)}>
              Refuse
            </Button>
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Segment>
  );
}

function MyRoomPending(props) {
  const { history, pendinglist, onClickHandleRequest } = props;
  return (
    <div>
      <Segment>
        {pendinglist &&
          pendinglist.map((pending) => (
            <Pending
              history={history}
              pending={pending}
              onClickHandleRequest={onClickHandleRequest}
              key={pending.id}
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
