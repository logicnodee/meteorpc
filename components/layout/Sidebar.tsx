'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag, Wallet, User, Award, Shield,
  CreditCard, Star, Settings, ChevronRight, Store, BarChart2,
  Users, Tag, AlertTriangle, Trophy, Layers, FileText
} from 'lucide-react';

const sellerMenu = [
  { label: 'Overview', icon: <LayoutDashboard size={16}/>, href: '/dashboard/seller' },
  { label: 'Produk Saya', icon: <Package size={16}/>, href: '/dashboard/seller/produk' },
  { label: 'Riwayat Pesanan', icon: <ShoppingBag size={16}/>, href: '/dashboard/seller/pesanan' },
  { label: 'Saldo Toko', icon: <Wallet size={16}/>, href: '/dashboard/seller/saldo' },
  { label: 'Profil Toko', icon: <User size={16}/>, href: '/dashboard/seller/profil-toko' },
  { label: 'Level Toko', icon: <Award size={16}/>, href: '/dashboard/seller/profil' },
  { label: 'Pencapaian', icon: <Trophy size={16}/>, href: '/dashboard/seller/pencapaian' },
  { label: 'Moderasi Kategori', icon: <Layers size={16}/>, href: '/dashboard/seller/moderasi' },
  { label: 'Verifikasi Toko', icon: <Shield size={16}/>, href: '/dashboard/seller/verifikasi' },
  { label: 'Rekening Bank', icon: <CreditCard size={16}/>, href: '/dashboard/seller/rekening' },
  { label: 'Ulasan Pembeli', icon: <Star size={16}/>, href: '/dashboard/seller/ulasan' },
  { label: 'Pengaturan Toko', icon: <Settings size={16}/>, href: '/dashboard/seller/pengaturan' },
];

const adminMenu = [
  { label: 'Overview', icon: <LayoutDashboard size={16}/>, href: '/dashboard/admin' },
  { label: 'Manajemen Kategori', icon: <Tag size={16}/>, href: '/dashboard/admin/kategori' },
  { label: 'Review Produk', icon: <Package size={16}/>, href: '/dashboard/admin/review-produk' },
  { label: 'Review Toko', icon: <Store size={16}/>, href: '/dashboard/admin/review-toko' },
  { label: 'Verifikasi KTP', icon: <Shield size={16}/>, href: '/dashboard/admin/verifikasi' },
  { label: 'Moderasi Kategori', icon: <Layers size={16}/>, href: '/dashboard/admin/moderasi' },
  { label: 'Manajemen User', icon: <Users size={16}/>, href: '/dashboard/admin/user' },
  { label: 'Monitor Transaksi', icon: <BarChart2 size={16}/>, href: '/dashboard/admin/transaksi' },
  { label: 'Komplain & Mediasi', icon: <AlertTriangle size={16}/>, href: '/dashboard/admin/komplain' },
  { label: 'Pencapaian Toko', icon: <Trophy size={16}/>, href: '/dashboard/admin/pencapaian' },
  { label: 'Konfigurasi Level', icon: <Layers size={16}/>, href: '/dashboard/admin/level' },
  { label: 'Laporan Keuangan', icon: <FileText size={16}/>, href: '/dashboard/admin/laporan' },
];

interface SidebarProps { role: 'seller' | 'admin'; }

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const menu = role === 'seller' ? sellerMenu : adminMenu;
  const title = role === 'seller' ? '🏪 Dashboard Seller' : '⚙️ Panel Admin';

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      minHeight: '100vh',
      padding: '20px 0',
    }}>
      {/* Title */}
      <div style={{ padding: '0 16px 16px', borderBottom: '1px solid var(--border-color)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#00d4ff,#0066cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 14 }}>T</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--brand-cyan)' }}>TechStore Indonesia</span>
        </Link>
        {role === 'admin' && (
          <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
        )}
      </div>

      {/* Menu */}
      <nav style={{ padding: '12px 8px' }}>
        {menu.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none', fontSize: 13, fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--brand-cyan)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(0,212,255,0.1)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--brand-cyan)' : '3px solid transparent',
              transition: 'all 0.2s',
            }}>
              <span style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Switch role */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', marginTop: 8 }}>
        {role === 'seller' ? (
          <Link href="/dashboard/admin" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}>
            ⚙️ Panel Admin
          </Link>
        ) : (
          <Link href="/dashboard/seller" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}>
            🏪 Seller Dashboard
          </Link>
        )}
      </div>
    </aside>
  );
}
