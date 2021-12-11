import React, {useState, useEffect } from 'react';
import axios from "axios";

import RoomTemplate from '../RoomTemplate'
import MyRoomRegister from '../../../../components/room/MyRoomRegister/MyRoomRegister'

function MyRoomEditPage() {
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
            onClickConfirmHandler={(title, description, capacity, address, location, dates, history) => {
                axios.put('/api/room/host/', {title, description, capacity, dates, address, lat:location.lat, lng:location.lng})
                    .then(() => {history.push('/mypage/room');})
                    .catch(() => {alert("Error! try again");})
            }}/>
        </RoomTemplate>
    )
}
export default MyRoomEditPage