import React, { Component ,} from 'react'
import ListContacts from './ListContacts'


class App extends Component {
  //the variable content is put tinside our App component, so the App
  //component can manage that state
  // everytime that state changes, React will update the UI as well

  state = {
    contacts: [
      {
        "id": "ryan",
        "name": "Ryan Florence",
        "email": "ryan@reacttraining.com",
        "avatarURL": "http://localhost:5001/ryan.jpg"
      },
      {
        "id": "michael",
        "name": "Michael Jackson",
        "email": "michael@reacttraining.com",
        "avatarURL": "http://localhost:5001/michael.jpg"
      },
      {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "email": "tyler@reacttraining.com",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
    ]
  }

  // • to remove contacts we will make a function in our App Component,
  // because that's where our state lives
  // • that function will be responsible for updating our state
  // • pass that function down to ListContacts component as a prop
  // • inside ListContacts.js Component hook it up to <button> so
  // whenever it's clicked we pass it a specific contact and then it
  // will get invoked and it will have access to update the current 
  // state of our component

  removeContact = (contact) => {
    //1st way - pass it a function that will return an obect that will
    //be merged with the current state
    // purpose- update the NEW state based on the current state
    // takes in the current state as argument
    // meaning it will ADD to the state and not REPLACE

    //we want to remove the specific contact from the state
    //this function filters the contacts array and returns a new array
    // we are going to filter the current contacts on our state and we
    // are going to REMOVE where the state contact's id does NOT equal
    // the contact id that was clicked on
    // the specific contact that we clicked on should be filtered out
    // now we need to invoke the removeContact method whenever a remove
    // button ic clicked so we pass it down as a prop to LisContacts
    // component
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    //2nd way - pass it an object that will be merged with the current
    // state
/*  this.setState({
    }) */
  }
  render() {
    return (
      <div>
        <ListContacts
          // we want to invoke onDeleteContact on the button so
          // we call it on LisContacts.js
          onDeleteContact={this.removeContact}
          // add this.state because contacts is now inside state
          contacts={this.state.contacts}
        />
      </div>
    )
  }
}

export default App;