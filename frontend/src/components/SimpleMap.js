/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function SimpleMap (props) {
    const { room, meeting } = props;
    const [ location, setLocation ] = useState({lat: 37.27, lng: 126.57})

    useEffect(() => {
        if (room) {
            setLocation({lat: room.lat, lng: room.lng});
        }
        else if (meeting) {
            setLocation(meeting);
        }
    }, [])

    return (
        <Map
        center={location}
        style={{ width: '480px', height: '480px'}}
        onCreate={(map) => {
            setTimeout(() => {
                map.relayout();
            }, [500])
        }}
        zoomable={false}
        draggable={false}
        >
            <MapMarker position={location} />
        </Map>
    )
}
export default SimpleMap