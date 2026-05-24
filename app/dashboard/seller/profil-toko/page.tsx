'use client';
import React, { useState } from 'react';
import { Edit2, Copy, Image as ImageIcon } from 'lucide-react';
import { sellers } from '@/lib/data';

export default function ProfilTokoPage() {
  const seller = sellers[0];
  
  const [namaToko, setNamaToko] = useState(seller.namaToko);
  const [email, setEmail] = useState('techstore.id@gmail.com');
  const [phone, setPhone] = useState('62895366048051');
  const [discord, setDiscord] = useState('TechStore#0460');
  
  const tokoLink = `https://meteorpc.com/toko/${seller.username}`;

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Edit Profil</h1>

      <div className="card" style={{ padding: 32 }}>
        
        {/* Logo Section */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 8 }}>
            <div style={{ 
              width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden',
              background: seller.avatar.startsWith('http') ? `url(${seller.avatar}) center/cover` : 'var(--brand-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32, fontWeight: 800
            }}>
              {!seller.avatar.startsWith('http') && seller.avatar}
            </div>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pastikan gambar berformat .JPG / .PNG / .GIF</p>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Nama Toko</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{namaToko}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Email</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{email}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Nomor Handphone</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid var(--border-color)', paddingBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{phone}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Link Toko Kamu</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid var(--border-color)', paddingBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{tokoLink}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => {
                navigator.clipboard.writeText(tokoLink);
                alert('Link berhasil disalin ke clipboard!');
              }}>
                <Copy size={16} color="var(--brand-blue)" />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Discord Username</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid var(--border-color)', paddingBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{discord}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
