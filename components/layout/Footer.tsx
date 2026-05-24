'use client';
import Link from 'next/link';
import { Shield, Star, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 16px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00d4ff,#0066cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff' }}>M</div>
              <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#0066cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MeteorPC</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Marketplace khusus sparepart laptop & laptop second terpercaya. Fee rendah, transaksi aman.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)' }}>
                <Shield size={13} color="var(--color-success)"/>
                <span style={{ fontSize: 11, color: 'var(--color-success)', fontWeight: 600 }}>Safe Trading</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 8, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
                <span style={{ fontSize: 11, color: 'var(--brand-cyan)', fontWeight: 600 }}>Fee ab. 1.5%</span>
              </div>
            </div>
          </div>

          {/* Belanja */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Belanja</h4>
            {['Sparepart Laptop','Laptop Second','RAM','SSD & Storage','Baterai','Aksesoris'].map(item => (
              <Link key={item} href="#" style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--brand-cyan)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
              >{item}</Link>
            ))}
          </div>

          {/* Seller */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Untuk Seller</h4>
            {['Daftar Jadi Seller','Panduan Berjualan','Verifikasi Toko','Kualifikasi Kategori','Pencapaian Toko'].map(item => (
              <Link key={item} href="#" style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--brand-cyan)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
              >{item}</Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Informasi</h4>
            {['Tentang MeteorPC','Kebijakan Privasi','Syarat & Ketentuan','Hubungi Kami','Bantuan'].map(item => (
              <Link key={item} href="#" style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--brand-cyan)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
              >{item}</Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2026 MeteorPC. Semua hak dilindungi.</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Marketplace Sparepart Laptop & Laptop Second #1 Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
