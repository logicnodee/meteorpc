'use client';
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const reasonsConfig = {
  1: {
    title: 'Kamu tidak puas karena apa?',
    chips: ['Penjual tidak ramah', 'Respon penjual sangat lama', 'Produk bermasalah', 'Pengiriman sangat lama']
  },
  2: {
    title: 'Kamu tidak puas karena apa?',
    chips: ['Penjual tidak ramah', 'Respon penjual sangat lama', 'Produk bermasalah', 'Pengiriman sangat lama']
  },
  3: {
    title: 'Apa yang perlu ditingkatkan?',
    chips: ['Produk kurang sesuai', 'Respon perlu ditingkatkan', 'Pengiriman lama']
  },
  4: {
    title: 'Apa yang perlu ditingkatkan?',
    chips: ['Respon perlu ditingkatkan', 'Produk kurang sesuai', 'Pengiriman cepat']
  },
  5: {
    title: 'Apa yang buat kamu puas?',
    chips: ['Pengiriman sangat cepat', 'Penjual ramah', 'Respon penjual cepat', 'Produk Sesuai']
  }
};

const dummyProducts = [
  {
    id: 'P-01',
    name: 'RAM DDR4 8GB 3200MHz Kingston',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=100&q=80',
    store: 'MeteorPC Official',
    qty: 1
  },
  {
    id: 'P-02',
    name: 'SSD NVMe 256GB Samsung 980',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=100&q=80',
    store: 'MeteorPC Official',
    qty: 1
  }
];

export default function BeriUlasanPage() {
  const router = useRouter();
  
  // State maps productId -> value
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [hoveredRatings, setHoveredRatings] = useState<Record<string, number>>({});
  const [selectedChips, setSelectedChips] = useState<Record<string, string[]>>({});
  const [reviewTexts, setReviewTexts] = useState<Record<string, string>>({});
  
  const maxChars = 140;

  const handleStarClick = (productId: string, num: number) => {
    if (ratings[productId] !== num) {
      setRatings(prev => ({ ...prev, [productId]: num }));
      setSelectedChips(prev => ({ ...prev, [productId]: [] })); // reset chips
    }
  };

  const toggleChip = (productId: string, chip: string) => {
    const current = selectedChips[productId] || [];
    if (current.includes(chip)) {
      setSelectedChips(prev => ({ ...prev, [productId]: current.filter(c => c !== chip) }));
    } else {
      setSelectedChips(prev => ({ ...prev, [productId]: [...current, chip] }));
    }
  };

  // Valid if ALL products have rating > 0 and at least 1 chip selected
  const isFormValid = dummyProducts.every(p => {
    const r = ratings[p.id] || 0;
    const c = selectedChips[p.id] || [];
    return r > 0 && c.length > 0;
  });

  return (
    <main style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#f4f4f4', minHeight: '100vh', paddingBottom: 100, position: 'relative' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '16px', textAlign: 'center', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 90, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>Beri Ulasan</h1>
        </div>

        {/* Map Over Products */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {dummyProducts.map((product) => {
            const currentRating = ratings[product.id] || 0;
            const currentHover = hoveredRatings[product.id] || 0;
            const chips = selectedChips[product.id] || [];
            const text = reviewTexts[product.id] || '';
            const currentConfig = currentRating > 0 ? reasonsConfig[currentRating as keyof typeof reasonsConfig] : null;

            return (
              <div key={product.id} className="card" style={{ padding: 0, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                {/* Product Snippet */}
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-color)', backgroundColor: '#fafafa' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={product.image} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{product.qty} x {product.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{product.store}</div>
                  </div>
                </div>

                {/* Rating Section */}
                <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                  <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 16 }}>Berapa rating untuk pesanan ini?</h2>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: currentConfig ? 24 : 8 }}>
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isFilled = (currentHover || currentRating) >= num;
                      return (
                        <Star 
                          key={num} 
                          size={32} 
                          fill={isFilled ? '#fbbf24' : 'transparent'} 
                          color={isFilled ? '#fbbf24' : '#e5e7eb'} 
                          style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={() => setHoveredRatings(prev => ({...prev, [product.id]: num}))}
                          onMouseLeave={() => setHoveredRatings(prev => ({...prev, [product.id]: 0}))}
                          onClick={() => handleStarClick(product.id, num)}
                        />
                      );
                    })}
                  </div>

                  {/* Conditional Feedback Section */}
                  {currentConfig && (
                    <div style={{ textAlign: 'left', animation: 'fadeIn 0.3s ease-in-out' }}>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 700 }}>{currentConfig.title}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                        {currentConfig.chips.map(chip => {
                          const isSelected = chips.includes(chip);
                          return (
                            <div 
                              key={chip} 
                              onClick={() => toggleChip(product.id, chip)}
                              style={{ 
                                padding: '8px 16px', 
                                borderRadius: 20, 
                                border: `1px solid ${isSelected ? 'var(--brand-blue)' : '#e5e7eb'}`,
                                backgroundColor: isSelected ? '#eff6ff' : '#fff',
                                color: isSelected ? 'var(--brand-blue)' : 'var(--text-secondary)',
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {chip}
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 24 }}>Kamu harus pilih minimal 1 alasan.</div>

                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 700 }}>Bagaimana supaya lebih baik lagi?</div>
                      <textarea
                        value={text}
                        onChange={(e) => {
                          if (e.target.value.length <= maxChars) {
                            setReviewTexts(prev => ({...prev, [product.id]: e.target.value}));
                          }
                        }}
                        placeholder="Ceritakan pengalamanmu tentang pesanan ini"
                        style={{ 
                          width: '100%', 
                          height: 80, 
                          padding: 12, 
                          borderRadius: 8, 
                          border: '1px solid #e5e7eb',
                          resize: 'none',
                          fontSize: 13,
                          marginBottom: 8,
                          outline: 'none'
                        }}
                      />
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>{text.length} dari {maxChars} karakter</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Button */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, padding: 16, backgroundColor: '#fff', borderTop: '1px solid var(--border-color)', zIndex: 100 }}>
          <button 
            className="btn"
            disabled={!isFormValid}
            onClick={() => {
              if (isFormValid) {
                alert('Ulasan untuk kedua produk berhasil dikirim!');
                router.push('/riwayat-pembelian');
              }
            }}
            style={{ 
              width: '100%', 
              padding: 14, 
              backgroundColor: isFormValid ? 'var(--text-primary)' : '#9ca3af',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
          >
            Kirim Ulasan
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
