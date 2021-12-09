import React from 'react';
import axios from 'axios';

import RoomTemplate from '../RoomTemplate';
import MyRoomRegister from '../../../../components/room/MyRoomRegister/MyRoomRegister';

function MyRoomRegisterPage() {
  return (
    <RoomTemplate>
      <MyRoomRegister
        onClickConfirmHandler={(
          title,
          description,
          capacity,
          address,
          location,
          dates,
          history,
        ) => {
          axios
            .post('/api/room/', {
              title,
              description,
              capacity,
              address,
              lat: location.lat,
              lng: location.lng,
              dates,
            })
            .then(() => {
              history.push('/mypage/room');
            })
            .catch(() => {
              alert("Error! try again");
            });
        }}
      />
    </RoomTemplate>
  );
}
export default MyRoomRegisterPage;
