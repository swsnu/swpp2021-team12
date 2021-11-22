import React, {useState, useEffect } from 'react';
import axios from "axios";

import RoomTemplate from '../RoomTemplate'
import MyRoomRegister from '../../../../components/room/MyRoomRegister/MyRoomRegister'

function MyRoomEdit() {
    const [room, setRoom] = useState();

    useEffect(() => {
        axios.get('/api/room/host/')
            .then((res) => {
                setRoom(res.data);
            })
    }, [])

    return (
        <RoomTemplate>
            <MyRoomRegister room={room}
            onClickConfirmHandler={(title, description, capacity, address, history) => {
                axios.put('/api/room/host/', {title, description, capacity, address})
                    .then(() => {history.push('/mypage/room')})
            }}/>
        </RoomTemplate>
    )
}
export default MyRoomEdit