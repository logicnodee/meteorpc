'use client';
import React, { useState } from 'react';
import type { Metadata } from 'next';
import { sellers, formatRupiah, LEVEL_NAMES } from '@/lib/data';
import Link from 'next/link';
import { Package, ShoppingBag, Wallet, Star, TrendingUp, Clock, ChevronRight, Plus, Shield, Award, AlertCircle, MessageCircle, XCircle, Bell, Settings, Zap, ArrowRight, Activity, Users } from 'lucide-react';

const areaData = [
  { label: '18', fullDate: '18 Mei', value: 30000, display: 'Rp 30.000', x: 0, y: 188 },
  { label: '19', fullDate: '19 Mei', value: 48000, display: 'Rp 48.000', x: 100, y: 180.8 },
  { label: '20', fullDate: '20 Mei', value: 133000, display: 'Rp 133.000', x: 200, y: 146.8 },
  { label: '21', fullDate: 'Kamis, 21 Mei', value: 496810, display: 'Rp 496.810', x: 300, y: 1.3 },
  { label: '22', fullDate: '22 Mei', value: 233000, display: 'Rp 233.000', x: 400, y: 106.8 },
  { label: '23', fullDate: '23 Mei', value: 95000, display: 'Rp 95.000', x: 500, y: 162 },
  { label: '24', fullDate: '24 Mei', value: 20000, display: 'Rp 20.000', x: 600, y: 192 },
];

