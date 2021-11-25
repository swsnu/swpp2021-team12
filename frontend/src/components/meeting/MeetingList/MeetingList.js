import React, { useState } from 'react';
import { Button, List, Modal, Segment } from 'semantic-ui-react';
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

function MeetingList(props) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(false);
  const [time, setTime] = useState(false);
  const [tag, setTag] = useState(false);

  const { history, meetinglist } = props;

  return (
    <div style={{ marginTop: '2em', marginLeft: '15em', marginRight: '5em' }}>
      <Modal
        className="modal"
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button
            className="filterButton"
            onClick={() => {
              setLocation(true);
              setTime(false);
              setTag(false);
            }}
          >
            Filter
          </Button>
        }
      >
        <Modal.Header>Filter</Modal.Header>
        <Modal.Description>
          <Button
            className="location"
            onClick={() => {
              setLocation(true);
              setTime(false);
              setTag(false);
            }}
          >
            Location
          </Button>
          <Button
            className="time"
            onClick={() => {
              setLocation(false);
              setTime(true);
              setTag(false);
            }}
          >
            Time
          </Button>
          <Button
            className="tag"
            onClick={() => {
              setLocation(false);
              setTime(false);
              setTag(true);
            }}
          >
            #Tag
          </Button>
        </Modal.Description>
        <Modal.Description>
          {location === true && <h1>Should contain Map</h1>}
          {time === true && <h1>Should contain Calendar</h1>}
          {tag === true && <h1>Should contain list of tags</h1>}
        </Modal.Description>
        <Modal.Actions>
          <Button className="back" onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button
            className="confirm"
            content="Confirm"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>

      <Segment>
        {meetinglist &&
          meetinglist.map((meeting) => (
            <Meeting meeting={meeting} history={history} key={meeting.id} />
          ))}
      </Segment>

      <Button className="BackButton" onClick={() => history.push('/main')}>
        back
      </Button>
    </div>
  );
}

export default withRouter(MeetingList);
