
import React, { useContext, useState } from 'react';
import { ContactContext } from './ConcatContext';
import './ContactList.css';
const ContactList = () => {
    const { contacts, deleteContact, editContact, deleteMultipleContacts, addContact } = useContext(ContactContext);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [editedContact, setEditedContact] = useState({ id: null, name: '', phone: '' });
    
   
    const [newContact, setNewContact] = useState({ name: '', phone: '' });

    const handleEdit = (contact) => {
        setEditedContact(contact);
    };

    const handleUpdate = () => {
        if (editedContact.id) {
            editContact(editedContact.id, { name: editedContact.name, phone: editedContact.phone });
            setEditedContact({ id: null, name: '', phone: '' });
        }
    };

    const toggleSelectContact = (id) => {
        setSelectedContacts(prevState => 
            prevState.includes(id) ? prevState.filter(contactId => contactId !== id) : [...prevState, id]
        );
    };

    const handleDeleteMultiple = () => {
        deleteMultipleContacts(selectedContacts);
        setSelectedContacts([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (newContact.name && newContact.phone) {
            addContact({ 
                id: Date.now(), 
                ...newContact 
            });
            setNewContact({ name: '', phone: '' }); 
        }
    };

    return (
        <div>
            <h1>Contact List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    required
                />
                <button type="submit">Add Contact</button>
            </form>

            <button onClick={handleDeleteMultiple}>Delete Selected</button>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => toggleSelectContact(contact.id)}
                        />
                        {contact.name} - {contact.phone}
                        <button onClick={() => handleEdit(contact)}>Edit</button>
                        <button onClick={() => deleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editedContact.id && (
                <div>
                    <h2>Edit Contact</h2>
                    <input 
                        type="text" 
                        value={editedContact.name}
                        onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                    />
                    <input 
                        type="text" 
                        value={editedContact.phone}
                        onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default ContactList;
