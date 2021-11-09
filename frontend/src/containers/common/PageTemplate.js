import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import { checksignin } from '../../store/actions/auth';

function PageTemplate({ children, history }) {
  const { currentAuth, authError } = useSelector(({ auth }) => ({
    currentAuth: auth.auth,
    authError: auth.authError,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentAuth) {
      if ('user' in localStorage) {
        const id = localStorage.user;
        dispatch(checksignin({ id }));
      } else {
        if (authError) {
          alert('Error occured; please try loggin in again');
        } else {
          alert('You are logged out; please log in to enjoy meethub!');
        }
        history.push('/sign_in');
      }
    }
  }, [currentAuth, localStorage.user]);
  return <Header>{children}</Header>;
}

export default withRouter(PageTemplate);
