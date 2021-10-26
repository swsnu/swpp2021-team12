import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';

function PageTemplate({ children, history }) {
  const { currentAuth } = useSelector(({ auth }) => ({
    currentAuth: auth.auth,
  }));
  useEffect(() => {
    if (!currentAuth) {
      alert('You are logged out; please log in to enjoy meethub!');
      history.push('/sign_in');
    }
  }, [currentAuth, history]);
  return <Header>{children}</Header>;
}

export default withRouter(PageTemplate);
