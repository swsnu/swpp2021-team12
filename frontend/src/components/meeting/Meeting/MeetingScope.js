import React, { useState } from 'react';
import {
  Modal,
  Button,
  Dimmer,
  Loader,
  Checkbox,
  Segment,
} from 'semantic-ui-react';

function MeetingScope(props) {
  const [isScope, setIsScope] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const { myClubs, scopeHandler } = props;
  const [selectedClubs, setSelectedClubs] = useState([]);
  const toggleClub = (id) => {
    if (selectedClubs.includes(id)) {
      setSelectedClubs(selectedClubs.filter((club) => club !== id));
    } else {
      setSelectedClubs([...selectedClubs, id]);
    }
  };

  return myClubs ? (
    <Modal
      className="scopeModal"
      onOpen={() => setIsScope(true)}
      open={isScope}
      trigger={
        <Button id="scope_button" size="small">
          Scope
        </Button>
      }
    >
      <Modal.Header>Access Scope</Modal.Header>
      <Modal.Description>
        Toggle Public / Private
        <Checkbox
          toggle
          defaultChecked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        {isPublic ? null : (
          <Segment.Group>
            {myClubs.map((club) => (
              <Segment key={club.id}>
                {club.title}{' '}
                <Checkbox
                  toggle
                  defaultChecked={selectedClubs.includes(club.id)}
                  onChange={() => toggleClub(club.id)}
                />
              </Segment>
            ))}
          </Segment.Group>
        )}
      </Modal.Description>
      <Modal.Actions>
        <Button
          className="BackButton"
          onClick={() => {
            setSelectedClubs([]);
            setIsScope(false);
          }}
        >
          Back
        </Button>
        <Button
          className="ConfirmButton"
          content="Confirm"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            setIsScope(false);
            scopeHandler(isPublic, selectedClubs);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
}

export default MeetingScope;
