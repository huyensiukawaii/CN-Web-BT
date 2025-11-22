import React from 'react';

export default function EditModal({ user, onChange, onSave, onCancel }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Edit User #{user.id}</h3>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <div className="space-y-3">
          <input className="w-full px-3 py-2 border rounded" value={user.name} onChange={e=>onChange({ ...user, name:e.target.value })} placeholder="Name" />
          <input className="w-full px-3 py-2 border rounded" value={user.email} onChange={e=>onChange({ ...user, email:e.target.value })} placeholder="Email" />
          <input className="w-full px-3 py-2 border rounded" value={user.phone} onChange={e=>onChange({ ...user, phone:e.target.value })} placeholder="Phone" />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700">Save</button>
        </div>
      </div>
    </div>
  );
}