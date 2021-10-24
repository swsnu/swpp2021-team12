import React from 'react';
import SignIn from '../../../components/auth/SignIn/SignIn';

function SignInPage() {
  const onSignIn = (email: string, password: string) => {
    console.log(email);
    console.log(password);
  };
  return <SignIn onSignIn={onSignIn} />;
}

export default SignInPage;
