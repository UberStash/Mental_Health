import axios from "axios";


export function getApptsDoctor(id) {
  return axios
    .get(`http://localhost:3001/api/doctor/appointments/${id}`)
    .then((all) => {
      return all.data;
    });
}

export function getAppts(id) {
  return axios
    .get(`http://localhost:3001/api/appointments/${id}`)
    .then((all) => {
      return all.data;
    });
}

export function createAppts(appt) {
  return axios
    .post(`http://localhost:3001/api/appointments/`, appt)
    .then((res) => {
      return res;
    });
}

export function deleteAppts(id) {
  return axios
    .delete(`http://localhost:3001/api/appointments/${id}`)
    .then((res) => {});
}

export function getPatients(id) {
  return axios.get(`http://localhost:3001/api/patients/${id}`).then((all) => {
    return all.data;
  });
}

export function getApptsPatient(id) {
  return axios
    .get(`http://localhost:3001/api/patients/appointments/${id}`)
    .then((all) => {
      return all.data;
    });
}

const url =
  "http://newsapi.org/v2/everything?" +
  "q=Mental&Health" +
  "from=2020-10-02&" +
  "sortBy=recent&" +
  `apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

export function getNews() {
  return axios.get(`${url}`).then((all) => {
    return all.data;
  });
}

export function getHome() {
  return axios.get(`http://localhost:3001/`).then((all) => {});
}
