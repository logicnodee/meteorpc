const fs = require('fs');
const path = require('path');

const adminMenu = [
  { label: 'Review Produk', href: '/dashboard/admin/review-produk' },
  { label: 'Review Toko', href: '/dashboard/admin/review-toko' },
  { label: 'Verifikasi KTP', href: '/dashboard/admin/verifikasi' },
  { label: 'Moderasi Kategori', href: '/dashboard/admin/moderasi' },
  { label: 'Manajemen User', href: '/dashboard/admin/user' },
  { label: 'Monitor Transaksi', href: '/dashboard/admin/transaksi' },
  { label: 'Komplain & Mediasi', href: '/dashboard/admin/komplain' },
  { label: 'Pencapaian Toko', href: '/dashboard/admin/pencapaian' },
  { label: 'Konfigurasi Level', href: '/dashboard/admin/level' },
  { label: 'Laporan Keuangan', href: '/dashboard/admin/laporan' },
];

const sellerMenu = [
  { label: 'Pesanan Masuk', href: '/dashboard/seller/pesanan' },
  { label: 'Saldo Toko', href: '/dashboard/seller/saldo' },
  { label: 'Profil & Level', href: '/dashboard/seller/profil' },
  { label: 'Pencapaian', href: '/dashboard/seller/pencapaian' },
  { label: 'Verifikasi Toko', href: '/dashboard/seller/verifikasi' },
  { label: 'Rekening Bank', href: '/dashboard/seller/rekening' },
  { label: 'Ulasan Pembeli', href: '/dashboard/seller/ulasan' },
  { label: 'Pengaturan Toko', href: '/dashboard/seller/pengaturan' },
];

const generateComponent = (title) => {
  return `'use client';
import React from 'react';
import { Package, MoreVertical } from 'lucide-react';

export default function DummyPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>${title}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Kelola data dan pengaturan untuk ${title.toLowerCase()} Anda di sini.</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Tambah Data</button>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID Referensi</th>
              <th>Status</th>
              <th>Keterangan</th>
              <th>Tanggal</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>#REF-000\${i}</td>
                <td>
                  <span style={{ 
                    background: i % 2 === 0 ? 'rgba(0, 200, 150, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                    color: i % 2 === 0 ? 'var(--color-success)' : 'var(--brand-blue)', 
                    padding: '4px 10px', 
                    borderRadius: 20, 
                    fontSize: 12, 
                    fontWeight: 700 
                  }}>
                    {i % 2 === 0 ? 'Selesai' : 'Aktif'}
                  </span>
                </td>
                <td>Data simulasi untuk ${title.toLowerCase()} baris ke-\${i}</td>
                <td style={{ color: 'var(--text-muted)' }}>1\${i} Mei 2026</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-ghost btn-sm" style={{ padding: 4 }}><MoreVertical size={16} color="var(--text-muted)"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
};

const pages = [...adminMenu, ...sellerMenu];

pages.forEach(page => {
  const dirPath = path.join(__dirname, 'app', page.href.replace('/dashboard', 'dashboard'));
  const filePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateComponent(page.label));
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Skipped (already exists): ${filePath}`);
  }
});

console.log('Done!');
