import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Header,
  Button,
  Input,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Photo from '../../../containers/common/Photo';

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

  const onClickBackButton = () => history.push('/mypage');

  return (
    <div>
      {profile ? (
        <div className="MyProfileEdit">
          <Container text style={{ marginTop: '4em' }}>
            <Header as="h1" dividing>
              My Profile
            </Header>
            <Grid centered style={{ marginTop: '2em', marginBottom: '5em' }}>
              <Photo
                isCircular={true}
                photo={detailImageUrl}
                setDeatilImageFile={setDeatilImageFile}
                setDetailImageUrl={setDetailImageUrl}
                setIsImageModified={setIsImageModified}
              />
            </Grid>
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
                    id="input_intro"
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
        </div>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </div>
  );
}

export default withRouter(MyProfileEdit);
