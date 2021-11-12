import React, { useState, useEffect } from "react";
import * as axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import MeetingEdit from "../../../../components/meeting/MeetingEdit";

function MeetingEditPage(props) {
    const { history } = props
    const { params } = props.match;
    const [meeting, setMeeting] = useState({title: 'error!', content:'error!', maxMembers: 0})
    const id = parseInt(params.id, 10)

    useEffect(() => {
        axios.get(`/api/meeting/${id}/`)
            .then((res) => {
                setMeeting(res.data)
            })
            .catch(() => { window.alert("Error!") })
    }, [])

    return (
        <PageTemplate>
            <MeetingEdit onClickConfirmHandler={(title, content, maxMembers) => {
                axios.put(`/api/meeting/${id}/`, {title, content, maxMembers})
                    .then(() => {
                        history.push(`/meeting/${id}`)
                    })
                    .catch(() => {window.alert("Error!")})
            }}
            meeting={meeting}
            />
        </PageTemplate>
    )
}
export default MeetingEditPage;