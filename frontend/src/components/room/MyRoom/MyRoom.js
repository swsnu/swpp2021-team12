import React from 'react';
import { Container, Header, Button, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function MyRoom(props) {
  const { room, onClickDeleteButton, history } = props;
  const { title, description, capacity } = room;

  return (
    <Container id='my-room' text style={{ marginTop: '4em', width: '700px' }}>
      <Grid divided="vertically">
        <Grid.Row centered>
          <Header id='my-room-title'>{title}</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Calendar />
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Container text style={{ width: '700px', background: '' }}>
            <p id='my-room-description'>{description}</p>
            <p id='my-room-capacity'>Capacity: {capacity}</p>
          </Container>
        </Grid.Row>
        <Grid.Row centered columns="3" style={{ marginTop: '2em' }}>
          <Button id='my-room-edit-button' onClick={() => history.push('/mypage/room/edit')}>
            Edit
          </Button>

          {/* need to be implemented!! */}
          <Button id='my-room-pending-request-button' primary>
            Pending Request
          </Button>
          <Button id='my-room-delete-button' color="red" onClick={onClickDeleteButton}>
            Delete
          </Button>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default withRouter(MyRoom);
