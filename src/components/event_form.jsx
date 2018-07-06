import React from 'react';
import DateTimePicker from 'react-datetime-picker';


class Event extends React.Component {


constructor(props) {
   super(props);

 }
 state = {
   start: new Date(),
   end: new Date(),
   // submit: false,
 }

 onChange1 = start => this.setState({ start })
 onChange2 = end => this.setState({ end })



handleFormSubmit = () => {
   console.log('clicked')
   this.setState({
     submit: true,
   })
 }



 render() {


  console.log("restaurant", this.props.restaurant)



   return (
     <div style={{ display: (this.state.submit ? 'none': 'block')}}>
      <form onSubmit={this.props.getEventInput} >
      <input type='text' name= 'restaurantName' placeholder="{this.props.restaurant.name}" value={this.props.restaurant.name}/>
      <input type='text' name= 'restaurantAddress' placeholder="{this.props.restaurant.address}" value={this.props.restaurant.address}/>
      <input type='text' name= 'eventName' placeholder='Event Name' value={this.props.eventName}/>
      <div>
      <DateTimePicker className="calendar" type='int' name='start' onChange={this.onChange1} returnValue="start" value={this.state.start}/>
      </div>
      <div>
      <DateTimePicker className="calendar" type='int' name='end' onChange={this.onChange2} returnValue="end" value={this.state.end} />
      </div>
      <input type='text' name= 'description' placeholder='Event Description ' value={this.props.description}/>
      <button onClick={this.handleFormSubmit}>Create Event</button>
     </form>
     </div>

   )
 }
}


export default Event;
