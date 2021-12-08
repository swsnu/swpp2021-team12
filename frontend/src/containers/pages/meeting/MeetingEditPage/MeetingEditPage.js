import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import Meeting from '../../../../components/meeting/Meeting/Meeting';
import * as meetingAPI from '../../../../lib/api/meetings';

function MeetingEditPage(props) {
  const { params } = props.match;
  const [meeting, setMeeting] = useState({
    title: 'error!',
    content: 'error!',
    maxMembers: 0,
  });
  const [meetingPhoto, setMeetingPhoto] = useState(null);
  const id = parseInt(params.id, 10);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));

  const onClickConfirmHandler = async (
    title,
    content,
    maxMembers,
    history,
    photo,
    isImageModified,
    scope,
    location,
    time,
  ) => {
    const fd = new FormData();
    fd.append('photo', photo);
    if (isImageModified) {
      await axios.put(`${meetingAPI.meetings}${id}/`, {
        title,
        content,
        maxMembers,
        lat: location.position.lat,
        lng: location.position.lng,
        description: location.description,
        time: time.getTime() / 1000,
        is_public: scope.isPublic,
        accessible_clubs: scope.selectedClubs,
      });
      if (isImageModified === 1) {
        await axios({
          method: 'post',
          url: `${meetingAPI.meetings + id}/photo/`,
          data: fd,
          headers: { 'content-type': 'multipart/form-data' },
        }).then(() => {
          history.push(`/meeting/${id}`);
        });
      } else {
        await axios
          .delete(`${meetingAPI.meetings + id}/photo/`)
          .then(() => history.push(`/meeting/${id}`));
      }
    } else {
      await axios
        .put(`${meetingAPI.meetings}${id}/`, {
          title,
          content,
          maxMembers,
          lat: location.position.lat,
          lng: location.position.lng,
          description: location.description,
          time: time.getTime() / 1000,
          is_public: scope.isPublic,
          accessible_clubs: scope.selectedClubs,
        })
        .then((res) => history.push(`/meeting/${res.data.id}`));
    }
  };

  useEffect(() => {
    axios
      .get(`${meetingAPI.meetings}${id}/`)
      .then((res) => {
        setMeeting(res.data);
      })
      .catch(() => {
        window.alert('Error!');
      });
    axios.get(`${meetingAPI.meetings}${id}/photo/`).then(() => {
      setMeetingPhoto(`${meetingAPI.meetings}${id}/photo/`);
    });
  }, []);

  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    axios.get('/api/club/').then((res) => {
      setClubs(res.data);
    });
  }, []);

  return (
    <PageTemplate>
      <Meeting
        currentUser={parseInt(currentUser, 10)}
        onClickConfirmHandler={onClickConfirmHandler}
        existingMeeting={meeting}
        existingPhoto={meetingPhoto}
        meetingId={id}
        clubs={clubs}
      />
    </PageTemplate>
  );
}
export default MeetingEditPage;
