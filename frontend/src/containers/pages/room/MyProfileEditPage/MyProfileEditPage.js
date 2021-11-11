import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MyProfileEdit from '../../../../components/room/MyProfileEdit/MyProfileEdit';
import RoomTemplate from '../RoomTemplate';
import * as authAPI from '../../../../lib/api/auth';

function MyProfileEditPage() {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));

  const onClickConfirmButton = async (
    photo,
    newSelfIntro,
    history,
    isImageModified,
  ) => {
    const fd = new FormData();
    fd.append('profile', photo);
    if (isImageModified) {
      await axios.put(`${authAPI.user + currentUser}/`, {
        self_intro: newSelfIntro,
      });
      if (isImageModified === 1) {
        await axios({
          method: 'post',
          url: `${authAPI.user + currentUser}/profile/`,
          data: fd,
          headers: { 'content-type': 'multipart/form-data' },
        }).then(() => {
          history.push('/mypage');
        });
      } else {
        await axios
          .delete(`${authAPI.user + currentUser}/profile/`)
          .then(() => history.push('/mypage'));
      }
    } else {
      await axios
        .put(`${authAPI.user + currentUser}/`, {
          self_intro: newSelfIntro,
        })
        .then(() => history.push('/mypage'));
    }
  };

  useEffect(() => {
    if (currentUser) {
      axios.get(`${authAPI.user + currentUser}/`).then((res) => {
        setProfile(res.data);
      });
      axios.get(`${authAPI.user + currentUser}/profile/`).then(() => {
        setProfileImage(`/api/user/${currentUser}/profile/`);
      });
    }
  }, [currentUser]);

  return (
    <RoomTemplate>
      <MyProfileEdit
        profile={profile}
        profileImage={profileImage}
        onClickConfirmButton={onClickConfirmButton}
      />
    </RoomTemplate>
  );
}

export default MyProfileEditPage;
