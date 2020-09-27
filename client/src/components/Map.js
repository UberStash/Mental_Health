import React from 'react'
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
} from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAcp7uBU9DqiCNwZZnU0hD4WFAZW-samKk")


class Map extends React.Component {

  //   state = {
  //     address: '',
  //     city: '',
  //     area: '',
  //     province: '',
  //     zoom: 15,
  //     height: 400,
  //     mapPosition: {
  //       lat: 0,
  //       lng: 0,
  //     },
  //     markerPosition: {
  //       lat: 0,
  //       lng: 0,
  //     },

  // }
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        console.log(response)
      })
    // console.log("newLat", newLat)
    // console.log("newLng", newLng)

  }

  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 43.6426, lng: -79.3871 }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: 43.6426, lng: -79.3871 }}
        >
          <InfoWindow>
            <div>MENTAL HEALTH LOCATION HELLO WORLD!</div>
          </InfoWindow>
        </Marker>
      </GoogleMap >
    ));
    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcp7uBU9DqiCNwZZnU0hD4WFAZW-samKk&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map