import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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

    /* >>> EXTERNAL API DATA SHOULD NOT BE FETCHED WITH AJAX REQUESTS
    IN RENDER *EVER*
    RENDER IS FOR RENDERING ONLY*/
    render() {

        // >>>>>>> DESTRUCTURING
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state
        
        
        
        
        //instead of mapping through all of the contacts, we wanna map
        //over the queried contacts. 
        //we create a new variable that will map only the contacts that
        //match a specific pattern
        let showingContacts
        //if this.state.query is truthy, meaning if someone has typed
        //in antyhing in our input field we wanna figure out which 
        //contacts match that specific pattern
        //else (if there's no input in the field) we want to show all
        //contacts
        if (query) {
            //make a new const that will make a match for text within a
            //specific pattern
            //- we pass an invocation of escapeRegExp to RegExp, passing it
            //our query (this.state.query)
            // - the second argument is the character 'i'
            //- what escapeRegExp is saying is, if it finds any special
            //RegExp characters like $, ``, etc, it will treat them like
            // strings
            // 'i' means 'IGNORE CASE'
            const match = new RegExp(escapeRegExp(query, 'i'))

            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            //in react we can only return ONE element so to add our
            //input field we need to put all this inside one single div
            <div className='list-contacts'>
                {/*command to log this.state to the app*/}
                {JSON.stringify(this.state)}
                <div className='list-contacts-top'>
                    <input className='search-contacts'
                    type='text'
                    placeholder='Search contacts'
                    //we want the value of the query to always be what
                    //this.state.query is
                    value={query}
                    //after updateQuery, whenever the input field changes
                    //this will give us (event) and then we will invoke
                    //updateQuery, passing it a specific value
                    //event is getting the value of the input field
                    onChange={(event) => this.updateQuery(event.target.value)}
                    >
                    </input>
                    {/*following item was before an anchor <a></a> element*/}
                    {/*DEPRECATED >>> CONVERTED TO LINK*/}
                    <Link
                        /* href='/#create' converts to the following*/
                        to='/create'
                        //when clicked, the button should switch between contacts to
                        //create contact screen
                        //ALSO React Router manages onClick for us so we can remove this
                        /*onClick={this.props.onNavigate}*/
                        className='add-contact'
                    >Add Contact</Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {/*Access contacts in ContactList Component from
                    App.js through props* <<<<< DEPRECATED SINCE WE REFACTORED TO A
                    COMPONENT */}
                    {/* After refactoring into a component, it is not receiving props
                    as an argument any longer so we need to add this before props
                    this.props* <<<<<<<<< DEPRECATED SINCE WE ADD SHOWING CONTACTS */}
                    {/*{this.props.contacts.map((contact) => ( //map over contacts*/}
                    {/*Map over filtered array of contacts matching a specific query*/}  }
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`   //url is whatever the contact avatar is
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            {/* call props onDeleteContact */}
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
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


// the first proptype is with lowercase 'p'
// the other PropTypes are with uppercase 'P'
ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}


export default ListContacts