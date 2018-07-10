import React from 'react';
import UserCount from "./user_count"
import Collapsible from 'react-collapsible';

class EventList extends React.Component {

constructor(props){
  super(props);
  this.state = {
    activeEventUsers:null,
    open: false,
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


handleClick = () => {
  if(this.state.open) {
      this.setState({
        open: false,

      });
    }else{
      this.setState({
        open: true,

      });
    }
  }




render() {
    // console.log('event_listdata', this.props.dbEventList)

    return (
    <div>
       { this.props.dbEventList.map((event, idx) => {
          return (

            <Collapsible trigger={<h1>{event.event_name}</h1>} key={idx}>
            <div>
            <h4>{event.restaurant_name}</h4>
            <p>{event.restaurant_address}</p>
            <h5>Start</h5>
            <p>{event.event_start}</p>
            <h5>End</h5>
            <p>{event.event_end}</p>
            <p>{event.description}</p>
            <button>Join Event</button>
            <button>Leave Event</button>
            </div>
            </Collapsible>

           )})
        }
      </div>

    );
  }
}

export default EventList