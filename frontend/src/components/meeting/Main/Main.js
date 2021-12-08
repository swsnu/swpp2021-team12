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
          id="room-marker"
          position={{ lat: room.lat, lng: room.lng }}
          image={{ src: roomSrc, size: markerSize }}
          onClick={() => {
            const tmp1 = roomBubble.find((x) => x.id === room.id);
            const tmp2 = roomBubble.filter((x) => x.id !== room.id);
            tmp2.push({ ...tmp1, open: true });
            setRoomBubble(tmp2);
          }}
        />
        {room.open && (
          <CustomOverlayMap position={{ lat: room.lat, lng: room.lng }}>
            <Segment inverted>
              <div className="info">
                <Header inverted>{room.title}</Header>
                <div className="body">
                  {room.description}
                  <div>
                    <Button
                      id="roomdetail-button"
                      onClick={() => history.push(`/room/${room.id}`)}
                    >
                      Go to Detail
                    </Button>
                    <Button
                      id="roomclose-button"
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
          id="meeting-marker"
          position={meeting.location.position}
          image={{ src: meetingSrc, size: markerSize }}
          onClick={() => {
            const tmp1 = meetingBubble.find((x) => x.id === meeting.id);
            const tmp2 = meetingBubble.filter((x) => x.id !== meeting.id);
            tmp2.push({ ...tmp1, open: true });
            setMeetingBubble(tmp2);
          }}
        />
        {meeting.open && (
          <CustomOverlayMap position={meeting.location.position}>
            <Segment inverted>
              <div className="info">
                <Header inverted>{meeting.title}</Header>
                <div className="body">
                  {meeting.content}
                  <div className="host">
                    HOST:{meeting.author.name}
                    <div className="member">
                      current member : {meeting.currentMembers.length}/
                      {meeting.maxMembers}
                    </div>
                    <div>
                      <Button
                        id="meetingdetail-button"
                        onClick={() => history.push(`/meeting/${meeting.id}`)}
                      >
                        Go to Detail
                      </Button>
                      <Button
                        id="meetingclose-button"
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
    if (meetings) {
      setMeetingBubble(meetings);
    }
    if (rooms) {
      setRoomBubble(rooms);
    }
    setRoomBubble(rooms);
  }, [meetings, rooms]);

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
          <Grid centered style={{ marginBottom: '5em' }}>
            <Map
              id="map"
              center={location}
              style={{ width: '100%', height: '800px' }}
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
            <Button
              id="button_createmeeting"
              primary
              onClick={() => history.push('/meeting/create')}
            >
              Create Meeting
            </Button>
          </Grid>
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
