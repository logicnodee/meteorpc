'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronDown, Info, Plus } from 'lucide-react';
import { kategoris, formatRupiah, produk } from '@/lib/data';

export default function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const p = produk.find(x => x.id === unwrappedParams.id);
  
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedSubkategori, setSelectedSubkategori] = useState('');

  // Form states
  const [kondisi, setKondisi] = useState<'baru' | 'bekas'>('baru');
  const [namaProduk, setNamaProduk] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState<number | ''>('');
  const [stok, setStok] = useState<number | ''>('');
  const [minPesanan, setMinPesanan] = useState<number | ''>(1);
  
  // Toggles
  const [hargaGrosir, setHargaGrosir] = useState(false);
  const [garansiInstan, setGaransiInstan] = useState(false);
  const [showSlaTooltip, setShowSlaTooltip] = useState(false);

  // Initialize data
  useEffect(() => {
    if (p) {
      setNamaProduk(p.nama);
      setHarga(p.harga);
      setStok(p.stok);
      setKondisi(p.kondisi.toLowerCase() === 'baru' ? 'baru' : 'bekas');
      setGaransiInstan(p.garansiInstan || false);
      
      // Find parent category
      const parentKat = kategoris.find(k => k.subkategori.some((sub: any) => sub.id === p.kategoriId));
      if (parentKat) {
        setSelectedKategori(parentKat.id);
        setSelectedSubkategori(p.kategoriId);
      }
    }
  }, [p]);

  const activeKat = kategoris.find(k => k.id === selectedKategori);
  const activeSubkat = activeKat?.subkategori.find((s: any) => s.id === selectedSubkategori);
  const catalogItems = activeSubkat?.katalog || [];

  const PLATFORM_FEE = 8;

  if (!p) return <div style={{ padding: 24 }}>Produk tidak ditemukan.</div>;

  return (
    <div style={{ background: '#fff', borderRadius: 8, minHeight: '80vh', padding: '24px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 16, marginBottom: 24 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Edit Dagangan</h1>
      </div>

      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Tipe Dagangan</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Ubah kategori, subkategori, serta kondisi barang yang dijual.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input 
                  type="radio" 
                  checked={kondisi === 'baru'} 
                  onChange={() => setKondisi('baru')}
                  style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)' }} 
                />
                Barang Baru
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input 
                  type="radio" 
                  checked={kondisi === 'bekas'} 
                  onChange={() => setKondisi('bekas')}
                  style={{ width: 16, height: 16, accentColor: 'var(--brand-blue)' }} 
                />
                Barang Bekas (Second)
              </label>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <select 
              value={selectedKategori}
              onChange={(e) => {
                setSelectedKategori(e.target.value);
                setSelectedSubkategori('');
                setNamaProduk('');
              }}
              className="input"
              style={{ width: '100%', padding: '12px 16px', appearance: 'none', background: '#fff', cursor: 'pointer' }}
            >
              <option value="" disabled>Pilih Kategori</option>
              {kategoris.map(k => (
                <option key={k.id} value={k.id}>{k.nama}</option>
              ))}
            </select>
            <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
          </div>

          <div style={{ position: 'relative' }}>
            <select 
              value={selectedSubkategori}
              onChange={(e) => {
                setSelectedSubkategori(e.target.value);
                setNamaProduk('');
              }}
              disabled={!selectedKategori}
              className="input"
              style={{ 
                width: '100%', padding: '12px 16px', appearance: 'none', 
                background: selectedKategori ? '#fff' : '#f8fafc', 
                cursor: selectedKategori ? 'pointer' : 'not-allowed'
              }}
            >
              <option value="" disabled>Pilih Tipe</option>
              {activeKat?.subkategori.map((s: any) => (
                <option key={s.id} value={s.id}>{s.nama}</option>
              ))}
            </select>
            {selectedKategori && <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>}
          </div>
        </div>

        {selectedSubkategori && (
          <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Informasi Produk</h2>
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Pilih Variasi Produk</label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={namaProduk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                  className="input"
                  style={{ width: '100%', padding: '12px 16px', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                >
                  <option value="" disabled>Masukkan nama item yang kamu jual</option>
                  {catalogItems.map((item: string) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                  {/* Fallback to show existing namaProduk if it's not in catalog */}
                  {namaProduk && !catalogItems.includes(namaProduk) && (
                    <option value={namaProduk}>{namaProduk}</option>
                  )}
                </select>
                <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Deskripsi Produk</label>
              <textarea 
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Tulis deskripsi yang jelas dan mudah dimengerti oleh calon pembeli"
                className="input"
                style={{ width: '100%', minHeight: 120, padding: '12px 16px', resize: 'vertical' }}
                maxLength={3000}
              />
            </div>

            <hr style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none', marginBottom: 32 }} />

            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Informasi Stok dan Harga</h2>
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Harga Produk</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '12px 16px', borderRight: '1px solid var(--border-color)', fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>
                  IDR
                </div>
                <input 
                  type="number" 
                  value={harga}
                  onChange={(e) => setHarga(Number(e.target.value) || '')}
                  className="input"
                  style={{ flex: 1, border: 'none', padding: '12px 16px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Stok</label>
              <input 
                type="number" 
                value={stok}
                onChange={(e) => setStok(Number(e.target.value) || '')}
                className="input"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderBottomWidth: 2, borderRadius: 8 }}
              />
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Aktifkan Garansi Pengiriman</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  Jaminan 1 Hari Kirim
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Fitur jaminan ini akan menaikkan eksposur daganganmu.</span>
              </div>
              <div 
                onClick={() => setGaransiInstan(!garansiInstan)}
                style={{ width: 40, height: 24, background: garansiInstan ? 'var(--brand-blue)' : '#cbd5e1', borderRadius: 12, position: 'relative', cursor: 'pointer', transition: '0.2s', flexShrink: 0 }}
              >
                <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: garansiInstan ? 18 : 2, transition: '0.2s' }} />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: 40, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Link href="/dashboard/seller/produk" className="btn btn-ghost" style={{ padding: '12px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                Batal
              </Link>
              <Link href="/dashboard/seller/produk" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                Simpan Perubahan
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
