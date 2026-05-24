'use client';
import React, { useState, useMemo } from 'react';
import { Filter, PackageSearch } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

type Product = any; // using any for dummy data

export default function CategoryFilterClient({ initialProducts }: { initialProducts: Product[] }) {
  const [kondisi, setKondisi] = useState('Semua');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [lokasiFilters, setLokasiFilters] = useState<string[]>(['Semua Kota']);
  const [sortBy, setSortBy] = useState('Produk Terpopuler');

  const handlePriceChange = (setter: any, value: string) => {
    const digits = value.replace(/\D/g, '');
    setter(digits);
  };
  
  const formatInputPrice = (val: string) => {
    if (!val) return '';
    return 'Rp ' + parseInt(val).toLocaleString('id-ID');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by kondisi
    if (kondisi !== 'Semua') {
      result = result.filter(p => p.kondisi === kondisi);
    }

    // Filter by price
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;
    if (min > 0 || max < Infinity) {
      result = result.filter(p => p.harga >= min && p.harga <= max);
    }

    // Filter by lokasi
    if (!lokasiFilters.includes('Semua Kota') && lokasiFilters.length > 0) {
      result = result.filter(p => lokasiFilters.includes(p.kota));
    }

    // Sort
    switch (sortBy) {
      case 'Harga: Rendah ke Tinggi':
        result.sort((a, b) => a.harga - b.harga);
        break;
      case 'Harga: Tinggi ke Rendah':
        result.sort((a, b) => b.harga - a.harga);
        break;
      case 'Terlaris':
        result.sort((a, b) => b.terjual - a.terjual);
        break;
      case 'Terbaru':
        // using id string comparison as proxy for newest since we don't have date
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'Produk Terpopuler':
      default:
        // sort by ulasanCount and rating
        result.sort((a, b) => (b.ulasanCount * b.rating) - (a.ulasanCount * a.rating));
        break;
    }

    return result;
  }, [initialProducts, kondisi, minPrice, maxPrice, lokasiFilters, sortBy]);

  const toggleLokasi = (k: string) => {
    if (k === 'Semua Kota') {
      setLokasiFilters(['Semua Kota']);
      return;
    }

    setLokasiFilters(prev => {
      let next = prev.filter(item => item !== 'Semua Kota');
      if (next.includes(k)) {
        next = next.filter(item => item !== k);
      } else {
        next = [...next, k];
      }
      if (next.length === 0) return ['Semua Kota'];
      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
      {/* Sidebar filter */}
      <aside>
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={14}/> Filter
          </h3>
          {/* Kondisi */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Kondisi</p>
            {['Semua', 'Baru', 'Second'].map(k => (
              <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 6 }}>
                <input 
                  type="radio" 
                  name="kondisi" 
                  checked={kondisi === k}
                  onChange={() => setKondisi(k)}
                  style={{ accentColor: 'var(--brand-cyan)' }}
                /> {k}
              </label>
            ))}
          </div>
          <div className="divider"/>
          {/* Harga */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Rentang Harga</p>
            <div style={{ display: 'grid', gap: 8 }}>
              <input 
                className="input" 
                type="text"
                placeholder="Harga minimum" 
                value={formatInputPrice(minPrice)}
                onChange={e => handlePriceChange(setMinPrice, e.target.value)}
                style={{ fontSize: 13, fontWeight: 600 }}
              />
              <input 
                className="input" 
                type="text"
                placeholder="Harga maksimum" 
                value={formatInputPrice(maxPrice)}
                onChange={e => handlePriceChange(setMaxPrice, e.target.value)}
                style={{ fontSize: 13, fontWeight: 600 }}
              />
            </div>
          </div>
          <div className="divider"/>
          {/* Lokasi */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Lokasi</p>
            {['Semua Kota', 'Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta'].map(k => (
              <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 6 }}>
                <input 
                  type="checkbox" 
                  checked={lokasiFilters.includes(k)}
                  onChange={() => toggleLokasi(k)}
                  style={{ accentColor: 'var(--brand-cyan)' }}
                /> {k}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Product grid */}
      <div>
        {/* Sort bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Menampilkan {filteredAndSortedProducts.length} produk</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Urutkan:</span>
            <select 
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ 
                padding: '8px 16px', 
                paddingRight: 36,
                fontSize: 13, 
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer', 
                background: '#fff', 
                border: '1px solid var(--border-color)', 
                borderRadius: 8,
                outline: 'none',
                appearance: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option>Produk Terpopuler</option>
              <option>Harga: Rendah ke Tinggi</option>
              <option>Harga: Tinggi ke Rendah</option>
              <option>Terbaru</option>
              <option>Terlaris</option>
            </select>
          </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
            {filteredAndSortedProducts.map(p => <ProductCard key={p.id} {...p}/>)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#94a3b8' }}>
              <PackageSearch size={64} strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Belum ada produk di kategori ini</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Coba ubah filter pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
