import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Container,
  Button,
  Grid,
  Header,
} from 'semantic-ui-react';

function ClubDetail(props) {
  const { currentUser, clubDetail, onClickDeleteButton, history } = props;

  return (
    <>
      {clubDetail ? (
        <div className="ClubDetail">
          <Container text style={{ marginTop: '4em', width: '700px' }}>
            <Grid divided="vertically">
              <Grid.Row centered>
                <Header>CLUB TITLE : {clubDetail.title}</Header>
              </Grid.Row>
              <Grid.Row centered>
                <Header>CLUB DESCRIPTION : {clubDetail.content}</Header>
              </Grid.Row>
              <Grid.Row centered>LEADER : {clubDetail.author.name}</Grid.Row>
            </Grid>
            <Grid>
              <Grid.Row>
                <Container text style={{ width: '700px', background: '' }}>
                  <h5>[ Members ]</h5>
                  {clubDetail.members.map((member) => (
                    <button key={member.id}>{member.name}</button>
                  ))}
                </Container>
              </Grid.Row>
              <Grid.Row centered columns="3" style={{ marginTop: '2em' }}>
                {currentUser === clubDetail.author.id ? (
                  <>
                    <Button
                      className="EditButton"
                      id="editClubButton"
                      onClick={() =>
                        history.push(`/club/${clubDetail.id}/edit`)
                      }
                    >
                      EDIT
                    </Button>
                    <Button
                      className="DeleteButton"
                      id="deleteClubButton"
                      onClick={() => onClickDeleteButton()}
                    >
                      DELETE
                    </Button>
                  </>
                ) : (
                  <>
                    {clubDetail.members.find(
                      (member) => member.id === currentUser,
                    ) ? (
                      <Button
                        className="QuitButton"
                        id="quitClubButton"
                        // onClick=TODO
                      >
                        QUIT
                      </Button>
                    ) : (
                      <Button
                        className="JoinButton"
                        primary
                        id="joinClubButton"
                        // onClick=TODO
                        // disabled=TODO
                      >
                        JOIN
                      </Button>
                    )}
                  </>
                )}
                <Button
                  className="BackButton"
                  id="backDetailClubButton"
                  onClick={() => history.push('/club')}
                >
                  BACK
                </Button>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </>
  );
}

export default withRouter(ClubDetail);
