import React from 'react'
import { Container, Header } from 'semantic-ui-react'


function MyRoom(){

    return (
        <Container text style={{marginTop: '4em' }}>
            <Header as="h1" dividing>
                My Room Title
            </Header>
        </Container>
    )
}
export default MyRoom;