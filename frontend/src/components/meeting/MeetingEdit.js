import React, { useState, useEffect } from "react";
import { Form, Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function MeetingEdit(props) {
    const {onClickConfirmHandler, history, user, meeting} = props;
    const [title, setTitle] = useState(meeting.title);
    const [content, setContent] = useState(meeting.content);
    const [maxMembers, setMaxMembers] = useState(meeting.maxMembers);
    const [isDisable, setIsDisable] = useState(false);

    useEffect(() => {
        if (title === meeting.title && content === meeting.content && maxMembers === meeting.maxMembers) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [title, content]);

    const clickBackHander = () => {
        if (title !== meeting.title || content !== meeting.content || maxMembers !== meeting.maxMember) {
            const check = window.confirm("Are you sure?");
            if(check) {
                history.push(`/meetings/${meeting.id}`);
            }
        } 
        else {
            history.push(`/meetings/${meeting.id}`);
        }
    }

    return (
        <div className="MeetingEdit">
            <Segment style={{ padding: '8em 10em'}} vertical>
                <Grid columns='3'>
                    <Grid.Column></Grid.Column>
                    <Grid.Column
                    id="meeting-edit-column">
                        <h1>Edit Your Meeting!</h1><br/>
                        <Form
                        id='meeting-edit-form'
                        onSubmit={() => {
                            onClickConfirmHandler(title, content, maxMembers, user);
                        }}>
                            <Form.Input
                            className="MeetingTitleInput"
                            id='meeting-title-input' 
                            label='Title'
                            style={{ width: 600 }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            <Form.TextArea
                            className="MeetingContentInput"
                            id='meeting-content-input'
                            label='Content' 
                            style={{ minHeight: 200 }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            />
                            <Form.Input
                            className="MeetingMaxMembersInput"
                            id="meeting-max-members-input"
                            label={`Maximum Members: ${maxMembers}`}
                            style={{ width: 500 }}
                            type='range'
                            value={maxMembers}
                            min='0'
                            max='20'
                            onChange={(e) => setMaxMembers(e.target.value)}
                            />
                            <Grid centered>
                                <Form.Select
                                width='5'
                                options={["tags"]}
                                />
                                <Form.Button>Scope</Form.Button>
                                <Form.Button>Location</Form.Button>
                                <Form.Button>Time</Form.Button>
                            </Grid>
                            <Grid centered>
                                <Form.Button
                                className="ConfirmButton"
                                id='confirm-button'
                                disabled={isDisable}
                                >Confirm</Form.Button>
                                <Form.Button 
                                className="BackButton"
                                id='back-button'
                                onClick={() => clickBackHander()}>Back</Form.Button>
                            </Grid>
                        </Form>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}
export default withRouter(MeetingEdit);