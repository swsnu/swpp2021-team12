import React from 'react';
import axios from 'axios';
import PageTemplate from '../../../common/PageTemplate';
import MeetingCreate from '../../../../components/meeting/MeetingCreate';
import * as meetingAPI from '../../../../lib/api/meetings';

function MeetingCreatePage() {
  const onClickConfirmHandler = async (title, content, maxMembers, history) => {
    await axios
      .post(meetingAPI.meetings, { title, content, maxMembers })
      .then((res) => {
        history.push(`/meeting/${res.data.id}`);
      });
  };

  return (
    <PageTemplate>
      <MeetingCreate onClickConfirmHandler={onClickConfirmHandler} />
    </PageTemplate>
  );
}
export default MeetingCreatePage;
