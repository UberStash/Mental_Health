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
} from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAcp7uBU9DqiCNwZZnU0hD4WFAZW-samKk")

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
    },
  }

  getCity = (addressArray) => {
    let city = '';
    for (let index = 0; index < addressArray.length; index++) {
      if ('political' === addressArray[index].types[0]) {
        city = addressArray[index].long_name;
      } else if ('locality' === addressArray[index].types[0]) {
        city = addressArray[index].long_name;
      }
    }
    return city;
  }

  getProvince = (addressArray) => {
    let province = '';
    for (let index = 0; index < addressArray.length; index++) {
      if ('administrative_area_level_1' === addressArray[index].types[0]) {
        province = addressArray[index].short_name;
        return province;
      }
    }
  }

  getPostalCode = (addressArray) => {
    let postalCode = '';
    for (let index = 0; index < addressArray.length; index++) {
      if ('postal_code' === addressArray[index].types[0]) {
        postalCode = addressArray[index].long_name;
        return postalCode;
      }
    }
  }

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        console.log("response", response)
        // console.log("newLat", newLat)
        // console.log("newLng", newLng)

        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          province = this.getProvince(addressArray),
          postalCode = this.getPostalCode(addressArray)
        // console.log("city:", city)
        // console.log("province:", province)
        // console.log("postalCode:", postalCode)

        this.setState({
          address: (address) ? address : "",
          city: (city) ? city : "",
          postalCode: (postalCode) ? postalCode : "",
          province: (province) ? province : "",
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
            <div>MENTAL HEALTH LOCATION HELLO WORLD!</div>
          </InfoWindow>
        </Marker>
      </GoogleMap >
    ));
    return (

      <div>

        <Descriptions title="Location" bordered>
          <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
          <Descriptions.Item label="Province">{this.state.province}</Descriptions.Item>
          <Descriptions.Item label="Postal Code">{this.state.postalCode}</Descriptions.Item>
          <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>


        </Descriptions>


        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcp7uBU9DqiCNwZZnU0hD4WFAZW-samKk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default Map