import React from 'react';
import axios from 'axios';
import PageTemplate from '../../../common/PageTemplate';
import Meeting from '../../../../components/meeting/Meeting/Meeting';
import * as meetingAPI from '../../../../lib/api/meetings';

function MeetingCreatePage() {
  const onClickConfirmHandler = async (
    title,
    content,
    maxMembers,
    history,
    photo,
    isImageModified,
    location,
    time,
  ) => {
    const fd = new FormData();
    fd.append('photo', photo);
    if (isImageModified) {
      let meetingId;
      await axios
        .post(meetingAPI.meetings, {
          title,
          content,
          maxMembers,
          lat: location.position.lat,
          lng: location.position.lng,
          description: location.description,
          time: time.getTime() / 1000,
        })
        .then((res) => {
          meetingId = res.data.id;
        });
      if (isImageModified === 1) {
        await axios({
          method: 'post',
          url: `${meetingAPI.meetings + meetingId}/photo/`,
          data: fd,
          headers: { 'content-type': 'multipart/form-data' },
        }).then(() => {
          history.push(`/meeting/${meetingId}`);
        });
      } else {
        await axios
          .delete(`${meetingAPI.meetings + meetingId}/photo/`)
          .then(() => history.push(`/meeting/${meetingId}`));
      }
    } else {
      await axios
        .post(meetingAPI.meetings, {
          title,
          content,
          maxMembers,
          lat: location.position.lat,
          lng: location.position.lng,
          description: location.description,
          time,
        })
        .then((res) => history.push(`/meeting/${res.data.id}`));
    }
  };

  return (
    <PageTemplate>
      <Meeting
        existingMeeting={null}
        existingPhoto={null}
        onClickConfirmHandler={onClickConfirmHandler}
        meeting={null}
      />
    </PageTemplate>
  );
}
export default MeetingCreatePage;
