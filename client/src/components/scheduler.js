import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "./CreateEvent";
import events from "./events";
import axios from 'axios'

const localizer = momentLocalizer(moment);



class ShowCalendar extends Component {
  constructor() {
    super();
    const now = new Date();
    
    this.state = {
      name: "React",
      showModal: false,
      events
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
    const r = window.confirm(`NAME: ${pEvent.title} \n PATIENT ID:${pEvent.patientId} \n DESCRIPTION:${pEvent.description} \n\n 'Would you like to remove this appointment?`)
    console.log(pEvent)
    if(r === true){
      // AXIOS CALL TO DELETE EVENT!!!!!!
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }


  handleSelect = ({ start, end }) => {
    // const title = this.openModal()
    const title = window.prompt("Patient Name");
    const patientId = window.prompt("Patient ID");
    const description = window.prompt("Describe what the appt is for");
    
    if (title && patientId) { 
    const event = {
      start,
      end,
      title,
      patientId,
      description
    }
    
    

      this.setState({
       events: [
         ...this.state.events,
         {
           start,
           end,
           title,
           patientId,
           description
         },
       ],
     });
    }
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
          // defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => alert(`Patient Name: ${event.title}   \nPatient ID: ${event.patientId}   \nAppointment Description: ${event.description}`)}
          onSelectSlot={this.handleSelect}
          onSelectEvent = {event => this.onSelectEvent(event)} //Fires selecting existing event
          />
        </div>
        {this.state.showModal ? (
          <CreateEvent
            isOpen={this.state.showModal}
            onClose={this.handleCloseModal}
            
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default ShowCalendar;
