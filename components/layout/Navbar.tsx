'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Bell, Menu, X, ChevronDown, Laptop, Cpu, Package, Wrench, Store, ShieldCheck, User } from 'lucide-react';

import { useRouter } from 'next/navigation';

const navKategoris = [
  { label: 'Sparepart', icon: <Wrench size={16}/>, href: '/kategori/sparepart-laptop' },
  { label: 'Laptop Second', icon: <Laptop size={16}/>, href: '/kategori/laptop-second' },
  { label: 'Aksesoris', icon: <Package size={16}/>, href: '/kategori/aksesoris' },
  { label: 'RAM', icon: <Cpu size={16}/>, href: '/kategori/ram' },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [cartCount, setCartCount] = useState(2);

  React.useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const qty = customEvent.detail?.qty || 1;
      setCartCount(c => c + qty);
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <header style={{ background: 'var(--brand-blue)', borderBottom: '1px solid rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 900, color: 'var(--brand-blue)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>M</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>
              MeteorPC
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 560, position: 'relative' }}>
            <input
              className="input"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Cari sparepart, laptop second..."
              style={{ paddingLeft: 40, paddingRight: 14, width: '100%' }}
            />
            <button type="submit" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </button>
          </form>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <Link href="/keranjang" id="cart-nav-icon" className="btn btn-ghost btn-sm" style={{ position: 'relative', color: '#fff' }}>
              <ShoppingCart size={18}/>
              <span style={{ fontSize: 13 }}>Keranjang</span>
              <span style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, background: 'var(--brand-orange)', borderRadius: '50%', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', transform: 'scale(1)', transition: 'transform 0.2s' }}>{cartCount}</span>
            </Link>
            <Link href="/akun" className="btn btn-ghost btn-sm" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={18}/>
              <span style={{ fontSize: 13 }}>Akun</span>
            </Link>
            <Link href="/dashboard/admin" className="btn btn-sm" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '6px 14px', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
              <ShieldCheck size={16} /> Admin
            </Link>
            <Link href="/dashboard/seller" className="btn btn-sm" style={{ background: 'var(--brand-orange)', color: '#fff', padding: '6px 14px', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
              <Store size={16} /> Buka Toko
            </Link>
            <Link href="/auth" className="btn btn-sm" style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '6px 14px', borderRadius: 8, textDecoration: 'none' }}>Masuk</Link>
            <Link href="/auth?tab=register" className="btn btn-sm" style={{ background: '#fff', color: 'var(--brand-blue)', padding: '6px 14px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Daftar</Link>
            <button className="btn btn-ghost btn-sm" style={{ display: 'none', color: '#fff' }} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingBottom: 10, overflowX: 'auto' }}>
          {navKategoris.map(k => (
            <Link key={k.href} href={k.href} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6,
              textDecoration: 'none', fontSize: 13, color: 'rgba(255,255,255,0.8)',
              transition: 'all 0.2s', whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {k.icon} {k.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
