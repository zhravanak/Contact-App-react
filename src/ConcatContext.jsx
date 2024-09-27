import React, { createContext, useState } from 'react';

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([
        { id: 1, name: 'zhra', phone: '09191234567' },
        { id: 2, name: 'ali', phone: '09121345678' },
        { id: 3, name: 'amin', phone: '09338276354' },
    ]);

    const addContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    const editContact = (id, updatedContact) => {
        const updatedContacts = contacts.map(contact => 
            contact.id === id ? { ...contact, ...updatedContact } : contact
        );
        setContacts(updatedContacts);
    };

    const deleteContact = (id) => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
    };

    const deleteMultipleContacts = (ids) => {
        const updatedContacts = contacts.filter(contact => !ids.includes(contact.id));
        setContacts(updatedContacts);
    };

    return (
        <ContactContext.Provider value={{ contacts, addContact, editContact, deleteContact, deleteMultipleContacts }}>
            {children}
        </ContactContext.Provider>
    );
};

export { ContactProvider, ContactContext };

