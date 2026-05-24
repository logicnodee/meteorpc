import type { Metadata } from 'next';
import { sellers, kategoris } from '@/lib/data';
import { Award, Trophy, Medal, Crown } from 'lucide-react';

export const metadata: Metadata = { title: 'Pencapaian Toko' };

export default function PencapaianPage() {
  const seller = sellers[0];

  const ranking = [
    { rank: 1, namaToko: 'TechStore Indonesia', username: 'techstore_id', kategori: 'RAM', penjualan: 342, rating: 4.9, isSelf: true },
    { rank: 2, namaToko: 'PCMaster Jogja', username: 'pcmaster', kategori: 'RAM', penjualan: 287, rating: 4.8, isSelf: false },
    { rank: 3, namaToko: 'SpareHolic', username: 'spareholic', kategori: 'RAM', penjualan: 201, rating: 4.7, isSelf: false },
  ];

  const hadiah = [
    { icon: '🏅', title: 'Emblem Eksklusif', desc: 'Ditampilkan permanen di halaman toko dan produk kamu selamanya', durasi: 'Permanen' },
    { icon: '⭐', title: 'Prioritas Beranda & Search', desc: 'Produk dan toko kamu tampil lebih tinggi di hasil pencarian', durasi: '1 bulan' },
    { icon: '🗑️', title: 'Hak Hapus Ulasan Negatif', desc: 'Bisa hapus maks 5 ulasan negatif per bulan', durasi: '1 bulan' },
    { icon: '📢', title: 'Promosi Sosial Media', desc: 'Toko kamu dipromosikan di Instagram & TikTok MeteorPC', durasi: 'Sekali' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Pencapaian Toko</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        Toko dengan penjualan terbanyak di setiap kategori setiap bulan mendapatkan emblem eksklusif dan hadiah menarik.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        {/* Main content */}
        <div>
          {/* Info sistem */}
          <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Apa Itu Pencapaian Toko?</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Toko yang memiliki performa terbaik di salah satu kategori akan dinobatkan sebagai pemenang dan mendapatkan emblem digital.
              Perhitungan pemenang dilakukan setiap bulan dan pemenang tidak dapat menang lagi di kategori yang sama selama 1 bulan,
              tetapi kamu masih bisa menang di kategori lainnya.
            </p>
          </div>

          {/* Hadiah pemenang */}
          <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>🎁 Hadiah Pemenang Bulanan</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {hadiah.map(h => (
                <div key={h.title} style={{ display: 'flex', gap: 14, padding: '12px', background: 'var(--bg-secondary)', borderRadius: 10 }}>
                  <div style={{ fontSize: 24, width: 40, textAlign: 'center', flexShrink: 0 }}>{h.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{h.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{h.desc}</div>
                    <span className="badge badge-info" style={{ fontSize: 10 }}>⏱ {h.durasi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking bulan ini */}
          <div className="card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontWeight: 700, fontSize: 15 }}>📊 Ranking Bulan Ini — Kategori RAM</h2>
              <select className="input" style={{ width: 'auto', fontSize: 12, padding: '5px 8px', cursor: 'pointer' }}>
                <option>RAM</option>
                <option>SSD & Storage</option>
                <option>Laptop Second</option>
              </select>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {ranking.map(r => (
                <div key={r.rank} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 10,
                  background: r.isSelf ? 'rgba(0,212,255,0.08)' : 'var(--bg-secondary)',
                  border: r.isSelf ? '1px solid rgba(0,212,255,0.3)' : '1px solid var(--border-color)',
                }}>
                  <div style={{ width: 32, textAlign: 'center', fontSize: r.rank <= 3 ? 22 : 14, fontWeight: 700 }}>
                    {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `#${r.rank}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {r.namaToko}
                      {r.isSelf && <span className="badge badge-cyan" style={{ fontSize: 10 }}>Toko Kamu</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>@{r.username}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: 'var(--brand-cyan)' }}>{r.penjualan} terjual</div>
                    <div style={{ fontSize: 11, color: '#fbbf24' }}>★ {r.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Emblem & riwayat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Emblem dimiliki */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🏅 Emblem Saya</h3>
            {seller.pencapaian.length > 0 ? (
              seller.pencapaian.map((pc, i) => (
                <div key={i} style={{ padding: '10px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 18 }}>{pc.emblem}</span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>Pemenang {pc.kategori}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pc.bulan}</div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Belum ada emblem. Tingkatkan penjualan!</p>
            )}
          </div>

          {/* Tips menang */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>💡 Cara Menang</h3>
            <div style={{ display: 'grid', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              {[
                'Tingkatkan stok & variasi produk',
                'Respons pesanan dengan cepat',
                'Jaga rating toko tetap tinggi',
                'Aktifkan toko setiap hari',
                'Beri deskripsi produk yang jelas',
              ].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--brand-cyan)', flexShrink: 0 }}>✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
