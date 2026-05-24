'use client';
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, User, Shield, UserX, UserCheck } from 'lucide-react';

const initialUsers = [
  { id: 'USR-001', name: 'Budi Santoso', email: 'budi.santoso@email.com', role: 'Seller', date: '12 Jan 2024', status: 'Aktif' },
  { id: 'USR-002', name: 'Rina Amelia', email: 'rina.amel@email.com', role: 'Buyer', date: '05 Mar 2025', status: 'Aktif' },
  { id: 'USR-003', name: 'PT Mega Jaya', email: 'admin@megajaya.co.id', role: 'Seller', date: '22 Feb 2026', status: 'Suspend' },
  { id: 'USR-004', name: 'Hacker Jahat', email: 'scammer@email.com', role: 'Buyer', date: '10 Mei 2026', status: 'Banned' },
  { id: 'USR-005', name: 'Admin Utama', email: 'superadmin@meteorpc.com', role: 'Admin', date: '01 Jan 2023', status: 'Aktif' },
];

export default function ManajemenUserPage() {
  const [users, setUsers] = useState(initialUsers);

  const handleBan = (id: string, currentStatus: string) => {
    if (currentStatus === 'Banned') {
      if (confirm('Buka blokir (Unban) pengguna ini?')) {
        setUsers(users.map(u => u.id === id ? { ...u, status: 'Aktif' } : u));
      }
    } else {
      if (confirm('Yakin ingin memblokir permanen (Banned) pengguna ini?')) {
        setUsers(users.map(u => u.id === id ? { ...u, status: 'Banned' } : u));
      }
    }
  };

  const handleSuspend = (id: string, currentStatus: string) => {
    if (currentStatus === 'Suspend') {
      if (confirm('Cabut status Suspend pengguna ini?')) {
        setUsers(users.map(u => u.id === id ? { ...u, status: 'Aktif' } : u));
      }
    } else {
      if (confirm('Suspend (Blokir Sementara) pengguna ini selama 7 hari?')) {
        setUsers(users.map(u => u.id === id ? { ...u, status: 'Suspend' } : u));
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Manajemen User</h1>
          <p style={{ color: 'var(--text-muted)' }}>Kelola semua akun pengguna terdaftar, peran mereka, dan status keamanan (Blokir/Suspend).</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={18} /> Tambah Admin
        </button>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari ID, nama, atau email pengguna..." 
            style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
        <select className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0 16px' }}>
          <option>Semua Peran</option>
          <option>Admin</option>
          <option>Seller</option>
          <option>Buyer</option>
        </select>
        <select className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0 16px' }}>
          <option>Semua Status</option>
          <option>Aktif</option>
          <option>Suspend</option>
          <option>Banned</option>
        </select>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID User</th>
              <th>Profil Pengguna</th>
              <th>Peran</th>
              <th>Terdaftar</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi / Moderasi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ opacity: user.status === 'Banned' ? 0.6 : 1 }}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{user.id}</td>
                <td>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} color="var(--brand-blue)"/> {user.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user.email}</div>
                </td>
                <td>
                  <span style={{ 
                    background: user.role === 'Admin' ? 'rgba(239, 68, 68, 0.1)' : user.role === 'Seller' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)', 
                    color: user.role === 'Admin' ? 'var(--color-danger)' : user.role === 'Seller' ? 'var(--brand-blue)' : 'var(--text-secondary)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user.date}</td>
                <td>
                  {user.status === 'Aktif' && <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14}/> Aktif</span>}
                  {user.status === 'Suspend' && <span style={{ color: 'var(--color-warning)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14}/> Suspend</span>}
                  {user.status === 'Banned' && <span style={{ color: 'var(--color-danger)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><XCircle size={14}/> Banned</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {user.role !== 'Admin' && (
                      <>
                        <button 
                          onClick={() => handleSuspend(user.id, user.status)} 
                          className="btn btn-ghost btn-sm" 
                          title={user.status === 'Suspend' ? 'Cabut Suspend' : 'Suspend 7 Hari'} 
                          style={{ padding: 6, color: 'var(--color-warning)', background: 'rgba(245, 158, 11, 0.1)' }}
                        >
                          {user.status === 'Suspend' ? <UserCheck size={16}/> : <AlertTriangle size={16}/>}
                        </button>
                        <button 
                          onClick={() => handleBan(user.id, user.status)} 
                          className="btn btn-ghost btn-sm" 
                          title={user.status === 'Banned' ? 'Unban User' : 'Banned Permanen'} 
                          style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}
                        >
                          {user.status === 'Banned' ? <UserCheck size={16}/> : <UserX size={16}/>}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
