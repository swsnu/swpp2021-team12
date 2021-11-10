import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Pending({ pending }) {
  return (
    <Segment>
      <Segment.Group horizontal style={{ marginLeft: '10em' }}>
        <Segment>
          <h3>Name</h3>
          {pending.name}
        </Segment>
        <Segment>
          <h3>Content</h3>
          {pending.content}
        </Segment>
        <Segment>
          <h3>Time</h3>
          {pending.time}
        </Segment>
        <Segment>
          <h3>#People</h3>
          {pending.people}
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
