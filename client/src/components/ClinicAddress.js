import axios from "axios";
import Geocode from "react-geocode";

export function getAddress() {
  return axios.get(`http://localhost:3001/api/directionTo`)
    .then((all) => {
      console.log('clinic_address', Geocode.fromAddress(all.data[0].clinic_address))
      return Geocode.fromAddress(all.data[0].clinic_address)

      //let clinicAddress = Geocode.fromAddress(all.data[0].clinic_address)
    })
}

