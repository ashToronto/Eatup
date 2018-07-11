import React from 'react';
import moment from 'moment';
import { withAlert } from 'react-alert';


class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names,
    id: this.props.eventInfo.id
   };
   this.disableButton = false;
  }


  getNames(){
    this.disableButton = true;
     var nameList = this.props.eventInfo.names;
     if(this.props.currentUser){
       if(this.props.eventInfo.names.includes(this.props.currentUser.username)){
         this.props.alert.show('You are already attending this event')
         this.disableButton = false;
       } else {
         this.props.joinEvent(this.props.eventInfo.event_id)
         .then(res => res.json())
         .then(names => {
           this.setState({names: names});
           this.disableButton = false;
         });
       }

     } else {
       this.props.alert.show('You must log in before joining an event');
       this.disableButton = false;
     }
   }

   leaveEvent(){
     if(this.props.currentUser){
   this.props.leaveEvent(this.props.eventInfo.event_id)
   .then(res => res.json())
   .then(names => this.setState({names: names}));
  } else {
   this.props.alert.show('You must log in before leaving an event');
 }
 }

  render() {
    const start = this.props.eventInfo.event_start
    const end = this.props.eventInfo.event_end

    return (
      <div>
        <p>{this.props.eventInfo.restaurant_name}</p>
        <p>{this.props.eventInfo.restaurant_address}</p>
        <p className='description'>{this.props.eventInfo.description}</p>
        <p>Start</p>
        <p>{moment(start).format('dddd, MMMM Do YYYY, h:mm a')}</p>
        <p>End</p>
        <p>{moment(end).format('dddd, MMMM Do YYYY, h:mm a')}</p>
        {this.state.names.length > 1 && <div>{this.state.names[0]} and {this.state.names.length - 1} others are going</div>}
        {this.state.names.length === 1 && <div>{this.state.names[0]} is going</div>}
        <button disabled = {this.disableButton} onClick={() => this.getNames()}>Join Event</button>
        <button disabled = {this.disableButton} onClick={() => this.leaveEvent()}>Leave Event</button>
      </div>
    );
  }
}

export default withAlert(EventCard);
