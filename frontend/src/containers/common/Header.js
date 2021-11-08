import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { createMedia } from '@artsy/fresnel';
import {
  Button,
  Container,
  Menu,
  Segment,
  Visibility,
  Icon,
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signout } from '../../store/actions/auth';

const { Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

function Header({ children, history }) {
  const dispatch = useDispatch();
  return (
    <Media greaterThan="mobile">
      <Visibility>
        <Segment
          inverted
          textAlign="center"
          style={{ padding: '1em 0em' }}
          vertical
        >
          <Menu fixed="top" inverted>
            <Container>
              <Menu.Item position="left">
                <Link to="/main">
                  <Icon name="github" size="big" />
                </Link>
              </Menu.Item>
              <Menu.Item position="right">
                <Button
                  id="button_mypage"
                  inverted
                  primary
                  onClick={() => history.push('/mypage')}
                >
                  My Page
                </Button>
                <Button
                  id="button_signout"
                  inverted
                  primary
                  style={{ marginLeft: '0.5em' }}
                  onClick={() => {
                    dispatch(signout());
                  }}
                >
                  Log Out
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      </Visibility>

      {children}
    </Media>
  );
}

export default withRouter(Header);
