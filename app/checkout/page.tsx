'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Truck, CreditCard, ShieldCheck, CheckCircle2, AlertCircle, Building2, Smartphone, Store, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { formatRupiah, produk, getSellerById } from '@/lib/data';

// Dummy checkout data (used if not Buy Now)
const defaultCheckoutItems = [
  { id: 'p1', toko: 'TechStore Indonesia', nama: 'RAM DDR4 16GB 2666MHz Corsair Vengeance', harga: 340000, qty: 1, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80' },
  { id: 'p2', toko: 'Raja Sparepart', nama: 'Keyboard Lenovo Thinkpad T480 Original Cabutan', harga: 250000, qty: 1, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80' }
];

const initialAddresses = [
  { id: 'a1', label: 'Rumah', name: 'Budi Santoso', phone: '081234567890', address: 'Jl. Merdeka No. 123, RT 01/RW 02, Kec. Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12110', isUtama: true },
  { id: 'a2', label: 'Kantor', name: 'Budi Santoso', phone: '081234567890', address: 'Gedung Cyber Lt. 5, Jl. Kuningan Barat, Mampang Prapatan, Jakarta Selatan, DKI Jakarta 12710', isUtama: false }
];

const shippingOptions = [
  { id: 's1', name: 'JNE Reguler', etd: '2-3 hari', price: 15000 },
  { id: 's2', name: 'J&T Express', etd: '2-3 hari', price: 14000 },
  { id: 's3', name: 'SiCepat BEST', etd: '1 hari', price: 22000 },
  { id: 's4', name: 'GoSend Instant', etd: 'Hari ini (2-3 jam)', price: 35000 },
];

const paymentMethods = [
  { id: 'p1', group: 'Virtual Account', options: [{ id: 'bca', name: 'BCA Virtual Account', icon: <Building2 size={24} color="var(--brand-blue)" /> }, { id: 'mandiri', name: 'Mandiri Virtual Account', icon: <Building2 size={24} color="var(--brand-orange)" /> }] },
  { id: 'p2', group: 'E-Wallet', options: [{ id: 'gopay', name: 'GoPay', icon: <Smartphone size={24} color="#00a5cf" /> }, { id: 'ovo', name: 'OVO', icon: <Smartphone size={24} color="#4c2a86" /> }] },
  { id: 'p3', group: 'Minimarket', options: [{ id: 'indomaret', name: 'Indomaret', icon: <Store size={24} color="#00529c" /> }, { id: 'alfamart', name: 'Alfamart', icon: <Store size={24} color="#ed1c24" /> }] },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const buyNow = searchParams.get('buyNow') === 'true';
  const productId = searchParams.get('id');
  const qtyParam = Number(searchParams.get('qty')) || 1;

  const [currentCheckoutItems, setCurrentCheckoutItems] = useState(() => {
    let initial = defaultCheckoutItems.map(item => ({...item, stok: 99}));
    if (buyNow && productId) {
      const p = produk.find(x => x.id === productId);
      if (p) {
        const seller = getSellerById(p.sellerId);
        initial = [
          {
            id: p.id,
            toko: seller ? seller.namaToko : 'Toko',
            nama: p.nama,
            harga: p.harga,
            qty: qtyParam,
            stok: p.stok,
            image: p.gambar[0].startsWith('http') ? p.gambar[0] : ''
          }
        ];
      }
    }
    return initial;
  });

  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0].id);
  const [selectedShipping, setSelectedShipping] = useState<Record<string, string>>({});
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const groupedItems = currentCheckoutItems.reduce((acc, item) => {
    if (!acc[item.toko]) acc[item.toko] = [];
    acc[item.toko].push(item);
    return acc;
  }, {} as Record<string, typeof currentCheckoutItems>);

  React.useEffect(() => {
    const initialShipping: Record<string, string> = {};
    Object.keys(groupedItems).forEach(toko => {
      if (!selectedShipping[toko]) {
        initialShipping[toko] = shippingOptions[0].id;
      }
    });
    if (Object.keys(initialShipping).length > 0) {
      setSelectedShipping(prev => ({ ...prev, ...initialShipping }));
    }
  }, [currentCheckoutItems]);

  const handleQtyChange = (id: string, newQty: number) => {
    setCurrentCheckoutItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const handleDelete = (id: string) => {
    setCurrentCheckoutItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const totalBarang = currentCheckoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0);
  const feePlatform = totalBarang * 0.02; // 2%
  const shippingCost = Object.values(selectedShipping).reduce((acc, shipId) => {
    return acc + (shippingOptions.find(s => s.id === shipId)?.price || 0);
  }, 0);
  const grandTotal = totalBarang + feePlatform + shippingCost;

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }
    // Simulate payment processing
    setIsSuccess(true);
  };

  const handleAddAddress = () => {
    const newId = `a${addresses.length + 1}`;
    const newAddress = {
      id: newId,
      label: 'Alamat Baru',
      name: 'Budi Santoso',
      phone: '081234567890',
      address: 'Jl. Alamat Simulasi Baru No. 99, RT 05/RW 01, Jakarta',
      isUtama: false
    };
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newId);
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main style={{ maxWidth: 800, margin: '60px auto', padding: '0 16px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '60px 20px', borderTop: '6px solid var(--color-success)' }}>
            <CheckCircle2 size={80} color="var(--color-success)" style={{ margin: '0 auto 24px' }} />
            <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Pesanan Berhasil Dibuat!</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>
              Terima kasih! Pesanan Anda telah kami terima dan dana Anda saat ini kami simpan dengan aman di sistem Escrow MeteorPC. Penjual akan segera memproses pesanan Anda.
            </p>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 24, marginBottom: 32, textAlign: 'left', maxWidth: 400, margin: '0 auto 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Dibayar</span>
                <span style={{ fontWeight: 800 }}>{formatRupiah(grandTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Metode Pembayaran</span>
                <span style={{ fontWeight: 700 }}>{paymentMethods.flatMap(g => g.options).find(o => o.id === selectedPayment)?.name}</span>
              </div>
            </div>
            <Link href="/akun" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: 15 }}>
              Cek Status Pesanan
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (currentCheckoutItems.length === 0) {
    return (
      <>
        <Navbar />
        <main style={{ maxWidth: 800, margin: '60px auto', padding: '0 16px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '60px 20px' }}>
            <ShoppingBag size={80} color="var(--text-muted)" style={{ margin: '0 auto 24px' }} />
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Keranjang Checkout Kosong</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Belum ada barang yang dipilih untuk dicheckout.</p>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 32px' }}>Belanja Sekarang</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px', minHeight: 'calc(100vh - 300px)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Pengiriman & Pembayaran</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
          
          <div style={{ display: 'grid', gap: 20 }}>
            {/* 1. Alamat Pengiriman */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 700 }}>
                  <MapPin size={20} color="var(--brand-blue)" /> Alamat Pengiriman
                </div>
                <button onClick={handleAddAddress} className="btn btn-ghost btn-sm" style={{ color: 'var(--brand-blue)', fontWeight: 600 }}>
                  + Tambah Alamat
                </button>
              </div>
              <div style={{ display: 'grid', gap: 12, maxHeight: 300, overflowY: 'auto', paddingRight: 8, paddingBottom: 4 }}>
                {addresses.map(addr => (
                  <label key={addr.id} style={{ display: 'flex', gap: 16, padding: 16, border: selectedAddress === addr.id ? '2px solid var(--brand-blue)' : '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', background: selectedAddress === addr.id ? 'rgba(59,130,246,0.05)' : 'transparent' }}>
                    <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} style={{ marginTop: 4, width: 18, height: 18, accentColor: 'var(--brand-blue)' }} />
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {addr.name} 
                        <span style={{ fontSize: 11, background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{addr.label}</span>
                        {addr.isUtama && <span style={{ fontSize: 11, background: 'rgba(0,200,150,0.1)', color: 'var(--color-success)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Utama</span>}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{addr.phone}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{addr.address}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Barang & Ekspedisi */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>
                <Truck size={20} color="var(--brand-blue)" /> Barang & Pengiriman
              </div>

              {Object.entries(groupedItems).map(([toko, items], groupIdx) => (
                <div key={toko} style={{ marginBottom: groupIdx === Object.keys(groupedItems).length - 1 ? 0 : 32, paddingBottom: groupIdx === Object.keys(groupedItems).length - 1 ? 0 : 32, borderBottom: groupIdx === Object.keys(groupedItems).length - 1 ? 'none' : '1px dashed var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Store size={18} color="var(--text-muted)" /> {toko}
                  </div>
                  
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
                    {items.map((item, idx) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: idx === items.length - 1 ? 0 : 16, borderBottom: idx === items.length - 1 ? 'none' : '1px solid var(--border-color)', paddingBottom: idx === items.length - 1 ? 0 : 16 }}>
                        <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                          <div style={{ width: 64, height: 64, borderRadius: 8, background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
                            {item.image && <img src={item.image} alt={item.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          </div>
                          <div style={{ fontSize: 14, flex: 1 }}>
                            <div style={{ fontWeight: 600, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.nama}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-blue)' }}>{formatRupiah(item.harga)}</div>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 6, overflow: 'hidden', height: 28 }}>
                                  <button onClick={() => handleQtyChange(item.id, Math.max(1, item.qty - 1))} disabled={item.qty <= 1} style={{ width: 28, height: '100%', background: item.qty <= 1 ? 'var(--bg-secondary)' : '#fff', border: 'none', cursor: item.qty <= 1 ? 'not-allowed' : 'pointer', color: item.qty <= 1 ? 'var(--text-muted)' : 'var(--text-primary)' }}><Minus size={14} /></button>
                                  <div style={{ width: 36, textAlign: 'center', fontSize: 13, fontWeight: 600, borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>{item.qty}</div>
                                  <button onClick={() => handleQtyChange(item.id, Math.min(item.stok || 99, item.qty + 1))} disabled={item.qty >= (item.stok || 99)} style={{ width: 28, height: '100%', background: item.qty >= (item.stok || 99) ? 'var(--bg-secondary)' : '#fff', border: 'none', cursor: item.qty >= (item.stok || 99) ? 'not-allowed' : 'pointer', color: item.qty >= (item.stok || 99) ? 'var(--text-muted)' : 'var(--text-primary)' }}><Plus size={14} /></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, marginLeft: 16 }}>
                          <div style={{ fontWeight: 800 }}>{formatRupiah(item.harga * item.qty)}</div>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)', padding: 4, height: 'auto' }} title="Hapus barang">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Pilih Pengiriman untuk {toko}:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                    {shippingOptions.map(ship => (
                      <label key={ship.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, border: selectedShipping[toko] === ship.id ? '2px solid var(--brand-blue)' : '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', background: selectedShipping[toko] === ship.id ? 'rgba(59,130,246,0.05)' : 'transparent' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <input type="radio" name={`shipping_${toko}`} checked={selectedShipping[toko] === ship.id} onChange={() => setSelectedShipping(prev => ({...prev, [toko]: ship.id}))} style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)' }} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{ship.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est: {ship.etd}</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--brand-blue)', fontSize: 13 }}>{formatRupiah(ship.price)}</div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Metode Pembayaran */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>
                <CreditCard size={20} color="var(--brand-blue)" /> Metode Pembayaran
              </div>
              
              {!selectedPayment && (
                <div style={{ background: 'rgba(239,68,68,0.08)', color: 'var(--color-danger)', padding: '10px 16px', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <AlertCircle size={16} /> Silakan pilih metode pembayaran untuk melanjutkan
                </div>
              )}

              <div style={{ display: 'grid', gap: 20 }}>
                {paymentMethods.map(group => (
                  <div key={group.id}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>{group.group}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                      {group.options.map(opt => (
                        <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: selectedPayment === opt.id ? '2px solid var(--brand-blue)' : '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', background: selectedPayment === opt.id ? 'rgba(59,130,246,0.05)' : 'transparent' }}>
                          <input type="radio" name="payment" checked={selectedPayment === opt.id} onChange={() => setSelectedPayment(opt.id)} style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)' }} />
                          <span style={{ fontSize: 20 }}>{opt.icon}</span>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{opt.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Ringkasan Pembayaran */}
          <div className="card" style={{ padding: 24, position: 'sticky', top: 88 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Ringkasan Pembayaran</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Barang</span>
              <span>{formatRupiah(totalBarang)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Ongkos Kirim</span>
              <span>{formatRupiah(shippingCost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Biaya Proteksi & Fee (2%)</span>
              <span>{formatRupiah(feePlatform)}</span>
            </div>
            
            <div style={{ height: 1, background: 'var(--border-color)', marginBottom: 20 }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Total Tagihan</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--brand-cyan)' }}>{formatRupiah(grandTotal)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={!selectedPayment}
              className={`btn btn-primary ${!selectedPayment ? 'disabled' : ''}`} 
              style={{ width: '100%', padding: '16px', fontSize: 16, justifyContent: 'center', opacity: !selectedPayment ? 0.5 : 1, pointerEvents: !selectedPayment ? 'none' : 'auto' }}
            >
              Bayar Sekarang
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '12px', background: 'rgba(0,200,150,0.08)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <span>Sistem Pembayaran 100% Aman & Dilindungi Escrow MeteorPC.</span>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Memuat checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
