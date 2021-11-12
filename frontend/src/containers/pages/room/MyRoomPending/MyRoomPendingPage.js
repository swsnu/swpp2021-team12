import React from 'react';
import RoomTemplate from '../RoomTemplate';
import MyRoomPending from '../../../../components/room/MyRoomPending/MyRoomPending';

function MyRoomPendingPage() {
  const ExamplePending = [
    { id: 1, name: 'one', content: 'one', time: '12:30', people: 4 },
    { id: 2, name: 'two', content: 'two', time: '8:45', people: 6 },
  ];
  return (
    <div>
      <RoomTemplate>
        <MyRoomPending pendinglist={ExamplePending} />
      </RoomTemplate>
    </div>
  );
}

export default MyRoomPendingPage;
