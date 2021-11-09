import React from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function NoRoom(props) {
    const { history } = props;
    const onClickRegisterHandler = () => history.push('/mypage/room/register')

    return (
        <Container text style={{ marginTop: '4em' }}>
            <Segment placeholder style={{ height: '300px', width:'700px', marginBottom: '4em'}}>
                <h1>No Room Registered!!</h1>
            </Segment>
            <Button primary size="big" onClick={onClickRegisterHandler}>
                Register
            </Button>
        </Container>
    )
}
export default withRouter(NoRoom);