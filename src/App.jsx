import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const UserCard = ({ user }) => {
  const randomSeed = Math.floor(Math.random() * 1000) + 1;
  const randomImage = `https://picsum.photos/200/300?random=${randomSeed}`;

  return (
    <div className="card">
      <img src={randomImage} className="card-img-top" alt="User" />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text"><strong>Hair Color:</strong> {user.hair_color}</p>
        <p className="card-text"><strong>Skin Color:</strong> {user.skin_color}</p>
        <p className="card-text"><strong>Gender:</strong> {user.gender}</p>
        <p className="card-text"><strong>Count of Vehicles:</strong> {user.vehicles.length}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setUsers(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="mt-4 mb-4">User List</h1>
        <div className="card-grid">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading && !error && users.map(user => (
            <UserCard key={user.url} user={user} />
          ))}
        </div>
        <div className="pagination">
          <button className="btn btn-primary" onClick={prevPage} disabled={page === 1}>Previous</button>
          <span className="mx-2">Page {page}</span>
          <button className="btn btn-primary" onClick={nextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default App;
