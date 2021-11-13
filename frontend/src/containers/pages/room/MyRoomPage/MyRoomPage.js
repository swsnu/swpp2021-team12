import React from 'react';
import RoomTemplate from '../RoomTemplate'
import NoRoom from '../../../../components/room/MyRoom/NoRoom';
// import MyRoom from '../../../../components/room/MyRoom/MyRoom';
// Should implement with room backend
function MyRoomPage() {
    // const [isRoomExists] = useState(false)
    // const tempRoom = {title: 'MyRoomTitle', description:'Welcome to My Room!', capacity: 4}
    return (
        <RoomTemplate>
            <NoRoom props/>
        </RoomTemplate>
    )
}
export default MyRoomPage;