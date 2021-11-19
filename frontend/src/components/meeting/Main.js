/* eslint-disable no-new */
// eslint-disable-next-line no-unused-vars
/* global kakao */
import React, { useEffect, useRef } from 'react';
import { Button, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const options = {
  center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  level: 3,
};

const imageSize = new kakao.maps.Size(24, 35);
const starSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

function Main(props) {
  // eslint-disable-next-line no-unused-vars
  const { history, meetings, rooms } = props;
  const container = useRef(null);
  let map;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map = new window.kakao.maps.Map(container.current, {
          center: new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          ),
          lever: 3,
        });
        new window.kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          ),
          title: '내 위치',
          image: new kakao.maps.MarkerImage(starSrc, imageSize),
        });
      });
    } else {
      new window.kakao.maps.Map(container.current, options);
    }
    return () => {};
  }, [navigator.geolocation]);

  useEffect(() => {
    console.log('hi');

    console.log('go');
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const meeting of meetings) {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(
          meeting.location.lat,
          meeting.location.lng,
        ),
      });
      const overlay = new kakao.maps.CustomOverlay({
        content: null,
        map,
        position: new kakao.maps.LatLng(
          meeting.location.lat,
          meeting.location.lng,
        ),
      });
      // eslint-disable-next-line no-loop-func
      kakao.maps.event.addListener(marker, 'click', () => {
        overlay.setMap(map);
      });
      overlay.content = '11';
    }
  }, [meetings, map]);

  return (
    <div>
      {container ? (
        <div className="Main">
          <Grid centered style={{ marginTop: '2em', marginBottom: '5em' }}>
            <div
              className="map"
              style={{ width: '950px', height: '500px' }}
              ref={container}
            ></div>
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
