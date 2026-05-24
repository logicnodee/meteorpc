import type { Metadata } from 'next';
import { BANKS } from '@/lib/data';
import { CreditCard, Plus, Trash2, Star } from 'lucide-react';

export const metadata: Metadata = { title: 'Rekening Bank' };

const rekeningList = [
  { id: 1, bank: 'BCA', noRek: '1234567890', atas: 'Budi Santoso', utama: true },
  { id: 2, bank: 'BRI', noRek: '0987654321', atas: 'Budi Santoso', utama: false },
];

export default function RekeningPage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Rekening Bank</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Kelola rekening bank untuk pencairan saldo toko kamu.</p>

      {/* Info */}
      <div style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13 }}>
        <strong style={{ color: 'var(--brand-cyan)' }}>ℹ️ Informasi Rekening</strong>
        <ul style={{ color: 'var(--text-secondary)', marginTop: 6, paddingLeft: 16, lineHeight: 1.8, fontSize: 12 }}>
          <li>Nama pemilik rekening harus sesuai dengan nama di KTP yang sudah terverifikasi</li>
          <li>Biaya transfer gratis untuk BCA, BRI, BNI, Mandiri</li>
          <li>Bank lain mungkin dikenakan biaya transfer jaringan sesuai ketentuan bank</li>
          <li>Minimal pencairan saldo Rp 10.000</li>
        </ul>
      </div>

      {/* List rekening */}
      <div style={{ display: 'grid', gap: 14, marginBottom: 24 }}>
        {rekeningList.map(rek => (
          <div key={rek.id} className="card" style={{ padding: '16px 20px', borderColor: rek.utama ? 'rgba(0,212,255,0.4)' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                🏦
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700 }}>{rek.bank}</span>
                  {rek.utama && <span className="badge badge-cyan" style={{ fontSize: 10 }}>⭐ Utama</span>}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '1px', marginBottom: 2 }}>
                  {rek.noRek.replace(/(\d{4})(?=\d)/g, '$1 ')}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>a.n. {rek.atas}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {!rek.utama && (
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>
                    <Star size={12}/> Jadikan Utama
                  </button>
                )}
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }}>
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form tambah rekening */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16}/> Tambah Rekening Baru
        </h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Pilih Bank</label>
            <select className="input" style={{ cursor: 'pointer' }}>
              <option value="">-- Pilih bank yang kamu gunakan --</option>
              {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              Bank selain BCA, BRI, BNI dan Mandiri mungkin dikenakan biaya transfer
            </p>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nomor Rekening</label>
            <input className="input" placeholder="Masukkan nomor sesuai dengan buku rekening" type="number"/>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Pastikan kamu memasukkan nomor rekening yang benar</p>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nama Pemilik Rekening</label>
            <input className="input" placeholder="Nama sesuai KTP yang terverifikasi"/>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost">Batal</button>
            <button className="btn btn-primary">
              <CreditCard size={16}/> Simpan Rekening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
