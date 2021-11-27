import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

function PendingRequest() {
    const [open, setOpen] = useState(false)

    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button id='my-room-pending-button' primary>Pending Request</Button>}
        >
            <Modal.Header>Request List</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    Requests Will be here!
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                id='pending-request-close-button'
                content="Close"
                labelPosition='right'
                icon='checkmark'
                onClick={() => setOpen(false)}
                positive
                />
            </Modal.Actions>
        </Modal>
    )
}
export default PendingRequest