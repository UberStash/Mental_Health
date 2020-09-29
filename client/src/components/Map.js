import React from 'react'
import { Descriptions } from 'antd';
// import App from './App'
// import {
//   Container,
//   Divider,
//   Dropdown,
//   Grid,
//   Header,
//   Image,
//   List,
//   Menu,
//   Segment,
// } from 'semantic-ui-react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY)

class Map extends React.Component {

  state = {
    address: '',
    city: '',
    province: '',
    postalCode: '',
    zoom: 12,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 43.6426,
      lng: -79.3871,
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          mapPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          markerPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }, () => {
          Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
            .then(response => {

              const address = response.results[0].formatted_address

              this.setState({
                address: (address) ? address : ""
              })
            })
        })
      })
    }

  }

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        const address = response.results[0].formatted_address
        this.setState({
          address: (address) ? address : "",
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        })
      })
  }

  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        >
          <InfoWindow>
            <div>Clinic Name and Location here</div>
          </InfoWindow>
        </Marker>
      </GoogleMap >
    ));
    return (

      <div>

        <Descriptions title="Location" bordered>
          <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
        </Descriptions>


        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default Map

