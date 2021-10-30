import React from 'react';
import { withRouter } from 'react-router-dom';

// TODO: Comments, Location
function MeetingDetail(props) {
  const {
    users,
    auth,
    meetingDetail,
    deleteMeeting,
    joinMeeting,
    quitMeeting,
    history,
  } = props;

  return (
    <div className="MeetingDetail">
      <button id="meetingAuthor">
        {users && users[meetingDetail.authorId - 1].name}
      </button>
      <h1 id="meetingTitle">{meetingDetail && meetingDetail.title}</h1>
      <p id="meetingContent">{meetingDetail && meetingDetail.content}</p>
      {auth && auth.id === meetingDetail.authorId ? (
        <>
          <button
            className="EditButton"
            id="editMeetingButton"
            onClick={() => history.push(`/meeting/${meetingDetail.id}/edit`)}
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
          {meetingDetail.currentMembers.find(
            (member) => member === (auth && auth.id),
          ) ? (
            <button
              className="QuitButton"
              id="quitMeetingButton"
              onClick={() => quitMeeting()}
            >
              QUIT
            </button>
          ) : (
            <button
              className="JoinButton"
              id="joinMeetingButton"
              onClick={() => joinMeeting()}
              disabled={
                meetingDetail.currentMembers.length === meetingDetail.maxMembers
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
  );
}

export default withRouter(MeetingDetail);
