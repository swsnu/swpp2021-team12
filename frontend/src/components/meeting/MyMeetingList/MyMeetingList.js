import React from 'react';
import { Button, List, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Meeting({ meeting, history }) {
  return (
    <Segment>
      <List divided relaxed>
        <List.Item>
          <Button
            fluid
            className="meetingName"
            onClick={() => history.push(`/meeting/${meeting.id}`)}
          >
            {meeting.title}
          </Button>
        </List.Item>
      </List>
    </Segment>
  );
}

function MyMeetingList(props) {
  const { currentUser, history, myMeetingList } = props;

  return (
    <div
      className="MyMeetingList"
      style={{ marginTop: '5em', marginLeft: '15em', marginRight: '5em' }}
    >
      <Segment>
        <Header>Created Meetings</Header>
        {myMeetingList &&
          myMeetingList
            .filter((meeting) => meeting.author.id === currentUser)
            .map((meeting) => (
              <Meeting meeting={meeting} history={history} key={meeting.id} />
            ))}
      </Segment>
      <Segment>
        <Header>Joined Meetings</Header>
        {myMeetingList &&
          myMeetingList
            .filter((meeting) => meeting.author.id !== currentUser)
            .map((meeting) => (
              <Meeting meeting={meeting} history={history} key={meeting.id} />
            ))}
      </Segment>

      <Button
        secondary
        className="BackButton"
        onClick={() => history.push('/main')}
      >
        Back
      </Button>
    </div>
  );
}

export default withRouter(MyMeetingList);
