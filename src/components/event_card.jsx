import React from 'react';
import moment from 'moment';

class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names
    //message: true
   };
  }

  getNames(){
    var nameList = this.props.eventInfo.names;

    if(this.props.currentUser){
      if(this.props.eventInfo.names.includes(this.props.currentUser.username)){
        alert('You have already joined the event :)')
        return
      } else {
         console.log("getting to getNames func")
        this.props.joinEvent(this.props.eventInfo.event_id)
        .then(res => res.json())
        .then(names => this.setState({names: names}));
      }

    } else {
      window.alert("You must log in before joining an event!");
    }
  }


  leaveEvent(){
    console.log("getting to leaveEvent func")
    this.props.leaveEvent(this.props.eventInfo.event_id)
    .then(res => res.json())
    .then(names => this.setState({names: names}));
  }


  render() {
    var start = this.props.eventInfo.event_start
    var end = this.props.eventInfo.event_end

    console.log('one event card in event list')

    return (
      <div>
        <h3>{this.props.eventInfo.event_name}</h3>
        <h4>{this.props.eventInfo.restaurant_name}</h4>
        <h5>{this.props.eventInfo.restaurant_address}</h5>
        <h6>{this.props.eventInfo.description}</h6>
        <h6>Start: {moment(start).format('dddd, MMMM Do YYYY, h:mm a')}</h6>
        <h6>End: {moment(end).format('dddd, MMMM Do YYYY, h:mm a')}</h6>

        {this.state.names.length > 1 && <div>{this.state.names[0]} and {this.state.names.length - 1} others are going</div>}
        {this.state.names.length === 1 && <div>{this.state.names[0]} is going</div>}

        <br></br>
        <button onClick={() => this.getNames()}>Join Event</button>
        <button onClick={() => this.leaveEvent()}>Leave Event</button>

      </div>
    );
  }
}

export default EventCard;

//fix leave button