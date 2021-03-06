import React from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Popup, Grid, Header, Button } from 'semantic-ui-react';

import axios from 'axios';

function UserInfo(props) {
  const { user, history } = props;
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
            primary
            onClick={() => {
              axios
                .get(`/api/room/user/${user.id}/`)
                .then((res) => {
                  if (user.id === res.data.host_id)
                    history.push(`/room/${res.data.id}`);
                  else history.push(`/mypage/room`);
                })
                .catch(() => {
                  alert('Error! There is no room');
                });
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
