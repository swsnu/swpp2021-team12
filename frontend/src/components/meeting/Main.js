import React from 'react';
import { Button, Grid, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Main(props) {
  const { history } = props;
  return (
    <div>
      <Grid centered style={{ marginTop: '2em', marginBottom: '5em' }}>
        <Image src="img/welcomeTo301.png" />
      </Grid>
      <Button id="button_createmeeting"primary onClick={() => history.push('/meeting/create')}>
        Create Meeting
      </Button>
    </div>
  );
}

export default withRouter(Main);
