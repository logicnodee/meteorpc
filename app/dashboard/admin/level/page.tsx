'use client';
import React, { useState } from 'react';
import { Search, Trophy, Edit3, Settings } from 'lucide-react';

const initialLevels = [
  { id: 'LVL-1', name: 'Calon Juragan', icon: '🟤', minPesanan: 0, minRating: 0, fee: '2%', status: 'Aktif' },
  { id: 'LVL-2', name: 'Juragan Menengah', icon: '🥈', minPesanan: 500, minRating: 4.5, fee: '1.8%', status: 'Aktif' },
  { id: 'LVL-3', name: 'Juragan Besar', icon: '🥇', minPesanan: 1000, minRating: 4.7, fee: '1.5%', status: 'Aktif' },
  { id: 'LVL-4', name: 'Dewa Juragan', icon: '💎', minPesanan: 5000, minRating: 4.8, fee: '1.0%', status: 'Aktif' },
];

export default function KonfigurasiLevelPage() {
  const [levels] = useState(initialLevels);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Konfigurasi Level Seller</h1>
          <p style={{ color: 'var(--text-muted)' }}>Atur syarat dan benefit untuk setiap tingkatan toko (Gamification).</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings size={18} /> Tambah Level Baru
        </button>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID Level</th>
              <th>Nama Level & Icon</th>
              <th>Syarat Minimal Transaksi</th>
              <th>Syarat Minimal Rating</th>
              <th>Potongan Admin (Fee)</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((lvl) => (
              <tr key={lvl.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{lvl.id}</td>
                <td>
                  <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{lvl.icon}</span> {lvl.name}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{lvl.minPesanan} Pesanan Selesai</td>
                <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Trophy size={14} color="#f59e0b" /> {lvl.minRating}
                </td>
                <td style={{ fontWeight: 700, color: 'var(--color-success)' }}>{lvl.fee}</td>
                <td>
                  <span style={{ 
                    background: 'rgba(0, 200, 150, 0.1)', 
                    color: 'var(--color-success)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {lvl.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" title="Edit Syarat/Benefit" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Edit3 size={16}/>
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
