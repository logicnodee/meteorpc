'use client';
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, AlertTriangle, Store } from 'lucide-react';

const initialStores = [
  { id: 'ST-001', shopName: 'Laptop Berkah', owner: 'Budi Santoso', type: 'Individu', date: '14 Mei 2026', status: 'Pending' },
  { id: 'ST-002', shopName: 'Mega Sparepart', owner: 'PT Mega Jaya', type: 'Perusahaan', date: '14 Mei 2026', status: 'Pending' },
  { id: 'ST-003', shopName: 'Raja Aksesoris', owner: 'Andi Wijaya', type: 'Individu', date: '13 Mei 2026', status: 'Disetujui' },
  { id: 'ST-004', shopName: 'Gaming Store', owner: 'Reza Oktovian', type: 'Individu', date: '12 Mei 2026', status: 'Ditolak' },
];

export default function ReviewTokoPage() {
  const [stores, setStores] = useState(initialStores);

  const handleApprove = (id: string) => {
    if (confirm('Yakin ingin menyetujui pembukaan toko ini?')) {
      setStores(stores.map(s => s.id === id ? { ...s, status: 'Disetujui' } : s));
    }
  };

  const handleReject = (id: string) => {
    if (confirm('Yakin ingin menolak pendaftaran toko ini?')) {
      setStores(stores.map(s => s.id === id ? { ...s, status: 'Ditolak' } : s));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Review Toko Baru</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tinjau pengajuan pembukaan toko baru oleh calon *seller*.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari nama toko atau pemilik..." 
            style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
        <select className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0 16px' }}>
          <option>Semua Status</option>
          <option>Pending</option>
          <option>Disetujui</option>
          <option>Ditolak</option>
        </select>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID Toko</th>
              <th>Informasi Toko</th>
              <th>Tipe</th>
              <th>Tanggal Daftar</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{store.id}</td>
                <td>
                  <div style={{ fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Store size={14} color="var(--brand-blue)"/> {store.shopName}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Pemilik: {store.owner}</div>
                </td>
                <td>
                  <span style={{ 
                    background: store.type === 'Perusahaan' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                    color: store.type === 'Perusahaan' ? '#8b5cf6' : 'var(--brand-blue)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {store.type}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{store.date}</td>
                <td>
                  {store.status === 'Pending' && <span style={{ color: 'var(--color-warning)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14}/> Pending</span>}
                  {store.status === 'Disetujui' && <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14}/> Disetujui</span>}
                  {store.status === 'Ditolak' && <span style={{ color: 'var(--color-danger)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><XCircle size={14}/> Ditolak</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" title="Lihat Berkas" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Eye size={16}/>
                    </button>
                    {store.status === 'Pending' && (
                      <>
                        <button onClick={() => handleApprove(store.id)} className="btn btn-ghost btn-sm" title="Setujui Toko" style={{ padding: 6, color: 'var(--color-success)', background: 'rgba(0, 200, 150, 0.1)' }}>
                          <CheckCircle size={16}/>
                        </button>
                        <button onClick={() => handleReject(store.id)} className="btn btn-ghost btn-sm" title="Tolak Toko" style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
                          <XCircle size={16}/>
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
