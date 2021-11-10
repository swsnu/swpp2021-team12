import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// TODO: Location
function MeetingDetail(props) {
  const { auth, meetingDetail, deleteMeeting, toggleMeeting, history } = props;

  const [author, setAuthor] = useState(null);
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
  });
  return (
    <div className="MeetingDetail">
      <button id="meetingAuthor">{author.name}</button>
      <h1 id="meetingTitle">{meetingDetail && meetingDetail.title}</h1>
      <p id="meetingContent">{meetingDetail && meetingDetail.content}</p>
      <h5>Current Member: </h5>
      {members.map((member) => (
        <button key={member}>{member.name}</button>
      ))}
      <h5>Max Member: {meetingDetail && meetingDetail.maxMembers}</h5>
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
