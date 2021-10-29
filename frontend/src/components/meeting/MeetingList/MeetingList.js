import React from 'react';
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
  const [open, setOpen] = React.useState(false);

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
              trigger={<Button>Filter</Button>}
            >
              <Modal.Header>Filter</Modal.Header>
              <Modal.Description>
                <Button>Location</Button>
                <Button>Time</Button>
                <Button>#Tag</Button>
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
