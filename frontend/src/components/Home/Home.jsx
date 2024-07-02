import React, { useState } from 'react';
import MapContainer from './Map';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <div>
      <div style={{ float: 'left', width: '300px', marginRight: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            marginBottom: '10px',
          }}
        />
        {/* Example of displaying search results */}
        <div>
          {searchTerm && (
            <p>Showing results for: <strong>{searchTerm}</strong></p>
          )}
          {/* Replace this with your content or logic to display search results */}
        </div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <MapContainer searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
