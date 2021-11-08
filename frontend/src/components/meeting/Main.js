import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Main(props) {
  const { history } = props;
  return (
    <div>
      <h1>should contain map and functions</h1>
      <h3>but kakaomap API not available so far..</h3>
      <Button primary onClick={() => history.push('/meeting/create')}>
        Create Meeting
      </Button>
    </div>
  );
}

export default withRouter(Main);
