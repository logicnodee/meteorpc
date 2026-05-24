'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShoppingCart, Trash2, ShieldCheck, ChevronRight, Plus, Minus } from 'lucide-react';
import { formatRupiah } from '@/lib/data';

type CartItem = {
  id: string;
  toko: string;
  nama: string;
  kondisi: string;
  harga: number;
  qty: number;
  checked: boolean;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 'p1',
    toko: 'TechStore Indonesia',
    nama: 'RAM DDR4 16GB 2666MHz Corsair Vengeance',
    kondisi: 'Baru',
    harga: 340000,
    qty: 1,
    checked: true,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p2',
    toko: 'Raja Sparepart',
    nama: 'Keyboard Lenovo Thinkpad T480 Original Cabutan',
    kondisi: 'Second/Bekas',
    harga: 250000,
    qty: 1,
    checked: true,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
  }
];

export default function KeranjangPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  // Group by toko
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.toko]) acc[item.toko] = [];
    acc[item.toko].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const handleStoreCheck = (toko: string, checked: boolean) => {
    setItems(items.map(item => item.toko === toko ? { ...item, checked } : item));
  };

  const handleProductCheck = (id: string, checked: boolean) => {
    setItems(items.map(item => item.id === id ? { ...item, checked } : item));
  };

  const handleQtyChange = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calculate totals
  const checkedItems = items.filter(i => i.checked);
  const totalBarang = checkedItems.reduce((sum, item) => sum + item.qty, 0);
  const totalHarga = checkedItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  const totalFee = totalHarga * 0.02; // 2% fee
  const totalTagihan = totalHarga + totalFee;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px', minHeight: 'calc(100vh - 300px)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShoppingCart size={24} color="var(--brand-blue)" /> Keranjang Belanja
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
          {/* Daftar Item Keranjang */}
          <div style={{ display: 'grid', gap: 16 }}>
            {Object.entries(groupedItems).map(([toko, tokoItems]) => {
              const isAllChecked = tokoItems.every(i => i.checked);
              return (
                <div key={toko} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
                    <input 
                      type="checkbox" 
                      checked={isAllChecked} 
                      onChange={(e) => handleStoreCheck(toko, e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)' }} 
                    />
                    <span>{toko}</span>
                    {toko === 'TechStore Indonesia' && <ShieldCheck size={16} color="var(--brand-blue)" />}
                  </div>
                  
                  {tokoItems.map(item => (
                    <div key={item.id} style={{ padding: '20px', display: 'flex', gap: 16, borderBottom: '1px solid var(--border-color)' }}>
                      <input 
                        type="checkbox" 
                        checked={item.checked} 
                        onChange={(e) => handleProductCheck(item.id, e.target.checked)}
                        style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)', marginTop: 32 }} 
                      />
                      <div style={{ width: 80, height: 80, borderRadius: 8, background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={item.image} alt={item.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.nama}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Kondisi: {item.kondisi}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand-cyan)' }}>{formatRupiah(item.harga)}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--text-muted)' }}><Trash2 size={16}/></button>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                          <button onClick={() => handleQtyChange(item.id, -1)} className="btn btn-ghost btn-sm" style={{ padding: '6px 10px' }}><Minus size={14}/></button>
                          <span style={{ fontSize: 14, fontWeight: 600, width: 30, textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => handleQtyChange(item.id, 1)} className="btn btn-ghost btn-sm" style={{ padding: '6px 10px', color: 'var(--brand-blue)' }}><Plus size={14}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            
            {items.length === 0 && (
              <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                Keranjang Anda kosong.
              </div>
            )}
          </div>

          {/* Ringkasan Belanja */}
          <div className="card" style={{ padding: 24, position: 'sticky', top: 88 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Ringkasan Belanja</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Harga ({totalBarang} barang)</span>
              <span>{formatRupiah(totalHarga)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Fee Platform (2%)</span>
              <span>{formatRupiah(totalFee)}</span>
            </div>
            
            <div style={{ height: 1, background: 'var(--border-color)', marginBottom: 16 }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 16, fontWeight: 800 }}>
              <span>Total Tagihan</span>
              <span style={{ color: 'var(--brand-cyan)' }}>{formatRupiah(totalTagihan)}</span>
            </div>

            <Link href="/checkout" className={`btn btn-primary ${totalBarang === 0 ? 'disabled' : ''}`} style={{ width: '100%', padding: '14px', fontSize: 15, justifyContent: 'center', pointerEvents: totalBarang === 0 ? 'none' : 'auto', opacity: totalBarang === 0 ? 0.5 : 1 }}>
              Beli ({totalBarang})
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '12px', background: 'rgba(0,200,150,0.08)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <span>Belanja aman! Dana Anda baru diteruskan ke penjual setelah barang diterima & sesuai.</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
