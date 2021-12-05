import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, List, Card, Popup, Image } from 'semantic-ui-react';

function ClubDetail({
  club,
  history,
  currentUser,
  onClickDeleteButton,
  onClickToggleButton,
}) {
  return (
    <div className="ClubDetail" style={{ margin: '10px' }}>
      <List divided relaxed>
        <List.Item>
          <Card>
            <Card.Content>
              <Card.Header>{club.title}</Card.Header>
              <Card.Description>{club.content}</Card.Description>
              <Card.Description>
                Leader:
                <Popup
                  content={club.author.self_intro}
                  key={club.author.id}
                  header={club.author.name}
                  trigger={
                    <Image
                      src={`/api/user/${club.author.id}/profile/`}
                      avatar
                    />
                  }
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Members:
              {club.members.map((member) => (
                <Popup
                  content={member.self_intro}
                  key={member.id}
                  header={member.name}
                  trigger={
                    <Image src={`/api/user/${member.id}/profile/`} avatar />
                  }
                />
              ))}
              <br />
              {club.author.id === currentUser ? (
                <>
                  <Button
                    id="pending-button"
                    size="tiny"
                    style={{ margin: '5px' }}
                    onClick={() => history.push(`/club/${club.id}/pending`)}
                  >
                    PENDING REQUESTS
                  </Button>
                  <br />
                  <Button
                    className="EditButton"
                    id="editClubButton"
                    onClick={() =>
                      history.push({
                        pathname: `/club/${club.id}/edit`,
                        state: { club },
                      })
                    }
                  >
                    EDIT
                  </Button>
                  <Button
                    className="DeleteButton"
                    id="deleteClubButton"
                    onClick={() => onClickDeleteButton(club.id)}
                  >
                    DELETE
                  </Button>
                </>
              ) : (
                <>
                  {club.members.find((member) => member.id === currentUser) ? (
                    <Button
                      className="QuitButton"
                      id="quitClubButton"
                      onClick={() => onClickToggleButton(club.id, 0)}
                    >
                      QUIT
                    </Button>
                  ) : (
                    <Button
                      className="JoinButton"
                      id="joinClubButton"
                      disabled={club.pendings.find(
                        (member) => member.id === currentUser,
                      )}
                      onClick={() => onClickToggleButton(club.id, 1)}
                    >
                      JOIN
                    </Button>
                  )}
                </>
              )}
            </Card.Content>
          </Card>
        </List.Item>
      </List>
    </div>
  );
}

export default withRouter(ClubDetail);
