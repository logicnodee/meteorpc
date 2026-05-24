'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Info, Plus } from 'lucide-react';
import { kategoris, formatRupiah } from '@/lib/data';

// Dummy catalog items removed. We now use data from lib/data.ts

export default function TambahProdukPage() {
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedSubkategori, setSelectedSubkategori] = useState('');

  // Form states
  const [kondisi, setKondisi] = useState<'baru' | 'bekas'>('baru');
  const [namaProduk, setNamaProduk] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState<number | ''>('');
  const [stok, setStok] = useState<number | ''>('');
  const [minPesanan, setMinPesanan] = useState<number | ''>('');
  const [grosirMin, setGrosirMin] = useState<number | ''>('');
  const [grosirHarga, setGrosirHarga] = useState<number | ''>('');
  
  // Toggles
  const [hargaGrosir, setHargaGrosir] = useState(false);
  const [garansiInstan, setGaransiInstan] = useState(false);
  const [showSlaTooltip, setShowSlaTooltip] = useState(false);

  // Get subcategories based on selected category
  const activeKat = kategoris.find(k => k.id === selectedKategori);
  // Let's use 8% explicitly as in the image to mimic itemku "Safe Trading 8%"
  const PLATFORM_FEE = 8;

  // Get active subcategory to access its catalog
  const activeSubkat = activeKat?.subkategori.find(s => s.id === selectedSubkategori);
  const catalogItems = activeSubkat?.katalog || [];

  return (
    <div style={{ background: '#fff', borderRadius: 8, minHeight: '80vh', padding: '24px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 16, marginBottom: 24 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Buat Dagangan</h1>
        <Link href="#" style={{ fontSize: 13, color: 'var(--brand-blue)', textDecoration: 'none', fontWeight: 600 }}>
          Buat banyak dagangan sekaligus
        </Link>
      </div>

      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Tipe Dagangan</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Pilih kategori, subkategori, serta kondisi barang (baru/bekas) yang akan dijual.</p>
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
                setSelectedSubkategori(''); // reset subkategori
                setNamaProduk(''); // reset catalog item
              }}
              className="input"
              style={{ width: '100%', padding: '12px 16px', appearance: 'none', background: '#fff', cursor: 'pointer' }}
            >
              <option value="" disabled>Pilih Kategori</option>
              {kategoris.map(k => (
                <option key={k.id} value={k.id}>
                  {k.nama} {k.perluModerasi && kondisi === 'baru' ? '(perlu moderasi)' : ''}
                </option>
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
              {activeKat?.subkategori.map(s => (
                <option key={s.id} value={s.id}>{s.nama}</option>
              ))}
            </select>
            {selectedKategori && <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>}
          </div>
        </div>

        {/* Product Form - Shows Immediately when subkategori is selected */}
        {selectedSubkategori && (
          <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Informasi Produk</h2>
            
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24 }}>
              <Info size={18} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: '#1e40af', margin: 0 }}>
                Informasi dan kategori produk tidak bisa diubah setelah produk disimpan.
              </p>
            </div>

            {/* Nama Produk / Variasi */}
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
                </select>
                <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                {catalogItems.length === 0 
                  ? "Admin belum menambahkan katalog variasi untuk tipe produk ini." 
                  : "Pilih nama item yang sudah disediakan, agar daganganmu dapat masuk ke dalam katalog."}
              </p>
            </div>

            {/* Upload Gambar */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Gambar Produk</label>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[ 'Gambar Utama', 'Gambar 2', 'Gambar 3' ].map((label, i) => (
                  <div key={i} style={{ 
                    width: 140, height: 140, border: '2px dashed #cbd5e1', borderRadius: 8, 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', background: '#f8fafc', color: 'var(--text-muted)',
                    transition: '0.2s',
                  }}>
                    <div style={{ width: 32, height: 32, background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                      <Plus size={16} color="#64748b" />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                Pastikan ukuran gambar maksimal 2MB dan berformat .JPG / .PNG. Dimensi yang direkomendasikan adalah 600x300 pixels.
              </p>
            </div>

            {/* Deskripsi */}
            <div style={{ marginBottom: 40 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Deskripsi Produk</label>
              <textarea 
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Tulis deskripsi yang jelas dan mudah dimengerti oleh calon pembeli"
                className="input"
                style={{ width: '100%', minHeight: 120, padding: '12px 16px', resize: 'vertical' }}
                maxLength={3000}
              />
              <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                {deskripsi.length} / 3000
              </div>
            </div>

            <hr style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none', marginBottom: 32 }} />

            {/* Stok dan Harga */}
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
                  placeholder="0"
                />
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, background: '#f8fafc', padding: '4px 8px', borderRadius: 4, display: 'inline-block' }}>
                Harga yang disarankan: Rp 1 - Rp 125.000
              </p>

              {/* Dynamic Fee Box */}
              {typeof harga === 'number' && harga > 0 && (
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 16 }}>
                  <Info size={16} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: '#1e40af' }}>
                    <p style={{ margin: '0 0 4px 0' }}>Jumlah harga yang kamu masukkan akan dipotong biaya MeteorPC Safe Trading sebesar <strong>{PLATFORM_FEE}%</strong></p>
                    <p style={{ margin: 0, fontWeight: 600 }}>Pendapatan dagangan dari harga yang kamu masukkan adalah sebesar {formatRupiah(harga - (harga * PLATFORM_FEE / 100))}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Toggles and smaller inputs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: hargaGrosir ? 16 : 24, paddingBottom: 16, borderBottom: hargaGrosir ? 'none' : '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Aktifkan harga grosir</span>
              <div 
                onClick={() => setHargaGrosir(!hargaGrosir)}
                style={{ width: 40, height: 24, background: hargaGrosir ? 'var(--brand-blue)' : '#cbd5e1', borderRadius: 12, position: 'relative', cursor: 'pointer', transition: '0.2s' }}
              >
                <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: hargaGrosir ? 18 : 2, transition: '0.2s' }} />
              </div>
            </div>

            {hargaGrosir && (
              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Jika pembeli pesan</label>
                  <input 
                    type="number" 
                    value={grosirMin}
                    onChange={(e) => setGrosirMin(Number(e.target.value) || '')}
                    style={{ width: '100%', padding: '8px 0', border: 'none', borderBottom: '1px solid #cbd5e1', outline: 'none', borderRadius: 0, fontSize: 14 }}
                    placeholder="0"
                  />
                </div>
                <div style={{ marginTop: 28, color: 'var(--text-muted)' }}>=</div>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Harga produk akan jadi</label>
                  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #cbd5e1' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14, marginRight: 8 }}>IDR</span>
                    <input 
                      type="number" 
                      value={grosirHarga}
                      onChange={(e) => setGrosirHarga(Number(e.target.value) || '')}
                      style={{ width: '100%', padding: '8px 0', border: 'none', outline: 'none', borderRadius: 0, fontSize: 14 }}
                      placeholder="0"
                    />
                  </div>
                  {typeof grosirHarga === 'number' && grosirHarga > 0 && (
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                      Pendapatan dagangan dari harga yang kamu masukkan adalah sebesar <strong style={{ color: 'var(--text-primary)' }}>{formatRupiah(grosirHarga - (grosirHarga * PLATFORM_FEE / 100))}</strong>
                    </p>
                  )}
                </div>
                <div 
                  style={{ marginTop: 28, cursor: 'pointer', padding: 4 }} 
                  onClick={() => { setHargaGrosir(false); setGrosirMin(''); setGrosirHarga(''); }}
                >
                  <span style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 'bold' }}>✕</span>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Stok</label>
              <input 
                type="number" 
                value={stok}
                onChange={(e) => setStok(Number(e.target.value) || '')}
                className="input"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderBottomWidth: 2, borderRadius: 8 }}
                placeholder="0"
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Minimal Pesanan</label>
              <input 
                type="number" 
                value={minPesanan}
                onChange={(e) => setMinPesanan(Number(e.target.value) || '')}
                className="input"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderBottomWidth: 2, borderRadius: 8 }}
                placeholder="0"
              />
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Aktifkan Garansi Pengiriman</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Pilih salah satu garansi pengiriman untuk dagangan ini.</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  Jaminan 1 Hari Kirim
                  <div 
                    onMouseEnter={() => setShowSlaTooltip(true)}
                    onMouseLeave={() => setShowSlaTooltip(false)}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                  >
                    <Info size={14} color="var(--brand-blue)" style={{ cursor: 'pointer' }} />
                    
                    {showSlaTooltip && (
                      <div style={{ 
                        position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8,
                        background: '#1e293b', color: '#fff', padding: '12px 16px', borderRadius: 8, width: 260,
                        fontSize: 12, zIndex: 10, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', pointerEvents: 'none',
                        lineHeight: 1.5
                      }}>
                        <div style={{ fontWeight: 700, marginBottom: 4 }}>JAMINAN KIRIM 1 HARI</div>
                        <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 8 }}>Tercapai</div>
                        <div style={{ marginBottom: 4 }}>Pesanan dikirim ke ekspedisi maks 1x24 jam.</div>
                        <div style={{ color: '#94a3b8' }}>
                          SLA Kategori: {activeKat ? activeKat.nama : 'Pilih Kategori'}<br/>
                          Tingkat keterlambatan: 1.5% (Batas: 10%)
                        </div>
                        {/* Triangle pointer */}
                        <div style={{ 
                          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                          borderWidth: 6, borderStyle: 'solid', borderColor: '#1e293b transparent transparent transparent' 
                        }} />
                      </div>
                    )}
                  </div>
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

            <div style={{ textAlign: 'right', marginTop: 40 }}>
              <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 15, fontWeight: 600, width: '100%', maxWidth: 300 }}>
                Buat Dagangan
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
