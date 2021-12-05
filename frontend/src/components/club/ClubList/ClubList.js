import React from 'react';
import { Button, Segment, Header } from 'semantic-ui-react';
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
        <Segment.Group horizontal>
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
        </Segment.Group>
      </Segment>
      <Segment>
        <Header>Joined Clubs</Header>
        <Segment.Group horizontal>
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
        </Segment.Group>
      </Segment>

      <Button
        className="SearchButton"
        onClick={() => history.push('/club/search')}
      >
        SEARCH
      </Button>
      <Button
        className="CreateButton"
        onClick={() => history.push('/club/create')}
      >
        CREATE
      </Button>
      <Button className="BackButton" onClick={() => history.push('/main')}>
        BACK
      </Button>
    </div>
  );
}

export default withRouter(ClubList);
