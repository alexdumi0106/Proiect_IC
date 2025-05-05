import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [complexData, setComplexData] = useState({
    name: '',
    location: '',
    description: '',
    image_url: ''
  });

  const [courtData, setCourtData] = useState({
    name: '',
    description: '',
    sports_complex_id: '',
    image_url: ''
  });

  const handleAddComplex = async () => {
    try {
      await axios.post('/api/sports-complexes', complexData);
      alert('Sports complex added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add complex');
    }
  };

  const handleAddCourt = async () => {
    try {
      await axios.post('/api/courts', courtData);
      alert('Court added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add court');
    }
  };

  return (
    <div className="admin-page">
      <h2>Add Sports Complex</h2>
      <input
        type="text"
        placeholder="Name"
        value={complexData.name}
        onChange={e => setComplexData({ ...complexData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={complexData.location}
        onChange={e => setComplexData({ ...complexData, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={complexData.description}
        onChange={e => setComplexData({ ...complexData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={complexData.image_url}
        onChange={e => setComplexData({ ...complexData, image_url: e.target.value })}
      />
      <button onClick={handleAddComplex}>Add Complex</button>

      <h2>Add Court</h2>
      <input
        type="text"
        placeholder="Name"
        value={courtData.name}
        onChange={e => setCourtData({ ...courtData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={courtData.description}
        onChange={e => setCourtData({ ...courtData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Sports Complex ID"
        value={courtData.sports_complex_id}
        onChange={e => setCourtData({ ...courtData, sports_complex_id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={courtData.image_url}
        onChange={e => setCourtData({ ...courtData, image_url: e.target.value })}
      />
      <button onClick={handleAddCourt}>Add Court</button>
    </div>
  );
}

export default AdminPage;
