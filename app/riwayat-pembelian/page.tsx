'use client';
import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, CalendarDays, ChevronDown, Zap, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { formatRupiah } from '@/lib/data';

// Dummy Order Data
const dummyOrders = [
  {
    id: 'ORD-001',
    status: 'Selesai',
    isReviewed: false,
    date: '1 Mei 2026 pukul 18:51',
    products: [
      {
        id: 'P-01',
        name: 'RAM DDR4 8GB 3200MHz Kingston',
        image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
        qty: 1,
        price: 185000,
        badges: ['Pengiriman Instan', 'Garansi 3 Hari']
      },
      {
        id: 'P-02',
        name: 'SSD NVMe 256GB Samsung 980',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
        qty: 1,
        price: 425000,
        badges: []
      }
    ],
    totalPrice: 185000 + 425000 + 15000 + 3700, // + shipping + fee
    paymentMethod: 'BCA Virtual Account'
  },
  {
    id: 'ORD-002',
    status: 'Menunggu Dikirim',
    isReviewed: false,
    date: '24 Mei 2026 pukul 10:20',
    products: [
      {
        id: 'P-03',
        name: 'SSD NVMe 256GB Samsung 980',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
        qty: 2,
        price: 425000,
        badges: ['Anti Hackback']
      }
    ],
    totalPrice: 850000 + 14000 + 17000,
    paymentMethod: 'GoPay'
  },
  {
    id: 'ORD-003',
    status: 'Sudah Terkirim',
    isReviewed: false,
    date: '20 Mei 2026 pukul 14:15',
    products: [
      {
        id: 'P-04',
        name: 'Laptop Gaming ASUS ROG Strix G15 RTX 3060',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80',
        qty: 1,
        price: 12500000,
        badges: ['Garansi 7 Hari']
      }
    ],
    totalPrice: 12500000 + 35000 + 250000,
    paymentMethod: 'Mandiri Virtual Account'
  },
  {
    id: 'ORD-004',
    status: 'Selesai',
    isReviewed: true,
    date: '24 Maret 2026 pukul 13:30',
    products: [
      {
        id: 'P-05',
        name: 'Baterai Laptop Asus VivoBook A412',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80',
        qty: 1,
        price: 185000,
        badges: []
      }
    ],
    totalPrice: 185000 + 15000 + 3700,
    paymentMethod: 'OVO'
  }
];

const tabs = [
  'Semua',
  'Menunggu Pembayaran',
  'Menunggu Dikirim',
  'Sudah Terkirim',
  'Selesai',
  'Dibatalkan'
];

function RiwayatContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'Semua';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch] = useState('');

  // Update active tab when URL parameter changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const filteredOrders = dummyOrders.filter(order => {
    if (activeTab !== 'Semua' && order.status !== activeTab) return false;
    if (search && !order.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return { bg: '#dcfce7', text: '#16a34a' }; // Green
      case 'Menunggu Dikirim': return { bg: '#fef3c7', text: '#d97706' }; // Yellow
      case 'Sudah Terkirim': return { bg: '#f3e8ff', text: '#9333ea' }; // Purple
      case 'Menunggu Pembayaran': return { bg: '#eff6ff', text: '#3b82f6' }; // Blue
      default: return { bg: '#f1f5f9', text: '#64748b' }; // Gray
    }
  };

  return (
    <main style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh', paddingBottom: 60, boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/akun" style={{ color: 'var(--text-primary)' }}>
              <ArrowLeft size={24} />
            </Link>
            <h1 style={{ fontSize: 18, fontWeight: 700 }}>Riwayat Pembelian</h1>
          </div>
          <CalendarDays size={20} color="var(--text-muted)" />
        </div>

        {/* Tabs */}
        <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 56, zIndex: 90 }}>
          <div style={{ display: 'flex', overflowX: 'auto', padding: '0 16px', gap: 24, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            {tabs.map(tab => (
              <div 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '16px 0', 
                  fontSize: 14, 
                  fontWeight: activeTab === tab ? 800 : 600, 
                  color: activeTab === tab ? 'var(--brand-blue)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '3px solid var(--brand-blue)' : '3px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        {/* Search & Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama produk" 
              style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14 }}
            />
          </div>
          <div>
            <button className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff' }}>
              Semua <ChevronDown size={14} />
            </button>
          </div>
        </div>



        {/* Order List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredOrders.length > 0 ? filteredOrders.map(order => {
            const statusStyle = getStatusColor(order.status);
            return (
              <div key={order.id} className="card" style={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}>
                {/* Header Banner */}
                <div style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, padding: '12px 16px', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
                  {order.status}
                </div>
                
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                    {order.date}
                  </div>
                  
                  {/* Product Info */}
                  {order.products.map(product => (
                    <div key={product.id} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                      <div style={{ width: 64, height: 64, borderRadius: 8, background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{product.qty} x {product.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          {product.badges.map((badge, idx) => (
                            <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                              {badge.includes('Instan') ? <Zap size={10} /> : <ShieldCheck size={10} />} {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '12px 0', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Metode Pembayaran</div>
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{order.paymentMethod}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Total Pembelian</div>
                      <div style={{ fontWeight: 800, color: 'var(--brand-orange)', fontSize: 15 }}>{formatRupiah(order.totalPrice)}</div>
                    </div>
                    {order.status === 'Selesai' ? (
                      order.isReviewed ? (
                        <button className="btn btn-outline" style={{ color: 'var(--brand-orange)', borderColor: 'var(--brand-orange)', padding: '8px 16px', fontWeight: 700, fontSize: 13 }}>
                          Beli Lagi
                        </button>
                      ) : (
                        <Link href={`/riwayat-pembelian/beri-ulasan/${order.id}`} className="btn btn-outline" style={{ color: 'var(--brand-orange)', borderColor: 'var(--brand-orange)', padding: '8px 16px', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                          Beri Ulasan
                        </Link>
                      )
                    ) : (
                      <button className="btn btn-outline" style={{ color: 'var(--brand-orange)', borderColor: 'var(--brand-orange)', padding: '8px 16px', fontWeight: 700, fontSize: 13 }}>
                        Lihat Detail
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Tidak ada pesanan yang sesuai.
            </div>
          )}
        </div>
        </div>
      </div>
    </main>
  );
}

export default function RiwayatPembelianPage() {
  return (
    <>
      <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}>
        <RiwayatContent />
      </Suspense>
    </>
  );
}
