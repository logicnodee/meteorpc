'use client';
import React, { useState } from 'react';
import { transaksiContoh, formatRupiah } from '@/lib/data';
import { Search, Download, Package } from 'lucide-react';
import Link from 'next/link';

export default function PesananMasukPage() {
  const [activeTab, setActiveTab] = useState('Semua Pesanan');
  
  // Filter only orders for this seller (seller-1)
  let myOrders = transaksiContoh.filter(t => t.sellerId === 'seller-1');

  // Apply tab filtering
  if (activeTab === 'Perlu Diproses') {
    myOrders = myOrders.filter(t => t.status === 'hold' || t.status === 'dibayar');
  } else if (activeTab === 'Menunggu Konfirmasi') {
    myOrders = myOrders.filter(t => t.status === 'menunggu_bayar');
  } else if (activeTab === 'Pesanan Selesai') {
    myOrders = myOrders.filter(t => t.status === 'selesai' || t.status === 'diterima');
  } else if (activeTab === 'Sedang Dibatalkan' || activeTab === 'Pesanan Dibatalkan') {
    myOrders = myOrders.filter(t => t.status === 'komplain' || t.status === 'refund');
  }

  const tabs = ['Perlu Diproses', 'Menunggu Konfirmasi', 'Pesanan Selesai', 'Sedang Dibatalkan', 'Pesanan Dibatalkan', 'Semua Pesanan'];

  return (
    <div style={{ background: '#fff', borderRadius: 8, minHeight: '80vh', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Riwayat Pesanan</h1>
        <button className="btn btn-outline" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontWeight: 600 }}>
          <Download size={14}/> Unduh Riwayat Pesanan
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: 20, overflowX: 'auto', gap: 8, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />
        {tabs.map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t)}
            style={{ 
              padding: '12px 20px', 
              fontSize: 13, 
              fontWeight: 600, 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === t ? '2px solid var(--brand-blue)' : '2px solid transparent',
              color: activeTab === t ? 'var(--brand-blue)' : 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t} {t === 'Menunggu Konfirmasi' && <span style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: 10, fontSize: 10, marginLeft: 4 }}>99+</span>}
          </button>
        ))}
      </div>

      {/* Filters 1 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <select className="input" style={{ width: 160, fontSize: 13, padding: '8px 12px' }}>
          <option>Nomor Pesanan</option>
          <option>Nama Pembeli</option>
        </select>
        
        <div style={{ position: 'relative', width: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}/>
          <input type="text" className="input" placeholder="Cari Nomor Pesanan" style={{ width: '100%', paddingLeft: 34, fontSize: 13, padding: '8px 12px 8px 34px' }} />
        </div>

        <select className="input" style={{ width: 180, fontSize: 13, padding: '8px 12px' }}>
          <option>Pilih Filter</option>
          <option>Kurir Instan</option>
          <option>Kurir Reguler</option>
        </select>

        <select className="input" style={{ width: 150, fontSize: 13, padding: '8px 12px', marginLeft: 'auto' }}>
          <option>Terlama</option>
          <option>Terbaru</option>
        </select>
      </div>

      {/* Filters 2 (Pills) */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <button className="badge" style={{ border: '1px solid var(--brand-blue)', color: 'var(--brand-blue)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Semua Pesanan</button>
        <button className="badge" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Sparepart PC</button>
        <button className="badge" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Laptop Second</button>
        <button className="badge" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Pesanan Butuh Cepat</button>
      </div>

      {/* Pesanan List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {myOrders.map(order => (
          <div key={order.id} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontWeight: 600 }}>{order.id}</span>
                <span style={{ color: 'var(--text-muted)' }}>{new Date(order.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                <span style={{ color: 'var(--text-muted)' }}>Pembeli: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{order.buyerNama}</span></span>
              </div>
              <div style={{ fontWeight: 700, color: order.status === 'selesai' ? '#10b981' : order.status === 'dikirim' ? '#f59e0b' : 'var(--brand-blue)' }}>
                {order.status === 'hold' ? 'DITAHAN SISTEM (HOLD)' : order.status.toUpperCase()}
              </div>
            </div>
            
            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 64, height: 64, background: 'var(--bg-secondary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--border-color)' }}>
                  <Package size={24}/>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: 'var(--brand-blue)' }}>{order.produkNama}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Ekspedisi: {order.ekspedisi} {order.resi ? `- Resi: ${order.resi}` : ''}</div>
                  <div style={{ fontSize: 13 }}>
                    Harga Satuan: {formatRupiah(order.harga)} <span style={{ color: 'var(--text-muted)' }}>x 1</span>
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Total Pendapatan</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#d97706' }}>{formatRupiah(order.netSeller)}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {order.status !== 'selesai' && order.status !== 'komplain' && order.status !== 'refund' && (
                    <a href={`/dashboard/seller/pesanan/cetak/${order.id}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 13, background: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Cetak Resi</a>
                  )}
                  <Link href={`/dashboard/seller/pesanan/${order.id}`} className="btn btn-primary" style={{ padding: '8px 24px', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {order.status === 'selesai' ? 'Lihat Rincian' : 'Atur Pesanan'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {myOrders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: 8, background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#94a3b8' }}>
              <Package size={64} strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Kamu belum memiliki pesanan</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Ayo promosikan tokomu agar mendapat pembeli pertama!</p>
          </div>
        )}
      </div>

    </div>
  );
}
