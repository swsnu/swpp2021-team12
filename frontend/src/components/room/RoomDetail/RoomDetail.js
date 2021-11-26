import React, { useState, useEffect } from 'react';
import { Container, Header, Button, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-select-date';

import CommentList from '../../comment/CommentList/CommentList';

function RoomDetail(props) {
    const { room, history, comments, currentUser, articleId, createComment, editComment, deleteComment } = props;
    const { title, description, capacity, dates } = room;
    const [ calDates, setDates ] = useState([]);

    useEffect(() => {
        const dateList = [];
        dates.forEach((date) => {
            dateList.push({"date": date, "avaliableSlot": capacity, "totalSlot": capacity})
        })
        setDates(dateList);
    }, [])

    return (
        <Container id='room-detail' text style={{ marginTop: '4em', width: '700px' }}>
            <Grid divided="vertically">
                <Grid.Row centered>
                    <Header id='my-room-title'>{title}</Header>
                </Grid.Row>
                <Grid.Row centered>
                    <Calendar 
                        showDateInputField={false}
                        disableDates='past'
                        duelSlotDates={calDates}
                    />
            </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row>
                    <Container text style={{ width: '700px', background: '' }}>
                        <p id='my-room-description'>{description}</p>
                        <p id='my-room-capacity'>Capacity: {capacity}</p>
                    </Container>
                </Grid.Row>
                <Grid.Row style={{ marginTop: '2em' }}>
                {/* need to be implemented!! */}
                    <Button 
                        id='room-detail-back-button'
                        style={{ marginLeft: '40em' }}
                        onClick={() => {history.push('/main')}}
                    >
                    Back
                    </Button>
                </Grid.Row>
                <Grid.Row>
                <CommentList
                    currentUser={currentUser}
                    comments={comments}
                    articleId={articleId}
                    createComment={createComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                />
                </Grid.Row>
            </Grid>
        </Container>
    );
}
export default withRouter(RoomDetail);
