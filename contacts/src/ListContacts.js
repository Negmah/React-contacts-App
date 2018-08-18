import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListContacts extends Component {
    // added PropTypes as a static property on Class
    static PropTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        // query is a string
        query: ''
    }

    //whenever the input field changes we want to update
    //our query
    //create an updateQuery method that takes in a new (query)
    updateQuery = (query) => {
        ///update the state
        //we will not update the state based on previous state so we
        //can just pass an object and use trim() to remove extra white
        //space
        //we want query to be whatever query: query.trim() is
        this.setState({ query: query.trim() })

    }

    /*Because it is React that ultimately controls the value of our input
    form element, we consider this component a Controlled Component.
    To recap how user input affects the ListContacts component's own
    state:
    1 - The user enters text into the input field.
    2 - An event listener invokes the updateQuery() function on every
    onChange event.
    3 - updateQuery() then calls setState(), merging in the new state
    to update the component's internal state.
    4 - Because its state has changed, the ListContacts component
    re-renders.
    */
    render() {
        return (
            //in react we can only return ONE element so to add our
            //input field we need to put all this inside one single div
            <div className='list-contacts'>
                {/*command to log this.state to the app*/}
                {JSON.stringify(this.state)}
                <div>
                    <input className='search-contacts'
                    type='text'
                    placeholder='Search contacts'
                    //we want the value of the query to always be what
                    //this.state.query is
                    value={this.state.query}
                    //after updateQuery, whenever the input field changes
                    //this will give us (event) and then we will invoke
                    //updateQuery, passing it a specific value
                    //event is getting the value of the input field
                    onChange={(event) => this.updateQuery(event.target.value)}
                    >
                    </input>
                </div>
                <ol className='contact-list'>
                    {/*Access contacts in ContactList Component from
                    App.js through props* <<<<< DEPRECATED SINCE WE REFACTORED TO A
                    COMPONENT */}
                    {/* After refactoring into a component, it is not receiving props
                    as an argument any longer so we need to add this before props
                    this.props*/}
                    {this.props.contacts.map((contact) => ( //map over contacts
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`   //url is whatever the contact avatar is
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            {/* call props onDeleteContact */}
                            <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                            Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}


/* >>>>>>>> PROP TYPES <<<<<<<< */

// it will have 2 properties on this ListContacts:
// contacts and onDeleteContact
// and we will define the value of each propertie key's type
// this allows to specify the types of the props we pass on to a
// component and also allows us to specify if they are required or not

//to add input field, we converted stateless functional app into react
//component again in order to have a state, and moved PropTypes up as a
// static prop of the ListContacts class

/*ListContacts.PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}*/


export default ListContacts













