'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, XCircle, Eye, AlertTriangle, Loader2 } from 'lucide-react';
import { formatRupiah } from '@/lib/data';
import { getReviewProducts, updateProductStatus } from '@/app/actions';

export default function ReviewProdukPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await getReviewProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    if (confirm('Yakin ingin menyetujui produk ini agar bisa tampil di halaman beranda?')) {
      // Optimistic update
      setProducts(products.map(p => p.id === id ? { ...p, status: 'Disetujui' } : p));
      await updateProductStatus(id, 'approve');
    }
  };

  const handleReject = async (id: string) => {
    if (confirm('Yakin ingin menolak produk ini? (Produk tidak akan tampil)')) {
      // Optimistic update
      setProducts(products.map(p => p.id === id ? { ...p, status: 'Ditolak' } : p));
      await updateProductStatus(id, 'reject');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Review & Moderasi Produk</h1>
          <p style={{ color: 'var(--text-muted)' }}>Setujui atau tolak produk baru yang diajukan oleh *seller* sebelum tampil di *marketplace*.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari ID Moderasi atau nama produk..." 
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
              <th>ID Referensi</th>
              <th>Informasi Produk</th>
              <th>Kondisi</th>
              <th>Harga</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                  <Loader2 size={24} className="spin" style={{ margin: '0 auto 12px' }} />
                  Memuat antrean moderasi...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                  Tidak ada produk yang memerlukan moderasi saat ini.
                </td>
              </tr>
            ) : products.map((prod) => (
              <tr key={prod.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{prod.id.toUpperCase()}</td>
                <td>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{prod.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Toko: <span style={{ color: 'var(--brand-blue)' }}>{prod.seller}</span></div>
                </td>
                <td>
                  <span style={{ 
                    background: prod.type === 'Baru' ? 'rgba(0, 200, 150, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                    color: prod.type === 'Baru' ? 'var(--color-success)' : 'var(--color-danger)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {prod.type}
                  </span>
                </td>
                <td style={{ fontWeight: 700 }}>{formatRupiah(prod.price)}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{prod.date}</td>
                <td>
                  {prod.status === 'Pending' && <span style={{ color: 'var(--color-warning)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14}/> Pending</span>}
                  {prod.status === 'Disetujui' && <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14}/> Disetujui</span>}
                  {prod.status === 'Ditolak' && <span style={{ color: 'var(--color-danger)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><XCircle size={14}/> Ditolak</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <Link href={`/produk/${prod.id}`} target="_blank" className="btn btn-ghost btn-sm" title="Preview Halaman Produk/Toko" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Eye size={16}/>
                    </Link>
                    {prod.status === 'Pending' && (
                      <>
                        <button onClick={() => handleApprove(prod.id)} className="btn btn-ghost btn-sm" title="Setujui (Bisa Tampil)" style={{ padding: 6, color: 'var(--color-success)', background: 'rgba(0, 200, 150, 0.1)' }}>
                          <CheckCircle size={16}/>
                        </button>
                        <button onClick={() => handleReject(prod.id)} className="btn btn-ghost btn-sm" title="Tolak (Tidak Tampil)" style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
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
