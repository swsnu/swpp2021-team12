import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

function RequestModal(props) {
    const {room, onClickConfirm, selDate} = props;
    const [open, setOpen] = useState(false)

    return (
        <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button primary content="make Request"/>}
        >
            <div align='center'>
                <h2>Make a request to {room.title} on {selDate}</h2>
                <Button
                    id='request-confirm-button'
                    content='confirm'
                    icon='checkmark'
                    onClick={() => {onClickConfirm()}}
                    positive
                    />
                    <Button
                    id='request-close-button'
                    content="Close"
                    onClick={() => setOpen(false)}
                    color='red'
                />
            </div>
        </Modal>
    )
}
export default RequestModal