import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RoomTemplate from '../RoomTemplate';
import MyProfile from '../../../../components/room/MyProfile/MyProfile';
import * as authAPI from '../../../../lib/api/auth';

function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));

  useEffect(async () => {
    if (currentUser) {
      await axios.get(`${authAPI.user + currentUser}/`).then((res) => {
        setProfile(res.data);
      });
      await axios.get(`${authAPI.user + currentUser}/profile/`).then((res) => {
        setProfileImage(res.data);
      });
    }
  }, [currentUser]);

  return (
    <RoomTemplate>
      <MyProfile profile={profile} profileImage={profileImage} />
    </RoomTemplate>
  );
}

export default MyProfilePage;
