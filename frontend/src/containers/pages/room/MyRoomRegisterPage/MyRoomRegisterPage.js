import React from "react";

import RoomTemplate from "../RoomTemplate";
import MyRoomRegister from "../../../../components/room/MyRoomRegister/MyRoomRegister";

function MyRoomRegisterPage() {

    return(
        <RoomTemplate>
            <MyRoomRegister props/>
        </RoomTemplate>
    )
}
export default MyRoomRegisterPage