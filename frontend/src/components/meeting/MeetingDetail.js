import React from 'react';

// TODO: Comments, Location
function MeetingDetail(props) {
  const {
    users,
    auth,
    meetingDetail,
    deleteMeeting,
    currentMembers,
    maxMembers,
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
          {currentMembers.find((member) => member.id === (auth && auth.id)) ? (
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
              disabled={currentMembers.size() === maxMembers}
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

export default MeetingDetail;
