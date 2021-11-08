import React from 'react'
import { Container, Segment, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyRoom(props){
    const { title } = props;
    return (
        <Container text style={{marginTop: '4em' }}>
            <Segment>
                <Header as="h1" dividing>
                    {title}
                </Header>
                <Calendar />
            </Segment>
        </Container>
    )
}
export default withRouter(MyRoom);