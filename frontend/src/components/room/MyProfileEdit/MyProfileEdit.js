import React, { useState } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
  Icon,
  Button,
  Input,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function MyProfileEdit(props) {
  const { name, email, selfIntro, history } = props;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newSelfIntro, setNewSelfIntro] = useState(selfIntro);
  const onClickFindPhotoButton = () => alert('Not implemented');
  const onClickDeletePhotoButton = () => alert('Not implemented');
  const onClickBackButton = () => history.push('/mypage');
  const onClickConfirmButton = () =>
    alert(`Got\n${newName}\n${newEmail}\n${newSelfIntro}`);
  return (
    <div>
      <Container text style={{ marginTop: '4em' }}>
        <Header as="h1" dividing>
          My Profile
        </Header>

        <Grid centered style={{ marginTop: '2em', marginBottom: '5em' }}>
          <Segment placeholder circular>
            <Header icon>
              <Icon name="photo" />
              No photo uploaded yet!
            </Header>
          </Segment>
        </Grid>
        <Button primary onClick={onClickFindPhotoButton}>
          Find Photo
        </Button>
        <Button primary onClick={onClickDeletePhotoButton}>
          Delete Photo
        </Button>
        <Grid divided="vertically">
          <Grid.Row columns={1}>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header sub>NAME</Header>
              <Input
                focus
                placeholder="NAME"
                defaultValue={name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column>
              <Header sub>EMAIL</Header>
              <Input
                focus
                placeholder="EMAIL"
                defaultValue={email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <Header sub>SELF INTRO</Header>
              <Input
                focus
                placeholder="SELF INTRO"
                defaultValue={selfIntro}
                onChange={(e) => setNewSelfIntro(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button primary onClick={onClickConfirmButton}>
          Confirm
        </Button>
        <Button primary onClick={onClickBackButton}>
          Back
        </Button>
      </Container>
    </div>
  );
}

export default withRouter(MyProfileEdit);
