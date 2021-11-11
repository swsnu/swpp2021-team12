import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

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
      {meetingDetail && meetingDetail.members ? (
        <div className="MeetingDetail">
          <button id="meetingAuthor">{meetingDetail.author.name}</button>
          <h1 id="meetingTitle">{meetingDetail.meetingData.title}</h1>
          <p id="meetingContent">{meetingDetail.meetingData.content}</p>
          <h5>Current Member: </h5>
          {meetingDetail.members.map((member) => (
            <button key={member}>{member.name}</button>
          ))}
          <h5>Max Member: {meetingDetail.meetingData.maxMembers}</h5>
          {auth && auth.id === meetingDetail.meetingData.authorId ? (
            <>
              <button
                className="EditButton"
                id="editMeetingButton"
                onClick={() =>
                  history.push(`/meeting/${meetingDetail.id}/edit`)
                }
              >
                EDIT
              </button>
              <button
                className="DeleteButton"
                id="deleteMeetingButton"
                onClick={() => {
                  deleteMeeting();
                  history.push('/meeting');
                }}
              >
                DELETE
              </button>
            </>
          ) : (
            <>
              {meetingDetail.meetingData.currentMembers.find(
                (member) => member === (auth && auth.id),
              ) ? (
                <button
                  className="QuitButton"
                  id="quitMeetingButton"
                  onClick={() => toggleMeeting(0)}
                >
                  QUIT
                </button>
              ) : (
                <button
                  className="JoinButton"
                  id="joinMeetingButton"
                  onClick={() => toggleMeeting(1)}
                  disabled={
                    meetingDetail.meetingData.currentMembers.length ===
                    meetingDetail.meetingData.maxMembers
                  }
                >
                  JOIN
                </button>
              )}
            </>
          )}

          <button
            className="BackButton"
            id="backDetailMeetingButton"
            onClick={() => history.push('/meeting')}
          >
            BACK
          </button>
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
