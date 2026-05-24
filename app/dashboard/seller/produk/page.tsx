'use client';
import React, { useState } from 'react';
import { produk } from '@/lib/data';
import Link from 'next/link';
import { Search, ChevronDown, Plus, Edit2, Package as PackageIcon, Trash2 } from 'lucide-react';

export default function SellerProdukPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [localProducts, setLocalProducts] = useState(produk.filter(p => p.sellerId === 'seller-1'));
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editHarga, setEditHarga] = useState<number>(0);
  const [editStok, setEditStok] = useState<number>(0);

  return (
    <div style={{ background: '#fff', borderRadius: 8, minHeight: '80vh', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Daganganku</h1>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <select className="input" style={{ width: 180, fontSize: 13 }}>
            <option>Pilih Kategori</option>
            <option>Sparepart Laptop</option>
            <option>Laptop Second</option>
          </select>
          
          <div style={{ position: 'relative', width: 250 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}/>
            <input type="text" className="input" placeholder="Cari nama dagangan kamu" style={{ width: '100%', paddingLeft: 34, fontSize: 13 }} />
          </div>

          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button className="badge" style={{ border: '1px solid var(--brand-blue)', color: 'var(--brand-blue)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Semua Dagangan</button>
            <button className="badge" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Pengiriman Instan</button>
            <button className="badge" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 20 }}>Lelang</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Urutkan</span>
            <select className="input" style={{ width: 120, fontSize: 13, padding: '6px 12px' }}>
              <option>Terbaru</option>
              <option>Terlaris</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/dashboard/seller/produk/tambah" className="btn btn-primary" style={{ fontSize: 13, padding: '8px 16px', textDecoration: 'none' }}>
            Tambah Produk
          </Link>
          <button className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
            Edit Sekaligus <ChevronDown size={14}/>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Stok:</span>
            <input type="number" className="input" placeholder="Min" style={{ width: 60, fontSize: 13, padding: '6px 8px', textAlign: 'center' }}/>
            <span>-</span>
            <input type="number" className="input" placeholder="Maks" style={{ width: 60, fontSize: 13, padding: '6px 8px', textAlign: 'center' }}/>
            <button className="badge" style={{ border: '1px solid var(--brand-blue)', color: 'var(--brand-blue)', background: 'transparent', cursor: 'pointer', padding: '6px 16px', borderRadius: 4 }}>Filter</button>
            <button className="btn btn-outline" style={{ fontSize: 13, padding: '6px 16px', fontWeight: 600 }}>Reset</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', minHeight: 400 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: 12 }}>
              <th style={{ padding: '16px 8px', fontWeight: 500, width: '40%' }}>Dagangan</th>
              <th style={{ padding: '16px 8px', fontWeight: 500 }}>Harga</th>
              <th style={{ padding: '16px 8px', fontWeight: 500 }}>Stok</th>
              <th style={{ padding: '16px 8px', fontWeight: 500 }}>Minimal</th>
              <th style={{ padding: '16px 8px', fontWeight: 500 }}>Update</th>
              <th style={{ padding: '16px 8px', fontWeight: 500, width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {localProducts.map(p => (
              editingRowId === p.id ? (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                  <td style={{ padding: '24px 8px' }}>
                    <Link href={`/produk/${p.slug}`} style={{ fontWeight: 600, color: 'var(--brand-blue)', textDecoration: 'none', display: 'block', marginBottom: 6 }}>
                      {p.nama}
                    </Link>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.kategoriId.replace('-', ' ')}</div>
                  </td>
                  <td style={{ padding: '24px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 4, overflow: 'hidden', width: 140, background: '#fff' }}>
                      <div style={{ background: '#f8fafc', padding: '8px', borderRight: '1px solid #cbd5e1', fontSize: 13, color: 'var(--text-muted)' }}>IDR</div>
                      <input 
                        type="number" 
                        value={editHarga}
                        onChange={(e) => setEditHarga(Number(e.target.value))}
                        style={{ width: '100%', border: 'none', padding: '8px', outline: 'none', fontSize: 13 }}
                      />
                    </div>
                    <div style={{ fontSize: 12, color: '#d97706', marginTop: 8, fontWeight: 500 }}>Rp {editHarga.toLocaleString('id-ID')} per 1 Pcs</div>
                  </td>
                  <td style={{ padding: '24px 8px' }}>
                    <input 
                      type="number" 
                      value={editStok}
                      onChange={(e) => setEditStok(Number(e.target.value))}
                      style={{ width: 80, border: '1px solid #cbd5e1', padding: '8px', borderRadius: 4, outline: 'none', fontSize: 13, background: '#fff' }}
                    />
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{editStok} Pcs</div>
                  </td>
                  <td style={{ padding: '24px 8px', color: 'var(--text-primary)' }}>
                    1 Pcs
                  </td>
                  <td style={{ padding: '24px 8px', color: 'var(--text-primary)', fontSize: 12, lineHeight: 1.5 }}>
                    24 Mei 2026<br/>
                    10:45:00
                  </td>
                  <td style={{ padding: '24px 8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 100 }}>
                      <button 
                        onClick={() => setEditingRowId(null)}
                        style={{ padding: '8px 12px', border: '1px solid var(--brand-blue)', color: 'var(--brand-blue)', background: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Batalkan
                      </button>
                      <button 
                        onClick={() => {
                           setLocalProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, harga: editHarga, stok: editStok } : prod));
                           setEditingRowId(null);
                        }}
                        style={{ padding: '8px 12px', background: 'var(--brand-blue)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Simpan
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '24px 8px' }}>
                    <Link href={`/produk/${p.slug}`} style={{ fontWeight: 600, color: 'var(--brand-blue)', textDecoration: 'none', display: 'block', marginBottom: 6 }}>
                      {p.nama}
                    </Link>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.kategoriId.replace('-', ' ')}</div>
                  </td>
                  <td style={{ padding: '24px 8px', fontWeight: 600, color: '#d97706' }}>
                    Rp {p.harga.toLocaleString('id-ID')} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 12 }}>per 1 Pcs</span>
                  </td>
                  <td style={{ padding: '24px 8px' }}>
                    {p.stok > 0 ? (
                      <span style={{ color: 'var(--text-primary)' }}>{p.stok} Pcs</span>
                    ) : (
                      <span style={{ color: 'var(--color-danger)', border: '1px solid var(--color-danger)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>Stok Habis</span>
                    )}
                  </td>
                  <td style={{ padding: '24px 8px', color: 'var(--text-primary)' }}>
                    1 Pcs
                  </td>
                  <td style={{ padding: '24px 8px', color: 'var(--text-primary)', fontSize: 12, lineHeight: 1.5 }}>
                    24 Mei 2026<br/>
                    10:45:00
                  </td>
                  <td style={{ padding: '24px 8px', position: 'relative' }}>
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === p.id ? null : p.id)}
                      style={{ 
                        width: '100%', padding: '8px', 
                        background: '#fff', border: '1px solid var(--border-color)', 
                        borderRadius: 6, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        color: 'var(--text-primary)', fontSize: 13, fontWeight: 500
                      }}
                    >
                      Atur <ChevronDown size={14} color="var(--text-muted)"/>
                    </button>
                    
                    {openDropdown === p.id && (
                      <div style={{ 
                        position: 'absolute', right: 8, top: 60, 
                        background: '#fff', border: '1px solid var(--border-color)', 
                        borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                        zIndex: 10, minWidth: 160, padding: '4px 0' 
                      }}>
                        <Link 
                          href={`/dashboard/seller/produk/edit/${p.id}`}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: 'var(--brand-blue)', textDecoration: 'none' }}
                        >
                          <Edit2 size={14}/> Edit
                        </Link>
                        <button 
                          onClick={() => {
                            setEditingRowId(p.id);
                            setEditHarga(p.harga);
                            setEditStok(p.stok);
                            setOpenDropdown(null);
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: 'var(--brand-blue)' }}
                        >
                          <PackageIcon size={14}/> Edit Stok & Harga
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Yakin ingin menghapus produk ${p.nama}?`)) {
                              setLocalProducts(prev => prev.filter(prod => prod.id !== p.id));
                            }
                            setOpenDropdown(null);
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: 'var(--brand-blue)' }}
                        >
                          <Trash2 size={14}/> Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
