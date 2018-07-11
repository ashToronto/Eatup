import React from 'react';
import moment from 'moment';


class EventCurrent extends React.Component {

  constructor(props){
   super(props);
  }

  executeClick = () => {
    this.props.joinEvent(this.props.events.id);
    this.props.returnHome();
  }

  render() {

    // const start = this.props.events.event_start
    // const end = this.events.event_end
    console.log(this.props.city)

    return (
      <div className="eventCurrent">
        <h5>{this.props.events.event_name}</h5>
        <h5>{this.props.events.restaurant_name}</h5>
         <h5>{this.props.address}</h5>
         <h5>{this.props.city}</h5>
         <h5>{this.props.state}</h5>
         <h5>{this.props.country}</h5>
        <h5>{this.props.events.description}</h5>
        <h5>{moment(this.props.events.event_start).format('dddd, MMMM Do YYYY, h:mm a')}</h5>
        <h5>{moment(this.props.events.event_end).format('dddd, MMMM Do YYYY, h:mm a')}</h5>
        <h5>People Going:</h5>
        <ul>
          <li>{this.props.currentUser}</li>
        </ul>
          <button onClick={() => this.executeClick()}>CONFIRM</button>
      </div>
    )
  }
}



export default EventCurrent;
