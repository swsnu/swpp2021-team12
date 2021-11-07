import React from 'react';
import MyProfileEdit from '../../../../components/room/MyProfileEdit/MyProfileEdit';
import RoomTemplate from '../RoomTemplate';

function MyProfileEditPage() {
  const tmpname = 'name';
  const tmpemail = 'tmp@tmp.tmp';
  const tmpintro = 'tmpintro';
  return (
    <RoomTemplate>
      <MyProfileEdit name={tmpname} email={tmpemail} selfIntro={tmpintro} />
    </RoomTemplate>
  );
}

export default MyProfileEditPage;
