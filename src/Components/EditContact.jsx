import React, { useState, useEffect } from 'react';

const EditContact = ({ contact, updateContact, closeModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [error, setError] = useState('');

  // Pre-fill the form with the contact data when component mounts
  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email
      });
    }
  }, [contact]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateContact(contact.id, formData); 
      closeModal(); 
    }
  };

  return (
    <div className='edit'>
      <h2>Edit Contact</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <button type="submit" style={{ width: "40%", borderRadius: "11px", backgroundColor: 'blue', color: 'white', marginTop: '10px', alignSelf: 'center' }}>Save Changes</button>
        <br />
        <button type="button" onClick={closeModal} style={{ width: "20%", borderRadius: "11px", backgroundColor: 'blue', color: 'white', marginTop: '10px', alignSelf: 'center' }} >Cancel</button>
      </form>
    </div>
  );
};

export default EditContact;
