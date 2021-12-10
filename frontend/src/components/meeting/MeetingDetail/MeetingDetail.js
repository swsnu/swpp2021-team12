import React, { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  // CustomOverlayMap
} from 'react-kakao-maps-sdk';
import { withRouter } from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Container,
  Button,
  Grid,
  Header,
  Image,
  Segment,
  Icon,
  // Popup,
} from 'semantic-ui-react';
import UserInfo from '../../UserInfo';

const markerSize = {
  width: 27,
  height: 35,
};

const starSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

function MeetingDetail(props) {
  const [accessible, setAccessible] = useState(false);
  const [meetingDetail, setMeetingDetail] = useState(null);
  const {
    currentUser,
    meetingDetailData,
    onClickDeleteButton,
    onClickToggleButton,
    meetingPhoto,
    history,
    commentList,
  } = props;

  useEffect(() => {
    if (meetingDetailData) {
      if (
        meetingDetailData.accessible_members.includes(currentUser) ||
        meetingDetailData.author.id === currentUser ||
        meetingDetailData.is_public
      ) {
        setAccessible(true);
        setMeetingDetail(meetingDetailData);
      } else {
        setMeetingDetail(meetingDetailData);
      }
    }
  }, [meetingDetailData]);

  return (
    <>
      {meetingDetail ? (
        <React.Fragment>
          {accessible ? (
            <>
              <Segment style={{ marginTop: '50px' }}>
                ACCESS SCOPE:
                {meetingDetail.is_public
                  ? ' PUBLIC'
                  : meetingDetail.accessible_clubs.map((club) => (
                      <Segment key={club.id}>{club.title}</Segment>
                    ))}
              </Segment>
              <Container text style={{ marginTop: '4em', width: '700px' }}>
                <Grid divided="vertically">
                  <Grid.Row centered>
                    <Header as="h1">{meetingDetail.title}</Header>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Header as="h2">{meetingDetail.content}</Header>
                  </Grid.Row>
                  <Grid.Row centered>
                    <UserInfo user={meetingDetail.author} />
                    ...is waiting for you!!
                  </Grid.Row>
                  <Grid.Row centered>
                    <Map
                      center={meetingDetail.location.position}
                      style={{ width: '100%', height: '500px' }}
                    >
                      <MapMarker
                        position={meetingDetail.location.position}
                        image={{ src: starSrc, size: markerSize }}
                      >
                        <p style={{ textAlign: 'center' }}>
                          {meetingDetail.location.description}
                        </p>
                      </MapMarker>
                      {/* <CustomOverlayMap
                        position={meetingDetail.location.position}
                      >
                        <Popup
                          on="click"
                          content={meetingDetail.location.description}
                          style={{ zIndex: '-1', position: 'relative' }}
                          trigger={
                            <MapMarker
                              position={meetingDetail.location.position}
                              image={{ src: starSrc, size: markerSize }}
                            ></MapMarker>
                          }
                        >
                          <Header as="h4">
                            {meetingDetail.location.description}
                          </Header>
                        </Popup>
                      </CustomOverlayMap> */}
                    </Map>
                    <Segment placeholder size="small">
                      {meetingPhoto ? (
                        <div className="image_area">
                          <Image size="medium" src={meetingPhoto} />
                        </div>
                      ) : (
                        <Header icon>
                          <Icon name="photo" />
                          No photo uploaded yet!
                        </Header>
                      )}
                    </Segment>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row>
                    <Container text style={{ width: '700px', background: '' }}>
                      <Segment centered style={{}}>
                        {meetingDetail.time && (
                          <p>
                            {new Date(meetingDetail.time * 1000)
                              .toLocaleString()
                              .slice(0, -3)}
                          </p>
                        )}
                      </Segment>
                      <h5>Current Member: </h5>
                      {meetingDetail.currentMembers
                        .filter(
                          (member) => member.id !== meetingDetail.author.id,
                        )
                        .map((member) => (
                          <UserInfo user={member} key={member.id} />
                        ))}
                      <p>Max Member: {meetingDetail.maxMembers}</p>
                    </Container>
                  </Grid.Row>
                  <Grid.Row centered columns="3" style={{ marginTop: '2em' }}>
                    {currentUser === meetingDetail.author.id ? (
                      <>
                        <Button
                          className="EditButton"
                          id="editMeetingButton"
                          color="instagram"
                          onClick={() =>
                            history.push(`/meeting/${meetingDetail.id}/edit`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          className="DeleteButton"
                          id="deleteMeetingButton"
                          color="red"
                          onClick={() => onClickDeleteButton()}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        {meetingDetail.currentMembers.find(
                          (member) => member.id === currentUser,
                        ) ? (
                          <Button
                            className="QuitButton"
                            id="quitMeetingButton"
                            color="red"
                            onClick={() => onClickToggleButton(0)}
                          >
                            Quit
                          </Button>
                        ) : (
                          <Button
                            className="JoinButton"
                            primary
                            id="joinMeetingButton"
                            onClick={() => onClickToggleButton(1)}
                            disabled={
                              meetingDetail.currentMembers.length ===
                              meetingDetail.maxMembers
                            }
                          >
                            Join
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      className="BackButton"
                      id="backDetailMeetingButton"
                      secondary
                      onClick={() => history.push('/meeting')}
                    >
                      Back
                    </Button>
                  </Grid.Row>
                  {commentList()}
                </Grid>
              </Container>
            </>
          ) : (
            <div>
              <Container text style={{ marginTop: '4em', width: '700px' }}>
                <h1>This meeting is locked!</h1>
                <p>
                  You cannot join this meeting since you are not not a member of
                  the club assigned
                </p>
              </Container>
            </div>
          )}
        </React.Fragment>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </>
  );
}

export default withRouter(MeetingDetail);
