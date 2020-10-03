import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
console.log('IN!!!!!')

  const [state, setState] = useState({
    appointments: []
  });

  
  useEffect(() => {
    Promise.all([
      
      axios.get(`/api/appointments`),
          ]).then((all) => {
      setState((prev) => ({
        ...prev,
        appointments: all.data,
      }));
    });
  }, []);

  // // Creates interview object then makes put request, updates state to reflect changes
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
 
  // // Deletes interview from db and from state then refreshes with changes
  // function cancelInterview(id) {
  //   return axios
  //       .delete(`/api/appointments/${id}`)
  //       .then((response) => {
  //         const appointment = {
  //           ...state.appointments[id],
  //           interview: null,
  //           test: true,
  //         };
  //         const appointments = {
  //           ...state.appointments,
  //           [id]: appointment,
  //         };

  //         setState({
  //           ...state,
  //           appointments,
            
  //         });
  //       }
  //       ).then(() =>
  //     setState(spotsRemaining)

  //     )
    
  // }

  return {
    state,
    // setDay,
    // bookInterview,
    // cancelInterview,
  };
}
