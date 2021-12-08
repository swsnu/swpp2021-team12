import React from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Popup } from 'semantic-ui-react';

function UserInfo(props) {
  const { user, history } = props;
  return (
    <Popup
      content={user.self_intro}
      header={user.email}
      trigger={
        <Label
          as="a"
          color="teal"
          image
          onClick={() => history.push(`/profile/${user.id}`)}
        >
          <img src={`/api/user/${user.id}/profile/`} />
          {user.name}
        </Label>
      }
    />
  );
}

export default withRouter(UserInfo);
