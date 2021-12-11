import React, { useState, useEffect } from 'react';
import { Form, Grid, Segment, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MeetingScope from './MeetingScope';
import MeetingMap from './MeetingMap';
import MeetingTime from './MeetingTime';
import Photo from '../../../containers/common/Photo';

function Meeting(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  const [isDisable, setIsDisable] = useState(false);
  const [scope, setScope] = useState(null);
  const [location, setLocation] = useState(null);
  const [time, setTime] = useState(null);

  const [detailImageFile, setDetailImageFile] = useState(null);
  const [detailImageUrl, setDetailImageUrl] = useState(null);
  const [isImageModified, setIsImageModified] = useState(0);
  // 0: not modified 1: modified 2: deleted
  // 백엔드에 보낼땐 time.getTime()/1000 하면 unix 타임스탬프가 된다.
  const {
    currentUser,
    onClickConfirmHandler,
    existingMeeting,
    existingPhoto,
    history,
    meetingId,
    clubs,
  } = props;

  const scopeHandler = (isPublic, selectedClubs) => {
    setScope({ isPublic, selectedClubs });
  };

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
      setTime(new Date(existingMeeting.time * 1000));
      setScope({
        isPublic: existingMeeting.is_public,
        selectedClubs: existingMeeting.accessible_clubs,
      });
      setDetailImageUrl(existingPhoto);
    }
  }, [existingMeeting, existingPhoto]);

  useEffect(() => {
    if (title === '' || content === '' || !scope || !location || !time) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, content, scope, location, time]);

  return (
    <div>
      <Segment style={{ padding: '8em 5em' }} vertical>
        <Grid columns="2">
          <Grid.Column id="meeting-create-column">
            <h1>
              {existingMeeting ? 'Edit Your Meeting!' : 'Create your meeting!'}
            </h1>
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
                min="1"
                max="20"
                onChange={(e) => setMaxMembers(e.target.value)}
              />

              <Grid centered>
                <MeetingScope
                  existingScope={scope}
                  myClubs={
                    clubs &&
                    clubs.filter(
                      (club) =>
                        club.author.id === currentUser ||
                        club.members.find(
                          (member) => member.id === currentUser,
                        ),
                    )
                  }
                  scopeHandler={scopeHandler}
                />
                <MeetingMap
                  location={location}
                  locationHandler={locationHandler}
                />
                <MeetingTime time={time} timeHandler={timeHandler} />
              </Grid>
              <Grid centered style={{ marginTop: '22px' }}>
                <Button
                  primary
                  size="small"
                  className="ConfirmButton"
                  id="confirm-button"
                  disabled={isDisable}
                  onClick={() =>
                    onClickConfirmHandler(
                      title,
                      content,
                      maxMembers,
                      history,
                      detailImageFile,
                      isImageModified,
                      scope,
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
                  secondary
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
              {time && <p>{time.toLocaleString().slice(0, -3)}</p>}
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
