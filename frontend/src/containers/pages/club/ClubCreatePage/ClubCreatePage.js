import React from 'react';
import axios from 'axios';
import * as clubAPI from '../../../../lib/api/club';
import Club from '../../../../components/club/Club/Club';
import PageTemplate from '../../../common/PageTemplate';

function ClubCreatePage() {
  const onClickConfirmHandler = (title, content, membersToKick, history) => {
    axios
      .post(clubAPI.club, { title, content })
      .then(() => {
        history.push(`/club`);
      })
      .catch(() => window.alert('Error occured!'));
  };
  return (
    <PageTemplate>
      <Club
        existingClub={null}
        clubId={null}
        isEdit={false}
        onClickConfirmHandler={onClickConfirmHandler}
      />
    </PageTemplate>
  );
}

export default ClubCreatePage;
