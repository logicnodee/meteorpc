import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { produk, sellers, kategoris, formatRupiah, getSellerById, getTokoIsOpen, LEVEL_NAMES } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, Shield, ChevronRight, Clock, Package, ShoppingCart, MessageCircle, Award, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductActions from '@/components/product/ProductActions';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = produk.find(pr => pr.id === id);
  return {
    title: p ? p.nama : 'Produk Tidak Ditemukan',
    description: p ? p.deskripsi.substring(0, 155) : '',
  };
}

export default async function ProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = produk.find(pr => pr.id === id);
  if (!p) notFound();

  const seller = getSellerById(p.sellerId);
  if (!seller) notFound();

  const tokoStatus = getTokoIsOpen(seller);
  const levelInfo = LEVEL_NAMES[seller.level];
  const produkSerupa = produk.filter(pr => pr.kategoriId === p.kategoriId && pr.id !== p.id && pr.status === 'live').slice(0, 4);
  const feePlatform = Math.round(p.harga * p.fee / 100);
  const sellerTerima = p.harga - feePlatform;
  const diskon = p.hargaCoret ? Math.round((1 - p.harga / p.hargaCoret) * 100) : 0;

  return (
    <>
      <Navbar/>
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Beranda</Link>
          <ChevronRight size={14}/>
          <Link href={`/kategori/${p.kategoriId}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{p.kategoriNama}</Link>
          <ChevronRight size={14}/>
          <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{p.nama}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
          {/* Kiri: Gambar & Info */}
          <div>
            {/* Gambar */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ height: 360, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96, borderBottom: '1px solid var(--border-color)', overflow: 'hidden' }}>
                {p.gambar[0]?.startsWith('http') ? (
                  <img src={p.gambar[0]} alt={p.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  p.gambar[0]
                )}
              </div>
              {p.gambar.length > 1 && (
                <div style={{ padding: 12, display: 'flex', gap: 8, overflowX: 'auto' }}>
                  {p.gambar.slice(0, 3).map((g, i) => (
                    <div key={i} style={{ width: 60, height: 60, borderRadius: 8, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: i === 0 ? '2px solid var(--brand-blue)' : '2px solid var(--border-color)', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
                      {g.startsWith('http') ? (
                        <img src={g} alt={`${p.nama} ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        g
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deskripsi */}
            <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
              <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Deskripsi Produk</h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p.deskripsi}</p>
            </div>

            {/* Spesifikasi */}
            <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
              <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Spesifikasi</h2>
              <div style={{ display: 'grid', gap: 8 }}>
                {Object.entries(p.spesifikasi).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)', fontSize: 14 }}>
                    <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}</span>
                    <span style={{ fontWeight: 600 }}>{val as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Safe Trading */}
            <div style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <ShieldCheck size={18} color="var(--color-success)"/>
                <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>
                  {p.kondisi === 'Baru' ? 'Garansi MeteorPC: 100% Sesuai Deskripsi' : 'Dilindungi Safe Trading MeteorPC'}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {p.kondisi === 'Baru' ? (
                  <>
                    Produk ini berstatus <strong>Baru</strong> dan telah melewati proses moderasi ketat oleh Admin. Jika barang yang datang terbukti palsu, tidak BNIB, atau tidak sesuai spesifikasi pabrik, dana Anda aman dan <strong>garansi uang kembali 100%</strong>. Komplain maksimal <strong style={{ color: 'var(--brand-cyan)' }}>{p.holdPeriod} hari</strong> setelah barang diterima.
                  </>
                ) : (
                  <>
                    Dana kamu akan diparkir aman di sistem kami selama <strong style={{ color: 'var(--brand-cyan)' }}>{p.holdPeriod} hari</strong> setelah barang diterima. Karena ini produk <strong>Second/Bekas</strong>, mohon periksa kesesuaian barang dengan deskripsi dari seller sebelum menyelesaikan pesanan. Jika ada masalah, admin siap memediasi.
                  </>
                )}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Harga produk</div>
                  <div style={{ fontWeight: 700 }}>{formatRupiah(p.harga)}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Fee platform ({p.fee}%)</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-warning)' }}>{formatRupiah(feePlatform)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Harga & Seller */}
          <div style={{ position: 'sticky', top: 80 }}>
            {/* Harga card */}
            <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
              <div style={{ marginBottom: 4 }}>
                <span className={`badge ${p.kondisi === 'Baru' ? 'badge-success' : 'badge-warning'}`}>{p.kondisi}</span>
              </div>
              <h1 style={{ fontSize: 18, fontWeight: 700, margin: '8px 0' }}>{p.nama}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Star size={13} fill="#fbbf24" color="#fbbf24"/>
                <span>{p.rating} ({p.ulasanCount} ulasan)</span>
                <span>•</span>
                <span>{p.terjual} terjual</span>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--brand-cyan)' }}>{formatRupiah(p.harga)}</div>
              </div>

              {/* Stok */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13 }}>
                <Package size={14} color="var(--text-muted)"/>
                <span style={{ color: 'var(--text-muted)' }}>Stok:</span>
                <span style={{ fontWeight: 600, color: p.stok > 5 ? 'var(--color-success)' : 'var(--color-warning)' }}>{p.stok} unit</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13 }}>
                <MapPin size={14} color="var(--text-muted)"/>
                <span style={{ color: 'var(--text-muted)' }}>Lokasi:</span>
                <span style={{ fontWeight: 600 }}>{p.kota}</span>
              </div>

              <ProductActions tokoTutup={!tokoStatus.isOpen && seller.status === 'tutup'} imageSrc={p.gambar[0].startsWith('http') ? p.gambar[0] : ''} stok={p.stok} productId={p.id} />
            </div>

            {/* Seller card */}
            <Link href={`/toko/${seller.username}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: seller.banner, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, overflow: 'hidden', flexShrink: 0 }}>
                    {seller.avatar.startsWith('http') ? (
                      <img src={seller.avatar} alt={seller.namaToko} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      seller.avatar
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{seller.namaToko}</div>
                      {seller.verifikasi === 'verified' && (
                        <ShieldCheck size={14} fill="var(--brand-blue)" color="#fff" />
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: seller.status === 'online' ? 'var(--color-success)' : 'var(--text-muted)' }} />
                        {seller.status === 'online' ? 'Online' : 'Terakhir online 25 menit lalu'}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand-cyan)' }}>{seller.rating}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{seller.totalPesananSelesai.toLocaleString('id')}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Pesanan</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-success)' }}>{seller.keberhasilan}%</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Berhasil</div>
                  </div>
                </div>
                {seller.verifikasi === 'verified' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '6px 10px', background: 'rgba(0,200,150,0.1)', borderRadius: 8, fontSize: 12, color: 'var(--color-success)' }}>
                    <Shield size={12}/> Toko Terverifikasi
                  </div>
                )}
                {seller.pencapaian.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                    {seller.pencapaian.map((pc, i) => (
                      <span key={i} title={`${pc.kategori} — ${pc.bulan}`} className="badge badge-warning" style={{ fontSize: 10 }}>
                        {pc.emblem} {pc.kategori}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Produk Serupa */}
        {produkSerupa.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Produk Serupa</h2>
            <div className="horizontal-scroll">
              {produkSerupa.map(pr => (
                <div key={pr.id} style={{ minWidth: 200, maxWidth: 220, flex: '0 0 auto' }}>
                  <ProductCard {...pr} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer/>
    </>
  );
}
