import React, { useState, useEffect } from 'react';
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
  const { profile, profileImage, onClickConfirmButton, history } = props;
  const [newSelfIntro, setNewSelfIntro] = useState('');
  const [detailImageFile, setDeatilImageFile] = useState(null);
  const [detailImageUrl, setDetailImageUrl] = useState(null);
  const [isImageModified, setIsImageModified] = useState(0);
  // 0: not modified 1: modified 2: deleted

  useEffect(() => {
    setDetailImageUrl(profileImage);
  }, [profileImage]);

  const onClickDeletePhotoButton = () => {
    setDetailImageUrl(null);
    setDeatilImageFile(null);
    setIsImageModified(2);
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
      setIsImageModified(1);
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
              {detailImageUrl ? (
                <div className="image_area">
                  <Image size="medium" circular src={detailImageUrl} />
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
          <Button id="button_delete" primary onClick={onClickDeletePhotoButton}>
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
            id="button_confirm"
            primary
            onClick={() =>
              onClickConfirmButton(
                detailImageFile,
                newSelfIntro,
                history,
                isImageModified,
              )
            }
          >
            Confirm
          </Button>
          <Button id="button_back" primary onClick={onClickBackButton}>
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
