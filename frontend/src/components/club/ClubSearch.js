import React, { useState } from 'react';
import { Container, Grid, Header, Input, Button, List } from 'semantic-ui-react';

function Club (props) {
    const { club } = props;

    return (
        <List.Item style={{ width: "70em"}}>
            <List.Content>
                <List.Header as='a' href={`/club/${club.id}`}><h2>{club.title}</h2></List.Header>
                <List.Description as ='a' href={`/club/${club.id}`}><p>{club.content}</p></List.Description>
            </List.Content>
        </List.Item>
    )
}

function ClubSearch(props) {
    const { clubList } = props;
    const [ inputValue, setInputValue ] = useState('');
    const [ searchedClubList, setSearchedClubList ] = useState();

    const onClickSearchHandler = () => {
        const input = inputValue.toUpperCase();
        let searchList;
        if (input === '') {
            searchList = clubList;
        }
        else {searchList = clubList.filter((club) => {
            if (club.title.toUpperCase().indexOf(input) > -1) {
                return true;
            }
            return false;
            });
        }
        setSearchedClubList(searchList);
    }

    return (
        <Container style={{ marginTop: "4em"}}>
            {clubList && 
            <Grid>
                <Grid.Row centered>
                    <Header size='huge'>Club Search</Header>
                </Grid.Row>
                <Grid.Row>
                    <Input style={{ width: "70em" }} onChange={(e) => {setInputValue(e.target.value);}}></Input>
                    <Button primary onClick={onClickSearchHandler}>Search!</Button>
                </Grid.Row>
                <Grid.Row>
                    <List divided relaxed>
                        {(searchedClubList) ?
                        searchedClubList.map((club) => <Club key={club.id} club={club} />) :
                        clubList.map((club) => <Club key={club.id} club={club} />)}
                    </List>
                </Grid.Row>
            </Grid>
            }
        </Container>
    )
}
export default ClubSearch;