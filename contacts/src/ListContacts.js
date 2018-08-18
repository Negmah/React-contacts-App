import React from 'react'
import PropTypes from 'prop-types'

function ListContacts (props) {
    return (
        <ol className='contact-list'>
            {/*Access contacts in ContactList Component from App.js through props*/}
            {props.contacts.map((contact) => //map over contacts
                <li key={contact.id} className='contact-list-item'>
                    <div className='contact-avatar' style={{
                        backgroundImage: `url(${contact.avatarURL})`   //url is whatever the contact avatar is
                    }}/>
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                    </div>
                    {/* call props onDeleteContact */}
                    <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
                        Remove
                    </button>
                </li>
            )}
        </ol>
    )
}

// it will have 2 properties on this ListContacts:
// contacts and onDeleteContact
// and we will define the value of each propertie key's type
// this allows to specify the types of the props we pass on to a
// component and also allows us to specify if they are required or not
ListContacts.PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}


export default ListContacts













