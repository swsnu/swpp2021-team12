import React from 'react';
import RoomTemplate from '../RoomTemplate';
import MyProfile from '../../../../components/room/MyProfile/MyProfile';

function MyProfilePage() {
  const tmpname = 'name';
  const tmpemail = 'tmp@tmp.tmp';
  const tmpintro = 'tmpintro';
  return (
    <RoomTemplate>
      <MyProfile name={tmpname} email={tmpemail} selfIntro={tmpintro} />
    </RoomTemplate>
  );
}

export default MyProfilePage;
