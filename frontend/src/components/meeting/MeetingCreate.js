/* global kakao */
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Form,
  Grid,
  Segment,
  Modal,
  Button,
  Input,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function MeetingCreate(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  const [isDisable, setIsDisable] = useState(false);
  const { onClickConfirmHandler, history } = props;

  const [isLocation, setIsLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [info, setInfo] = useState(null);
  const [map, setMap] = useState(null);
  const locationModal = () =>
    currentLocation ? (
      <Modal
        className="locationModal"
        onOpen={() => setIsLocation(true)}
        open={isLocation}
        trigger={<Button>Location</Button>}
      >
        <Modal.Header>Location</Modal.Header>
        <Modal.Description>
          <Map
            id="location"
            center={currentLocation}
            style={{ width: '100%', height: '500px' }}
            level={3}
            onClick={(_t, mouseEvent) =>
              setClickPosition({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              })
            }
            onCreate={setMap}
          >
            {clickPosition && <MapMarker position={clickPosition} />}
            {markers &&
              markers.map((marker) => (
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => setInfo(marker)}
                >
                  {info && info.content === marker.content && (
                    <div style={{ color: '#000' }}>{marker.content}</div>
                  )}
                </MapMarker>
              ))}
          </Map>
          <Input
            label="Search places by a keyword!"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <Button
            onClick={() => {
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
            Search!
          </Button>
        </Modal.Description>
        <Modal.Actions>
          <Button className="back" onClick={() => setIsLocation(false)}>
            Back
          </Button>
          <Button
            className="confirm"
            content="Confirm"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setIsLocation(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    ) : (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

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
    if (title === '' || content === '') {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, content]);

  return (
    <div className="MeetingCreate">
      <Segment style={{ padding: '8em 10em' }} vertical>
        <Grid columns="3">
          <Grid.Column></Grid.Column>
          <Grid.Column id="meeting-create-column">
            <h1>Create New Meeting!</h1>
            <br />
            <Form id="meeting-create-form">
              <Form.Input
                className="MeetingTitleInput"
                id="meeting-title-input"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.TextArea
                className="MeetingContentInput"
                id="meeting-content-input"
                label="Content"
                style={{ minHeight: 200 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Input
                className="MeetingMaxMembersInput"
                id="meeting-max-members-input"
                label={`Maximum Members: ${maxMembers}`}
                type="range"
                value={maxMembers}
                min="0"
                max="20"
                onChange={(e) => setMaxMembers(e.target.value)}
              />
              <Grid centered>
                <Form.Select options={[{}]} />
              </Grid>
              <Grid centered>
                <Form.Button key="scope">Scope</Form.Button>
                {locationModal()}
                <Form.Button key="time">Time</Form.Button>
              </Grid>
              <Grid centered>
                <Form.Button
                  primary
                  className="ConfirmButton"
                  id="confirm-button"
                  disabled={isDisable}
                  onClick={() =>
                    onClickConfirmHandler(title, content, maxMembers, history)
                  }
                >
                  Confirm
                </Form.Button>
                <Form.Button
                  className="BackButton"
                  id="back-button"
                  onClick={() => history.push('/main')}
                >
                  Back
                </Form.Button>
              </Grid>
            </Form>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}
export default withRouter(MeetingCreate);
