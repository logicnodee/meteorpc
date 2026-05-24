'use client';
import React, { useState } from 'react';
import { kategoris as initialKategoris } from '@/lib/data';
import { Plus, Edit2, Trash2, Settings, X } from 'lucide-react';
import IconMapper from '@/components/layout/IconMapper';

export default function KategoriAdminPage() {
  const [katList, setKatList] = useState(initialKategoris);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingKat, setEditingKat] = useState<any>(null);

  // Subkategori Modal State
  const [subModal, setSubModal] = useState<{isOpen: boolean, mode: 'add' | 'delete', katId: string, subId?: string, subName?: string}>({isOpen: false, mode: 'add', katId: ''});
  const [tempSubName, setTempSubName] = useState('');
  
  // Toast State
  const [toast, setToast] = useState<string | null>(null);

  // Katalog Modal State
  const [katalogModal, setKatalogModal] = useState<{isOpen: boolean, katId: string, subId: string, subName: string, items: string[]}>({isOpen: false, katId: '', subId: '', subName: '', items: []});
  const [newKatalogItem, setNewKatalogItem] = useState('');

  const openAddModal = () => {
    setModalMode('add');
    setEditingKat({
      id: '', nama: '', icon: 'Box', holdPeriod: 3, fee: 2, perluModerasi: false, produkCount: 0, subkategori: [], sla: 3, minFoto: 3
    });
    setIsModalOpen(true);
  };

  const openEditModal = (kat: any) => {
    setModalMode('edit');
    setEditingKat({ ...kat });
    setIsModalOpen(true);
  };

  const saveCategory = () => {
    if (!editingKat.nama) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }
    
    if (modalMode === 'add') {
      const newKat = { ...editingKat, id: `k-${Date.now()}` };
      setKatList([newKat, ...katList]);
    } else {
      setKatList(katList.map(k => k.id === editingKat.id ? editingKat : k));
    }
    setIsModalOpen(false);
  };

  const deleteCategory = (id: string) => {
    if (confirm('Yakin ingin menghapus kategori ini? Semua produk di dalamnya akan terpengaruh.')) {
      setKatList(katList.filter(k => k.id !== id));
    }
  };

  // Inline grid functions
  const updateKatField = (katId: string, field: string, value: any) => {
    setKatList(katList.map(k => k.id === katId ? { ...k, [field]: value } : k));
  };

  const handleSubSubmit = () => {
    if (subModal.mode === 'add') {
      if (tempSubName && tempSubName.trim() !== '') {
        setKatList(katList.map(k => {
          if (k.id === subModal.katId) {
            const newSub = { id: `sub-${Date.now()}`, nama: tempSubName, icon: 'Box' };
            return { ...k, subkategori: [...k.subkategori, newSub] };
          }
          return k;
        }));
      }
    } else if (subModal.mode === 'delete') {
      setKatList(katList.map(k => {
        if (k.id === subModal.katId) {
          return { ...k, subkategori: k.subkategori.filter((s: any) => s.id !== subModal.subId) };
        }
        return k;
      }));
    }
    setSubModal({ ...subModal, isOpen: false });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Manajemen Kategori</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Kelola kategori, subkategori, hold period, fee, dan aturan moderasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}><Plus size={16}/> Tambah Kategori</button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {katList.map(kat => (
          <div key={kat.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Header kategori */}
            <div style={{ padding: '16px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--brand-blue)' }}>
                <IconMapper name={kat.icon} size={32} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{kat.nama}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kat.produkCount || 0} produk • {kat.subkategori.length} subkategori</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(kat)}><Edit2 size={13}/> Edit</button>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }} onClick={() => deleteCategory(kat.id)}><Trash2 size={13}/></button>
              </div>
            </div>

            {/* Setting kategori */}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 14 }}>
                {/* Hold period */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Hold Period</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="number" className="input" value={kat.holdPeriod || 0} onChange={(e) => updateKatField(kat.id, 'holdPeriod', Number(e.target.value))} style={{ width: 80 }}/>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>hari</span>
                  </div>
                </div>

                {/* Fee */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Fee Platform</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="number" step="0.5" className="input" value={kat.fee || 0} onChange={(e) => updateKatField(kat.id, 'fee', Number(e.target.value))} style={{ width: 80 }}/>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>%</span>
                  </div>
                </div>

                {/* SLA Pengiriman */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Maks. Kirim (SLA)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="number" className="input" value={kat.sla || (kat.id === 'k-001' ? 1 : 3)} onChange={(e) => updateKatField(kat.id, 'sla', Number(e.target.value))} style={{ width: 80 }}/>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>hari</span>
                  </div>
                </div>

                {/* Wajib moderasi */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Wajib Moderasi</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={kat.perluModerasi || false} onChange={(e) => updateKatField(kat.id, 'perluModerasi', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--brand-cyan)' }}/>
                    <span style={{ fontSize: 13 }}>{kat.perluModerasi ? 'Ya, seller wajib moderasi' : 'Tidak perlu'}</span>
                  </label>
                </div>

                {/* Foto minimal */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Min. Foto Produk</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="number" className="input" value={kat.minFoto || 3} onChange={(e) => updateKatField(kat.id, 'minFoto', Number(e.target.value))} style={{ width: 80 }}/>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>foto</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Subkategori */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {kat.subkategori.map((sub: any) => (
                    <div key={sub.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #bfdbfe', borderRadius: 6, overflow: 'hidden' }}>
                      <span onClick={() => setSubModal({ isOpen: true, mode: 'delete', katId: kat.id, subId: sub.id, subName: sub.nama })} className="badge badge-info" style={{ borderRadius: 0, border: 'none', borderRight: '1px solid #bfdbfe', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} title="Klik untuk menghapus">
                        <IconMapper name={sub.icon} size={14} /> {sub.nama} ✕
                      </span>
                      <button 
                        onClick={() => setKatalogModal({ isOpen: true, katId: kat.id, subId: sub.id, subName: sub.nama, items: sub.katalog || [] })}
                        style={{ padding: '4px 8px', fontSize: 10, background: '#eff6ff', color: 'var(--brand-blue)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        Atur Katalog
                      </button>
                    </div>
                  ))}
                  <button className="badge badge-cyan" onClick={() => { setTempSubName(''); setSubModal({ isOpen: true, mode: 'add', katId: kat.id }); }} style={{ border: 'none', cursor: 'pointer', fontSize: 11, borderRadius: 6 }}>+ Subkategori</button>
                </div>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => {
                    setToast(`Pengaturan untuk kategori ${kat.nama} berhasil disimpan!`);
                    setTimeout(() => setToast(null), 3000);
                  }}
                >
                  <Settings size={13}/> Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: 500, padding: 24, position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ position: 'absolute', top: 20, right: 20, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18}/>
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>{modalMode === 'add' ? 'Tambah Kategori Baru' : 'Edit Kategori'}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nama Kategori *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={editingKat?.nama} 
                  onChange={(e) => setEditingKat({...editingKat, nama: e.target.value})}
                  placeholder="Misal: Aksesoris PC, Server, dll"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nama Ikon (Standar Lucide Icons)</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 42, height: 42, background: 'var(--bg-secondary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue)' }}>
                    <IconMapper name={editingKat?.icon || 'Box'} size={24} />
                  </div>
                  <input 
                    type="text" 
                    className="input" 
                    value={editingKat?.icon} 
                    onChange={(e) => setEditingKat({...editingKat, icon: e.target.value})}
                    placeholder="Misal: Monitor, Mouse, Cpu"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                 <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Hold Period (Hari)</label>
                  <input 
                    type="number" 
                    className="input" 
                    value={editingKat?.holdPeriod} 
                    onChange={(e) => setEditingKat({...editingKat, holdPeriod: Number(e.target.value)})}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Fee Platform (%)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    className="input" 
                    value={editingKat?.fee} 
                    onChange={(e) => setEditingKat({...editingKat, fee: Number(e.target.value)})}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
              <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="btn btn-primary" onClick={saveCategory}>{modalMode === 'add' ? 'Tambah Kategori' : 'Simpan Perubahan'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Subkategori Modal */}
      {subModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: 400, padding: 24, position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <button 
              onClick={() => setSubModal({ ...subModal, isOpen: false })} 
              style={{ position: 'absolute', top: 20, right: 20, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18}/>
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>
              {subModal.mode === 'add' ? 'Tambah Subkategori' : 'Hapus Subkategori'}
            </h2>
            
            {subModal.mode === 'add' ? (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nama Subkategori *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={tempSubName} 
                  onChange={(e) => setTempSubName(e.target.value)}
                  placeholder="Misal: RAM, SSD, Mouse..."
                  style={{ width: '100%' }}
                  autoFocus
                />
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                Yakin ingin menghapus subkategori <strong>{subModal.subName}</strong>? Semua produk terkait mungkin akan terpengaruh.
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32 }}>
              <button className="btn btn-ghost" onClick={() => setSubModal({ ...subModal, isOpen: false })}>Batal</button>
              <button 
                className="btn btn-primary" 
                onClick={handleSubSubmit}
                style={subModal.mode === 'delete' ? { background: 'var(--color-danger)', borderColor: 'var(--color-danger)' } : {}}
              >
                {subModal.mode === 'add' ? 'Tambahkan' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Katalog Modal */}
      {katalogModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: 500, padding: 24, position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <button 
              onClick={() => setKatalogModal({ ...katalogModal, isOpen: false })} 
              style={{ position: 'absolute', top: 20, right: 20, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18}/>
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Katalog: {katalogModal.subName}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Kelola judul variasi produk yang dapat dipilih oleh penjual.</p>
            
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input 
                type="text" 
                className="input" 
                value={newKatalogItem}
                onChange={(e) => setNewKatalogItem(e.target.value)}
                placeholder="Tambah judul baru..."
                style={{ flex: 1 }}
              />
              <button 
                className="btn btn-primary"
                onClick={() => {
                  if (newKatalogItem.trim()) {
                    setKatalogModal({ ...katalogModal, items: [...katalogModal.items, newKatalogItem.trim()] });
                    setNewKatalogItem('');
                  }
                }}
              >
                Tambah
              </button>
            </div>

            <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8 }}>
              {katalogModal.items.length === 0 ? (
                <div style={{ padding: 16, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Katalog masih kosong</div>
              ) : (
                katalogModal.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: idx < katalogModal.items.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item}</span>
                    <button 
                      onClick={() => setKatalogModal({ ...katalogModal, items: katalogModal.items.filter((_, i) => i !== idx) })}
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: 4 }}
                    >
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={() => setKatalogModal({ ...katalogModal, isOpen: false })}>Batal</button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  // Save to main state
                  setKatList(katList.map(k => {
                    if (k.id === katalogModal.katId) {
                      return {
                        ...k, 
                        subkategori: k.subkategori.map((s: any) => s.id === katalogModal.subId ? { ...s, katalog: katalogModal.items } : s)
                      };
                    }
                    return k;
                  }));
                  setKatalogModal({ ...katalogModal, isOpen: false });
                  setToast(`Katalog ${katalogModal.subName} berhasil diperbarui!`);
                  setTimeout(() => setToast(null), 3000);
                }}
              >
                Simpan Katalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--color-success)', color: '#fff', padding: '12px 24px', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 9999, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#fff', color: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
          {toast}
        </div>
      )}
    </div>
  );
}
