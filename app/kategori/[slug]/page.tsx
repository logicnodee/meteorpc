import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { kategoris, produk } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Filter, ChevronRight, Shield, Package, PackageSearch } from 'lucide-react';
import IconMapper from '@/components/layout/IconMapper';
import CategoryFilterClient from '@/components/category/CategoryFilterClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const kat = kategoris.find(k => k.slug === slug) || kategoris.flatMap(k => k.subkategori).find(s => s.slug === slug);
  return {
    title: kat ? `${kat.nama} — Jual Beli Sparepart Laptop` : 'Kategori',
    description: `Temukan ${kat?.nama} terbaik di MeteorPC. Harga bersaing, seller terverifikasi, transaksi aman.`,
  };
}

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kat = kategoris.find(k => k.slug === slug) || kategoris.flatMap(k => k.subkategori).find(s => s.slug === slug);
  if (!kat) notFound();

  const validKategoriIds = [kat.id, slug];
  if ('subkategori' in kat && kat.subkategori) {
    validKategoriIds.push(...kat.subkategori.map(s => s.id), ...kat.subkategori.map(s => s.slug));
  }

  const produkList = produk.filter(p => p.status === 'live' && validKategoriIds.includes(p.kategoriId));
  const parentKat = kategoris.find(k => k.slug === slug || k.subkategori?.some(s => s.slug === slug));

  return (
    <>
      <Navbar/>
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Beranda</Link>
          <ChevronRight size={14}/>
          {parentKat && parentKat.slug !== slug && (
            <><Link href={`/kategori/${parentKat.slug}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{parentKat.nama}</Link><ChevronRight size={14}/></>
          )}
          <span style={{ color: 'var(--text-primary)' }}>{kat.nama}</span>
        </div>

        {/* Header kategori */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, background: 'rgba(0,95,204,0.1)', borderRadius: 12, color: 'var(--brand-blue)' }}>
              <IconMapper name={kat.icon || 'Box'} size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{kat.nama}</h1>
              <div style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--text-muted)' }}>
                <span>{produkList.length} produk ditemukan</span>
                {'holdPeriod' in kat && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brand-blue)' }}>
                    <Shield size={13}/> Hold dana {kat.holdPeriod} hari
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Subkategori quick filter */}
          {parentKat && parentKat.subkategori && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link href={`/kategori/${parentKat.slug}`} className="badge" style={{ 
                textDecoration: 'none', cursor: 'pointer', 
                background: slug === parentKat.slug ? 'var(--brand-cyan)' : '#fff', 
                border: slug === parentKat.slug ? 'none' : '1px solid var(--border-color)', 
                color: slug === parentKat.slug ? '#fff' : 'var(--text-secondary)' 
              }}>
                <Package size={14}/> <span style={{ marginLeft: 4 }}>Semua {parentKat.nama}</span>
              </Link>
              {parentKat.subkategori.map((s: any) => {
                const isActive = slug === s.slug;
                return (
                  <Link key={s.slug} href={`/kategori/${s.slug}`} className="badge" style={{ 
                    textDecoration: 'none', cursor: 'pointer', 
                    background: isActive ? 'var(--brand-cyan)' : '#fff', 
                    border: isActive ? 'none' : '1px solid var(--border-color)', 
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center'
                  }}>
                    <IconMapper name={s.icon || 'Box'} size={14} /> <span style={{ marginLeft: 4 }}>{s.nama}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <CategoryFilterClient initialProducts={produkList} />
      </main>
      <Footer/>
    </>
  );
}
