import React from 'react';
import SignUp from '../../../components/auth/SignUp/SignUp';

function SignInPage() {
  const onSignUp = (
    email: string,
    name: string,
    password: string,
    checkPassword: string,
  ) => {
    if (password !== checkPassword) {
      alert('check password again');
    } else {
      alert('good');
    }
  };
  return <SignUp onSignUp={onSignUp} />;
}

export default SignInPage;
