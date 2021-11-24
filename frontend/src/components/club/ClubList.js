import React from 'react';
import { Button, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function ClubList(props) {
  const { history } = props;
  return (
    <div style={{ marginTop: '5em', marginLeft: '15em', marginRight: '5em' }}>
      <Segment>
        <Header>Created Clubs</Header>
      </Segment>
      <Segment>
        <Header>Joined Clubs</Header>
      </Segment>

      <Button className="SearchButton">search</Button>
      <Button className="CreateButton">create</Button>
      <Button className="BackButton" onClick={() => history.push('/main')}>
        back
      </Button>
    </div>
  );
}

export default withRouter(ClubList);
