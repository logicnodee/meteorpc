import type { Metadata } from 'next';
import { kategoris, produk, sellers, formatRupiah } from '@/lib/data';
import Link from 'next/link';
import { Package, Store, Shield, Layers, Users, BarChart2, AlertTriangle, Trophy, TrendingUp, ChevronRight, Check, X } from 'lucide-react';
import IconMapper from '@/components/layout/IconMapper';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminOverviewPage() {
  const pendingProduk = 5;
  const pendingToko = 3;
  const pendingVerif = 7;
  const pendingModerasi = 4;
  const totalEscrow = 45382000;
  const pendapatanBulanIni = 1290000;

  const stats = [
    { icon: <Package size={20} color="#00d4ff"/>, label: 'Review Produk', value: pendingProduk, sub: 'menunggu review', color: '#00d4ff', href: '/dashboard/admin/review-produk', urgent: true },
    { icon: <Store size={20} color="#ff6b35"/>, label: 'Review Toko Baru', value: pendingToko, sub: 'pendaftaran baru', color: '#ff6b35', href: '/dashboard/admin/review-toko', urgent: true },
    { icon: <Shield size={20} color="#f59e0b"/>, label: 'Verifikasi KTP', value: pendingVerif, sub: 'menunggu verifikasi', color: '#f59e0b', href: '/dashboard/admin/verifikasi', urgent: true },
    { icon: <Layers size={20} color="#8b5cf6"/>, label: 'Moderasi Kategori', value: pendingModerasi, sub: 'formulir masuk', color: '#8b5cf6', href: '/dashboard/admin/moderasi', urgent: false },
    { icon: <BarChart2 size={20} color="#00c896"/>, label: 'Total Dana Escrow', value: formatRupiah(totalEscrow), sub: 'diparkir di platform', color: '#00c896', href: '/dashboard/admin/transaksi', urgent: false },
    { icon: <TrendingUp size={20} color="#3b82f6"/>, label: 'Pendapatan Bulan Ini', value: formatRupiah(pendapatanBulanIni), sub: 'dari fee transaksi', color: '#3b82f6', href: '/dashboard/admin/laporan', urgent: false },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Panel Admin MeteorPC ⚙️</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Kelola marketplace, review konten, dan monitor transaksi</p>
        </div>
      </div>

      {/* Alert urgent */}
      {(pendingProduk + pendingToko + pendingVerif) > 0 && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
          <AlertTriangle size={16} color="var(--color-danger)"/>
          <span style={{ color: 'var(--color-danger)' }}>
            <strong>{pendingProduk + pendingToko + pendingVerif} item</strong> membutuhkan review segera
          </span>
        </div>
      )}

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '16px 20px', borderColor: stat.urgent && Number(stat.value) > 0 ? 'rgba(239,68,68,0.3)' : undefined }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                {stat.icon}
                <ChevronRight size={14} color="var(--text-muted)"/>
              </div>
              <div style={{ fontSize: typeof stat.value === 'string' ? 16 : 24, fontWeight: 800, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stat.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Review produk terbaru */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontWeight: 700, fontSize: 14 }}>📦 Produk Menunggu Review</h2>
            <Link href="/dashboard/admin/review-produk" style={{ fontSize: 12, color: 'var(--brand-cyan)', textDecoration: 'none' }}>Lihat Semua</Link>
          </div>
          {[
            { nama: 'SSD NVMe 512GB WD Black', seller: 'techstore_id', waktu: '1 jam lalu', kategori: 'SSD & Storage' },
            { nama: 'RAM DDR5 32GB Corsair', seller: 'pcmaster', waktu: '3 jam lalu', kategori: 'RAM' },
            { nama: 'Laptop Lenovo ThinkPad T14', seller: 'laptop_murah', waktu: '5 jam lalu', kategori: 'Laptop Bisnis' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.nama}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>@{item.seller} • {item.kategori} • {item.waktu}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-sm" style={{ background: 'rgba(0,200,150,0.15)', color: 'var(--color-success)', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}><Check size={14}/></button>
                <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--color-danger)', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}><X size={14}/></button>
              </div>
            </div>
          ))}
        </div>

        {/* Manajemen kategori quick view */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontWeight: 700, fontSize: 14 }}>🗂️ Kategori & Setting</h2>
            <Link href="/dashboard/admin/kategori" style={{ fontSize: 12, color: 'var(--brand-cyan)', textDecoration: 'none' }}>Kelola</Link>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Hold</th>
                  <th>Fee</th>
                  <th>Moderasi</th>
                </tr>
              </thead>
              <tbody>
                {kategoris.map(kat => (
                  <tr key={kat.id}>
                    <td style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <IconMapper name={kat.icon} size={16} /> {kat.nama}
                    </td>
                    <td style={{ fontSize: 12 }}>{kat.holdPeriod} hari</td>
                    <td style={{ fontSize: 12 }}>{kat.fee}%</td>
                    <td>
                      <span className={`badge ${kat.perluModerasi ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: 10 }}>
                        {kat.perluModerasi ? 'Wajib' : 'Bebas'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
