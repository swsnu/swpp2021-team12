import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onClickSignInButton, signInError, history } = props;
  const onClickSignUpButton = () => history.push('/sign_up');

  return (
    <Segment placeholder>
      <Grid relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={() => onClickSignInButton(email, password)}>
            <Form.Input
              className="SigninEmailInput"
              icon="mail"
              iconPosition="left"
              label="Email"
              placeholder="Email"
              error={
                signInError
                  ? {
                      content: 'Please enter a valid email address',
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              className="SigninPasswordInput"
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              placeholder="Password"
              error={
                signInError
                  ? {
                      content: 'Please enter a valid password',
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="SigninButton" content="Login" primary />
            <Button
              className="SignupButton"
              content="Sign Up"
              onClick={onClickSignUpButton}
            />
          </Form>
        </Grid.Column>
      </Grid>
      <Grid.Row></Grid.Row>
    </Segment>
  );
}

export default withRouter(SignIn);
