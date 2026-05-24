'use client';
import React from 'react';
import { transaksiContoh, formatRupiah, produk } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package, User, Truck, CreditCard, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DetailPesananPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const order = transaksiContoh.find(t => t.id === resolvedParams.id);
  const [resi, setResi] = React.useState(order?.resi || '');
  const [orderStatus, setOrderStatus] = React.useState(order?.status || 'menunggu_bayar');
  const [isEditingResi, setIsEditingResi] = React.useState(false);
  const [tempResi, setTempResi] = React.useState(order?.resi || '');

  if (!order) {
    return notFound();
  }

  // Find product details to get the image
  const productDetail = produk.find(p => p.id === order.produkId);

  // Helper to determine status color and text
  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'hold': return { text: 'DITAHAN SISTEM (HOLD)', color: 'var(--brand-blue)', bg: '#eff6ff' };
      case 'menunggu_bayar': return { text: 'MENUNGGU PEMBAYARAN', color: '#f59e0b', bg: '#fef3c7' };
      case 'dibayar': return { text: 'SUDAH DIBAYAR', color: '#3b82f6', bg: '#eff6ff' };
      case 'dikirim': return { text: 'SEDANG DIKIRIM', color: '#f59e0b', bg: '#fef3c7' };
      case 'diterima': return { text: 'PESANAN DITERIMA', color: '#10b981', bg: '#d1fae5' };
      case 'selesai': return { text: 'PESANAN SELESAI', color: '#10b981', bg: '#d1fae5' };
      case 'komplain': return { text: 'KOMPLAIN', color: '#ef4444', bg: '#fee2e2' };
      case 'refund': return { text: 'DIBATALKAN / REFUND', color: '#ef4444', bg: '#fee2e2' };
      default: return { text: status.toUpperCase(), color: '#64748b', bg: '#f1f5f9' };
    }
  };

  const statusDisplay = getStatusDisplay(orderStatus);

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <Link href="/dashboard/seller/pesanan" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Detail Pesanan</h1>
      </div>

      <div style={{ display: 'flex', gap: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* Left Column: Order Info */}
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Status Card */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Nomor Pesanan</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{order.id}</div>
              </div>
              <div style={{ 
                background: statusDisplay.bg, 
                color: statusDisplay.color, 
                padding: '6px 12px', 
                borderRadius: 20, 
                fontSize: 12, 
                fontWeight: 700 
              }}>
                {statusDisplay.text}
              </div>
            </div>
            
            {orderStatus === 'hold' && order.holdSampai && (
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 16px', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e', marginBottom: 4 }}>Dana Ditahan Sementara</div>
                  <div style={{ fontSize: 13, color: '#b45309' }}>
                    Dana pesanan ini sedang ditahan oleh sistem keamanan MeteorPC dan akan dilepas pada <strong>{new Date(order.holdSampai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Package size={18} /> Rincian Produk
            </h2>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 80, height: 80, background: 'var(--bg-secondary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {productDetail?.gambar && productDetail.gambar.length > 0 ? (
                  <img src={productDetail.gambar[0]} alt={order.produkNama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Package size={32} color="var(--border-color)" />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: 'var(--brand-blue)' }}>{order.produkNama}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>1 x {formatRupiah(order.harga)}</div>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 700 }}>
                {formatRupiah(order.harga)}
              </div>
            </div>
          </div>

          {/* Shipping & Buyer */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <User size={18} /> Info Pembeli
              </h2>
              <div style={{ fontSize: 14 }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 12, marginBottom: 4 }}>Nama Pembeli</span>
                  <span style={{ fontWeight: 600 }}>{order.buyerNama}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 12, marginBottom: 4 }}>Waktu Pesanan</span>
                  <span>{new Date(order.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            
            <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Truck size={18} /> Pengiriman
              </h2>
              <div style={{ fontSize: 14 }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 12, marginBottom: 4 }}>Ekspedisi</span>
                  <span style={{ fontWeight: 600 }}>{order.ekspedisi}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 12, marginBottom: 4 }}>Nomor Resi</span>
                  <span>{resi || '-'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Financial & Actions */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Financial Summary */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={18} /> Rincian Pendapatan
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Harga Produk</span>
                <span>{formatRupiah(order.harga)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Biaya Layanan (Fee)</span>
                <span style={{ color: '#ef4444' }}>-{formatRupiah(order.fee)}</span>
              </div>
              <div style={{ borderTop: '1px dashed var(--border-color)', margin: '4px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                <span>Pendapatan Bersih</span>
                <span style={{ color: '#d97706' }}>{formatRupiah(order.netSeller)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Aksi Pesanan</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* If Order is done, don't show process actions */}
              {orderStatus === 'selesai' ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 16, background: '#f8fafc', borderRadius: 8 }}>
                  Pesanan telah selesai. Tidak ada aksi lebih lanjut.
                </div>
              ) : (
                <>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                    onClick={() => {
                      setTempResi(resi);
                      setIsEditingResi(true);
                    }}
                  >
                    <Truck size={16} /> Input / Update Resi
                  </button>
                  <Link href={`/dashboard/seller/pesanan/cetak/${order.id}`} target="_blank" className="btn btn-outline" style={{ width: '100%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <FileText size={16} /> Cetak Label Pengiriman
                  </Link>
                  <button className="btn btn-outline" style={{ width: '100%', padding: '10px', color: '#ef4444', borderColor: '#ef4444', background: 'transparent' }}>
                    Batalkan Pesanan
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Modal Input Resi */}
      {isEditingResi && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 12, width: 400, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 18, fontWeight: 700 }}>Input / Update Resi</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
              Silakan masukkan nomor resi yang valid dari ekspedisi <strong>{order.ekspedisi}</strong>.
            </p>
            <input 
              type="text" 
              value={tempResi} 
              onChange={(e) => setTempResi(e.target.value)} 
              style={{ width: '100%', padding: '10px 12px', marginBottom: 20, border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
              placeholder="Contoh: JNE123456789"
              autoFocus
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-outline" 
                style={{ padding: '8px 16px', borderRadius: 6 }}
                onClick={() => setIsEditingResi(false)}
              >
                Batal
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: '8px 16px', borderRadius: 6 }}
                onClick={() => { 
                  if (tempResi.trim()) {
                    setResi(tempResi);
                    setIsEditingResi(false);
                    // Update status to shipped when tracking number is provided
                    if (orderStatus !== 'dikirim' && orderStatus !== 'selesai' && orderStatus !== 'diterima') {
                      setOrderStatus('dikirim');
                    }
                  }
                }}
              >
                Simpan Resi & Update Pengiriman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
