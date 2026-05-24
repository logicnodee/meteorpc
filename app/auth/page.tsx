'use client';
import { useState } from 'react';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg,#00d4ff,#0066cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 26, margin: '0 auto 12px', boxShadow: '0 0 24px rgba(0,212,255,0.4)' }}>M</div>
          <div style={{ fontSize: 24, fontWeight: 900, background: 'linear-gradient(135deg,#00d4ff,#0066cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MeteorPC</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Marketplace Sparepart & Laptop Second</div>
        </div>

        {/* Card */}
        <div className="card-glass" style={{ padding: '28px 32px' }}>
          {/* Tab */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 8, padding: 3, marginBottom: 24 }}>
            {(['login', 'register'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                background: tab === t ? 'linear-gradient(135deg,#00d4ff,#0066cc)' : 'transparent',
                color: tab === t ? '#fff' : 'var(--text-secondary)',
              }}>
                {t === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email</label>
                <input className="input" type="email" placeholder="email@kamu.com"/>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Password</label>
                <input className="input" type="password" placeholder="Password kamu"/>
                <div style={{ textAlign: 'right', marginTop: 6 }}>
                  <a href="#" style={{ fontSize: 12, color: 'var(--brand-cyan)', textDecoration: 'none' }}>Lupa password?</a>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Masuk</button>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                Belum punya akun? <button onClick={() => setTab('register')} style={{ color: 'var(--brand-cyan)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Daftar sekarang</button>
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {/* Pilih role */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Daftar sebagai</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {([['buyer', '🛒', 'Pembeli', 'Belanja sparepart & laptop'], ['seller', '🏪', 'Penjual', 'Buka toko & berjualan']] as const).map(([r, icon, label, desc]) => (
                    <button key={r} onClick={() => setRole(r)} style={{
                      padding: '12px', borderRadius: 8, border: `2px solid ${role === r ? 'var(--brand-cyan)' : 'var(--border-color)'}`,
                      background: role === r ? 'rgba(0,212,255,0.1)' : 'var(--bg-secondary)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nama Lengkap</label>
                <input className="input" placeholder="Nama sesuai KTP"/>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email</label>
                <input className="input" type="email" placeholder="email@kamu.com"/>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nomor HP</label>
                <input className="input" type="tel" placeholder="08xx-xxxx-xxxx"/>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Password</label>
                <input className="input" type="password" placeholder="Min. 8 karakter"/>
              </div>

              {role === 'seller' && (
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nama Toko</label>
                  <input className="input" placeholder="Nama toko kamu"/>
                </div>
              )}

              <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                {role === 'seller' ? '🏪 Daftar & Buka Toko' : '🛒 Daftar Sekarang'}
              </button>

              {role === 'seller' && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
                  Setelah daftar, kamu perlu melengkapi verifikasi KTP dan mendapatkan persetujuan admin sebelum bisa mulai berjualan.
                </div>
              )}

              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                Sudah punya akun? <button onClick={() => setTab('login')} style={{ color: 'var(--brand-cyan)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Masuk</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
