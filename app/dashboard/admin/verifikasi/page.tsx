'use client';
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, AlertTriangle, User } from 'lucide-react';

const initialVerifications = [
  { id: 'KYC-001', name: 'Budi Santoso', nik: '3174020102900001', type: 'KTP', date: '14 Mei 2026', status: 'Pending' },
  { id: 'KYC-002', name: 'PT Mega Jaya', nik: 'NPWP: 01.234.567.8-091.000', type: 'NPWP', date: '14 Mei 2026', status: 'Pending' },
  { id: 'KYC-003', name: 'Andi Wijaya', nik: '3201010101950002', type: 'KTP', date: '13 Mei 2026', status: 'Disetujui' },
  { id: 'KYC-004', name: 'Reza Oktovian', nik: 'Buram / Tidak Jelas', type: 'KTP', date: '12 Mei 2026', status: 'Ditolak' },
];

export default function VerifikasiKTPPage() {
  const [verifications, setVerifications] = useState(initialVerifications);

  const handleApprove = (id: string) => {
    if (confirm('Yakin ingin memverifikasi identitas pengguna ini? (Status toko akan menjadi Verified)')) {
      setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'Disetujui' } : v));
    }
  };

  const handleReject = (id: string) => {
    if (confirm('Yakin ingin menolak verifikasi ini?')) {
      setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'Ditolak' } : v));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Verifikasi Identitas (KYC)</h1>
          <p style={{ color: 'var(--text-muted)' }}>Periksa kesesuaian data KTP/NPWP dengan nama pemilik akun seller.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari nama atau NIK..." 
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
              <th>Data Pengguna</th>
              <th>Jenis ID</th>
              <th>Tanggal Upload</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{item.id}</td>
                <td>
                  <div style={{ fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} color="var(--brand-blue)"/> {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>ID: {item.nik}</div>
                </td>
                <td>
                  <span style={{ 
                    background: item.type === 'KTP' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                    color: item.type === 'KTP' ? 'var(--brand-blue)' : '#f59e0b', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {item.type}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.date}</td>
                <td>
                  {item.status === 'Pending' && <span style={{ color: 'var(--color-warning)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14}/> Pending</span>}
                  {item.status === 'Disetujui' && <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14}/> Disetujui</span>}
                  {item.status === 'Ditolak' && <span style={{ color: 'var(--color-danger)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><XCircle size={14}/> Ditolak</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" title="Lihat Foto KTP/Selfie" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Eye size={16}/>
                    </button>
                    {item.status === 'Pending' && (
                      <>
                        <button onClick={() => handleApprove(item.id)} className="btn btn-ghost btn-sm" title="Setujui Verifikasi" style={{ padding: 6, color: 'var(--color-success)', background: 'rgba(0, 200, 150, 0.1)' }}>
                          <CheckCircle size={16}/>
                        </button>
                        <button onClick={() => handleReject(item.id)} className="btn btn-ghost btn-sm" title="Tolak (KTP Buram / Tidak Sesuai)" style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
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
