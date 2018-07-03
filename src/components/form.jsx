import React from 'react';

class Form extends React.Component {

  render() {

   function toLowerCase(e) {
    const string = e.target.category.value
    const lower = string.toString.toLowerCase()
   }

    return (
      <div>
       <form onSubmit= {this.props.getUserInput}>
         <select type='int' name='radius' placeholder='radius'>
             <option value="500">Half a km</option>
             <option value="1000">1 km</option>
             <option value="1500">1.5 km</option>
             <option value="2000">2 km</option>
             <option value="2500">2.5 km</option>
             <option value="3000">3 km</option>
             </select>
         <input type='text' name= 'category' placeholder='category' onSubmit={toLowerCase}/>
         <button>Find Restaurants!</button>
       </form>
     </div>
    );
  }
};


export default Form;
