import {
  Map,
  MapMarker,
  CustomOverlayMap,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import React, { useEffect, useState } from 'react';
import {
  Segment,
  Header,
  Button,
  Grid,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const markerSize = {
  width: 27,
  height: 35,
};

const starSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

const meetingSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';

const roomSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';

function Main(props) {
  // eslint-disable-next-line no-unused-vars
  const { history, meetings, rooms } = props;
  const [location, setLocation] = useState(null);
  const [meetingBubble, setMeetingBubble] = useState([]);
  const [roomBubble, setRoomBubble] = useState([]);

  const roomMarkers = () =>
    roomBubble.map((room) => (
      <div key={room.id}>
        <MapMarker
          position={room.location}
          image={{ src: roomSrc, size: markerSize }}
          onClick={() => {
            const tmp1 = roomBubble.find((x) => x.id === room.id);
            const tmp2 = roomBubble.filter((x) => x.id !== room.id);
            tmp2.push({ ...tmp1, open: true });
            setRoomBubble(tmp2);
          }}
        />
        {room.open && (
          <CustomOverlayMap position={room.location}>
            <Segment inverted>
              <div className="info">
                <Header inverted>{room.title}</Header>
                <div className="body">
                  {room.content}
                  <div>
                    <Button onClick={() => history.push(`/room/${room.id}`)}>
                      Go to Detail
                    </Button>
                    <Button
                      onClick={() => {
                        const tmp1 = roomBubble.find((x) => x.id === room.id);
                        const tmp2 = roomBubble.filter((x) => x.id !== room.id);
                        tmp2.push({ ...tmp1, open: false });
                        setRoomBubble(tmp2);
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Segment>
          </CustomOverlayMap>
        )}
      </div>
    ));

  const meetingMarkers = () =>
    meetingBubble.map((meeting) => (
      <div key={meeting.id}>
        <MapMarker
          position={meeting.location}
          image={{ src: meetingSrc, size: markerSize }}
          onClick={() => {
            const tmp1 = meetingBubble.find((x) => x.id === meeting.id);
            const tmp2 = meetingBubble.filter((x) => x.id !== meeting.id);
            tmp2.push({ ...tmp1, open: true });
            setMeetingBubble(tmp2);
          }}
        />
        {meeting.open && (
          <CustomOverlayMap position={meeting.location}>
            <Segment inverted>
              <div className="info">
                <Header inverted>{meeting.title}</Header>
                <div className="body">
                  {meeting.content}
                  <div className="host">
                    HOST:{meeting.author}
                    <div className="member">
                      current member : {meeting.current_members}/
                      {meeting.max_members}
                    </div>
                    <div>
                      <Button
                        onClick={() => history.push(`/meeting/${meeting.id}`)}
                      >
                        Go to Detail
                      </Button>
                      <Button
                        onClick={() => {
                          const tmp1 = meetingBubble.find(
                            (x) => x.id === meeting.id,
                          );
                          const tmp2 = meetingBubble.filter(
                            (x) => x.id !== meeting.id,
                          );
                          tmp2.push({ ...tmp1, open: false });
                          setMeetingBubble(tmp2);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Segment>
          </CustomOverlayMap>
        )}
      </div>
    ));

  useEffect(() => {
    setMeetingBubble(meetings);
    setRoomBubble(rooms);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setLocation({
        lat: 33.451475,
        lng: 126.570528,
      });
    }
  }, [navigator.geolocation]);

  return (
    <div>
      {location ? (
        <div className="Main">
          <Grid centered style={{ marginTop: '2em', marginBottom: '5em' }}>
            <Map
              id="map"
              center={location}
              style={{ width: '950px', height: '500px' }}
              level={3}
            >
              <MapMarker
                position={location}
                image={{ src: starSrc, size: markerSize }}
              />
              <MarkerClusterer averageCenter={true} minLevel={10}>
                {meetingMarkers()}
                {roomMarkers()}
              </MarkerClusterer>
            </Map>
          </Grid>
          <Button
            id="button_createmeeting"
            primary
            onClick={() => history.push('/meeting/create')}
          >
            Create Meeting
          </Button>
        </div>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </div>
  );
}

export default withRouter(Main);
