import React, { useState, useEffect } from 'react';

export default function ResultTable({ users, newUser, onEdit, onDelete, onAdded }) {
  const [editing, setEditing] = useState(null);
  const [allUsers, setAllUsers] = useState(users);

  // Add new user when newUser changes
  useEffect(() => {
    if (newUser) {
      setAllUsers((prev) => [...prev, { ...newUser, id: Math.max(...prev.map((u) => u.id), 0) + 1 }]);
      onAdded();
    }
  }, [newUser, onAdded]);

  // Update allUsers when users prop changes (from delete/edit in App)
  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const editUser = (user) => {
    setEditing({ ...user, address: { ...user.address } });
  };

  const handleEditChange = (field, value) => {
    if (['street', 'suite', 'city'].includes(field)) {
      setEditing({
        ...editing,
        address: { ...editing.address, [field]: value },
      });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  };

  const saveUser = () => {
    onEdit(editing.id, editing);
    setEditing(null);
  };

  const removeUser = (id) => {
    onDelete(id);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  return (
    <div className="result-table-container">
      <table className="result-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: 12 }}>
                Không có người dùng
              </td>
            </tr>
          ) : (
            allUsers.map((u, idx) => (
              <tr key={u.id}>
                <td>{idx + 1}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.address?.city || '-'}</td>
                <td>{u.phone || '-'}</td>
                <td>
                  <button className="btn-edit" onClick={() => editUser(u)}>
                    ✏️ Sửa
                  </button>
                  <button className="btn-delete" onClick={() => removeUser(u.id)}>
                    ❌ Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sửa người dùng</h4>
            <div className="form-group">
              <label htmlFor="edit-name">Name: </label>
              <input
                id="edit-name"
                type="text"
                value={editing.name}
                onChange={(e) => handleEditChange('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-username">Username: </label>
              <input
                id="edit-username"
                type="text"
                value={editing.username}
                onChange={(e) => handleEditChange('username', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-email">Email: </label>
              <input
                id="edit-email"
                type="email"
                value={editing.email}
                onChange={(e) => handleEditChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-street">Street: </label>
              <input
                id="edit-street"
                type="text"
                value={editing.address?.street || ''}
                onChange={(e) => handleEditChange('street', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-suite">Suite: </label>
              <input
                id="edit-suite"
                type="text"
                value={editing.address?.suite || ''}
                onChange={(e) => handleEditChange('suite', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-city">City: </label>
              <input
                id="edit-city"
                type="text"
                value={editing.address?.city || ''}
                onChange={(e) => handleEditChange('city', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-phone">Phone: </label>
              <input
                id="edit-phone"
                type="text"
                value={editing.phone || ''}
                onChange={(e) => handleEditChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-website">Website: </label>
              <input
                id="edit-website"
                type="text"
                value={editing.website || ''}
                onChange={(e) => handleEditChange('website', e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={saveUser}>
                Lưu
              </button>
              <button className="btn-secondary" onClick={cancelEdit}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
