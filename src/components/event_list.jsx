import React from 'react';
import UserCount from "./user_count"


class EventList extends React.Component {

constructor(props){
  super(props);
  this.state = {
    activeEventUsers:null,
  }
}


componentDidMount() {
  // this.socket = new WebSocket('ws://localhost:3001');
  // this.socket.onopen = function () {
  //   console.log('websocket is connected ...')
  //   // sending a send event to websocket server
  // }
  // this.socket.onmessage = (message) => {
  //    const parsedContent = JSON.parse(message.data)
  //    console.log('ON MESSAGE', message)
  //    this.setState({activeEventUsers: parsedContent.userIncrease})
  // }
}



// handleUserCount = (e) => {
//   const newUserCount = {activeEventUsers:this.state.activeEventUsers, type: "userIncrease"};
//   console.log('Event', e);
//   this.socket.send(JSON.stringify(newUserCount))
// }



 // <UserCount activeEventUsers={this.state.activeEventUsers}/>
  // onClick={this.handleUserCount}


// <h5>{event.users.avatarphoto}</h5> to be used when avatar photos are implemented

// {this.props.events.map((event, i) => (

render() {
    console.log('event_listdata', this.props.dbEventList)

    return (
      <div>
      <h2>Current Events You Can Join!</h2>
       { this.props.dbEventList.map((event, idx) => {
          return (
           <div key={idx}>
            <h3>{event.event_name}</h3>
            <h4>{event.restaurant_name}</h4>
            <h5>{event.restaurant_address}</h5>
            <h6>{event.description}</h6>
            <h6>Start:{event.event_start} End:{event.event_end}</h6>
            <button>Join Event</button>
            <button>Leave Event</button>
           </div>
           )})
        }
      </div>
    );
  }
}

export default EventList