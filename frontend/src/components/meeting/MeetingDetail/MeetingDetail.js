import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Container,
  Button,
  Grid,
  Header,
  Popup,
  Image,
  Segment,
  Icon,
} from 'semantic-ui-react';

// TODO: Location
function MeetingDetail(props) {
  const {
    currentUser,
    meetingDetail,
    onClickDeleteButton,
    onClickToggleButton,
    meetingPhoto,
    history,
  } = props;

  return (
    <>
      {meetingDetail ? (
        <div className="MeetingDetail">
          <Container text style={{ marginTop: '4em', width: '700px' }}>
            <Grid divided="vertically">
              <Grid.Row centered>
                <Header>TITLE : {meetingDetail.title}</Header>
              </Grid.Row>
              <Grid.Row centered>
                <Header>DESCRIPTION : {meetingDetail.content}</Header>
              </Grid.Row>
              <Grid.Row centered>HOST : {meetingDetail.author.name}</Grid.Row>
              <Grid.Row centered>
                <Segment placeholder size="small">
                  {meetingPhoto ? (
                    <div className="image_area">
                      <Image size="medium" src={meetingPhoto} />
                    </div>
                  ) : (
                    <Header icon>
                      <Icon name="photo" />
                      No photo uploaded yet!
                    </Header>
                  )}
                </Segment>
              </Grid.Row>
            </Grid>
            <Grid>
              <Grid.Row>
                <Container text style={{ width: '700px', background: '' }}>
                  <h5>Current Member: </h5>
                  {meetingDetail.currentMembers.map((member) => (
                    <Popup
                      content={member.self_intro}
                      key={member.email}
                      header={member.name}
                      trigger={
                        <Image src={`/api/user/${member.id}/profile/`} avatar />
                      }
                    />
                  ))}
                  <p>Max Member: {meetingDetail.maxMembers}</p>
                </Container>
              </Grid.Row>
              <Grid.Row centered columns="3" style={{ marginTop: '2em' }}>
                {currentUser === meetingDetail.author.id ? (
                  <>
                    <Button
                      className="EditButton"
                      id="editMeetingButton"
                      onClick={() =>
                        history.push(`/meeting/${meetingDetail.id}/edit`)
                      }
                    >
                      EDIT
                    </Button>
                    <Button
                      className="DeleteButton"
                      id="deleteMeetingButton"
                      onClick={() => onClickDeleteButton()}
                    >
                      DELETE
                    </Button>
                  </>
                ) : (
                  <>
                    {meetingDetail.currentMembers.find(
                      (member) => member.id === currentUser,
                    ) ? (
                      <Button
                        className="QuitButton"
                        id="quitMeetingButton"
                        color="red"
                        onClick={() => onClickToggleButton(0)}
                      >
                        QUIT
                      </Button>
                    ) : (
                      <Button
                        className="JoinButton"
                        primary
                        id="joinMeetingButton"
                        onClick={() => onClickToggleButton(1)}
                        disabled={
                          meetingDetail.currentMembers.length ===
                          meetingDetail.maxMembers
                        }
                      >
                        JOIN
                      </Button>
                    )}
                  </>
                )}
                <Button
                  className="BackButton"
                  id="backDetailMeetingButton"
                  secondary
                  onClick={() => history.push('/meeting')}
                >
                  BACK
                </Button>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </>
  );
}

export default withRouter(MeetingDetail);