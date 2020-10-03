/*global google*/
import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { InfoWindow, BicyclingLayer, TrafficLayer, withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Polyline } from 'react-google-maps'
import Geocode from "react-geocode";
// import mapStyler from "./mapStyler";
import { getAddress } from "./ClinicAddress";
import { Button, Container, Grid } from "semantic-ui-react";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY)

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clinicAddress: {
        destLat: 0,
        destLng: 0
      },
      location: {
        lat: 0,
        lng: 0,
      },
      address: '',
      directions: null,
      travelMode: 'DRIVING',
      mapPosition: {
        lat: 0,
        lng: 0,
      },
    }
  }

  render() {

    const DirectionsComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places}`,
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{ height: `600px`, width: `600px` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({

        componentDidMount() {

          navigator.geolocation.getCurrentPosition(position => {
            this.setState({
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            }, () => {
              getAddress()
                .then(data => {
                  let destLatLng = data.results[0].geometry.location
                  this.setState((state) => {
                    return {
                      clinicAddress: {
                        destLat: destLatLng.lat,
                        destLng: destLatLng.lng
                      }
                    }
                  })

                }).then(() => Geocode.fromLatLng(position.coords.latitude, position.coords.longitude))

                .then(response => {

                  let location = response.results[0].geometry.location

                  const address = response.results[0].formatted_address

                  this.setState((state) => {

                    return {
                      address: (address) ? address : "",
                      travelMode: this.props.travelMode,

                      location: {
                        lat: location.lat,
                        lng: location.lng
                      }
                    }
                  })

                  const DirectionsService = new google.maps.DirectionsService();

                  DirectionsService.route({

                    origin: new google.maps.LatLng(this.state.location.lat, this.state.location.lng),
                    destination: new google.maps.LatLng(this.state.clinicAddress.destLat, this.state.clinicAddress.destLng),
                    travelMode: google.maps.TravelMode[this.props.travelMode],

                  }, (results, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {

                      this.setState({
                        directions: { ...results },
                        markers: true
                      })
                    } else {
                      console.error(`error fetching directions ${results}`);
                    }
                  });
                })
            })
          })
        },

        componentWillReceiveProps(nextProps) {
          this.setState(prevState => {
            return {
              ...prevState,
              travelMode: nextProps.travelMode
            }
          });
        }

      })
    )(props =>
      // console.log('props:', props) ||
      <GoogleMap
        defaultZoom={8}
        options={{
          // styles: mapStyler
        }}

      >

        <Container floated="right"><div id="panel"></div></Container>

        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} panel={document.getElementById('panel')} />}

        <TrafficLayer autoUpdate />
        {/* <BicyclingLayer autoUpdate /> */}

      </GoogleMap>

    );

    return (<>

      <Button onClick={() => { this.setState({ travelMode: 'DRIVING' }) }}>
        Driving
    </Button>

      <Button onClick={() => { this.setState({ travelMode: 'BICYCLING' }) }} >
        Bicycling
    </Button>

      <Button onClick={() => { this.setState({ travelMode: 'WALKING' }) }} >
        Walking
    </Button>

      <Button onClick={() => { this.setState({ travelMode: 'TRANSIT' }) }} >
        Transit
    </Button>

      <DirectionsComponent
        travelMode={this.state.travelMode}
      />
    </>)
  }
}
export default MyMapComponent;