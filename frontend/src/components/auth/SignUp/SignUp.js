import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { onClickConfirmButton, history } = props;
  const onClickSignInButton = () => history.push('/sign_in');
  const mailReg = /^[^@\s]+@[^@.\s]+.[a-zA-Z]{2,3}$/;

  return (
    <Segment placeholder>
      <Grid relaxed="very" stackable>
        <Grid.Column>
          <Form
            onSubmit={() => {
              onClickConfirmButton(email, name, password);
            }}
          >
            <Form.Input
              icon="mail"
              iconPosition="left"
              label="Email"
              placeholder="Email"
              error={
                !isValidEmail && email
                  ? {
                      content: 'Please enter a valid email form',
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => {
                setEmail(e.target.value);
                if (mailReg.test(e.target.value)) {
                  setIsValidEmail(true);
                } else {
                  setIsValidEmail(false);
                }
              }}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Name"
              placeholder="Name"
              error={
                !isValidName && name
                  ? { content: 'Please enter your name', pointing: 'below' }
                  : null
              }
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value) {
                  setIsValidName(true);
                } else {
                  setIsValidName(false);
                }
              }}
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
              error={
                !isValidPassword && checkPassword
                  ? {
                      content: "PasswordCheck doesn't match with Password",
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => {
                setCheckPassword(e.target.value);
                if (password && password === e.target.value) {
                  setIsValidPassword(true);
                } else {
                  setIsValidPassword(false);
                }
              }}
            />

            <Button
              content="Confirm"
              disabled={!isValidEmail || !isValidName || !isValidPassword}
              primary
            />
            <Button content="Sign In" onClick={onClickSignInButton} />
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default withRouter(SignUp);