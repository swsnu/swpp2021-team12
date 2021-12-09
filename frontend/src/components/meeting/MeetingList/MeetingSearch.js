import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';

function MeetingSearch(props) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { onClickFilterHandler } = props;
  return (
    <Modal
      className="modal"
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="filterButton">Filter</Button>}
    >
      <Modal.Header>Filter</Modal.Header>
      <Modal.Description>
        <Button className="keyword">Keyword</Button>
        <Button
          className="time"
          onClick={() => {
            alert('Not implemented. Sorry for inconvenience');
          }}
        >
          Time
        </Button>
      </Modal.Description>
      <Modal.Description>
        <Input
          id="search-input"
          placeholder="Search clubs by a keyword!"
          style={{ width: '70em' }}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </Modal.Description>
      <Modal.Actions>
        <Button className="back" onClick={() => setOpen(false)}>
          Back
        </Button>
        <Button
          className="confirm"
          content="Confirm"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            onClickFilterHandler(keyword);
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default MeetingSearch;
