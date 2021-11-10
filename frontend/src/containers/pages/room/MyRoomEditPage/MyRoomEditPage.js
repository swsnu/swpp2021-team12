import React from 'react'

import RoomTemplate from '../RoomTemplate'
import MyRoomRegister from '../../../../components/room/MyRoomRegister/MyRoomRegister'

function MyRoomEdit() {

    const tempRoom = {title: 'MyRoomTitle', description:'Welcome to My Room!', capacity: 4}
    return (
        <RoomTemplate>
            <MyRoomRegister room={tempRoom}/>
        </RoomTemplate>
    )
}
export default MyRoomEdit