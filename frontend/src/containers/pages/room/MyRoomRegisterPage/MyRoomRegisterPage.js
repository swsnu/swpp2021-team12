import React from "react";
import axios from "axios";

import RoomTemplate from "../RoomTemplate";
import MyRoomRegister from "../../../../components/room/MyRoomRegister/MyRoomRegister";

function MyRoomRegisterPage() {

    return(
        <RoomTemplate>
            <MyRoomRegister onClickConfirmHandler={(title, description, capacity, address, history) => {
                axios.post('/api/room/', {title, description, capacity, address})
                    .then(() => {history.push('/mypage/room')})
            }}/>
        </RoomTemplate>
    )
}
export default MyRoomRegisterPage