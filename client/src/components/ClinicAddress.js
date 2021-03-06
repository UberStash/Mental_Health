import axios from "axios";
import Geocode from "react-geocode";

export function getAddress(id) {
  return axios.get(`http://localhost:3001/api/directionTo/${id}`)
    .then((all) => {
      return Geocode.fromAddress(all.data[0].clinic_address)

      //let clinicAddress = Geocode.fromAddress(all.data[0].clinic_address)
    })
}

