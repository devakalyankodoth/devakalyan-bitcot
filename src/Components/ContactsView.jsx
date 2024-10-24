import React, { useEffect, useState } from 'react';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ViewContact from './ViewContact';
import SearchContact from './SearchContact';  

import '../css/ContactsView.css'


const ContactsView = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredContacts, setFilteredContacts] = useState([]); 

  const [editingContact, setEditingContact] = useState(null); 
  const [viewingContact, setViewingContact] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false);  
  const [showViewModal, setShowViewModal] = useState(false);  

  // Fetch contacts and initialize the state
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
        setFilteredContacts(data); 
        setLoading(false);
      })
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  // Add a new contact to the list
  const addContact = (newContact) => {
    const updatedContacts = [...contacts, { ...newContact, id: contacts.length + 1 }];
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts); 
  };

  // Update an existing contact
  const updateContact = (id, updatedData) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === id ? { ...contact, ...updatedData } : contact
    );
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts); 
  };

  // Open the Edit form for the selected contact
  const handleEditClick = (contact) => {
    setEditingContact(contact);
    setShowEditModal(true);
  };

  // Open the View details for the selected contact
  const handleViewClick = (contact) => {
    setViewingContact(contact);
    setShowViewModal(true);
  };

  // Handle deleting a contact
  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts); 
  };

  // Filter contacts based on the search query (first name, last name, or phone number)
  useEffect(() => {
    const results = contacts.filter(contact => {
      const firstName = contact.firstName ? contact.firstName.toLowerCase() : '';
      const lastName = contact.lastName ? contact.lastName.toLowerCase() : '';
      const phone = contact.phone ? contact.phone : '';
  
      return (
        firstName.includes(searchQuery.toLowerCase()) ||
        lastName.includes(searchQuery.toLowerCase()) ||
        phone.includes(searchQuery)
      );
    });
    setFilteredContacts(results);
  }, [searchQuery, contacts]);
  

  if (loading) return <div>Loading contacts...</div>;

  return (
    
    <div className='container'>
      <div className='contact-list'><h1>Contacts List</h1></div>
      <AddContact addContact={addContact} /> 
      
      
      <SearchContact searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
<div className='view'>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName} - {contact.phone}
            <button onClick={() => handleViewClick(contact)}  style={{ width: "20%", borderRadius: "11px", backgroundColor: 'green', color: 'white', marginTop: '10px', alignSelf: 'center' }}    >View</button> 
            <button onClick={() => handleEditClick(contact)}  style={{ width: "20%", borderRadius: "11px", backgroundColor: 'blue', color: 'white', marginTop: '10px', alignSelf: 'center' }} >Edit</button> 
            <button onClick={() => handleDelete(contact.id)}  style={{ width: "20%", borderRadius: "11px", backgroundColor: 'red', color: 'white', marginTop: '10px', alignSelf: 'center' }} >Delete</button>
          </li>
        ))}
      </ul>
</div>      

      {showEditModal && (
        <EditContact
          contact={editingContact}
          updateContact={updateContact}
          closeModal={() => setShowEditModal(false)} 
        />
      )}

      {showViewModal && (
        <ViewContact
          contact={viewingContact}
          closeModal={() => setShowViewModal(false)} 
        />
      )}
    </div>
   
  );
};

export default ContactsView;
