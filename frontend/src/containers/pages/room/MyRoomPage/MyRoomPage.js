import React, { useState } from 'react';
import RoomTemplate from '../RoomTemplate'
import NoRoom from '../../../../components/room/MyRoom/NoRoom';
import MyRoom from '../../../../components/room/MyRoom/MyRoom';

function MyRoomPage() {
    const [isRoomExists] = useState(false)
    return (
        <RoomTemplate>
            {(isRoomExists) ? <MyRoom /> : <NoRoom props/>}
        </RoomTemplate>
    )
}
export default MyRoomPage;