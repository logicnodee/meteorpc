'use client';
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, AlertTriangle, FolderPlus } from 'lucide-react';

const initialCategoryRequests = [
  { id: 'REQ-CAT-001', parent: 'Aksesoris', proposedName: 'Webcam & Headset', seller: 'TechStore ID', date: '15 Mei 2026', status: 'Pending' },
  { id: 'REQ-CAT-002', parent: 'Sparepart Laptop', proposedName: 'Engsel & Casing', seller: 'Laptop Murah Official', date: '14 Mei 2026', status: 'Pending' },
  { id: 'REQ-CAT-003', parent: 'Laptop', proposedName: 'Laptop Content Creator', seller: 'Juragan PC', date: '12 Mei 2026', status: 'Disetujui' },
  { id: 'REQ-CAT-004', parent: 'Sparepart Laptop', proposedName: 'Baut Campur', seller: 'Sparepart Jogja', date: '10 Mei 2026', status: 'Ditolak' },
];

export default function ModerasiKategoriPage() {
  const [requests, setRequests] = useState(initialCategoryRequests);

  const handleApprove = (id: string) => {
    if (confirm('Setujui penambahan subkategori baru ini ke dalam sistem?')) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: 'Disetujui' } : r));
    }
  };

  const handleReject = (id: string) => {
    if (confirm('Tolak usulan subkategori ini?')) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: 'Ditolak' } : r));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Moderasi Kategori Baru</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tinjau usulan penambahan subkategori baru yang diajukan oleh *seller*.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari usulan kategori..." 
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
              <th>ID Request</th>
              <th>Usulan Subkategori</th>
              <th>Kategori Induk</th>
              <th>Seller Pengusul</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{req.id}</td>
                <td>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FolderPlus size={14} color="var(--brand-blue)"/> {req.proposedName}
                  </div>
                </td>
                <td>
                  <span style={{ 
                    background: 'rgba(59, 130, 246, 0.1)', 
                    color: 'var(--brand-blue)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {req.parent}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{req.seller}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{req.date}</td>
                <td>
                  {req.status === 'Pending' && <span style={{ color: 'var(--color-warning)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14}/> Pending</span>}
                  {req.status === 'Disetujui' && <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14}/> Disetujui</span>}
                  {req.status === 'Ditolak' && <span style={{ color: 'var(--color-danger)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><XCircle size={14}/> Ditolak</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" title="Lihat Detail & Alasan" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Eye size={16}/>
                    </button>
                    {req.status === 'Pending' && (
                      <>
                        <button onClick={() => handleApprove(req.id)} className="btn btn-ghost btn-sm" title="Setujui Usulan" style={{ padding: 6, color: 'var(--color-success)', background: 'rgba(0, 200, 150, 0.1)' }}>
                          <CheckCircle size={16}/>
                        </button>
                        <button onClick={() => handleReject(req.id)} className="btn btn-ghost btn-sm" title="Tolak Usulan" style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
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
