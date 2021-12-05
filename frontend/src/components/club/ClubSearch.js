import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Input,
  Button,
  List,
} from 'semantic-ui-react';
import ClubDetail from './ClubDetail/ClubDetail';

function ClubSearch(props) {
  const {
    currentUser,
    clubList,
    history,
    onClickDeleteButton,
    onClickToggleButton,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [searchedClubList, setSearchedClubList] = useState();

  const onClickSearchHandler = () => {
    const input = inputValue.toUpperCase();
    let searchList;
    if (input === '') {
      searchList = clubList;
    } else {
      searchList = clubList.filter((club) => {
        if (club.title.toUpperCase().indexOf(input) > -1) {
          return true;
        }
        return false;
      });
    }
    setSearchedClubList(searchList);
  };

  return (
    <div
      className="ClubSearch"
      style={{ marginTop: '5em', marginLeft: '15em', marginRight: '5em' }}
    >
      <Container id="club-search">
        {clubList && (
          <Grid>
            <Grid.Row centered>
              <Header size="huge">Club Search</Header>
            </Grid.Row>
            <Grid.Row>
              <Input
                id="search-input"
                placeholder="Search clubs by a keyword!"
                style={{ width: '70em' }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              ></Input>
              <Button id="search-button" primary onClick={onClickSearchHandler}>
                Search!
              </Button>
            </Grid.Row>
            <Grid.Row>
              <List divided relaxed horizontal>
                {searchedClubList
                  ? searchedClubList.map((club) => (
                      <ClubDetail
                        key={club.id}
                        club={club}
                        history={history}
                        currentUser={currentUser}
                        isLeader={club.author.id === currentUser}
                        onClickDeleteButton={onClickDeleteButton}
                        onClickToggleButton={onClickToggleButton}
                      />
                    ))
                  : clubList.map((club) => (
                      <ClubDetail
                        key={club.id}
                        club={club}
                        history={history}
                        currentUser={currentUser}
                        isLeader={club.author.id === currentUser}
                        onClickDeleteButton={onClickDeleteButton}
                        onClickToggleButton={onClickToggleButton}
                      />
                    ))}
              </List>
            </Grid.Row>
          </Grid>
        )}
      </Container>
    </div>
  );
}
export default withRouter(ClubSearch);
