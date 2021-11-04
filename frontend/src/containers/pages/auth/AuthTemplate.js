import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';

const HomepageHeading = () => (
  <Segment
    inverted
    textAlign="center"
    style={{ minHeight: 700, padding: '1em 0em' }}
    vertical
  >
    <Container text>
      <Header
        as="h1"
        content="MeetHub"
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as="h2"
        content="MeetHub is the place where people get together.
         Everyone in MeetHub can share their space to hang out,
         or gather people who have the same purpose."
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
    </Container>
  </Segment>
);

function AuthTemplate({ children, history }) {
  useEffect(() => {
    if ('user' in localStorage) {
      alert('You are logged in!\nMoving to main page..');
      history.push('/main');
    }
  }, [localStorage.user]);

  return (
    <div>
      <HomepageHeading />
      {children}
    </div>
  );
}

export default withRouter(AuthTemplate);
