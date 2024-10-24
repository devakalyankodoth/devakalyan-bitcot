
import React, { useState } from 'react';

// AddContact Component
const AddContact = ({ addContact }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [error, setError] = useState('');

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
      addContact(formData); 
      // Clear form fields
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      });
    }
  };

  return (
    <div className='header '>
      <h2>Add New Contact</h2>
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
        <button type="submit" style={{ width: "50%", borderRadius: "11px", backgroundColor: 'blue', color: 'white', marginTop: '10px', alignSelf: 'center' }} >Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
