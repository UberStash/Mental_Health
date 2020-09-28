import React, { Component } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEvent from "./CreateEvent";
import events from "./events";

const localizer = momentLocalizer(moment);

class ShowCalendar extends Component {
  constructor() {
    super();
    const now = new Date();
    
    this.state = {
      name: "React",
      showModal: true,
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

  


  render() {
    return (
      <div>
        <div style={{ height: "500pt" }}>
          <Calendar
            events={this.state.events}
            // startAccessor="start"
            // endAccessor="end"
            // defaultDate={moment().toDate()}
            // localizer={localizer}
            // onDrillDown={this.openModal}
            selectable
          length={30}
          min={new Date(2014, 10, 0, 9, 0, 0)}
          max={new Date(2014, 10, 5, 19, 0, 0)}
          // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
          localizer={localizer}
          // defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={() => this.openModal(this)}
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
