/*global google*/
import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps'
import Geocode from "react-geocode";
// import mapStyler from "./mapStyler";
import axios from 'axios';
import { Button, Container, Grid } from "semantic-ui-react";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY)

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
      markerPosition: {
        lat: 0,
        lng: 0,
      }
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
          axios.get(`http://localhost:3001/api/directionTo`)
            .then((all) => {
              console.log('anyone here?')
              // console.log('all.data', all.data)
              return all.data
            })


          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              this.setState({
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              }, () => {
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
                  .then(response => {

                    let location = response.results[0].geometry.location

                    const address = response.results[0].formatted_address

                    this.setState((state) => {
                      console.log('STATE', state)
                      console.log('THIS.props.travelMode', this.props.travelMode)
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
                      // origin: new google.maps.LatLng(43.8389, -79.5385),//43.8389, -79.5385),
                      origin: new google.maps.LatLng(this.state.location.lat, this.state.location.lng),
                      // destination: new google.maps.Place("The Downtown Psychology Clinic"),
                      destination: new google.maps.LatLng(43.8177, -79.1859),

                      travelMode: google.maps.TravelMode[this.props.travelMode],
                    }, (results, status) => {
                      if (status === google.maps.DirectionsStatus.OK) {
                        console.log('results', results)
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

          }
        },

        componentWillReceiveProps(nextProps) {
          console.log('nextProps:', nextProps)
          this.setState(prevState => {
            return {
              ...prevState,
              travelMode: nextProps.travelMode
            }
          });
        }

      })
    )(props =>
      console.log('props:', props) ||
      <GoogleMap
        defaultZoom={8}

      >

        <Container floated="right"><div id="panel"></div></Container>

        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} panel={document.getElementById('panel')} />}


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