import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { produk } from '@/lib/data';
import CategoryFilterClient from '@/components/category/CategoryFilterClient';
import { Search as SearchIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pencarian Produk — MeteorPC',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || '';

  const produkList = query
    ? produk.filter(p => p.status === 'live' && p.nama.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <>
      <Navbar/>
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px', minHeight: '80vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,95,204,0.1)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800 }}>Hasil Pencarian: &quot;{query}&quot;</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Ditemukan {produkList.length} produk</p>
          </div>
        </div>
        
        <CategoryFilterClient initialProducts={produkList} />
      </main>
      <Footer/>
    </>
  );
}