export default function SellerOverviewPage() {
  const seller = sellers[0];
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  return (
    <div style={{ maxWidth: 1200 }}>
      {/* Content wrapper removed header */}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Aktifitas Penting */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Aktifitas Penting</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Hal-hal yang penting untuk kamu cek terkait tokomu. Data diambil dari 7 hari terakhir.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <Link href="/dashboard/seller/pesanan" className="card hover-effect" style={{ padding: '12px 16px', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Perlu Diproses</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Package size={16} color="var(--brand-blue)"/>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>12</span>
                </div>
              </Link>
              <Link href="/dashboard/seller/pesanan" className="card hover-effect" style={{ padding: '12px 16px', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Menunggu Konfirmasi</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={16} color="#f59e0b"/>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>164</span>
                </div>
              </Link>
              <Link href="/dashboard/seller/komplain" className="card hover-effect" style={{ padding: '12px 16px', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Kendala Pesanan</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={16} color="var(--color-danger)"/>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-danger)' }}>1</span>
                </div>
              </Link>
              <Link href="/dashboard/seller/pesanan" className="card hover-effect" style={{ padding: '12px 16px', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Sedang Dibatalkan</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <XCircle size={16} color="#64748b"/>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>0</span>
                </div>
              </Link>
              <Link href="/dashboard/seller/produk" className="card hover-effect" style={{ padding: '12px 16px', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Stok Habis</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Package size={16} color="var(--color-warning)"/>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>7</span>
                </div>
              </Link>
              <Link href="/dashboard/seller/pesan" className="card hover-effect" style={{ padding: '12px 16px', textDecoration: 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Diskusi / Chat</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MessageCircle size={16} color="var(--brand-blue)"/>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>2</span>
                </div>
              </Link>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />

          {/* Keuangan Toko */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Keuangan Toko</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="card" style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Transaksi Berjalan</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ padding: 6, background: '#fffbeb', borderRadius: 6 }}><Clock size={16} color="#f59e0b"/></div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{formatRupiah(514794)}</div>
                </div>
              </div>
              <div className="card" style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Saldo Toko</div>
                  <a href="#" style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-blue)', textDecoration: 'none' }}>Detail</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ padding: 6, background: '#f0fdf4', borderRadius: 6 }}><Wallet size={16} color="#16a34a"/></div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{formatRupiah(3762495)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performa Toko */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 2 }}>Performa Toko</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Statistik Toko (Data dari 30 hari terakhir)</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px dashed var(--border-color)', paddingBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Jumlah Pembeli</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 18, fontWeight: 800 }}>
                  <Users size={16} color="var(--brand-blue)" /> 1.396
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Pesanan Selesai</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 18, fontWeight: 800 }}>
                  <CheckCircleMock color="#16a34a" /> 1.624
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Pesanan dibatalkan</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 18, fontWeight: 800 }}>
                  <XCircle size={16} color="#dc2626" /> 5
                </div>
              </div>
            </div>

            {/* Pendapatan Chart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>Pendapatan</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Data dari 7 hari terakhir</p>
              </div>
              <a href="#" style={{ color: 'var(--brand-blue)', fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>Lihat Selengkapnya</a>
            </div>
            
            <div style={{ display: 'flex', position: 'relative', height: 200 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: 8, color: 'var(--text-secondary)', fontSize: 11, height: 160, flexShrink: 0, textAlign: 'right' }}>
                <span>497 rb -</span>
                <span>233 rb -</span>
                <span>133 rb -</span>
                <span>48 rb -</span>
              </div>
              <div style={{ flex: 1, position: 'relative', height: 180 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px dashed #cbd5e1' }}></div>
                <div style={{ position: 'absolute', top: 53, left: 0, right: 0, borderTop: '1px dashed #cbd5e1' }}></div>
                <div style={{ position: 'absolute', top: 106, left: 0, right: 0, borderTop: '1px dashed #cbd5e1' }}></div>
                <div style={{ position: 'absolute', top: 160, left: 0, right: 0, borderTop: '1px solid var(--border-color)' }}></div>
                
                {[0, 100, 200, 300, 400, 500, 600].map(x => (
                  <div key={x} style={{ position: 'absolute', top: 0, bottom: 20, left: `${(x/600)*100}%`, borderLeft: '1px dashed #cbd5e1' }}></div>
                ))}

                <svg viewBox="0 0 600 160" style={{ width: '100%', height: 160, position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={`M 0,150 L 100,144.6 L 200,117.4 L 300,1.04 L 400,85.4 L 500,129.6 L 600,153.6 L 600,160 L 0,160 Z`} fill="url(#areaGradient)" />
                  <path d={`M 0,150 L 100,144.6 L 200,117.4 L 300,1.04 L 400,85.4 L 500,129.6 L 600,153.6`} fill="none" stroke="var(--brand-blue)" strokeWidth="2" />
                  
                  {hoveredPoint && (
                    <line x1={hoveredPoint.x} y1="0" x2={hoveredPoint.x} y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
                  )}

                  {areaData.map((pt, i) => (
                    <circle 
                      key={i} cx={pt.x} cy={pt.y * 0.8} r="4" 
                      fill={hoveredPoint?.x === pt.x ? "var(--brand-blue)" : "#fff"} 
                      stroke="var(--brand-blue)" strokeWidth="2"
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={() => setHoveredPoint(pt)}
                    />
                  ))}
                </svg>

                {hoveredPoint && (
                  <div style={{ 
                    position: 'absolute', left: `${(hoveredPoint.x / 600) * 100}%`, top: (hoveredPoint.y * 0.8) + 10,
                    transform: hoveredPoint.x > 300 ? 'translateX(-100%)' : 'translateX(10px)',
                    background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    padding: '8px 12px', borderRadius: 4, zIndex: 10, minWidth: 160
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 4 }}>{hoveredPoint.fullDate}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-blue)' }}>Pendapatan Bersih : {hoveredPoint.display}</div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: -20, left: 0, right: 0, color: 'var(--text-secondary)', fontSize: 11 }}>
                  {areaData.map(d => <span key={d.label}>{d.label}</span>)}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 11, marginTop: 8 }}>
              18 Mei - 24 Mei
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Sidebar Elements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Performa Pengiriman */}
          <div className="card" style={{ padding: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Performa Pengiriman</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 12, color: '#f59e0b' }}>
                    <Zap size={14}/> JAMINAN KIRIM 1 HARI
                  </div>
                  <span style={{ fontSize: 9, background: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: 12, fontWeight: 700 }}>Tercapai</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.4 }}>Pesanan dikirim ke ekspedisi maks 1x24 jam.<br/>SLA Kategori: Sparepart Laptop<br/>Tingkat keterlambatan: 1.5% (Batas: 10%)</p>
                <a href="#" style={{ fontSize: 11, color: 'var(--brand-blue)', fontWeight: 700, textDecoration: 'none' }}>Pelajari SLA Kategori</a>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 12, color: '#10b981' }}>
                    <Package size={14}/> PENGIRIMAN NORMAL
                  </div>
                  <span style={{ fontSize: 9, background: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: 12, fontWeight: 700 }}>Aktif</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.4 }}>Batas pengiriman maksimal 3 hari kerja.<br/>Rata-rata kirim tokomu: 1.2 Hari<br/>Batal otomatis sistem: 0.00%</p>
                <a href="#" style={{ fontSize: 11, color: 'var(--brand-blue)', fontWeight: 700, textDecoration: 'none' }}>Lihat Detail Performa</a>
              </div>
            </div>
          </div>

          {/* Pengumuman */}
          <div className="card" style={{ padding: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Pengumuman</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Informasi Penting: Pemeliharaan Sistem</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>23 May 2026 11:35</div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Perihal Kategori Laptop Bekas</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>21 May 2026 13:59</div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Selamat, Toko Kamu Naik Level</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>16 May 2026 00:01</div>
              </div>
            </div>
            <a href="#" style={{ display: 'block', textAlign: 'right', fontSize: 11, color: 'var(--brand-blue)', fontWeight: 700, marginTop: 12, textDecoration: 'none' }}>Lihat Selengkapnya (3)</a>
          </div>

          {/* Artikel Edukasi */}
          <div className="card" style={{ padding: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Artikel Edukasi Penjual</h2>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>Temukan artikel-artikel edukatif untuk membantu kamu berjualan.</p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 6, fontSize: 12 }}>
              <Bell size={14}/> Mulai Membaca
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Simple mockup for CheckCircle icon with solid style
function CheckCircleMock({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12C21.9988 14.1564 21.3001 16.2547 20.0093 17.9818C18.7185 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01L9 11.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
