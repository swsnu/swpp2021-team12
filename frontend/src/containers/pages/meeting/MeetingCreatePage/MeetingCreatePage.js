import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom'

import PageTemplate from '../../../common/PageTemplate';
import MeetingCreate from "../../../../components/meeting/MeetingCreate";
import { createMeeting } from "../../../../store/actions/meetings";

function MeetingCreatePage() {
    // const [isSubmitted, setSubmitted] = useState(false)
    const { submittedId } = useSelector((state) => ({
        submittedId: state.meetings.submitted
    }))
    // const history = useHistory();
    useEffect(() => {
        console.log(submittedId);
    }, [submittedId])
    const dispatch = useDispatch();

    return (
        <PageTemplate>
            <MeetingCreate onClickConfirmHandler={(title, content, maxMembers) => {
                dispatch(createMeeting(title, content, maxMembers));
                // setSubmitted(true)
            }}
            />
        </PageTemplate>
    )
}
export default MeetingCreatePage;