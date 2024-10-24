import React from 'react';

const SearchContact = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder="Search by name or phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchContact;
