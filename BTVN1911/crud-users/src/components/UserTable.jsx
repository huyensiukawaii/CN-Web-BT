import React from 'react';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t hover:bg-slate-50">
              <td className="p-3 font-medium">{u.id}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.phone}</td>
              <td className="p-3 space-x-2">
                <button onClick={()=>onEdit(u)} className="px-2 py-1 rounded bg-amber-500 text-white hover:bg-amber-600">Edit</button>
                <button onClick={()=>onDelete(u.id)} className="px-2 py-1 rounded bg-rose-600 text-white hover:bg-rose-700">Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan={5} className="p-6 text-center text-slate-500">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}