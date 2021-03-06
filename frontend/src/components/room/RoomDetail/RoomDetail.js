import React, { useState, useEffect } from 'react';
import { Container, Header, Button, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-select-date';

import CommentList from '../../comment/CommentList/CommentList';
import RequestModal from '../../../containers/pages/room/RoomDetailPage/RequestModal';
import UserInfo from '../../UserInfo';
import SimpleMap from '../../SimpleMap';

function RoomDetail(props) {
  const {
    room,
    history,
    comments,
    currentUser,
    articleId,
    createComment,
    editComment,
    deleteComment,
    createRequest,
  } = props;
  const { title, description, capacity, dates, user } = room;
  const [calDates, setDates] = useState([]);
  const [selDate, setSelDate] = useState(null);
  const [showRequest, setRequest] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);

  const onClickConfirm = (date) => {
    createRequest(date);
  };

  const onSelectHandler = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    setSelDate(`${yyyy}${mm}${dd}`);
  };

  useEffect(() => {
    const dateList = [];
    const availableList = [];
    dates.forEach((date) => {
      dateList.push({
        date: date.date,
        avaliableSlot: date.current_mem_num,
        totalSlot: capacity,
      });
      const year = date.date.slice(0, 4);
      const month = date.date.slice(5, 7);
      const da = date.date.slice(8, 10);
      availableList.push(year + month + da);
    });
    setDates(dateList);
    setAvailableDates(availableList);
  }, []);

  useEffect(() => {
    if (availableDates.includes(selDate)) {
      setRequest(true);
    } else {
      setRequest(false);
    }
  }, [selDate]);

  return (
    <Container
      id="room-detail"
      text
      style={{ marginTop: '4em'}}
    >
      <Grid style={{width: '130%'}}>
        <Grid.Row centered>
          <UserInfo user={user}/>
        </Grid.Row>
        <Grid.Row centered>
          <Header id="my-room-title">{title}</Header>
        </Grid.Row>
        <Grid.Row columns='2'>
          <Grid.Column>
          <Calendar
            onSelect={(date) => onSelectHandler(date)}
            showDateInputField={false}
            disableDates="past"
            duelSlotDates={calDates}
          />
          </Grid.Column>
          <Grid.Column style={{width: '40%'}}>
            {room && <SimpleMap room={room}/>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid style={{width: '130%'}}>
        <Grid.Row centered>
          {showRequest && (
            <RequestModal
              onClickConfirm={onClickConfirm}
              room={room}
              selDate={selDate}
            />
          )}
        </Grid.Row>
        <Grid.Row>
          <Container text style={{ width: '700px', background: '' }}>
            <p id="my-room-description">{description}</p>
            <p id="my-room-capacity">Capacity: {capacity}</p>
          </Container>
        </Grid.Row>
        <Grid.Row style={{ marginTop: '2em' }}>
          {/* need to be implemented!! */}
          <Button
            id="room-detail-back-button"
            style={{ marginLeft: '40em' }}
            onClick={() => {
              history.push('/main');
            }}
            secondary
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
