import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, List, Card } from 'semantic-ui-react';
import UserInfo from '../../UserInfo';

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
                <UserInfo user={club.author} />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Members:
              {club.members.map((member) => (
                <UserInfo key={member.id} user={member} />
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
