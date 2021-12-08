/* global kakao */
import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { Modal, Button, Dimmer, Loader } from 'semantic-ui-react';
import DaumPostcode from 'react-daum-postcode';

const postCodeStyle = {
  display: 'block',
  position: 'relative',
  top: '0%',
  width: '100%',
  height: '400px',
  padding: '7px',
};

function RoomMap(props) {
  const [isAddress, setIsAddress] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [searchedAddress, setSearchedAddress] = useState('');
  const [searchedMarker, setSearchedMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const onCompletePost = (data) => {
    setSearchedAddress(data.address);
  };

  const { address, addressHandler, locationHandler } = props;

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
    if (searchedAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(searchedAddress, (result) => {
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
        setSearchedMarker({
          position: { lat: result[0].y, lng: result[0].x },
          info: searchedAddress,
        });
        setLocation({ lat: result[0].y, lng: result[0].x });
        map.setBounds(bounds);
      });
    }
  }, [searchedAddress]);

  useEffect(() => {
    if (address) {
      setSearchedAddress(address.position);
    }
  }, [address]);

  return currentLocation ? (
    <Modal
      className="locationModal"
      onOpen={() => setIsAddress(true)}
      open={isAddress}
      trigger={<Button size="small">Address</Button>}
    >
      <Modal.Header>Address</Modal.Header>
      <Modal.Description>
        <Map
          id="location"
          center={currentLocation}
          style={{ width: '100%', height: '300px' }}
          level={3}
          onCreate={setMap}
        >
          <MarkerClusterer averageCenter={true} minLevel={10}>
            {searchedMarker && (
              <MapMarker position={searchedMarker.position}>
                <div style={{ color: '#000' }}>{searchedMarker.info}</div>
              </MapMarker>
            )}
          </MarkerClusterer>
        </Map>
        <DaumPostcode
          autoClose={false}
          style={postCodeStyle}
          onComplete={onCompletePost}
        />
      </Modal.Description>
      <Modal.Actions>
        <Button
          className="back"
          onClick={() => {
            setIsAddress(false);
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
            setIsAddress(false);
            addressHandler(searchedAddress);
            locationHandler(location);
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

export default RoomMap;
