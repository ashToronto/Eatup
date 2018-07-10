import React from 'react';



class EventCurrent extends React.Component {

  constructor(props){
   super(props);

  }

  render() {

    return (

      <div>
        <h5>{this.props.events.event_name}</h5>
        <h5>{this.props.events.restaurant_name}</h5>
        <h5>{this.props.address}</h5>
        <h5>{this.props.city}</h5>
        <h5>{this.props.state}</h5>
        <h5>{this.props.country}</h5>
        <h5>{this.props.events.description}</h5>
        <h5>{this.props.events.event_start}</h5>
        <h5>{this.props.events.event_end}</h5>
        <h5>People Going:</h5>
        <ul>
          <li>{this.props.currentUser}</li>
        </ul>
          <button>Join Event</button>
          <button>Leave Event</button>
      </div>

    )
  }
}




export default EventCurrent
