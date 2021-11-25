import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';

function MeetingTime(props) {
  const [isTime, setIsTime] = useState(false);
  const { timeHandler, time } = props;
  return (
    <Modal
      className="timeModal"
      onOpen={() => setIsTime(true)}
      open={isTime}
      trigger={<Button size="small">Time</Button>}
    >
      <Modal.Header>Time</Modal.Header>
      <Modal.Description>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateTimePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={time}
            onChange={(newValue) => {
              timeHandler(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Modal.Description>
      <Modal.Actions>
        <Button
          onClick={() => {
            setIsTime(false);
          }}
        >
          Back
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MeetingTime;
