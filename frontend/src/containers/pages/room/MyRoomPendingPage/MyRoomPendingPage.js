import React from 'react';
import RoomTemplate from '../RoomTemplate';
import MyRoomPending from '../../../../components/room/MyRoomPending/MyRoomPending';

function MyRoomPendingPage() {
  return (
    <div>
      <RoomTemplate>
        <MyRoomPending />
      </RoomTemplate>
    </div>
  );
}

export default MyRoomPendingPage;
