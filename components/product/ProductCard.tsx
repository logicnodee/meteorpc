'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Shield, ShieldCheck, Zap } from 'lucide-react';
import { formatRupiah, bestSellersPerKategori, sellers } from '@/lib/data';

interface ProductCardProps {
  id: string;
  nama: string;
  harga: number;
  hargaCoret?: number | null;
  gambar: string[];
  kondisi: string;
  terjual: number;
  rating: number;
  ulasanCount: number;
  kota: string;
  sellerId: string;
  sellerNama: string;
  sellerLevel: number;
  holdPeriod: number;
  kategoriId: string;
  kategoriNama: string;
  featured?: boolean;
  garansiInstan?: boolean;
}

export default function ProductCard({
  id, nama, harga, hargaCoret, gambar, kondisi, terjual, rating,
  ulasanCount, kota, sellerId, sellerNama, sellerLevel, holdPeriod, featured,
  kategoriId, kategoriNama, garansiInstan
}: ProductCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const diskon = hargaCoret ? Math.round((1 - harga / hargaCoret) * 100) : 0;
  const isBestSeller = bestSellersPerKategori[kategoriId] === sellerId;

  return (
    <Link href={`/produk/${id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div className="card" style={{ position: 'relative', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', zIndex: showTooltip ? 99 : 1 }}>

        {/* Diskon badge (removed per user request) */}

        {/* Image */}
        <div style={{
          height: 160, background: 'var(--bg-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 56, borderBottom: '1px solid var(--border-color)',
          overflow: 'hidden', flexShrink: 0,
          borderTopLeftRadius: 12, borderTopRightRadius: 12
        }}>
          {gambar[0].startsWith('http') ? (
            <img src={gambar[0]} alt={nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            gambar[0]
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Kondisi badge */}
          <span className={`badge ${kondisi === 'Baru' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10, marginBottom: 6 }}>
            {kondisi}
          </span>

          {/* Nama */}
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>{nama}</h3>

          {/* Spacer (pushes price down) */}
          <div style={{ flex: 1 }}></div>

          {/* Harga */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand-blue)' }}>{formatRupiah(harga)}</div>
          </div>

          {/* Rating & terjual & Garansi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Star size={12} fill="#fbbf24" color="#fbbf24"/> <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{rating}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              {terjual} terjual
              {isBestSeller && (
                <span title={`Penjual terbaik di ${kategoriNama}`} style={{ display: 'flex', alignItems: 'center', color: 'var(--brand-blue)' }}>
                  <ShieldCheck size={14} fill="var(--brand-blue)" color="#fff" />
                </span>
              )}
              {garansiInstan && (
                <div 
                  onMouseEnter={(e) => { e.preventDefault(); setShowTooltip(true); }}
                  onMouseLeave={(e) => { e.preventDefault(); setShowTooltip(false); }}
                  onClick={(e) => e.preventDefault()}
                  style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4, background: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: 'pointer', marginLeft: 2 }}
                >
                  <Zap size={10} fill="#16a34a" /> 1 Hari Kirim
                  
                  {showTooltip && (
                    <div style={{ 
                      position: 'absolute', bottom: '100%', left: -8, marginBottom: 8,
                      background: '#1e293b', color: '#fff', padding: '12px 16px', borderRadius: 8, width: 280,
                      fontSize: 11, zIndex: 99, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', pointerEvents: 'none',
                      lineHeight: 1.5, textAlign: 'left', fontWeight: 400
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>JAMINAN KIRIM 1 HARI</div>
                      <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 8 }}>Tercapai</div>
                      <div style={{ marginBottom: 4 }}>Pesanan dikirim ke ekspedisi maks 1x24 jam.</div>
                      <div style={{ color: '#94a3b8' }}>
                        SLA Kategori: {kategoriNama}<br/>
                        Tingkat keterlambatan: 1.5% (Batas: 10%)
                      </div>
                      {/* Triangle */}
                      <div style={{ 
                        position: 'absolute', top: '100%', left: 36,
                        borderWidth: 6, borderStyle: 'solid', borderColor: '#1e293b transparent transparent transparent' 
                      }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Seller & lokasi */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <MapPin size={10}/> {kota}
            </span>
            <span 
              title="Dana Anda dijamin aman. Pembayaran baru akan diteruskan ke penjual setelah pesanan dikonfirmasi sesuai."
              style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'help' }}
            >
              <Shield size={10} color="var(--brand-blue)"/>
              <span style={{ color: 'var(--brand-blue)' }}>Garansi {holdPeriod} Hari</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
