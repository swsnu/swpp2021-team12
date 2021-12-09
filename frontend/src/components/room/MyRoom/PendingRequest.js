import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import MyRoomPending from '../MyRoomPending/MyRoomPending';

function PendingRequest({ pendings, onClickHandleRequest }) {
  console.log(pendings);
  const [open, setOpen] = useState(false);
  const examplePending = [
    {
      id: 1,
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
      id: 2,
      requester: {
        id: 2,
        name: 'Gon',
        email: 'swpp@snu.ac.kr',
        self_intro: 'gongle',
      },
      content: 'Operating System is easy',
      date: '9999-99-99Tblahblah',
    },
  ];
  console.log(examplePending);

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
          <MyRoomPending
            pendinglist={pendings}
            onClickHandleRequest={onClickHandleRequest}
          />
          {/* <MyRoomPending pendinglist={examplePending} /> */}
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
