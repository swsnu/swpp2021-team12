import React, { useState, useEffect } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function MeetingCreate(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  const [isDisable, setIsDisable] = useState(false);
  const { onClickConfirmHandler, history } = props;

  useEffect(() => {
    if (title === '' || content === '') {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, content]);

  return (
    <div className="MeetingCreate">
      <Segment style={{ padding: '8em 10em' }} vertical>
        <Grid columns="3">
          <Grid.Column></Grid.Column>
          <Grid.Column id="meeting-create-column">
            <h1>Create New Meeting!</h1>
            <br />
            <Form
              id="meeting-create-form"
              onSubmit={() => {
                onClickConfirmHandler(title, content, maxMembers, history);
              }}
            >
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
                <Form.Button key="scope">Scope</Form.Button>
                <Form.Button key="location">Location</Form.Button>
                <Form.Button key="time">Time</Form.Button>
              </Grid>
              <Grid centered>
                <Form.Button
                  primary
                  className="ConfirmButton"
                  id="confirm-button"
                  disabled={isDisable}
                >
                  Confirm
                </Form.Button>
                <Form.Button
                  className="BackButton"
                  id="back-button"
                  onClick={() => history.push('/main')}
                >
                  Back
                </Form.Button>
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
