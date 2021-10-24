import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ChildComponentProps extends RouteComponentProps {
  onSignUp: any;
}

const SignUp: React.FunctionComponent<ChildComponentProps> = ({
  history,
  onSignUp,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  return (
    <Segment placeholder>
      <Grid relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={() => onSignUp(email, name, password, checkPassword)}>
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
              label="Name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
              icon="mail"
              iconPosition="left"
              label="Password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="PasswordCheck"
              placeholder="PasswordCheck"
              type="password"
              onChange={(e) => setCheckPassword(e.target.value)}
            />

            <Button content="Confirm" primary />
            <Button
              content="Sign In"
              onClick={() => history.push('/sign_in')}
            />
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default withRouter(SignUp);
