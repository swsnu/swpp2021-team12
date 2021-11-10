import React from 'react'
import { Container, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyRoom(props){
    const { room, history } = props;
    const { title, description, capacity } = room;
    return (
        <Container text style={{ marginTop: '4em', width: '700px'}}>
            <Grid divided='vertically'>
                <Grid.Row centered>
                    <Header>{title}</Header>
                </Grid.Row>
                <Grid.Row centered>
                    <Calendar />
                </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row>
                    <Container text style={{ width: '700px', background:''}}>
                        <p>{description}</p>
                        <p>Capacity: {capacity}</p>
                    </Container>
                </Grid.Row>
                <Grid.Row centered columns='3' style={{ marginTop: '2em'}}>
                    <Button
                    onClick={() => history.push('/mypage/room/edit')}>Edit</Button>

                    {/* need to be implemented!! */}
                    <Button primary
                    onClick={() => {}}>Pending Request</Button>
                    <Button color='red'
                    onClick={() => {}}>Delete</Button>
                </Grid.Row>
                </Grid>
        </Container>
    )
}
export default withRouter(MyRoom);