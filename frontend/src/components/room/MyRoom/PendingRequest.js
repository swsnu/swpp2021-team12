import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import MyRoomPending from '../MyRoomPending/MyRoomPending';

function PendingRequest() {
  const [open, setOpen] = useState(false);
  const ExamplePending = [
    {
      requester: {
        id: 1,
        name: 'Pigeon',
        email: 'chicken@chicken.com',
        self_intro: 'cock-a-doodle-doo',
      },
      content: 'I want to join',
      date: '2021-12-17Tblahblah',
    },
    {
      requester: {
        id: 2,
        name: 'Gon',
        email: 'swpp@snu.ac.kr',
        self_intro: 'gongle',
      },
      content: 'Operating System is easy',
      date: '9999-9999Tblahblah',
    },
  ];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button id="my-room-pending-button" primary>
          Pending Request
        </Button>
      }
    >
      <Modal.Header>Request List</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <MyRoomPending pendinglist={ExamplePending} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          id="pending-request-close-button"
          content="Close"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
export default PendingRequest;
