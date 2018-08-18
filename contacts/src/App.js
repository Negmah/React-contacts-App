import React, { Component ,} from 'react'
import ListContacts from './ListContacts'
// import everything as ContactsAPI
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  //the variable content is put tinside our App component, so the App
  //component can manage that state
  // everytime that state changes, React will update the UI as well

  // all the contacts were removed from the array to fetch them directly
  // from the API
  state = {
    contacts: []
  }
  // When our component mounts we make an API request
  // When that API request resolves, the function will be invoked with
  //a specific data (contacts)
  // Then when we have those (contacts) we call setState, which updates
  //our state, that causes a rerender of our component, which then
  //passes our new contacts down to our <ListContacts /> component,
  //which then renders them to the view
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts: contacts })
    })
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

    //Now we are getting our contacts from the external API but also when
    //we remove a contact it's removing it from our local state (see
    // method above removeContact) but it is also making a request to
    // remove it from our database somewhere 
    ContactsAPI.remove(contact)
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