import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import PageTemplate from '../../../common/PageTemplate';
import MeetingEdit from "../../../../components/meeting/MeetingEdit";
import { editMeeting } from "../../../../store/actions/meetings";

function MeetingEditPage(props) {
    const { user_, meetings_ } = useSelector(({ auth, meetings }) => ({
        user_: auth.user,
        meetings_: meetings.meetings
    }))
    const { params } = props.match;
    const dispatch = useDispatch();

    return (
        <PageTemplate>
            <MeetingEdit onClickConfirmHandler={(title, content, meetingId, authorId) => {
                dispatch(editMeeting(title, content, meetingId, authorId));
            }}
            meeting={meetings_ && meetings_.find((meeting) => meeting.id === parseInt(params.id, 10))}
            user={user_}
            />
        </PageTemplate>
    )
}
export default MeetingEditPage;