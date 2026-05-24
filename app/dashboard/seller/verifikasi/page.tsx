import type { Metadata } from 'next';
import { Shield, Upload, CheckCircle, Clock, XCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Verifikasi Toko' };

export default function VerifikasiPage() {
  const verifikasiStatus = {
    ktpStatus: 'verified' as 'belum' | 'pending' | 'verified' | 'rejected',
    selfieStatus: 'verified' as 'belum' | 'pending' | 'verified' | 'rejected',
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'verified') return <CheckCircle size={18} color="var(--color-success)"/>;
    if (status === 'pending') return <Clock size={18} color="var(--color-warning)"/>;
    if (status === 'rejected') return <XCircle size={18} color="var(--color-danger)"/>;
    return <Upload size={18} color="var(--text-muted)"/>;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'verified') return <span className="badge badge-success">✅ Terverifikasi</span>;
    if (status === 'pending') return <span className="badge badge-warning">⏳ Sedang Direview</span>;
    if (status === 'rejected') return <span className="badge badge-danger">❌ Ditolak</span>;
    return <span className="badge badge-info">📤 Belum Upload</span>;
  };

  const isFullyVerified = verifikasiStatus.ktpStatus === 'verified' && verifikasiStatus.selfieStatus === 'verified';

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Verifikasi Toko</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Verifikasi identitas untuk membuka semua fitur toko, termasuk pencairan saldo.</p>

      {/* Info penting */}
      <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Shield size={16} color="var(--color-info)" style={{ flexShrink: 0, marginTop: 1 }}/>
          <div>
            <strong style={{ color: 'var(--color-info)' }}>Data kamu aman</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 2 }}>
              Data KTP dan selfie hanya digunakan untuk keperluan verifikasi identitas dan dijamin keamanannya. Hanya admin yang dapat mengakses data ini.
            </p>
          </div>
        </div>
      </div>

      {/* Status keseluruhan */}
      {isFullyVerified ? (
        <div style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.3)', borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Shield size={32} color="var(--color-success)"/>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-success)' }}>Toko Kamu Sudah Terverifikasi ✅</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              Semua fitur toko sudah terbuka, termasuk pencairan saldo. Badge "Toko Terverifikasi" ditampilkan di profil toko kamu.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <strong style={{ color: 'var(--color-warning)' }}>⚠️ Verifikasi belum lengkap</strong>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Selesaikan verifikasi untuk bisa mencairkan saldo dan mendapatkan badge Toko Terverifikasi.</p>
        </div>
      )}

      {/* Dokumen verifikasi */}
      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        {/* KTP */}
        <div className="card" style={{ padding: '20px 24px', borderColor: verifikasiStatus.ktpStatus === 'verified' ? 'rgba(0,200,150,0.3)' : undefined }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <StatusIcon status={verifikasiStatus.ktpStatus}/>
              <div>
                <div style={{ fontWeight: 700 }}>Foto KTP</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Kartu Tanda Penduduk yang masih berlaku</div>
              </div>
            </div>
            <StatusBadge status={verifikasiStatus.ktpStatus}/>
          </div>

          {verifikasiStatus.ktpStatus === 'belum' && (
            <>
              <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border-color)', borderRadius: 10, padding: '32px', textAlign: 'center', marginBottom: 12, cursor: 'pointer' }}>
                <Upload size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px' }}/>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Klik untuk upload foto KTP</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>JPG, PNG, maks 5MB. Pastikan foto jelas dan tidak buram.</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                💡 Tips: Foto KTP dengan pencahayaan yang cukup, semua teks terbaca jelas
              </div>
            </>
          )}

          {verifikasiStatus.ktpStatus === 'verified' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-success)' }}>
              <CheckCircle size={14}/> KTP sudah diverifikasi oleh admin
            </div>
          )}
        </div>

        {/* Selfie */}
        <div className="card" style={{ padding: '20px 24px', borderColor: verifikasiStatus.selfieStatus === 'verified' ? 'rgba(0,200,150,0.3)' : undefined }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <StatusIcon status={verifikasiStatus.selfieStatus}/>
              <div>
                <div style={{ fontWeight: 700 }}>Foto Selfie dengan KTP</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Foto kamu sambil memegang KTP</div>
              </div>
            </div>
            <StatusBadge status={verifikasiStatus.selfieStatus}/>
          </div>

          {verifikasiStatus.selfieStatus === 'belum' && (
            <>
              <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border-color)', borderRadius: 10, padding: '32px', textAlign: 'center', marginBottom: 12, cursor: 'pointer' }}>
                <Upload size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px' }}/>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Klik untuk upload foto selfie</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>JPG, PNG, maks 5MB. Wajah dan KTP harus terlihat jelas.</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                💡 Tips: Pegang KTP di depan wajah, pastikan foto tidak buram
              </div>
            </>
          )}

          {verifikasiStatus.selfieStatus === 'verified' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-success)' }}>
              <CheckCircle size={14}/> Foto selfie sudah diverifikasi oleh admin
            </div>
          )}
        </div>
      </div>

      {/* Apa yang terbuka setelah verifikasi */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Yang Terbuka Setelah Verifikasi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { icon: '💰', title: 'Pencairan Saldo', desc: 'Cairkan penghasilan ke rekening bank kamu' },
            { icon: '🏦', title: 'Tambah Rekening', desc: 'Tambah dan kelola rekening pencairan' },
            { icon: '✅', title: 'Badge Terverifikasi', desc: 'Badge muncul di profil dan semua listing produk' },
            { icon: '🔓', title: 'Akses Penuh', desc: 'Semua fitur toko terbuka tanpa batasan' },
          ].map(item => (
            <div key={item.title} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
