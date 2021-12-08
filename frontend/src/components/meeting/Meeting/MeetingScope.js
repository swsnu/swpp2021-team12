import React, { useEffect, useState } from 'react';
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
  const { myClubs, scopeHandler, existingScope } = props;
  const [isPublic, setIsPublic] = useState(true);
  const [selectedClubs, setSelectedClubs] = useState([]);
  const toggleClub = (id) => {
    if (selectedClubs.includes(id)) {
      setSelectedClubs(selectedClubs.filter((club) => club !== id));
    } else {
      setSelectedClubs([...selectedClubs, id]);
    }
  };
  useEffect(() => {
    if (existingScope) {
      console.log(existingScope);
      console.log(myClubs);
      setIsPublic(existingScope.isPublic);
      setSelectedClubs(
        existingScope.selectedClubs
          ? existingScope.selectedClubs.map((club) => club.id)
          : [],
      );
    }
  }, [existingScope]);

  return myClubs ? (
    <Modal
      className="scopeModal"
      onOpen={() => setIsScope(true)}
      open={isScope}
      trigger={
        <Button id="scope_button" size="small" primary={existingScope}>
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
                  defaultChecked={
                    selectedClubs ? selectedClubs.includes(club.id) : false
                  }
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
