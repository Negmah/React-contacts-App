import React , { Component } from 'react';

class ListContacts extends Component {
    render () {
        return (
            <ol className='contact-list'>
                {/*Access contacts in ContactList Component from App.js through props*/}
                {this.props.contacts.map((contact) => //map over contacts
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                            backgroundImage: `url(${contact.avatarURL})`   //url is whatever the contact avatar is
                        }}/>
                    </li>
                )}
            </ol>
        )
    }
}


export default ListContacts













