import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ComponentProps extends RouteComponentProps {
  onSignIn: any;
}

const SignIn: React.FunctionComponent<ComponentProps> = ({
  history,
  onSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Segment placeholder>
      <Grid relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={() => onSignIn(email, password)}>
            <Form.Input
              icon="mail"
              iconPosition="left"
              label="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button content="Login" primary />
            <Button
              content="Sign Up"
              onClick={() => history.push('/sign_up')}
            />
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default withRouter(SignIn);
