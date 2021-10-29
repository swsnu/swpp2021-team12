import React, { useState } from 'react';
import { Button, Grid, List, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Meeting({ meeting }) {
  return (
    <List divided relaxed>
      <List.Item>
        <Button>{meeting.MeetingName}</Button>
      </List.Item>
    </List>
  );
}

function MeetingList(props) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(false);
  const [time, setTime] = useState(false);
  const [tag, setTag] = useState(false);

  const { history, meetinglist } = props;

  return (
    <div>
      <Grid celled>
        <Grid.Row stretched>
          <Grid.Column>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button
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
                  onClick={() => {
                    setLocation(true);
                    setTime(false);
                    setTag(false);
                  }}
                >
                  Location
                </Button>
                <Button
                  onClick={() => {
                    setLocation(false);
                    setTime(true);
                    setTag(false);
                  }}
                >
                  Time
                </Button>
                <Button
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
                <Button onClick={() => setOpen(false)}>Back</Button>
                <Button
                  content="Confirm"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => setOpen(false)}
                  positive
                />
              </Modal.Actions>
            </Modal>

            {meetinglist.map((meeting) => (
              <Meeting
                meeting={meeting}
                key={meeting.id}
                onClick={() => history.push(`/meeting/${meeting.id}`)}
              />
            ))}
            <h1>You are full of bullshit</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Button onClick={() => history.push('/main')}>back</Button>
    </div>
  );
}

export default withRouter(MeetingList);
