import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import IconMapper from '@/components/layout/IconMapper';
import { produk, kategoris, sellers, formatRupiah, getTokoIsOpen } from '@/lib/data';
import Link from 'next/link';
import { Shield, Zap, TrendingUp, Star, ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MeteorPC — Marketplace Sparepart Laptop & Laptop Second',
  description: 'Beli sparepart laptop original dan laptop second berkualitas dengan harga terbaik. Fee rendah 2%, transaksi aman dengan sistem Safe Trading escrow.',
};

export default function HomePage() {
  const featuredProduk = produk.filter(p => p.status === 'live');
  const verifiedSellers = sellers.filter(s => s.verifikasi === 'verified');

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

        {/* ============ SAFE TRADING BANNER ============ */}
        <section style={{ background: '#e0f2fe', borderBottom: '1px solid #bae6fd', padding: '12px 16px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { icon: <Shield size={16} color="var(--brand-blue)"/>, title: 'Safe Trading', desc: 'Dana diparkir aman' },
              { icon: <Zap size={16} color="var(--brand-orange)"/>, title: 'Fee Rendah', desc: 'Hanya 2% per transaksi' },
              { icon: <Star size={16} color="#f59e0b"/>, title: 'Seller Terverifikasi', desc: 'KTP & Moderasi ketat' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
          
          {/* ============ PRODUK TERLARIS ============ */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 className="section-title">🔥 Produk Terlaris</h2>
                <p className="section-subtitle">Paling banyak dicari minggu ini</p>
              </div>
              <Link href="/kategori/sparepart-laptop" className="btn btn-ghost btn-sm">
                Lihat Semua <ChevronRight size={14}/>
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {produk.sort((a,b) => b.terjual - a.terjual).slice(0, 10).map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>

          {/* ============ KATEGORI ============ */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 className="section-title">Jelajahi Kategori</h2>
                <p className="section-subtitle">Temukan sparepart dan laptop idamanmu</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {kategoris.map(kat => (
                <Link key={kat.id} href={`/kategori/${kat.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '20px 16px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: 'var(--brand-blue)' }}>
                      <IconMapper name={kat.icon} size={36} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{kat.nama}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kat.produkCount.toLocaleString('id')} produk</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>



          {/* ============ PRODUK UNGGULAN ============ */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 className="section-title">⚡ Produk Unggulan</h2>
                <p className="section-subtitle">Pilihan terbaik dari seller terverifikasi</p>
              </div>
              <Link href="/kategori/sparepart-laptop" className="btn btn-ghost btn-sm">
                Lihat Semua <ChevronRight size={14}/>
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {produk.filter(p => p.featured).map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>

          {/* ============ CTA SELLER ============ */}
          <section>
            <div style={{
              background: 'var(--brand-blue)',
              borderRadius: 20, padding: '48px 32px', textAlign: 'center',
              position: 'relative', overflow: 'hidden', color: '#fff'
            }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Mulai Berjualan di MeteorPC</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
                Fee hanya 2%, buyer terlindungi, seller dipercaya. Bergabung dengan ribuan seller sparepart & laptop di Indonesia.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/auth?tab=register&role=seller" className="btn btn-lg" style={{ background: '#fff', color: 'var(--brand-blue)' }}>
                  Buka Toko Sekarang <ArrowRight size={18}/>
                </Link>
                <Link href="/panduan-seller" className="btn btn-lg" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}>Pelajari Dulu</Link>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
