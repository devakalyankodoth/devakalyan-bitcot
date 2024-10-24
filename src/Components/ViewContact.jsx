import React from 'react';

const ViewContact = ({ contact, closeModal }) => {
  return (
    <div>
      <h2>Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <button onClick={closeModal} style={{backgroundColor: 'red'}}>Close</button>
    </div>
  );
};

export default ViewContact;


