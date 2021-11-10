import React, { useState } from 'react';
import { Container, Form, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function MyRoomRegister(props) {
  const { room, onClickConfirmHandler, history } = props;
  const [title, setTitle] = useState(room ? room.title : '');
  const [description, setDescription] = useState(room ? room.description : '');
  const [dates] = useState();
  const [capacity, setCapacity] = useState(room ? room.capacity : 0);

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

  return (
    <div className="MyRoomRegister">
      <Container text style={{ marginTop: '2em' }}>
        <Form
          onSubmit={() => {
            onClickConfirmHandler(title, description, capacity);
            history.push('/mypage/room');
          }}
        >
          <Form.Input
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
              <Calendar value={dates} />
            </Grid.Row>
          </Grid>
          <Form.TextArea
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
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <Form.Button>Access Scope</Form.Button>
            <Form.Button>Address</Form.Button>
          </Grid>
          <Grid centered style={{ marginTop: '2em' }}>
            <Form.Button primary>Confirm</Form.Button>
            <Form.Button onClick={onClickBackHandler}>Back</Form.Button>
          </Grid>
        </Form>
      </Container>
    </div>
  );
}
export default withRouter(MyRoomRegister);
