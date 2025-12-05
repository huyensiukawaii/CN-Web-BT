import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [message, setMessage] = useState("");

  // Bài 3: State cho chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editClass, setEditClass] = useState("");

  // Bài 5: State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // Bài 6: State cho sắp xếp
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };

    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        setStudents(prev => [...prev, res.data]);
        setName("");
        setAge("");
        setStuClass("");
        setMessage("Thêm học sinh thành công!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi thêm:", err);
        setMessage("Lỗi khi thêm học sinh!");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Bài 3: Hàm bắt đầu chỉnh sửa
  const handleEditStart = (student) => {
    setEditingId(student._id);
    setEditName(student.name);
    setEditAge(student.age.toString());
    setEditClass(student.class);
  };

  // Bài 3: Hàm hủy chỉnh sửa
  const handleEditCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditAge("");
    setEditClass("");
  };

  // Bài 3: Hàm lưu chỉnh sửa
  const handleEditSave = (id) => {
    const updatedData = { name: editName, age: Number(editAge), class: editClass };

    axios.put(`http://localhost:5000/api/students/${id}`, updatedData)
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        setStudents(prev => prev.map(s => s._id === id ? res.data : s));
        setEditingId(null);
        setEditName("");
        setEditAge("");
        setEditClass("");
        setMessage("Cập nhật học sinh thành công!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        setMessage("Lỗi khi cập nhật học sinh!");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Bài 4: Hàm xóa học sinh
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;

    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        setStudents(prev => prev.filter(s => s._id !== id));
        setMessage("Xóa học sinh thành công!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        setMessage("Lỗi khi xóa học sinh!");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Bài 5: Lọc danh sách theo tìm kiếm
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bài 6: Sắp xếp danh sách
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>🎓 Quản lý học sinh</h1>
          <p className="header-subtitle">Hệ thống quản lý thông tin học sinh hiện đại</p>
        </div>

        {/* Form thêm học sinh */}
        <div className="card form-container">
          <h2 className="form-title">➕ Thêm học sinh mới</h2>
          <form onSubmit={handleAddStudent}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập họ tên"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group small">
                <label className="form-label">Tuổi</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Tuổi"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Lớp</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập lớp"
                  value={stuClass}
                  onChange={e => setStuClass(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  ➕ Thêm học sinh
                </button>
              </div>
            </div>
          </form>
          {message && (
            <div className={`message ${message.includes('thành công') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Danh sách học sinh */}
        <div className="card list-section">
          <div className="list-header">
            <h2 className="list-title">
              📋 Danh sách học sinh
              <span className="list-count">{students.length}</span>
            </h2>
            <div className="list-controls">
              {/* Bài 5: Ô tìm kiếm */}
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Tìm kiếm theo tên..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {/* Bài 6: Nút sắp xếp */}
              <button
                onClick={() => setSortAsc(prev => !prev)}
                className="btn btn-info"
              >
                {sortAsc ? '🔽 A → Z' : '🔼 Z → A'}
              </button>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <p className="empty-state-text">Chưa có học sinh nào</p>
            </div>
          ) : sortedStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <p className="empty-state-text">Không tìm thấy học sinh nào</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Tuổi</th>
                    <th>Lớp</th>
                    <th className="actions-cell">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student, index) => (
                    <tr key={student._id || index}>
                      {editingId === student._id ? (
                        // Bài 3: Chế độ chỉnh sửa
                        <>
                          <td>
                            <input
                              type="text"
                              className="edit-input"
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="edit-input"
                              value={editAge}
                              onChange={e => setEditAge(e.target.value)}
                              min="1"
                              max="100"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="edit-input"
                              value={editClass}
                              onChange={e => setEditClass(e.target.value)}
                            />
                          </td>
                          <td className="actions-cell">
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEditSave(student._id)}
                                className="btn btn-success btn-small"
                              >
                                ✓ Lưu
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="btn btn-secondary btn-small"
                              >
                                ✕ Hủy
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // Chế độ hiển thị bình thường
                        <>
                          <td>{student.name}</td>
                          <td>{student.age}</td>
                          <td>{student.class}</td>
                          <td className="actions-cell">
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEditStart(student)}
                                className="btn btn-warning btn-small"
                              >
                                ✏️ Sửa
                              </button>
                              <button
                                onClick={() => handleDelete(student._id)}
                                className="btn btn-danger btn-small"
                              >
                                🗑️ Xóa
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
