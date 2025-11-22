import React, { useEffect, useState, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { getUsers, createUser, updateUser, deleteUser } from './api';
import UserTable from './components/UserTable';
import EditModal from './components/EditModal';
import LoadingSpinner from './components/LoadingSpinner';

const PER_PAGE = 5;

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e) {
        toast.error('Error loading users');
      } finally { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())), [users, search]);
  const pageUsers = useMemo(() => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE), [filtered, page]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;

  async function handleCreate() {
    if (!newUser.name || !newUser.email || !newUser.phone) { toast('Fill all fields',{icon:'⚠️'}); return; }
    setLoading(true);
    try {
      const created = await createUser(newUser);
      created.id = users.length ? Math.max(...users.map(u=>u.id)) + 1 : 1; // local id
      setUsers([...users, created]);
      setNewUser({ name:'', email:'', phone:'' });
      toast.success('User created');
    } catch { toast.error('Create failed'); }
    finally { setLoading(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete user #' + id + '?')) return;
    setLoading(true);
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
    finally { setLoading(false); }
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await updateUser(editUser.id, editUser);
      setUsers(users.map(u => u.id === editUser.id ? editUser : u));
      toast.success('Updated');
      setEditUser(null);
    } catch { toast.error('Update failed'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <Toaster position="top-right" />
      <LoadingSpinner show={loading} />
      <h1 className="text-2xl font-bold mb-6 text-sky-700">React CRUD Users (Axios)</h1>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase mb-1">Search by name</label>
          <input value={search} onChange={e=>{ setPage(1); setSearch(e.target.value); }} placeholder="Type name..." className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-sky-300" />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium">Add new user</p>
          <div className="grid grid-cols-3 gap-2">
            <input placeholder="Name" value={newUser.name} onChange={e=>setNewUser({ ...newUser, name:e.target.value })} className="px-2 py-2 border rounded" />
            <input placeholder="Email" value={newUser.email} onChange={e=>setNewUser({ ...newUser, email:e.target.value })} className="px-2 py-2 border rounded" />
            <input placeholder="Phone" value={newUser.phone} onChange={e=>setNewUser({ ...newUser, phone:e.target.value })} className="px-2 py-2 border rounded" />
          </div>
          <button onClick={handleCreate} className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700">Add</button>
        </div>
      </div>
      <UserTable users={pageUsers} onEdit={u=>setEditUser({ ...u })} onDelete={handleDelete} />
      <div className="flex flex-wrap gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={()=>setPage(i+1)} className={`px-3 py-1 rounded border ${page===i+1? 'bg-sky-600 text-white border-sky-600':'hover:bg-sky-50'}`}>{i+1}</button>
        ))}
      </div>
      <EditModal user={editUser} onChange={setEditUser} onSave={handleUpdate} onCancel={()=>setEditUser(null)} />
    </div>
  );
}
