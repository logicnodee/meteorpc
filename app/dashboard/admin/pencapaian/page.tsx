'use client';
import React, { useState } from 'react';
import { Search, Award, Star, ShieldCheck } from 'lucide-react';

const initialBadges = [
  { id: 'ACH-001', shop: 'TechStore Indonesia', category: 'RAM', title: 'Top Seller Bulanan (RAM)', month: 'April 2026', status: 'Diberikan' },
  { id: 'ACH-002', shop: 'Laptop Murah Official', category: 'Laptop Gaming', title: 'Trusted Seller (Rating > 4.5)', month: 'Sepanjang Waktu', status: 'Diberikan' },
  { id: 'ACH-003', shop: 'Sparepart Jogja', category: 'Baterai', title: 'Top Seller Bulanan (Baterai)', month: 'Mei 2026', status: 'Pending Approval Admin' },
];

export default function PencapaianTokoPage() {
  const [badges, setBadges] = useState(initialBadges);

  const handleApprove = (id: string) => {
    if (confirm('Berikan emblem pencapaian ini kepada toko tersebut?')) {
      setBadges(badges.map(b => b.id === id ? { ...b, status: 'Diberikan' } : b));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Pencapaian Toko (Emblem)</h1>
          <p style={{ color: 'var(--text-muted)' }}>Berikan penghargaan (emblem/badge) kepada toko-toko berprestasi untuk menarik pembeli.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari nama toko atau jenis pencapaian..." 
            style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
        <select className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0 16px' }}>
          <option>Semua Kategori</option>
          <option>Top Seller Bulanan</option>
          <option>Trusted Seller</option>
        </select>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Nama Toko</th>
              <th>Pencapaian (Emblem)</th>
              <th>Kategori Spesifik</th>
              <th>Periode</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {badges.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600, color: 'var(--brand-blue)' }}>{b.shop}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#d97706' }}>
                    <Award size={16} /> {b.title}
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{b.category}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{b.month}</td>
                <td>
                  <span style={{ 
                    background: b.status === 'Diberikan' ? 'rgba(0, 200, 150, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                    color: b.status === 'Diberikan' ? 'var(--color-success)' : '#f59e0b', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {b.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {b.status.includes('Pending') && (
                      <button onClick={() => handleApprove(b.id)} className="btn btn-ghost btn-sm" title="Approve Pemberian Emblem" style={{ padding: 6, color: 'var(--color-success)', background: 'rgba(0, 200, 150, 0.1)' }}>
                        <ShieldCheck size={16}/>
                      </button>
                    )}
                    <button className="btn btn-ghost btn-sm" title="Cabut Emblem" style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
                      <Star size={16}/>
                    </button>
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
