import React from 'react';


class EventList extends React.Component {

constructor(props){
   super(props);

 }



 // <h5>{event.users.avatarphoto}</h5> to be used when avatar photos are implemented

 // {this.props.events.map((event, i) => (

render() {

  return (

    <div className="eventList">
    <p>Nolan's 28th Birthday</p>
    <p>Restaurant</p>
    <p>An event to end all events</p>
    <p>May 1st 12:00 to May 1st 12:01</p>
    <ul>
    <li>Nolan</li>
    </ul>
   <button>Join Event</button>
   <button>Leave Event</button>
    </div>

    )
  }
}



export default EventList