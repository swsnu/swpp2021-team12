import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../../../store/actions/auth';
import SignIn from '../../../../components/auth/SignIn/SignIn';
import AuthTemplate from '../AuthTemplate';

function SignInPage() {
  const { signInError } = useSelector(({ auth }) => ({
    signInError: auth.authError,
  }));
  const dispatch = useDispatch();

  return (
    <AuthTemplate>
      <SignIn
        signInError={signInError}
        onClickSignInButton={(email, password) => {
          dispatch(signin({ email, password }));
        }}
      />
    </AuthTemplate>
  );
}

export default SignInPage;
