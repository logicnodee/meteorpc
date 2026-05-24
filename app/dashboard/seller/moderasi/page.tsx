'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronDown, Plus, MessageSquare } from 'lucide-react';
import { kategoris } from '@/lib/data';

// Define the moderation categories based on MeteorPC context
const moderationCategories = [
  { id: 'laptop-bekas', title: 'Jualan Laptop Bekas', desc: 'Selamat, kamu sudah bisa berjualan produk ini!', status: 'Sudah dimoderasi' },
  { id: 'sparepart-baru', title: 'Jualan Sparepart Baru', desc: 'Lakukan moderasi terlebih dahulu untuk menjual produk ini.', status: 'Belum dimoderasi' },
  { id: 'aksesoris-pc', title: 'Jualan Aksesoris PC', desc: 'Lakukan moderasi terlebih dahulu untuk menjual produk ini.', status: 'Belum dimoderasi' },
  { id: 'software', title: 'Jualan Lisensi Software', desc: 'Lakukan moderasi terlebih dahulu untuk menjual produk ini.', status: 'Belum dimoderasi' },
];

export default function ModerasiPage() {
  const [activeFormId, setActiveFormId] = useState<string | null>(null);

  // Form State
  const [selectedProduct, setSelectedProduct] = useState('');
  const [supplySource, setSupplySource] = useState('');

  // Find active category
  const activeCategory = moderationCategories.find(c => c.id === activeFormId);

  // VIEW 1: LIST MODERASI
  if (!activeFormId) {
    return (
      <div style={{ background: '#fff', borderRadius: 8, minHeight: '80vh', padding: '24px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Moderasi Produk</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
          Lengkapi moderasi setiap produk agar kamu dapat mulai jualan.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {moderationCategories.map(cat => (
            <div key={cat.id} style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{cat.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>{cat.desc}</p>
              </div>
              
              <div>
                {cat.status === 'Sudah dimoderasi' ? (
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                    Sudah dimoderasi
                  </span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <span style={{ background: '#f1f5f9', color: '#64748b', padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                      Belum dimoderasi
                    </span>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '6px 16px', fontSize: 13, fontWeight: 600, color: 'var(--brand-blue)', borderColor: 'var(--brand-blue)' }}
                      onClick={() => setActiveFormId(cat.id)}
                    >
                      Moderasi Sekarang
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 2: FORM MODERASI
  return (
    <div style={{ background: '#fff', borderRadius: 8, minHeight: '80vh', padding: '24px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <button 
        onClick={() => setActiveFormId(null)}
        style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brand-blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, padding: 0, marginBottom: 24 }}
      >
        <ChevronLeft size={16} /> Kembali ke Moderasi Produk
      </button>

      <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
        Form Moderasi ({activeCategory?.title})
      </h1>

      <div style={{ maxWidth: 800 }}>
        {/* Info Box */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '16px', marginBottom: 32 }}>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#1e40af', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>Proses moderasi <strong>cepat</strong>, maksimal 1x24 jam.</li>
            <li>Tetap bisa terima pesanan dan tambah dagangan selagi proses moderasi.</li>
          </ul>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>1. Kamu ingin menjual produk apa?*</label>
            <div style={{ position: 'relative' }}>
              <select 
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="input"
                style={{ width: '100%', padding: '12px 16px', appearance: 'none', background: '#fff', cursor: 'pointer' }}
              >
                <option value="" disabled>Pilih Produk</option>
                {kategoris.map(k => (
                  <option key={k.id} value={k.id}>{k.nama}</option>
                ))}
              </select>
              <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>2. Dari mana kamu mendapatkan supply untuk penjualan produk ini?*</label>
            <textarea 
              value={supplySource}
              onChange={(e) => setSupplySource(e.target.value)}
              className="input"
              rows={3}
              style={{ width: '100%', padding: '12px 16px', resize: 'vertical' }}
            />
          </div>

          <hr style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none' }} />

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>3. Lampirkan screenshot bukti/nota pembelian dari supplier yang kamu lakukan satu bulan terakhir*</label>
            
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
              {[ 1, 2 ].map((i) => (
                <div key={i} style={{ 
                  width: 100, height: 100, background: '#f1f5f9', border: '2px solid #cbd5e1', borderRadius: 8, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s'
                }}>
                  <Plus size={32} color="#94a3b8" />
                </div>
              ))}
            </div>
            
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Pastikan gambar berformat .JPG, .PNG, .GIF, .JPEG<br/>
              Min. 2 lampiran dengan ukuran file maksimal 2MB
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: 14, fontWeight: 600 }}>
              Kirim Formulir
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
