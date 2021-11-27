import React, { useState, useEffect } from 'react';
import { Form, Grid, Segment, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MeetingMap from './MeetingMap';
import MeetingTime from './MeetingTime';
import Photo from '../../../containers/common/Photo';

function Meeting(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  const [isDisable, setIsDisable] = useState(false);
  const [location, setLocation] = useState({
    position: { lat: 37.45644261269604, lng: 126.94975418851041 },
    description: 'Welcome to new Meetnig!',
  });
  const [time, setTime] = useState(new Date());

  const [detailImageFile, setDetailImageFile] = useState(null);
  const [detailImageUrl, setDetailImageUrl] = useState(null);
  const [isImageModified, setIsImageModified] = useState(0);
  // 0: not modified 1: modified 2: deleted
  // 백엔드에 보낼땐 time.getTime()/1000 하면 unix 타임스탬프가 된다.
  const {
    onClickConfirmHandler,
    existingMeeting,
    existingPhoto,
    history,
    meetingId,
  } = props;

  const locationHandler = (currentLocation, description) => {
    setLocation({ position: currentLocation, description });
  };

  const timeHandler = (newValue) => {
    setTime(newValue);
  };

  useEffect(() => {
    if (existingMeeting) {
      setTitle(existingMeeting.title);
      setContent(existingMeeting.content);
      setMaxMembers(existingMeeting.maxMembers);
      setLocation(existingMeeting.location);
      setTime(existingMeeting.time);
      setDetailImageUrl(existingPhoto);
    }
  }, [existingMeeting, existingPhoto]);

  useEffect(() => {
    console.log(isDisable);
    if (title === '' || content === '' || !location || !time) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, content, location, time]);

  return (
    <div>
      <Segment style={{ padding: '8em 5em' }} vertical>
        <Grid columns="2">
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
                <Button size="small" key="scope">
                  Scope
                </Button>
                <MeetingMap
                  location={location}
                  locationHandler={locationHandler}
                />
                <MeetingTime time={time} timeHandler={timeHandler} />
              </Grid>
              <Grid centered>
                <Button
                  primary
                  size="small"
                  className="ConfirmButton"
                  id="confirm-button"
                  disabled={false}
                  onClick={() =>
                    onClickConfirmHandler(
                      title,
                      content,
                      maxMembers,
                      history,
                      detailImageFile,
                      isImageModified,
                      location,
                      time,
                    )
                  }
                >
                  Confirm
                </Button>
                <Button
                  size="small"
                  className="BackButton"
                  id="back-button"
                  onClick={() => {
                    if (meetingId) {
                      history.push(`/meeting/${meetingId}`);
                    } else {
                      history.push('/main');
                    }
                  }}
                >
                  Back
                </Button>
              </Grid>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Grid centered style={{ padding: '8em ' }} vertical>
              <Photo
                isCircular={false}
                photo={detailImageUrl}
                setDeatilImageFile={setDetailImageFile}
                setDetailImageUrl={setDetailImageUrl}
                setIsImageModified={setIsImageModified}
              />
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}
export default withRouter(Meeting);
