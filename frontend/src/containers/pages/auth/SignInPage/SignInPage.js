import React from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../../../store/actions/auth';
import SignIn from '../../../../components/auth/SignIn/SignIn';
import AuthTemplate from '../AuthTemplate';

function SignInPage() {
  const dispatch = useDispatch();

  return (
    <AuthTemplate>
      <SignIn
        onSignIn={(email, password) => {
          dispatch(signin({ email, password }));
        }}
      />
    </AuthTemplate>
  );
}

export default SignInPage;
