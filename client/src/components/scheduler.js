import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import events from "./events";
import ExampleControlSlot from "./ExampleControlSlot";
import moment from "moment";
import axios from "axios";
// import * as dates from 'react-big-calendar/lib/utils/dates'
import "react-big-calendar/lib/css/react-big-calendar.css";

const propTypes = {};
const localizer = momentLocalizer(moment);
const event = function (id) {
// useEffect(() => {
    axios.get(`/api/appointments`)
  .then((all) => {
    console.log(all)
    return all
  })
// })
}
class Selectable extends React.Component {
  
  constructor(...args) {
    super(...args);
    // events are set here into state which can be pulled from axios get call here  and delete events.js or have axios call put into events.js and
    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      // function bookInterview(id, interview, edit) {
      //   let action = "delete";
      //   if (edit) {
      //     action = "edit";
      //   }
    
      //   const appointment = {
      //     ...state.appointments[id],
      //     interview: { ...interview },
      //   };
    
      //   const appointments = {
      //     ...state.appointments,
      //     [id]: appointment,
      //   };
    
      //   return axios.put(`/api/appointments/${id}`, appointment)
      //     .then( () =>
      //       setState({
      //         ...state,
      //         appointments,
              
      //       })
      //     ).then(() =>
      //     setState(spotsRemaining)
    
      //     )
          
      // }

      // HERE PUT IN POST API AXIOS TO SET APPT
      console.log("START", start, "END", end, "TITLE", title);
    this.setState({
      events: [
        ...this.state.events,
        {
          start,
          end,
          title,
        },
      ],
    });
  }
  };

  render() {
    return (
      <>
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
          </strong>
        </ExampleControlSlot.Entry>
        <Calendar
          selectable
          length={30}
          min={new Date(2014, 10, 0, 9, 0, 0)}
          max={new Date(2014, 10, 5, 19, 0, 0)}
          // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </>
    );
  }
}

Selectable.propTypes = propTypes;
event()
export default Selectable;
