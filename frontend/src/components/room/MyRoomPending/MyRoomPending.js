import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import UserInfo from '../../UserInfo';

function Pending({ pending }) {
  return (
    <Segment>
      <Segment.Group horizontal style={{ marginLeft: '10em' }}>
        <Segment>
          <UserInfo user={pending.requester} />
        </Segment>
        <Segment>
          <h3>Content</h3>
          {pending.content}
        </Segment>
        <Segment>
          <h3>Time</h3>
          {pending.date.substr(0, 10)}
        </Segment>
        <Segment compact>
          <Button.Group vertical>
            <Button primary>Accept</Button>
            <Button>Refuse</Button>
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Segment>
  );
}

function MyRoomPending(props) {
  const { history, pendinglist } = props;
  return (
    <div>
      <Segment>
        {pendinglist &&
          pendinglist.map((pending) => (
            <Pending history={history} pending={pending} key={pending.id} />
          ))}
      </Segment>
      <Button
        className="BackButton"
        onClick={() => history.push('/mypage/room')}
      >
        {' '}
        Back{' '}
      </Button>
    </div>
  );
}

export default withRouter(MyRoomPending);
