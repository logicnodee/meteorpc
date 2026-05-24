'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, MessageSquare, CheckCircle, ArrowLeft, Send, ShieldAlert, Package, CreditCard, X, Lock, Unlock, User, Store, Info } from 'lucide-react';

const initialComplaints = [
  { id: 'KMP-001', trxId: 'TRX-998110', reporter: 'Budi Santoso', seller: 'TechStore ID', reason: 'Barang tidak sesuai deskripsi (RAM berbeda)', date: '15 Mei 2026', status: 'Mediasi Admin', nominal: 650000 },
  { id: 'KMP-002', trxId: 'TRX-998095', reporter: 'Rina Amelia', seller: 'Laptop Murah Official', reason: 'Barang rusak saat diterima (Layar pecah)', date: '14 Mei 2026', status: 'Menunggu Respons Seller', nominal: 12500000 },
  { id: 'KMP-003', trxId: 'TRX-998050', reporter: 'Reza Oktovian', seller: 'Gadget Mania', reason: 'Pengiriman terlalu lama / Hilang', date: '12 Mei 2026', status: 'Selesai (Refund)', nominal: 1100000 },
];

export default function KomplainMediasiPage() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [showEvidence, setShowEvidence] = useState<any>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  
  const [chatTurn, setChatTurn] = useState<'pembeli' | 'penjual' | 'admin_only'>('pembeli');

  useEffect(() => {
    if (activeChat && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeChat, chatTurn]);

  const handleRefund = (id: string) => {
    if (confirm('PUTUSAN ADMIN:\n\nPembeli harus mengirimkan kembali barang ke Penjual.\nDana Rp ' + activeChat?.nominal + ' akan dicairkan 100% ke Pembeli HANYA JIKA resi pengembalian valid dan barang telah sampai di Penjual.\n\nLanjutkan keputusan ini?')) {
      setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Menunggu Pengembalian Barang' } : c));
      setActiveChat({ ...activeChat, status: 'Menunggu Pengembalian Barang' });
      setChatTurn('admin_only');
      alert('Keputusan ditetapkan! Sistem sekarang memantau resi pengembalian barang dari pembeli.');
    }
  };

  const handleTolakKomplain = (id: string) => {
    if (confirm('PUTUSAN ADMIN:\n\nKomplain ditolak karena bukti tidak kuat. Dana akan langsung diteruskan ke Penjual.\n\nLanjutkan?')) {
      setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Selesai (Dana ke Penjual)' } : c));
      setActiveChat(null);
    }
  };

  if (activeChat) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexShrink: 0 }}>
          <button onClick={() => setActiveChat(null)} className="btn btn-ghost" style={{ padding: '8px 12px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 8 }}>
            <ArrowLeft size={20} /> <span style={{ fontWeight: 600 }}>Kembali</span>
          </button>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Ruang Mediasi: {activeChat.id}</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: 14 }}>{activeChat.trxId} • {activeChat.reason}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0 }}>
          {/* Chat Panel */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            
            {/* Header Chat */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Rekaman Percakapan</div>
              <span style={{ fontSize: 12, padding: '6px 12px', background: chatTurn === 'admin_only' ? '#fee2e2' : '#e0f2fe', color: chatTurn === 'admin_only' ? '#991b1b' : '#0369a1', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                {chatTurn === 'admin_only' ? <Lock size={14}/> : <Unlock size={14}/>}
                {chatTurn === 'pembeli' ? 'Giliran Pembeli' : chatTurn === 'penjual' ? 'Giliran Penjual' : 'Chat Terkunci'}
              </span>
            </div>
            
            {/* Chat Body (Scrollable) */}
            <div ref={chatScrollRef} style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Buyer Chat (Left) */}
              <div style={{ display: 'flex', gap: 12, maxWidth: '85%' }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--brand-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)' }}><User size={20}/></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: 'var(--text-secondary)' }}>{activeChat.reporter} (Pembeli)</div>
                  <div style={{ background: '#fff', padding: '14px 18px', borderRadius: '0 16px 16px 16px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: 14, lineHeight: 1.5, color: '#1e293b' }}>
                    Halo min, saya pesannya RAM Corsair Vengeance tapi yang datang malah merk V-Gen. Saya minta refund.
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>15 Mei 2026, 10:30 WIB</div>
                </div>
              </div>
              
              {/* Seller Chat (Left) */}
              <div style={{ display: 'flex', gap: 12, maxWidth: '85%' }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)' }}><Store size={20}/></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: 'var(--text-secondary)' }}>{activeChat.seller} (Penjual)</div>
                  <div style={{ background: '#fff', padding: '14px 18px', borderRadius: '0 16px 16px 16px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: 14, lineHeight: 1.5, color: '#1e293b' }}>
                    Waduh maaf gan, sepertinya admin packing saya salah tempel resi. Boleh di retur saja gan barangnya.
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>15 Mei 2026, 11:15 WIB</div>
                </div>
              </div>

              {/* Admin Chat (Right) */}
              <div style={{ display: 'flex', gap: 12, alignSelf: 'flex-end', maxWidth: '85%', flexDirection: 'row-reverse' }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--color-danger)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}><ShieldAlert size={20}/></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: 'var(--color-danger)' }}>Admin MeteorPC (Anda)</div>
                  <div style={{ background: 'var(--color-danger)', color: '#fff', padding: '14px 18px', borderRadius: '16px 0 16px 16px', boxShadow: '0 2px 5px rgba(239, 68, 68, 0.3)', fontSize: 14, lineHeight: 1.5 }}>
                    Baik. Mengingat penjual sudah mengakui kelalaian, admin akan memutuskan untuk REFUND. Pembeli wajib mengirimkan kembali barang ke alamat penjual dan melampirkan resi. Dana otomatis cair ke pembeli setelah barang terverifikasi sampai.
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Baru saja</div>
                </div>
              </div>
            </div>
            
            {/* Chat Footer (Input & Indicator) */}
            <div style={{ background: '#fff', borderTop: '1px solid var(--border-color)', flexShrink: 0 }}>
              {/* Indicator Bar */}
              <div style={{ padding: '8px 24px', background: chatTurn === 'admin_only' ? '#fee2e2' : '#f0f9ff', color: chatTurn === 'admin_only' ? '#991b1b' : '#0369a1', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Info size={14}/>
                {chatTurn === 'pembeli' && 'Saat ini giliran Pembeli berbicara. Input chat terkunci untuk Penjual.'}
                {chatTurn === 'penjual' && 'Saat ini giliran Penjual berbicara. Input chat terkunci untuk Pembeli.'}
                {chatTurn === 'admin_only' && 'Sesi mediasi dikunci. Menunggu atau telah mencapai keputusan final.'}
              </div>

              {/* Admin Input Area */}
              <div style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--color-danger)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><ShieldAlert size={16}/></div>
                <input 
                  type="text" 
                  placeholder="Ketik balasan Anda sebagai Admin..." 
                  style={{ flex: 1, padding: '12px 16px', borderRadius: 24, border: '1px solid var(--border-color)', background: '#f8fafc', fontSize: 14 }} 
                />
                <button className="btn btn-primary" style={{ borderRadius: 24, padding: '0 20px', height: 44, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Kirim <Send size={16}/>
                </button>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="card" style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            
            {/* Turn Control Section */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageSquare size={18} color="var(--brand-blue)"/> Kontrol Hak Bicara
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
                Atur giliran agar mediasi berjalan tertib dan tidak ada spam obrolan.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button 
                  onClick={() => setChatTurn('pembeli')}
                  className="btn" 
                  style={{ background: chatTurn === 'pembeli' ? 'var(--brand-blue)' : '#fff', color: chatTurn === 'pembeli' ? '#fff' : 'var(--text-primary)', justifyContent: 'flex-start', border: chatTurn === 'pembeli' ? '1px solid var(--brand-blue)' : '1px solid var(--border-color)', padding: 12, borderRadius: 8 }}
                >
                  <User size={16}/> Beri Akses Pembeli
                </button>
                <button 
                  onClick={() => setChatTurn('penjual')}
                  className="btn" 
                  style={{ background: chatTurn === 'penjual' ? '#f59e0b' : '#fff', color: chatTurn === 'penjual' ? '#fff' : 'var(--text-primary)', justifyContent: 'flex-start', border: chatTurn === 'penjual' ? '1px solid #f59e0b' : '1px solid var(--border-color)', padding: 12, borderRadius: 8 }}
                >
                  <Store size={16}/> Beri Akses Penjual
                </button>
                <button 
                  onClick={() => setChatTurn('admin_only')}
                  className="btn" 
                  style={{ background: chatTurn === 'admin_only' ? '#fee2e2' : '#fff', color: chatTurn === 'admin_only' ? '#dc2626' : 'var(--color-danger)', justifyContent: 'flex-start', border: chatTurn === 'admin_only' ? '1px solid #fca5a5' : '1px solid var(--border-color)', padding: 12, borderRadius: 8 }}
                >
                  <Lock size={16}/> Kunci Mediasi (Hanya Admin)
                </button>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />

            {/* Decision Section */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Keputusan Platform</h3>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid var(--border-color)' }}>
                Status saat ini:<br/>
                <strong style={{ color: 'var(--color-danger)', fontSize: 14, display: 'block', marginTop: 4 }}>{activeChat.status}</strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button onClick={() => handleRefund(activeChat.id)} className="btn" style={{ background: '#10b981', color: '#fff', padding: 16, justifyContent: 'flex-start', gap: 16, textAlign: 'left', borderRadius: 12, border: 'none', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 8 }}><Package size={24} /></div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>Putuskan: REFUND 100%</div>
                    <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>Barang retur ke penjual, Uang cair penuh ke pembeli</div>
                  </div>
                </button>

                <button onClick={() => handleTolakKomplain(activeChat.id)} className="btn" style={{ background: '#ef4444', color: '#fff', padding: 16, justifyContent: 'flex-start', gap: 16, textAlign: 'left', borderRadius: 12, border: 'none', boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 8 }}><CreditCard size={24} /></div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>TOLAK KOMPLAIN</div>
                    <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>Dana aman, langsung diteruskan ke rekening penjual</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Komplain & Mediasi</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tangani sengketa antara pembeli dan penjual untuk memutuskan pencairan dana (Safe Trading).</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24, display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Cari ID Komplain atau ID Transaksi..." 
            style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
        <select className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0 16px' }}>
          <option>Semua Status</option>
          <option>Mediasi Admin</option>
          <option>Menunggu Respons Seller</option>
          <option>Selesai (Refund)</option>
        </select>
      </div>
      
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID Komplain</th>
              <th>Transaksi Terkait</th>
              <th>Pelapor (Pembeli)</th>
              <th>Alasan Komplain</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi (Mediasi / Bukti)</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{c.id}</td>
                <td style={{ fontWeight: 600, color: 'var(--brand-blue)', textDecoration: 'underline', cursor: 'pointer' }}>{c.trxId}</td>
                <td style={{ fontWeight: 600 }}>{c.reporter}</td>
                <td style={{ fontSize: 13, color: 'var(--text-primary)', maxWidth: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.reason}</td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.date}</td>
                <td>
                  <span style={{ 
                    background: c.status.includes('Selesai') ? 'rgba(0, 200, 150, 0.1)' : c.status.includes('Pengembalian') ? 'rgba(59, 130, 246, 0.1)' : c.status.includes('Mediasi') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                    color: c.status.includes('Selesai') ? 'var(--color-success)' : c.status.includes('Pengembalian') ? 'var(--brand-blue)' : c.status.includes('Mediasi') ? 'var(--color-danger)' : '#f59e0b', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button onClick={() => setActiveChat(c)} className="btn btn-ghost btn-sm" title="Masuk Ruang Mediasi" style={{ padding: 6, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
                      <MessageSquare size={16}/>
                    </button>
                    <button onClick={() => setShowEvidence(c.id)} className="btn btn-ghost btn-sm" title="Lihat Bukti Lampiran" style={{ padding: 6, color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Eye size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evidence Viewer Modal */}
      {showEvidence && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', width: 600, maxWidth: '90vw' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 800 }}>Bukti Komplain: {showEvidence}</h3>
              <button onClick={() => setShowEvidence(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24}/></button>
            </div>
            <div style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: 40, borderRadius: 12, marginBottom: 16 }}>
                <Eye size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>FOTO/VIDEO BUKTI DARI PEMBELI</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>(Simulasi: Memuat lampiran unboxing dari pembeli...)</p>
              </div>
              <button onClick={() => setShowEvidence(null)} className="btn btn-primary" style={{ width: '100%' }}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
