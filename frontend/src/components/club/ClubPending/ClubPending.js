import React from 'react';
import { Button, Segment, Image, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Pending({ pending, onClickHandleButton }) {
  return (
    <Segment>
      <Segment.Group horizontal style={{}}>
        <Segment>
          <Image src={`/api/user/${pending.id}/profile/`} avatar />
        </Segment>
        <Segment>
          <h3>Name</h3>
          {pending.name}
        </Segment>
        <Segment>
          <h3>Self-intro</h3>
          {pending.self_intro}
        </Segment>
        <Segment compact>
          <Button.Group vertical>
            <Button onClick={() => onClickHandleButton(pending.id, 1)} primary>
              Accept
            </Button>
            <Button
              color="red"
              onClick={() => onClickHandleButton(pending.id, 0)}
            >
              Refuse
            </Button>
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Segment>
  );
}

function ClubPending(props) {
  const { pendings, history, onClickHandleButton } = props;
  return (
    <div
      className="ClubPending"
      style={{ marginTop: '5em', marginLeft: '15em', marginRight: '5em' }}
    >
      <Segment>
        <Header size="huge">Who wants to join our club?</Header>
        {pendings &&
          pendings.map((pending) => (
            <Pending
              key={pending.id}
              pending={pending}
              onClickHandleButton={onClickHandleButton}
            />
          ))}
      </Segment>
      <Button
        secondary
        className="BackButton"
        onClick={() => history.push(`/club`)}
      >
        {' '}
        Back{' '}
      </Button>
    </div>
  );
}

export default withRouter(ClubPending);
