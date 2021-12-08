import React from 'react';
import axios from 'axios';
import * as clubAPI from '../../../../lib/api/club';
import Club from '../../../../components/club/Club/Club';
import PageTemplate from '../../../common/PageTemplate';

function ClubEditPage(props) {

  const { params } = props.match;
  const { club } = props.location.state;
  const onClickConfirmHandler = (title, content, membersToKick, history) => {
    axios
      .put(`${clubAPI.club + params.id}/`, {
        title,
        content,
        kick_members: membersToKick,
      })
      .then(() => {
        history.push(`/club`);
      })
      .catch(() => window.alert('Error occured!'));
  };

  const onClickDeleteHandler = (history) => {
    axios
      .delete(`${clubAPI.club + params.id}/`)
      .then(() => {
        window.alert('Successfully deleted!');
        history.push(`/club`);
      })
      .catch(() => window.alert('Error occured!'));
  };

  return (
    <PageTemplate>
      <Club
        existingClub={club}
        isEdit={true}
        onClickDeleteHandler={onClickDeleteHandler}
        onClickConfirmHandler={onClickConfirmHandler}
      />
    </PageTemplate>
  );
}

export default ClubEditPage;
