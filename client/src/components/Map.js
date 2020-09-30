/*global google*/
import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps'
import Geocode from "react-geocode";

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

  // newLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.setState({
  //         mapPosition: {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         },
  //         // markerPosition: {
  //         //   lat: position.coords.latitude,
  //         //   lng: position.coords.longitude
  //         // }
  //       }, () => {
  //         Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
  //           .then(response => {
  //             // console.log("response", response)

  //             const address = response.results[0].formatted_address

  //             this.setState({
  //               address: (address) ? address : ""
  //             })
  //           })
  //       })
  //     })
  //   }
  // }

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        // console.log("Geocode.fromLatLng", Geocode.fromLatLng)
        // console.log("response", response)
        // console.log("response.results[0].geometry", response.results[0].geometry)
        // console.log("response.results[0].geometry.location", response.results[0].geometry.location)

        const address = response.results[0].formatted_address
        // const current = response.results[0].geometry
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
          // console.log('state:', this.state);
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
                    // console.log("new response", response)
                    let location = response.results[0].geometry.location

                    const address = response.results[0].formatted_address

                    this.setState((state) => {
                      return {
                        address: (address) ? address : "",
                        location: {
                          lat: location.lat,
                          lng: location.lng
                        }
                      }
                    })
                    // console.log('latitude: ', this.state.location.lat)
                    // console.log('longitutde: ', this.state.location.lng)
                    // console.log('state:', this.state);

                    const DirectionsService = new google.maps.DirectionsService();
                    // const mode = DRIVING;

                    DirectionsService.route({
                      // origin: new google.maps.LatLng(43.8389, -79.5385),//43.8389, -79.5385),
                      origin: new google.maps.LatLng(this.state.location.lat, this.state.location.lng),
                      destination: new google.maps.LatLng(43.8177, -79.1859),
                      travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                      if (status === google.maps.DirectionsStatus.OK) {
                        // console.log('result', result)
                        this.setState({
                          directions: { ...result },
                          markers: true
                        })
                      } else {
                        console.error(`error fetching directions ${result}`);
                      }
                    });
                  })
              })
            })

          }
          // const DirectionsService = new google.maps.DirectionsService();
          // console.log("DirectionsService.route", DirectionsService.route)
          // console.log("google.maps.markerPosition:", google.maps.markerPosition)
          // // console.log("getCurrentLocation():", getCurrentLocation())
          // // console.log('address:', address)
          // console.log("navigator.geolocation.getCurrentPosition", navigator.geolocation.getCurrentPosition)
          // // console.log('markerPosition:', markerPosition)
          // console.log("google:", google)
          // console.log("google.maps:", google.maps)
          // console.log("google.maps.Marker:", google.maps.Marker)

          // console.log("Geocode.fromLatLng:", Geocode.fromLatLng(newLat, newLng))
          // console.log("coords.lat:", coords.latitude)
          // console.log("results:", results)
          // console.log('state:', this.state);

          // DirectionsService.route({

          //   origin: new google.maps.LatLng(43.8389, -79.5385),//43.8389, -79.5385),
          //   // origin: new google.maps.LatLng(this.state.location.lat, this.state.location.lng),
          //   destination: new google.maps.LatLng(43.8177, -79.1859),
          //   travelMode: google.maps.TravelMode.DRIVING,
          // }, (result, status) => {
          //   if (status === google.maps.DirectionsStatus.OK) {
          //     // console.log('result', result)
          //     this.setState({
          //       directions: { ...result },
          //       markers: true
          //     })
          //   } else {
          //     console.error(`error fetching directions ${result}`);
          //   }
          // });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={8}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ origin }}
        >
          {/* <InfoWindow>
            {<div>position here</div>}
          </InfoWindow> */}
        </Marker>
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
      </GoogleMap>
    );
    return (
      <DirectionsComponent
      />
    )
  }
}
export default MyMapComponent