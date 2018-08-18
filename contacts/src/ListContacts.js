import React , { Component } from 'react';

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
                    <button className='contact-remove'>
                        Remove
                    </button>
                </li>
            )}
        </ol>
    )
}


export default ListContacts













