import type { Metadata } from 'next';
import { sellers, ulasanContoh } from '@/lib/data';
import { Star, Filter, MessageSquare } from 'lucide-react';

export const metadata: Metadata = { title: 'Ulasan Pembeli' };

export default function UlasanPage() {
  const seller = sellers[0];
  const breakdown = seller.ulasanBreakdown;
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const avg = seller.rating;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Ulasan Pembeli</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Semua ulasan yang diberikan pembeli untuk toko kamu.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Rating summary */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>{avg}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, margin: '6px 0', fontSize: 18 }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.round(avg) ? '#fbbf24' : 'var(--border-color)' }}>★</span>)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{total} ulasan</div>
          </div>

          {/* Breakdown per bintang */}
          <div style={{ display: 'grid', gap: 8 }}>
            {[5,4,3,2,1].map(star => {
              const count = breakdown[star as keyof typeof breakdown];
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 16, textAlign: 'right' }}>{star}</span>
                  <span style={{ color: '#fbbf24', fontSize: 11 }}>★</span>
                  <div className="progress" style={{ flex: 1, height: 6 }}>
                    <div className="progress-bar" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#fbbf24,#f59e0b)' }}/>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 30 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter & daftar ulasan */}
        <div>
          {/* Filter bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <select className="input" style={{ width: 'auto', cursor: 'pointer', fontSize: 12, padding: '6px 10px' }}>
              <option>30 Hari Terakhir</option>
              <option>3 Bulan Terakhir</option>
              <option>Semua Waktu</option>
            </select>
            <select className="input" style={{ width: 'auto', cursor: 'pointer', fontSize: 12, padding: '6px 10px' }}>
              <option>Pilih Kategori</option>
              <option>RAM</option>
              <option>SSD & Storage</option>
              <option>Laptop Second</option>
            </select>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Semua', '⭐5', '⭐4', '⭐3', '⭐2', '⭐1'].map(f => (
                <button key={f} className={`badge ${f === 'Semua' ? 'badge-cyan' : 'badge-info'}`} style={{ cursor: 'pointer', border: 'none', fontSize: 11 }}>{f}</button>
              ))}
            </div>
          </div>

          {/* List ulasan */}
          <div style={{ display: 'grid', gap: 14 }}>
            {ulasanContoh.map(u => (
              <div key={u.id} className="card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{u.buyerNama}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1,2,3,4,5].map(s => (
                          <span key={s} style={{ color: s <= u.rating ? '#fbbf24' : 'var(--border-color)', fontSize: 14 }}>★</span>
                        ))}
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        Ulasan untuk <span style={{ color: 'var(--brand-cyan)' }}>{u.produkNama}</span>
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {new Date(u.waktu).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{u.komentar}</p>
                <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }}>
                  <MessageSquare size={13}/> Balas Ulasan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
