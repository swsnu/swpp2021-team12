/* global kakao */
import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { Modal, Form, Button, Dimmer, Loader, Input } from 'semantic-ui-react';

function MeetingMap(props) {
  const [isLocation, setIsLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [info, setInfo] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [description, setDescription] = useState('');

  const { location, locationHandler } = props;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setCurrentLocation({
        lat: 33.451475,
        lng: 126.570528,
      });
    }
  }, [navigator.geolocation]);

  useEffect(() => {
    if (location) {
      setClickPosition(location.position);
      setDescription(location.description);
    }
  }, [location]);

  return currentLocation ? (
    <Modal
      className="locationModal"
      onOpen={() => setIsLocation(true)}
      open={isLocation}
      trigger={<Button size="small">Location</Button>}
    >
      <Modal.Header>Location</Modal.Header>
      <Modal.Description>
        <Map
          id="location"
          center={clickPosition || currentLocation}
          style={{ width: '100%', height: '500px' }}
          level={3}
          onClick={(_t, mouseEvent) => {
            setClickPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            });
            setSelectedMarker(null);
          }}
          onCreate={setMap}
        >
          <MarkerClusterer averageCenter={true} minLevel={10}>
            {clickPosition && (
              <MapMarker
                position={clickPosition}
                onClick={() => {
                  setSelectedMarker({
                    position: {
                      lat: clickPosition.lat,
                      lng: clickPosition.lng,
                    },
                  });
                  setInfo(null);
                  setDescription('');
                }}
              />
            )}
            {markers &&
              markers.map((marker) => (
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => {
                    setInfo(marker);
                    setSelectedMarker(marker);
                    setDescription('');
                  }}
                >
                  {info && info.content === marker.content && (
                    <div style={{ color: '#000' }}>{marker.content}</div>
                  )}
                </MapMarker>
              ))}
          </MarkerClusterer>
        </Map>
        <Form
          onSubmit={() => {
            const ps = new kakao.maps.services.Places();
            // eslint-disable-next-line no-unused-vars
            ps.keywordSearch(keyword, (data, status, _pagination) => {
              if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                const tmp = [];
                data.forEach((x) => {
                  tmp.push({
                    position: { lat: x.y, lng: x.x },
                    content: x.place_name,
                  });
                  bounds.extend(new kakao.maps.LatLng(x.y, x.x));
                });
                setMarkers(tmp);
                map.setBounds(bounds);
              }
            });
          }}
        >
          <Input
            label="Search places by a keyword!"
            onChange={(e) => setKeyword(e.target.value)}
            size="mini"
          />
          <Button style={{ marginLeft: '12em' }} content="Search!" primary />
          {selectedMarker && (
            <p>
              Add description about this place!{'  '}
              <Input
                value={description}
                size="mini"
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>
          )}
        </Form>
      </Modal.Description>
      <Modal.Actions>
        <Button
          className="back"
          onClick={() => {
            setIsLocation(false);
            if (location) {
              setClickPosition(location.position);
              setDescription(location.description);
            } else {
              setClickPosition(null);
              setDescription('');
            }
          }}
        >
          Back
        </Button>
        <Button
          className="confirm"
          content="Confirm"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            setIsLocation(false);
            locationHandler(selectedMarker.position, description);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
}

export default MeetingMap;
