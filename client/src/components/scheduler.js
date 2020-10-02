import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "./CreateEvent";
import { getAppts, createAppts, deleteAppts } from "./events";
import axios from 'axios'


const localizer = momentLocalizer(moment);



class ShowCalendar extends Component {
  constructor() {
    super();
    const now = new Date();
    
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
    const r = window.confirm(`NAME: ${pEvent.title} \n PATIENT ID:${pEvent.user_patient_id}`)
    const id = pEvent.id
    console.log(pEvent.id)
    if(r === true){
      // AXIOS CALL TO DELETE EVENT!!!!!!
      deleteAppts(id)
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }


  handleSelect = ({ start, end }) => {
    // const title = this.openModal()npm run db:reset
    const title = window.prompt("Patient Name");
    const user_patient_id = window.prompt("Patient ID");
    const user_doctor_id = window.prompt("Doctor ID");
    
    if (title && user_patient_id) { 
    const event = {
      appt_start: start,
      appt_end: end,
      title,
      user_patient_id,
      user_doctor_id

    }

    createAppts(event)
    .then((response) => {

      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
            user_doctor_id,
            user_doctor_id,
            id: response.data[0].id
            
          },
        ],
      });      
      
      
      
      
    }
    



    )
    

    }
   }

componentDidMount() {
  const newArr = [];
console.log('did mount')
 const events = getAppts()
  .then(response => {
    response.map((appt) => {
  newArr.push({
    id: appt.id,
    start: new Date(appt.appt_start),
    end: new Date(appt.appt_end),
    title: appt.title,
    user_patient_id: appt.user_patient_id,
    user_doctor_id: appt.user_doctor_id
    // id: 1,
    //     title: 'Long Event',
    //     start: new Date(2015, 3, 7),
    //     end: new Date(2015, 3, 10),
    //   },

  })
    })
    console.log('res', response);
    console.log(newArr)
    this.setState({ events: newArr })
  })
  
}

  render() {
    return (
      <div>
        <div style={{ height: "500pt" }}>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            // endAccessor="end"
            // defaultDate={moment().toDate()}
            onDrillDown={this.openModal}
            selectable
          length={30}
          min={new Date(2014, 10, 0, 9, 0, 0)}
          max={new Date(2014, 10, 5, 19, 0, 0)}
          // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
          localizer={localizer}
          defaultView={"week"}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          // onSelectEvent={(event) => alert(`Patient Name: ${event.title}   \nPatient ID: ${event.patientId}   \nAppointment Description: ${event.description}`)}
          onSelectSlot={this.handleSelect}
          onSelectEvent = {event => this.onSelectEvent(event)} //Fires selecting existing event
          />
        </div>
        {/* {this.state.showModal ? (
          <CreateEvent
            isOpen={this.state.showModal}
            onClose={this.handleCloseModal}
            
          />
        ) : (
          ""
        )} */}
      </div>
    );
  }
}
export default ShowCalendar;
