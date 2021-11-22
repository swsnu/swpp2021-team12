import React, { useState, useEffect } from 'react';
import { Form, Grid, Segment, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MeetingMap from './MeetingMap';

function MeetingCreate(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  const [isDisable, setIsDisable] = useState(false);
  const [location, setLocation] = useState(null);
  const { onClickConfirmHandler, history } = props;

  const locationHandler = (currentLocation, description) => {
    setLocation({ position: currentLocation, description });
  };

  useEffect(() => {
    if (title === '' || content === '' || !location) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, content, location]);

  return (
    <div className="MeetingCreate">
      <Segment style={{ padding: '8em 10em' }} vertical>
        <Grid columns="3">
          <Grid.Column></Grid.Column>
          <Grid.Column id="meeting-create-column">
            <h1>Create New Meeting!</h1>
            <br />
            <Form id="meeting-create-form">
              <Form.Input
                className="MeetingTitleInput"
                id="meeting-title-input"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.TextArea
                className="MeetingContentInput"
                id="meeting-content-input"
                label="Content"
                style={{ minHeight: 200 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Input
                className="MeetingMaxMembersInput"
                id="meeting-max-members-input"
                label={`Maximum Members: ${maxMembers}`}
                type="range"
                value={maxMembers}
                min="0"
                max="20"
                onChange={(e) => setMaxMembers(e.target.value)}
              />
              <Grid centered>
                <Form.Select options={[{}]} />
              </Grid>
              <Grid centered>
                <Button size="small" key="scope">
                  Scope
                </Button>
                <MeetingMap
                  location={location}
                  locationHandler={locationHandler}
                />
                <Button size="small" key="time">
                  Time
                </Button>
              </Grid>
              <Grid centered>
                <Button
                  primary
                  size="small"
                  className="ConfirmButton"
                  id="confirm-button"
                  disabled={isDisable}
                  onClick={() =>
                    onClickConfirmHandler(title, content, maxMembers, history)
                  }
                >
                  Confirm
                </Button>
                <Button
                  size="small"
                  className="BackButton"
                  id="back-button"
                  onClick={() => history.push('/main')}
                >
                  Back
                </Button>
              </Grid>
            </Form>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}
export default withRouter(MeetingCreate);
