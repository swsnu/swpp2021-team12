import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import PageTemplate from '../../../common/PageTemplate';
import MeetingCreate from "../../../../components/meeting/MeetingCreate";
import { createMeeting } from "../../../../store/actions/meetings";

function MeetingCreatePage() {
    const { user } = useSelector(({ auth }) => ({
        user: auth.user,
    }))
    const dispatch = useDispatch();

    return (
        <PageTemplate>
            <MeetingCreate onClickConfirmHandler={(title, content, authorId) => {
                dispatch(createMeeting(title, content, authorId));
            }}
            user={user}
            />
        </PageTemplate>
    )
}
export default MeetingCreatePage;