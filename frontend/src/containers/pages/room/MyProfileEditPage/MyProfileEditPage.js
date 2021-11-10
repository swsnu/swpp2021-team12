import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MyProfileEdit from '../../../../components/room/MyProfileEdit/MyProfileEdit';
import RoomTemplate from '../RoomTemplate';
import * as authAPI from '../../../../lib/api/auth';

function MyProfileEditPage() {
  const [profile, setProfile] = useState(null);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));

  const onClickConfirmButton = async (photo, newSelfIntro, history) => {
    const fd = new FormData();
    fd.append('profile', photo);
    await axios.put(`${authAPI.user + currentUser}/`, {
      self_intro: newSelfIntro,
    });
    await axios({
      method: 'post',
      url: `${authAPI.user + currentUser}/profile/`,
      data: fd,
      headers: { 'content-type': 'multipart/form-data' },
    }).then(() => {
      history.push('/mypage');
    });
  };

  useEffect(async () => {
    if (currentUser) {
      await axios.get(`${authAPI.user + currentUser}/`).then((res) => {
        setProfile(res.data);
      });
    }
  }, [currentUser]);

  return (
    <RoomTemplate>
      <MyProfileEdit
        profile={profile}
        onClickConfirmButton={onClickConfirmButton}
      />
    </RoomTemplate>
  );
}

export default MyProfileEditPage;
