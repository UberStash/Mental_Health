import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAppts, createAppts, deleteAppts } from "./events";

const localizer = momentLocalizer(moment);

function randomString(length, chars) {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class ShowCalendar extends Component {
  constructor() {
    super();

    this.state = {
      name: "React",
      showModal: false,
      events: [],
    };
    this.openModal = this.openModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  onSelectEvent(pEvent) {
    const r = window.confirm(
      `NAME: ${pEvent.title} \n PATIENT ID:${pEvent.user_patient_id} \n PASSWORD:${pEvent.appt_password}`
    );
    const id = pEvent.id;

    if (r === true) {
      deleteAppts(id);
      this.setState((prevState, props) => {
        const events = [...prevState.events];
        const idx = events.indexOf(pEvent);
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("Patient Name");
    const user_patient_id = window.prompt("Patient ID");
    const user_doctor_id = this.props.user.id;
    const appt_password = randomString(
      8,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );

    if (title && user_patient_id) {
      const event = {
        appt_start: start,
        appt_end: end,
        title,
        user_patient_id,
        user_doctor_id,
        appt_password,
      };

      createAppts(event).then((response) => {
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
              user_patient_id,
              user_doctor_id,
              id: response.data[0].id,
              appt_password,
            },
          ],
        });
      });
    }
  };

  componentDidMount() {
    const newArr = [];
    const events = getAppts(this.props.user.id).then((response) => {
      response.map((appt) => {
        newArr.push({
          id: appt.id,
          start: new Date(appt.appt_start),
          end: new Date(appt.appt_end),
          title: appt.title,
          user_patient_id: appt.user_patient_id,
          user_doctor_id: appt.user_doctor_id,
          appt_password: appt.appt_password,
        });
      });

      this.setState({ events: newArr });
    });
  }

  render() {
    return (
      <div>
        <div style={{ height: "500pt" }}>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            onDrillDown={this.openModal}
            selectable
            length={30}
            min={new Date(2014, 10, 0, 9, 0, 0)}
            max={new Date(2014, 10, 5, 19, 0, 0)}
            localizer={localizer}
            defaultView={"week"}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectSlot={this.handleSelect}
            onSelectEvent={(event) => this.onSelectEvent(event)} //Fires selecting existing event
          />
        </div>
      </div>
    );
  }
}
export default ShowCalendar;
