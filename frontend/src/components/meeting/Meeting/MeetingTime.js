import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
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
      trigger={
        <Button id="time-button" size="small">
          Time
        </Button>
      }
    >
      <Modal.Header>Time</Modal.Header>
      <Modal.Description>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateTimePicker
            id="timepicker"
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={time}
            onChange={(newValue) => {
              timeHandler(newValue);
            }}
          />
        </LocalizationProvider>
      </Modal.Description>
      <Modal.Actions>
        <Button
          id="back-button"
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
