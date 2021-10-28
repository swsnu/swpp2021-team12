import React from 'react';
import { useDispatch } from 'react-redux';
import SignUp from '../../../../components/auth/SignUp/SignUp';
import { signup } from '../../../../store/actions/auth';
import AuthTemplate from '../AuthTemplate';

function SignUpPage() {
  const dispatch = useDispatch();

  return (
    <AuthTemplate>
      <SignUp
        onSignUp={(email, name, password, checkPassword) => {
          if (password !== checkPassword) {
            alert('check password again');
          } else {
            dispatch(signup({ email, name, password }));
          }
        }}
      />
    </AuthTemplate>
  );
}

export default SignUpPage;
