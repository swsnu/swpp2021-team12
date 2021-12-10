import React from 'react';
import { Button, Segment, Header, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ClubDetail from '../ClubDetail/ClubDetail';

function ClubList(props) {
  const {
    currentUser,
    clubs,
    history,
    onClickDeleteButton,
    onClickToggleButton,
  } = props;
  return (
    <div
      className="ClubList"
      style={{ marginTop: '5em', marginLeft: '15em', marginRight: '5em' }}
    >
      <Segment>
        <Header>Created Clubs</Header>
        <Card.Group horizontal>
          {clubs &&
            clubs
              .filter((club) => club.author.id === currentUser)
              .map((club) => (
                <ClubDetail
                  key={club.id}
                  club={club}
                  history={history}
                  currentUser={currentUser}
                  isLeader={true}
                  onClickDeleteButton={onClickDeleteButton}
                />
              ))}
        </Card.Group>
      </Segment>
      <Segment>
        <Header>Joined Clubs</Header>
        <Card.Group>
          {clubs &&
            clubs
              .filter((club) =>
                club.members.find((member) => member.id === currentUser),
              )
              .map((club) => (
                <ClubDetail
                  club={club}
                  history={history}
                  currentUser={currentUser}
                  key={club.id}
                  isLeader={false}
                  onClickToggleButton={onClickToggleButton}
                />
              ))}
        </Card.Group>
      </Segment>

      <Button
        className="SearchButton"
        onClick={() => history.push('/club/search')}
      >
        Search
      </Button>
      <Button
        primary
        className="CreateButton"
        onClick={() => history.push('/club/create')}
      >
        Create a Club
      </Button>
      <Button
        secondary
        className="BackButton"
        onClick={() => history.push('/main')}
      >
        Back
      </Button>
    </div>
  );
}

export default withRouter(ClubList);
