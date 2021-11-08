import React, { useState } from "react";
import { Container, Form } from 'semantic-ui-react';

function MyRoomRegister() {
    const [title, setTitle] = useState('')

    return (
        <div className="MyRoomRegister">
            <Container text style={{ marginTop: '4em' }}>
                <Form >
                    <Form.Input 
                    type='text' 
                    label='Title' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </Form>
            </Container>
        </div>
    )
}
export default MyRoomRegister