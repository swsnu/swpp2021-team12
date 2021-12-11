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
          <Card style={{ width: '280px' }}>
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
                    primary
                    style={{ margin: '5px' }}
                    onClick={() => history.push(`/club/${club.id}/pending`)}
                  >
                    Pending Requests
                  </Button>
                  <br />
                  <Button
                    className="EditButton"
                    id="editClubButton"
                    color="instagram"
                    onClick={() =>
                      history.push({
                        pathname: `/club/${club.id}/edit`,
                        state: { club },
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    className="DeleteButton"
                    id="deleteClubButton"
                    onClick={() => onClickDeleteButton(club.id)}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  {club.members.find((member) => member.id === currentUser) ? (
                    <Button
                      className="QuitButton"
                      id="quitClubButton"
                      color="red"
                      onClick={() => onClickToggleButton(club.id, 0)}
                    >
                      Quit
                    </Button>
                  ) : (
                    <Button
                      className="JoinButton"
                      id="joinClubButton"
                      primary
                      disabled={club.pendings.find(
                        (member) => member.id === currentUser,
                      )}
                      onClick={() => onClickToggleButton(club.id, 1)}
                    >
                      Join
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
