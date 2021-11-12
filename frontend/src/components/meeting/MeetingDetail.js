import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Container,
  Button,
  Grid,
  Header,
} from 'semantic-ui-react';

// TODO: Location
function MeetingDetail(props) {
  const { auth, meetingDetail, deleteMeeting, toggleMeeting, history } = props;

  /* const [author, setAuthor] = useState(null);
  useEffect(async () => {
    await axios
      .get(`/api/user/${meetingDetail.authorId}/`)
      .then((res) => setAuthor(res.data));
  });
  const members = [];
  meetingDetail.currentMembers.forEach((member) => async () => {
    await axios
      .get(`/api/user/${member}`)
      .then((res) => members.append(res.data));
  }); */
  return (
    <>
      {meetingDetail ? (
        <div className="MeetingDetail">
          <Container text style={{ marginTop: '4em', width: '700px' }}>
            <Grid divided="vertically">
              <Grid.Row centered>
                <Header>TITLE : {meetingDetail.meetingData.title}</Header>
              </Grid.Row>
              <Grid.Row centered>
                <Header>
                  DESCRIPTION : {meetingDetail.meetingData.content}
                </Header>
              </Grid.Row>
              <Grid.Row centered>HOST : {meetingDetail.author.name}</Grid.Row>
            </Grid>
            <Grid>
              <Grid.Row>
                <Container text style={{ width: '700px', background: '' }}>
                  <h5>Current Member: </h5>
                  {meetingDetail.members.map((member) => (
                    <button key={member}>{member.name}</button>
                  ))}
                  <p>Max Member: {meetingDetail.meetingData.maxMembers}</p>
                </Container>
              </Grid.Row>
              <Grid.Row centered columns="3" style={{ marginTop: '2em' }}>
                {auth && auth.id === meetingDetail.meetingData.authorId ? (
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
                      onClick={() => {
                        deleteMeeting();
                        history.push('/meeting');
                      }}
                    >
                      DELETE
                    </Button>
                  </>
                ) : (
                  <>
                    {meetingDetail.meetingData.currentMembers.find(
                      (member) => member === (auth && auth.id),
                    ) ? (
                      <Button
                        className="QuitButton"
                        id="quitMeetingButton"
                        onClick={() => toggleMeeting(0)}
                      >
                        QUIT
                      </Button>
                    ) : (
                      <Button
                        className="JoinButton"
                        primary
                        id="joinMeetingButton"
                        onClick={() => toggleMeeting(1)}
                        disabled={
                          meetingDetail.meetingData.currentMembers.length ===
                          meetingDetail.meetingData.maxMembers
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
