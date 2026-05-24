import type { Metadata } from 'next';
import { sellers, formatRupiah, LEVEL_NAMES } from '@/lib/data';
import Link from 'next/link';
import { Shield, Star, Award, TrendingUp, ChevronRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Profil & Level Toko' };

const LEVELS = [
  { level: 1, nama: 'Calon Juragan', icon: '🟤', pesanan: 0, rating: 0, keberhasilan: 0, color: '#8b6914' },
  { level: 2, nama: 'Juragan Menengah', icon: '🥈', pesanan: 500, rating: 4.5, keberhasilan: 90, color: '#9ca3af' },
  { level: 3, nama: 'Juragan Besar', icon: '🥇', pesanan: 1000, rating: 4.7, keberhasilan: 95, color: '#f59e0b' },
  { level: 4, nama: 'Dewa Juragan', icon: '💎', pesanan: 5000, rating: 4.8, keberhasilan: 98, color: '#00d4ff' },
];

export default function ProfilTokoPage() {
  const seller = sellers[0];
  const currentLevel = LEVELS.find(l => l.level === seller.level)!;
  const nextLevel = LEVELS.find(l => l.level === seller.level + 1);

  const progressPesanan = nextLevel ? Math.min(100, (seller.totalPesananSelesai / nextLevel.pesanan) * 100) : 100;
  const progressRating = nextLevel ? Math.min(100, (seller.rating / nextLevel.rating) * 100) : 100;
  const progressKH = nextLevel ? Math.min(100, (seller.keberhasilan / nextLevel.keberhasilan) * 100) : 100;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Profil & Level Toko</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Tingkatkan performa toko untuk naik level dan mendapatkan kepercayaan lebih banyak buyer.</p>

      {/* Current level banner */}
      <div style={{
        background: `linear-gradient(135deg, ${currentLevel.color}22, ${currentLevel.color}11)`,
        border: `1px solid ${currentLevel.color}44`,
        borderRadius: 16, padding: '28px 32px', marginBottom: 24,
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>Level Toko Saat Ini</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 40 }}>{currentLevel.icon}</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: currentLevel.color }}>{currentLevel.nama}</span>
          </div>
          {nextLevel && (
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Yuk naik ke <strong style={{ color: nextLevel.color }}>{nextLevel.icon} {nextLevel.nama}</strong>! Dapatkan lebih banyak kepercayaan buyer.
            </p>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          {/* Level path visual */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {LEVELS.map((lv, idx) => (
              <div key={lv.level} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: seller.level >= lv.level ? `${lv.color}33` : 'var(--bg-secondary)',
                  border: `2px solid ${seller.level >= lv.level ? lv.color : 'var(--border-color)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  opacity: seller.level >= lv.level ? 1 : 0.4,
                  filter: seller.level === lv.level ? 'drop-shadow(0 0 8px ' + lv.color + ')' : 'none'
                }}>
                  {lv.icon}
                </div>
                {idx < LEVELS.length - 1 && (
                  <div style={{ width: 24, height: 2, background: seller.level > lv.level ? 'var(--brand-cyan)' : 'var(--border-color)' }}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress menuju level berikutnya */}
      {nextLevel && (
        <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Progress Menuju {nextLevel.icon} {nextLevel.nama}</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Penuhi semua syarat berikut sebelum naik level</p>

          {[
            { label: 'Total Pesanan Selesai', current: seller.totalPesananSelesai, target: nextLevel.pesanan, unit: 'pesanan', progress: progressPesanan, done: seller.totalPesananSelesai >= nextLevel.pesanan },
            { label: 'Rating Toko', current: seller.rating, target: nextLevel.rating, unit: '/ 5.0', progress: progressRating, done: seller.rating >= nextLevel.rating },
            { label: 'Keberhasilan Toko', current: seller.keberhasilan, target: nextLevel.keberhasilan, unit: '%', progress: progressKH, done: seller.keberhasilan >= nextLevel.keberhasilan },
          ].map(req => (
            <div key={req.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {req.done && <CheckCircle size={14} color="var(--color-success)"/>}
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{req.label}</span>
                </div>
                <span style={{ fontSize: 13, color: req.done ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                  <strong>{req.current.toLocaleString('id')}</strong> / {req.target.toLocaleString('id')} {req.unit}
                </span>
              </div>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${req.progress}%`, background: req.done ? 'linear-gradient(90deg, #00c896, #00a87a)' : undefined }}/>
              </div>
              {!req.done && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Butuh {(req.target - req.current).toLocaleString('id')} {req.unit} lagi
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Semua level */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Semua Level Toko</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {LEVELS.map(lv => {
            const isCurrentOrPast = seller.level >= lv.level;
            const isCurrent = seller.level === lv.level;
            return (
              <div key={lv.level} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 16px', borderRadius: 10,
                background: isCurrent ? `${lv.color}15` : 'var(--bg-secondary)',
                border: `1px solid ${isCurrent ? lv.color + '44' : 'var(--border-color)'}`,
                opacity: lv.level > seller.level + 1 ? 0.5 : 1,
              }}>
                <div style={{ fontSize: 28, width: 40, textAlign: 'center' }}>{lv.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: isCurrentOrPast ? lv.color : 'var(--text-secondary)' }}>{lv.nama}</div>
                  {lv.pesanan > 0 && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {lv.pesanan.toLocaleString('id')}+ pesanan • Rating ≥{lv.rating} • Keberhasilan ≥{lv.keberhasilan}%
                    </div>
                  )}
                </div>
                {isCurrentOrPast ? (
                  <span className="badge badge-success">{isCurrent ? 'Level Saat Ini' : '✅ Tercapai'}</span>
                ) : (
                  <span className="badge badge-info">Terkunci 🔒</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
