import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Wallet, Package, Truck, CheckCircle, ChevronRight, User, HelpCircle, MessageSquare, ShieldAlert, Store, LogOut } from 'lucide-react';
import Link from 'next/link';
import { formatRupiah } from '@/lib/data';

export default function AkunPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', paddingBottom: 60 }}>
        {/* Blue Header Section */}
        <div style={{ backgroundColor: '#1e40af', padding: '32px 16px 80px', color: '#fff' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                <User size={32} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Budi Santoso</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: 10, fontWeight: 800 }}>C</div> 0 Koin
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 800 }}>%</div> 2 Kupon
                  </span>
                </div>
              </div>
            </div>
            
            {/* Level and EXP */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, fontWeight: 600 }}>
                <span>Quest: Level 1</span>
                <span>0/- EXP</span>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '20%', height: '100%', backgroundColor: '#fbbf24' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container overlapping the header */}
        <div style={{ maxWidth: 600, margin: '-50px auto 0', padding: '0 16px' }}>
          


          {/* Saldo Toko (if seller) */}
          <Link href="/dashboard/seller" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderRadius: 12, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, color: 'var(--brand-blue)' }}>
                <Store size={20} /> Toko Saya (Seller Dashboard)
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>
          </Link>

          {/* Riwayat Aktivitas */}
          <div className="card" style={{ padding: '20px 16px', marginBottom: 24, borderRadius: 12, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800 }}>Riwayat Aktivitas</h2>
              <Link href="/riwayat-pembelian?tab=Semua" style={{ fontSize: 13, color: 'var(--brand-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>Lihat Semua <ChevronRight size={14} /></Link>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
              <Link href="/riwayat-pembelian?tab=Menunggu Pembayaran" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', position: 'relative' }}>
                  <Wallet size={20} color="#3b82f6" />
                  <div style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 800, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Menunggu<br/>Pembayaran</div>
              </Link>
              <Link href="/riwayat-pembelian?tab=Menunggu Dikirim" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Package size={20} color="#d97706" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Menunggu<br/>Dikirim</div>
              </Link>
              <Link href="/riwayat-pembelian?tab=Sudah Terkirim" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Truck size={20} color="#9333ea" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Sudah<br/>Terkirim</div>
              </Link>
              <Link href="/riwayat-pembelian?tab=Selesai" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <CheckCircle size={20} color="#16a34a" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Selesai</div>
              </Link>
            </div>
          </div>

          {/* Bantuan */}
          <div className="card" style={{ padding: '0', marginBottom: 24, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ padding: '16px 16px 8px', fontSize: 16, fontWeight: 800 }}>Bantuan</div>
            
            <Link href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600 }}>
                <ShieldAlert size={20} color="var(--text-muted)" /> Kendala Pesanan
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </Link>
            
            <Link href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600 }}>
                <HelpCircle size={20} color="var(--text-muted)" /> Pusat Bantuan
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </Link>

            <Link href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600 }}>
                <MessageSquare size={20} color="var(--text-muted)" /> Daftar Komplain
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </Link>
          </div>

          {/* Lainnya */}
          <div className="card" style={{ padding: '0', marginBottom: 24, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <Link href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600 }}>
                Informasi dan Komunitas
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </Link>
            <Link href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600 }}>
                Tentang Kami
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </Link>
          </div>

          <button className="btn btn-outline" style={{ width: '100%', padding: '14px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
            <LogOut size={18} /> Keluar Akun
          </button>
        </div>
      </main>
    </>
  );
}
