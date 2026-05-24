import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { sellers, produk } from '@/lib/data';
import { Star, Share2, Users, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function TokoPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const seller = sellers.find(s => s.username === username);
  
  if (!seller) {
    notFound();
  }

  const tokoProduk = produk.filter(p => p.sellerId === seller.id);
  
  const totalUlasan = Object.values(seller.ulasanBreakdown).reduce((a, b) => a + b, 0);

  // Helper to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      <Navbar />
      <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
          
          {/* Top Profile Card */}
          <div className="card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: 32, marginBottom: 32 }}>
            
            {/* Left: Store Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                <div style={{ 
                  width: 80, height: 80, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
                  background: seller.avatar.startsWith('http') ? `url(${seller.avatar}) center/cover` : 'var(--brand-blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32, fontWeight: 800
                }}>
                  {!seller.avatar.startsWith('http') && seller.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{seller.namaToko}</h1>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <Share2 size={16} color="var(--text-secondary)" />
                    </button>
                  </div>
                  {seller.verifikasi === 'verified' && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fef08a', color: '#854d0e', fontSize: 11, padding: '2px 8px', borderRadius: 12, fontWeight: 700, marginBottom: 8 }}>
                      Toko Resmi
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
                <div>Toko Dibuka Sejak {formatDate(seller.bergabungSejak)}</div>
                <div>Jam Operasional: {seller.jamBuka} - {seller.jamTutup} WIB</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: seller.status === 'buka' ? '#10b981' : '#94a3b8' }}></div>
                  Terakhir online 6 Menit lalu
                </div>
              </div>
            </div>

            {/* Middle: Transaksi */}
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 32 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Transaksi</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <Users size={16} /> Pembeli
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{seller.totalPesananSelesai} Orang</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>(2 Minggu Terakhir)</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <CheckCircle size={16} /> Terjual
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{seller.keberhasilan}%</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <Clock size={16} /> Rata-rata<br/>Pengiriman
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>3 menit</div>
                </div>
              </div>
            </div>

            {/* Right: Rating */}
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Rating</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 16, fontWeight: 800, color: '#f59e0b' }}>
                    <Star size={16} fill="#f59e0b" color="#f59e0b" /> {seller.rating.toFixed(2)} / 5.0
                  </div>
                </div>
                <a href="#" style={{ fontSize: 13, color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'none' }}>Lihat Semua Ulasan</a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[5, 4, 3, 2, 1].map(star => {
                  const count = seller.ulasanBreakdown[star as keyof typeof seller.ulasanBreakdown];
                  const percentage = totalUlasan > 0 ? (count / totalUlasan) * 100 : 0;
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < star ? "#f59e0b" : "#e2e8f0"} color={i < star ? "#f59e0b" : "#e2e8f0"} />
                        ))}
                      </div>
                      <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--brand-blue)' }}></div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, width: 30, textAlign: 'right' }}>{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom: Products Section */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Tampilkan Semua Produk</p>
            <select style={{ 
              padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', 
              background: '#fff', fontSize: 14, minWidth: 250, outline: 'none'
            }}>
              <option>Tampilkan Semua Produk</option>
              <option>Terbaru</option>
              <option>Terlaris</option>
              <option>Harga Tertinggi</option>
              <option>Harga Terendah</option>
            </select>
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {tokoProduk.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {tokoProduk.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
              Toko ini belum memiliki produk.
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
