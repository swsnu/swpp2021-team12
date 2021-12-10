import React from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Popup, Grid, Header, Button } from 'semantic-ui-react';

function UserInfo(props) {
  const { user } = props;
  return (
    <Popup
      pinned
      on="click"
      trigger={
        <Label as="a" color="teal" image>
          <img src={`/api/user/${user.id}/profile/`} />
          {user.name}
        </Label>
      }
    >
      <Grid centered divided columns={1}>
        <Grid.Column textAlign="center">
          <Header as="h4">{user.name}</Header>
          <p>{user.email}</p>
          <p>{user.self_intro}</p>
          <Button
            onClick={() => {
              window.alert('Not implemented yet. Sorry for inconvenience.');
            }}
          >
            Go to Room
          </Button>
        </Grid.Column>
      </Grid>
    </Popup>
  );
}

export default withRouter(UserInfo);
