'use client';
import { useState } from 'react';
import { Settings, Clock, ToggleLeft, ToggleRight, Save } from 'lucide-react';

export default function PengaturanTokoPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [jamBuka, setJamBuka] = useState('08:00');
  const [jamTutup, setJamTutup] = useState('22:00');
  const [pesanTutup, setPesanTutup] = useState('Toko sedang tutup, pesanan akan diproses saat buka kembali.');

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = jamBuka.split(':').map(Number);
  const [closeH, closeM] = jamTutup.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const dalamJamOps = currentMinutes >= openMinutes && currentMinutes <= closeMinutes;

  const getStatusLabel = () => {
    if (!isOpen) return { label: 'Sedang Tutup', color: '#ef4444' };
    if (dalamJamOps) return { label: 'Sedang Buka', color: '#00c896' };
    return { label: 'Di Luar Jam Operasional', color: '#f59e0b' };
  };
  const status = getStatusLabel();

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Pengaturan Toko</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Atur status dan jam operasional toko kamu.</p>

      {/* Status toko sekarang */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="status-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: status.color, boxShadow: `0 0 8px ${status.color}`, flexShrink: 0 }}/>
        <span style={{ fontSize: 14, fontWeight: 700, color: status.color }}>Status Saat Ini: {status.label}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>
          {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
        </span>
      </div>

      {/* Status toggle */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Status Toko</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 480 }}>
              {isOpen
                ? 'Toko kamu sedang BUKA. Produk tampil di beranda dan pembeli bisa melakukan pemesanan.'
                : 'Toko kamu sedang TUTUP. Semua produk disembunyikan dari beranda dan pembeli tidak bisa memesan.'}
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14,
              cursor: 'pointer', border: 'none',
              background: isOpen ? 'rgba(0,200,150,0.15)' : 'rgba(239,68,68,0.15)',
              color: isOpen ? 'var(--color-success)' : 'var(--color-danger)',
              transition: 'all 0.3s',
            }}
          >
            {isOpen ? <ToggleRight size={24}/> : <ToggleLeft size={24}/>}
            {isOpen ? 'BUKA' : 'TUTUP'}
          </button>
        </div>

        {/* Info logika */}
        <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(0,212,255,0.05)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', borderLeft: '3px solid rgba(0,212,255,0.3)' }}>
          <strong style={{ color: 'var(--brand-cyan)' }}>💡 Cara kerja:</strong> Toggle ini yang menentukan apakah toko kamu buka atau tutup.
          Jam operasional hanya informasi referensi untuk pembeli — toko tetap buka selama toggle ini ON, meski sudah lewat jam operasional.
        </div>
      </div>

      {/* Jam operasional */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Clock size={16} color="var(--brand-cyan)"/>
          <h2 style={{ fontWeight: 700, fontSize: 15 }}>Jam Operasional Toko</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Informasi ini ditampilkan di halaman toko sebagai referensi untuk pembeli. Ini bukan pemicu otomatis buka/tutup.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Jam Buka</label>
            <input type="time" className="input" value={jamBuka} onChange={e => setJamBuka(e.target.value)} style={{ width: 'auto' }}/>
          </div>
          <div style={{ fontSize: 16, color: 'var(--text-muted)', paddingTop: 20 }}>—</div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Jam Tutup</label>
            <input type="time" className="input" value={jamTutup} onChange={e => setJamTutup(e.target.value)} style={{ width: 'auto' }}/>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', paddingTop: 20 }}>WIB</div>
        </div>

        {/* Preview badge */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
          Preview badge:
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.3)', padding: '3px 10px', borderRadius: 100, border: `1px solid ${status.color}33` }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: status.color, display: 'inline-block' }}/>
            <span style={{ fontSize: 11, color: status.color, fontWeight: 600 }}>{status.label}</span>
          </span>
          <span>akan tampil di halaman toko</span>
        </div>
      </div>

      {/* Pesan otomatis tutup */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Pesan Saat Toko Tutup</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
          Pesan ini ditampilkan kepada pembeli saat toko kamu dalam kondisi tutup.
        </p>
        <textarea
          className="input"
          rows={3}
          value={pesanTutup}
          onChange={e => setPesanTutup(e.target.value)}
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Visibilitas produk — matriks */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Matriks Visibilitas Produk</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Status Toko</th>
                <th>Status Produk</th>
                <th>Tampil di Beranda?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['TUTUP', 'Apapun', false],
                ['BUKA', 'Draft', false],
                ['BUKA', 'Menunggu Review', false],
                ['BUKA', 'Ditolak', false],
                ['BUKA', 'Live (Disetujui)', true],
                ['BUKA', 'Diarsipkan', false],
              ].map(([toko, produk, tampil], i) => (
                <tr key={i}>
                  <td>
                    <span className={`badge ${toko === 'BUKA' ? 'badge-success' : 'badge-danger'}`}>{toko as string}</span>
                  </td>
                  <td style={{ fontSize: 13 }}>{produk as string}</td>
                  <td>
                    <span style={{ fontSize: 16 }}>{tampil ? '✅' : '❌'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary">
          <Save size={16}/> Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}
