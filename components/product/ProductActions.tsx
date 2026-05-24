'use client';

import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
  tokoTutup: boolean;
  imageSrc: string;
  stok?: number;
  productId: string;
}

export default function ProductActions({ tokoTutup, imageSrc, stok = 99, productId }: ProductActionsProps) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [flyImages, setFlyImages] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (tokoTutup) return;

    // Get button position
    const btnRect = e.currentTarget.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;

    const newId = Date.now();
    setFlyImages(prev => [...prev, { id: newId, x: startX, y: startY }]);

    // Emit event to update cart counter
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { qty } }));
    setAdded(true);

    // Remove flying image after animation finishes (1s)
    setTimeout(() => {
      setFlyImages(prev => prev.filter(img => img.id !== newId));
      setTimeout(() => setAdded(false), 2000); // reset button text after 2s
    }, 1000);
  };

  return (
    <>
      <div style={{ display: 'grid', gap: 10 }}>
        {tokoTutup ? (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px', textAlign: 'center', fontSize: 13, color: 'var(--color-danger)' }}>
            🔴 Toko sedang tutup. Tidak bisa melakukan pembelian.
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Atur Jumlah</span>
              {stok > 0 && stok <= 5 && <span style={{ fontSize: 12, color: 'var(--color-danger)' }}>Sisa {stok}!</span>}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', height: 40 }}>
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  style={{ width: 40, height: '100%', background: qty <= 1 ? 'var(--bg-secondary)' : '#fff', border: 'none', cursor: qty <= 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: qty <= 1 ? 'var(--text-muted)' : 'var(--text-primary)' }}
                >
                  <Minus size={16} />
                </button>
                <div style={{ width: 48, textAlign: 'center', fontSize: 14, fontWeight: 600, borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  {qty}
                </div>
                <button 
                  onClick={() => setQty(Math.min(stok, qty + 1))}
                  disabled={qty >= stok}
                  style={{ width: 40, height: '100%', background: qty >= stok ? 'var(--bg-secondary)' : '#fff', border: 'none', cursor: qty >= stok ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: qty >= stok ? 'var(--text-muted)' : 'var(--text-primary)' }}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Beli {qty} {qty >= 5 && <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>(Harga Grosir)</span>}
              </div>
            </div>

            <button onClick={() => router.push(`/checkout?buyNow=true&id=${productId}&qty=${qty}`)} className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              <ShoppingCart size={16}/> Beli Sekarang
            </button>
            <button 
              className="btn btn-orange" 
              style={{ width: '100%', transition: 'all 0.3s', background: added ? 'var(--color-success)' : 'var(--brand-orange)', color: '#fff' }}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16}/> {added ? '✓ Berhasil Ditambahkan' : 'Tambah ke Keranjang'}
            </button>
          </>
        )}
        <button className="btn btn-outline" style={{ width: '100%' }}>
          <MessageCircle size={16}/> Chat Seller
        </button>
      </div>

      {/* Flying animations */}
      {flyImages.map(img => (
        <img
          key={img.id}
          src={imageSrc}
          alt="flying"
          className="flying-cart-item"
          style={{
            position: 'fixed',
            zIndex: 9999,
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            left: img.x - 20,
            top: img.y - 20,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}
