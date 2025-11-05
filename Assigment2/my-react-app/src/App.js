import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import AddUser from './components/AddUser';
import ResultTable from './components/ResultTable';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [newUser, setNewUser] = useState(null);

  // Fetch data from API on mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleAddUser = (user) => {
    setNewUser(user);
  };

  const handleEditUser = (id, updated) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filteredUsers = useMemo(() => {
    const k = searchKeyword.trim().toLowerCase();
    if (!k) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(k) ||
        u.username.toLowerCase().includes(k)
    );
  }, [users, searchKeyword]);

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Quản lý người dùng</h1>
      </div>

      <SearchForm searchKeyword={searchKeyword} onSearchChange={handleSearchChange} />

      <AddUser onAdd={handleAddUser} onAdded={() => setNewUser(null)} />

      {loading ? (
        <p className="loading">Đang tải dữ liệu...</p>
      ) : (
        <ResultTable
          users={filteredUsers}
          newUser={newUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onAdded={() => setNewUser(null)}
        />
      )}
    </div>
  );
}

export default App;
