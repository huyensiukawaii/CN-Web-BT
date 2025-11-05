import React, { useState } from 'react';

export default function AddUser({ onAdd, onAdded }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    address: { street: '', suite: '', city: '' },
    phone: '',
    website: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (['street', 'suite', 'city'].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    if (user.name === '' || user.username === '') {
      alert('Vui lòng nhập Name và Username!');
      return;
    }
    onAdd(user);
    setUser({
      name: '',
      username: '',
      email: '',
      address: { street: '', suite: '', city: '' },
      phone: '',
      website: '',
    });
    setAdding(false);
    onAdded();
  };

  const handleClose = () => {
    setAdding(false);
    setUser({
      name: '',
      username: '',
      email: '',
      address: { street: '', suite: '', city: '' },
      phone: '',
      website: '',
    });
  };

  return (
    <div>
      <button className="btn-add" onClick={() => setAdding(true)}>
        ➕ Thêm người dùng
      </button>

      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng mới</h4>
            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                placeholder="Họ và tên"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street: </label>
              <input
                id="street"
                type="text"
                value={user.address.street}
                onChange={handleChange}
                placeholder="Đường"
              />
            </div>
            <div className="form-group">
              <label htmlFor="suite">Suite: </label>
              <input
                id="suite"
                type="text"
                value={user.address.suite}
                onChange={handleChange}
                placeholder="Số nhà"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City: </label>
              <input
                id="city"
                type="text"
                value={user.address.city}
                onChange={handleChange}
                placeholder="Thành phố"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone: </label>
              <input
                id="phone"
                type="text"
                value={user.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website: </label>
              <input
                id="website"
                type="text"
                value={user.website}
                onChange={handleChange}
                placeholder="Website"
              />
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={handleAdd}>
                Thêm
              </button>
              <button className="btn-secondary" onClick={handleClose}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
