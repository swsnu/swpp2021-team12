import React, { useState } from 'react';
import RoomTemplate from '../RoomTemplate'
import NoRoom from '../../../../components/room/MyRoom/NoRoom';
import MyRoom from '../../../../components/room/MyRoom/MyRoom';

function MyRoomPage() {
    const [isRoomExists] = useState(true)
    const tempRoom = {title: 'MyRoomTitle', description:'Welcome to My Room!', capacity: 4}
    return (
        <RoomTemplate>
            {(isRoomExists) ? <MyRoom room={tempRoom}/> : <NoRoom props/>}
        </RoomTemplate>
    )
}
export default MyRoomPage;