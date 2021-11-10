import React, { useState } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
  Icon,
  Button,
  Input,
  Dimmer,
  Image,
  Loader,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function MyProfileEdit(props) {
  const { profile, onClickConfirmButton, history } = props;
  const [newSelfIntro, setNewSelfIntro] = useState('');
  const [detailImageFile, setDeatilImageFile] = useState(null);
  const [detailImageUrl, setDetailImageUrl] = useState(null);

  const onClickDeletePhotoButton = () => {
    setDetailImageUrl(null);
    setDeatilImageFile(null);
  };
  const onClickBackButton = () => history.push('/mypage');

  const setImageFromFile = ({ file, setImageUrl }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const onClickFindPhotoButton = ({ target: { files } }) => {
    if (files.length) {
      setImageFromFile({
        file: files[0],
        setImageUrl: ({ result }) => {
          setDeatilImageFile(files[0]);
          setDetailImageUrl(result);
        },
      });
    }
  };

  return (
    <div>
      {profile ? (
        <Container text style={{ marginTop: '4em' }}>
          <Header as="h1" dividing>
            My Profile
          </Header>
          <Grid centered style={{ marginTop: '2em', marginBottom: '5em' }}>
            <Segment placeholder circular size="small">
              {detailImageFile ? (
                <div className="image_area">
                  <Image
                    size="medium"
                    circular
                    src={detailImageUrl}
                    alt={detailImageFile.name}
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
          <Input
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={onClickFindPhotoButton}
          />
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
                  disabled
                  placeholder="NAME"
                  defaultValue={profile.name}
                />
              </Grid.Column>
              <Grid.Column>
                <Header sub>EMAIL</Header>
                <Input
                  focus
                  disabled
                  placeholder="EMAIL"
                  defaultValue={profile.email}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <Header sub>SELF INTRO</Header>
                <Input
                  focus
                  placeholder="SELF INTRO"
                  defaultValue={profile.selfIntro}
                  onChange={(e) => setNewSelfIntro(e.target.value)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button
            primary
            onClick={() =>
              onClickConfirmButton(detailImageFile, newSelfIntro, history)
            }
          >
            Confirm
          </Button>
          <Button primary onClick={onClickBackButton}>
            Back
          </Button>
        </Container>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </div>
  );
}

export default withRouter(MyProfileEdit);
