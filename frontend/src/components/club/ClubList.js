import React from 'react';
import { Button, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ClubDetail from './ClubDetail';

function ClubList(props) {
  const {
    currentUser,
    clubs,
    history,
    onClickDeleteButton,
    onClickQuitButton,
  } = props;
  return (
    <div
      className="ClubList"
      style={{ marginTop: '5em', marginLeft: '15em', marginRight: '5em' }}
    >
      <Segment>
        <Header>Created Clubs</Header>
        {clubs &&
          clubs
            .filter((club) => club.author.id === currentUser)
            .map((club) => (
              <ClubDetail
                club={club}
                history={history}
                currentUser={currentUser}
                key={club.id}
                isLeader={true}
                onClickDeleteButton={onClickDeleteButton}
              />
            ))}
      </Segment>
      <Segment>
        <Header>Joined Clubs</Header>
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
                onClickToggleButton={onClickQuitButton}
              />
            ))}
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
