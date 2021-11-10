import React from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
  Icon,
  Button,
  Dimmer,
  Loader,
  Image,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function MyProfile(props) {
  const { profile, profileImage, history } = props;
  const onClickEditButton = () => history.push('/mypage/edit');
  return (
    <div>
      <Container text style={{ marginTop: '4em' }}>
        {profile ? (
          <div>
            <Header as="h1" dividing>
              My Profile
            </Header>
            <Grid centered style={{ marginTop: '2em' }}>
              <Segment placeholder circular size="small">
                {profileImage ? (
                  <div className="image_area">
                    <Image
                      size="medium"
                      circular
                      src={`data:image/jpg,${profileImage}`}
                    />
                  </div>
                ) : (
                  <Header icon>
                    <Icon name="photo" />
                    No photo uploaded yet!
                  </Header>
                )}
              </Segment>
            </Grid>
            <Grid divided="vertically">
              <Grid.Row columns={1}>
                <Grid.Column></Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Header sub>NAME</Header>
                  <span>{profile.name}</span>
                </Grid.Column>
                <Grid.Column>
                  <Header sub>EMAIL</Header>
                  <span>{profile.email}</span>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Header sub>SELF INTRO</Header>
                  <span>{profile.selfIntro}</span>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button primary size="big" onClick={onClickEditButton}>
              Edit
            </Button>
          </div>
        ) : (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </Container>
    </div>
  );
}

export default withRouter(MyProfile);
