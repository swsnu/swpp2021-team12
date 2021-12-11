import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomTemplate from '../RoomTemplate';
import NoRoom from '../../../../components/room/MyRoom/NoRoom';
import MyRoom from '../../../../components/room/MyRoom/MyRoom';
// Should implement with room backend
function MyRoomPage() {
  const [isRoomExists, setRoomExists] = useState(false);
  const [room, setRoom] = useState();

  useEffect(() => {
    axios
      .get('/api/room/host/')
      .then((res) => {
        setRoom(res.data);
        setRoomExists(true);
      })
      .catch(() => {
        setRoomExists(false);
      });
  }, []);

  return (
    <RoomTemplate>
      {isRoomExists ? (
        <MyRoom
          room={room}
          onClickDeleteButton={() => {
            axios.delete('/api/room/host/').then(() => {
              setRoomExists(false);
            });
          }}
        />
      ) : (
        <NoRoom props />
      )}
    </RoomTemplate>
  );
}
export default MyRoomPage;
