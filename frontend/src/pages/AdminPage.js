import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
	// FOR SPORTS COMPLEXES
  const [complexData, setComplexData] = useState({
    name: '',
    location: '',
    description: '',
    image_url: ''
  });

	const [updatedComplexData, updateComplexData] = useState({
		id: '',
    name: '',
    location: '',
    description: '',
    image_url: ''
  });

	const [deleteId, setDeleteId] = useState('');

	// FOR COURTS
  const [courtData, setCourtData] = useState({
    name: '',
    description: '',
    sports_complex_id: '',
    image_url: ''
  });

	const [updatedCourtData, updateCourtData] = useState({
		id: '',
		name: '',
		description: '',
		sports_complex_id: '',
		image_url: ''
	});

  const [deleteCourtId, setDeletedCourtId] = useState('');

  // FOR SPORTS COMPLEXES
  const handleAddComplex = async () => {
	const token = localStorage.getItem('adminToken');
    try {
      await axios.post('/api/sports-complexes', complexData, {
        headers: {Authorization: `Bearer ${token}` }
      });
      alert('Sports complex added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add complex');
    }
  };

	const handleUpdateComplex = async () => {
	const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`/api/sports-complexes/${updatedComplexData.id}`, updatedComplexData, {
        headers: {Authorization: `Bearer ${token}` }
      });
      alert('Sports complex updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update complex');
    }
  };

	const handleDeleteComplex = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/sports-complexes/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Sports complex deleted!');
      } catch (err) {
      console.error(err);
      alert('Failed to delete sports complex');
      }
	};

  // FOR COURTS
  const handleAddCourt = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.post('/api/courts', courtData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Court added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add court');
    }
  };

	const handleUpdateCourt = async () => {
		const token = localStorage.getItem('adminToken');
		try {
			await axios.put(`/api/courts/${updatedCourtData.id}`, updatedCourtData, {
				headers: { Authorization: `Bearer ${token}` }
			});
			alert('Court updated!');
		} catch (err) {
			console.error(err);
			alert('Failed to update court');
		}
	};

  const handleDeleteCourt = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/courts/${deleteCourtId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Court deleted!');
      } catch (err) {
      console.error(err);
      alert('Failed to delete court');
      }
	};

  return (
    <div className="admin-page">
      <button onClick={() => {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
      }}>
      Logout
      </button>

      <div className="sports-complexes-operations">
        {/* Sports Complexes */}
        <h2>Sports Complex operations</h2>
        <section>
          <h3>Add Sports Complex</h3>
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
          <button onClick={handleAddComplex}> Add Complex </button>
        </section>

        <section>
          <h3>Update Sports Complex</h3>
          <input
            type="number"
            placeholder="ID"
            value={updatedComplexData.id}
            onChange={e => updateComplexData({ ...updatedComplexData, id: e.target.value})}
          />
          <input
            type="text"
            placeholder="Name"
            value={updatedComplexData.name}
            onChange={e => updateComplexData({ ...updatedComplexData, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location"
            value={updatedComplexData.location}
            onChange={e => updateComplexData({ ...updatedComplexData, location: e.target.value})}
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedComplexData.description}
            onChange={e => updateComplexData({ ...updatedComplexData, description: e.target.value})}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={updatedComplexData.image_url}
            onChange={e => updateComplexData({ ...updatedComplexData, image_url: e.target.value})}
          />
          <button onClick={handleUpdateComplex}> Update Complex </button>
        </section>

        <section>
          <h3> Delete Sports Complex </h3>
          <input 
            type="number"
            placeholder="ID"
            value={deleteId}
            onChange={e => setDeleteId(e.target.value)}
          />
          <button onClick={handleDeleteComplex}>Delete Complex</button>
        </section>
      </div>

      <div className="court-operations">
        {/* COURTS */}
        <h2>Court operations</h2>
        <section>
          <h3>Add Court</h3>
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
        </section>

        <section>
          <h3>Update Court</h3>
          <input
            type="number"
            placeholder="ID"
            value={updatedCourtData.id}
            onChange={e => updateCourtData({ ...updatedCourtData, id: e.target.value})}
          />
          <input
            type="text"
            placeholder="Name"
            value={updatedCourtData.name}
            onChange={e => updateCourtData({ ...updatedCourtData, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedCourtData.description}
            onChange={e => updateCourtData({ ...updatedCourtData, description: e.target.value})}
          />
          <input
            type="number"
            placeholder="SportsComplex ID"
            value={updatedCourtData.sports_complex_id}
            onChange={e => updateCourtData({ ...updatedCourtData, sports_complex_id: e.target.value})}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={updatedCourtData.image_url}
            onChange={e => updateCourtData({ ...updatedCourtData, image_url: e.target.value})}
          />
          <button onClick={handleUpdateCourt}> Update Court </button>
        </section>

        <section>
          <h3> Delete Court </h3>
          <input 
            type="number"
            placeholder="ID"
            value={deleteCourtId}
            onChange={e => setDeletedCourtId(e.target.value)}
          />
          <button onClick={handleDeleteCourt}>Delete Court</button>
        </section>
      </div>

    </div>
  );
}

export default AdminPage;
