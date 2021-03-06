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
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(true);
  const { onClickConfirmButton, history } = props;
  const onClickSignInButton = () => history.push('/sign_in');
  const mailReg =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return (
    <Segment placeholder>
      <Grid relaxed="very" stackable>
        <Grid.Column>
          <Form
            id="form_signup"
            onSubmit={() => {
              onClickConfirmButton(email, name, password);
            }}
          >
            <Form.Input
              id="input_email"
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
              id="input_name"
              icon="lock"
              iconPosition="left"
              label="Name"
              placeholder="Name"
              error={
                !isValidName && name
                  ? {
                      content: 'Your name should contain at least 3 characters',
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => {
                setName(e.target.value);

                if (e.target.value && e.target.value.length >= 3) {
                  setIsValidName(true);
                } else {
                  setIsValidName(false);
                }
              }}
            />
            <Form.Input
              id="input_password"
              icon="mail"
              iconPosition="left"
              label="Password"
              placeholder="Password"
              type="password"
              error={
                !isValidPassword && password
                  ? {
                      content:
                        'Your password should contain at least 6 characters',
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length >= 6) {
                  setIsValidPassword(true);
                } else {
                  setIsValidPassword(false);
                }
              }}
            />
            <Form.Input
              id="input_passwordCheck"
              icon="lock"
              iconPosition="left"
              label="PasswordCheck"
              placeholder="PasswordCheck"
              type="password"
              error={
                !isValidPasswordCheck && checkPassword
                  ? {
                      content: "PasswordCheck doesn't match with Password",
                      pointing: 'below',
                    }
                  : null
              }
              onChange={(e) => {
                setCheckPassword(e.target.value);
                if (isValidPassword && password === e.target.value) {
                  setIsValidPasswordCheck(true);
                } else {
                  setIsValidPasswordCheck(false);
                }
              }}
            />
            <Button
              content="Confirm"
              disabled={!isValidEmail || !isValidName || !isValidPassword}
              primary
              id="button_confirm"
            />
            <Button
              id="button_signin"
              content="Sign In"
              onClick={onClickSignInButton}
            />
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default withRouter(SignUp);
