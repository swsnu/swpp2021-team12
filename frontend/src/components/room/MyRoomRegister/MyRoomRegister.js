import React, { useState, useEffect } from 'react';
import { Container, Form, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
// import 'react-calendar/dist/Calendar.css';
// import Calendar from 'react-calendar';
import Calendar from 'react-select-date';
import RoomMap from './RoomMap';

function MyRoomRegister(props) {
  const { room, onClickConfirmHandler, history } = props;
  const [title, setTitle] = useState(room ? room.title : '');
  const [description, setDescription] = useState(room ? room.description : '');
  // const [dates] = useState();
  // eslint-disable-next-line no-unused-vars
  const [dates, setDates] = useState([]);
  const [capacity, setCapacity] = useState(room ? room.capacity : 0);
  const [address, setAddress] = useState(room ? room.address : null);

  const onClickBackHandler = () => {
    if (!room) {
      history.push('/mypage/room');
    } else if (
      title !== room.title ||
      description !== room.description ||
      capacity !== room.capacity
    ) {
      const check = window.confirm('Are you sure?');
      if (check) history.push('/mypage/room');
    } else {
      history.push('/mypage/room');
    }
  };

  useEffect(() => {
    if (room) {
      setTitle(room.title);
      setDescription(room.description);
      setCapacity(room.capacity);
      setAddress(room.address);
      setDates(room.dates);
    }
  }, [room]);

  return (
    <div className="MyRoomRegister">
      <Container text style={{ marginTop: '2em' }}>
        <Form id="my-room-register-form">
          <Form.Input
            id="my-room-register-title-input"
            type="text"
            label="Title"
            style={{ width: '400px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h4>Check The Date Available!</h4>
          <Grid columns="4" style={{ marginBottom: '1em' }}>
            <Grid.Row>
              <Grid.Column></Grid.Column>
              {/* <Calendar value={dates} /> */}
              <Calendar
                defaultValue={dates}
                onSelect={(date) => setDates(date)}
                templateClr="blue"
                selectDateType="multiple"
                showDateInputField={false}
                disableDates="past"
              />
            </Grid.Row>
          </Grid>
          <Form.TextArea
            id="my-room-register-description-input"
            type="text"
            label="Description"
            style={{ height: '300px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Grid centered style={{ marginTop: '2em' }}>
            <h5 style={{ marginTop: '0.5em', marginRight: '-1em' }}>
              Capacity:
            </h5>
            <Form.Input
              id="my-room-register-capacity-input"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <Form.Button>Access Scope</Form.Button>
            <RoomMap
              address={address}
              addressHandler={(addr) => {
                setAddress(addr);
              }}
            />
          </Grid>
          <Grid centered style={{ marginTop: '2em' }}>
            <Form.Button
              onClick={() => {
                onClickConfirmHandler(
                  title,
                  description,
                  capacity,
                  address,
                  dates,
                  history,
                );
                history.push('/mypage/room');
              }}
              primary
            >
              Confirm
            </Form.Button>
            <Form.Button
              id="my-room-register-back-button"
              onClick={onClickBackHandler}
            >
              Back
            </Form.Button>
          </Grid>
        </Form>
      </Container>
    </div>
  );
}
export default withRouter(MyRoomRegister);
