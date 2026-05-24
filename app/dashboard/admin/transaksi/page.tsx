'use client';
import React, { useState } from 'react';
import { Search, Eye, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/data';

const initialTransactions = [
  { id: 'TRX-998123', buyer: 'Rina Amelia', seller: 'TechStore ID', total: 650000, date: '15 Mei 2026', status: 'Selesai' },
  { id: 'TRX-998124', buyer: 'Andi Wijaya', seller: 'Laptop Murah Official', total: 12500000, date: '15 Mei 2026', status: 'Dikirim' },
  { id: 'TRX-998125', buyer: 'Budi Santoso', seller: 'Sparepart Jogja', total: 185000, date: '14 Mei 2026', status: 'Diproses' },
  { id: 'TRX-998126', buyer: 'Reza Oktovian', seller: 'Gadget Mania', total: 1100000, date: '14 Mei 2026', status: 'Menunggu Pembayaran' },
];

export default function MonitorTransaksiPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Monitor Transaksi</h1>
          <p style={{ color: 'var(--text-muted)' }}>Pantau seluruh aliran transaksi yang sedang berjalan di platform.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari ID Transaksi atau nama pembeli..." 
            style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
        <select className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0 16px' }}>
          <option>Semua Status</option>
          <option>Selesai</option>
          <option>Dikirim</option>
          <option>Diproses</option>
          <option>Menunggu Pembayaran</option>
        </select>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID Transaksi</th>
              <th>Alur (Pembeli → Penjual)</th>
              <th>Total Nominal</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{trx.id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-primary)' }}>{trx.buyer}</span>
                    <ArrowRight size={14} color="var(--text-muted)" />
                    <span style={{ color: 'var(--brand-blue)' }}>{trx.seller}</span>
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{formatRupiah(trx.total)}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{trx.date}</td>
                <td>
                  <span style={{ 
                    background: trx.status === 'Selesai' ? 'rgba(0, 200, 150, 0.1)' : trx.status === 'Dikirim' ? 'rgba(59, 130, 246, 0.1)' : trx.status === 'Diproses' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)', 
                    color: trx.status === 'Selesai' ? 'var(--color-success)' : trx.status === 'Dikirim' ? 'var(--brand-blue)' : trx.status === 'Diproses' ? '#f59e0b' : 'var(--text-secondary)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {trx.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" title="Lihat Detail Transaksi" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Eye size={16}/>
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
