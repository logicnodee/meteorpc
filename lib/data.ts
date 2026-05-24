// Mock Data — MeteorPC Marketplace

export type KategoriStatus = 'belum' | 'pending' | 'approved' | 'rejected';
export type TokoStatus = 'buka' | 'tutup';
export type VerifikasiStatus = 'belum' | 'pending' | 'verified' | 'rejected';
export type ProdukStatus = 'draft' | 'pending' | 'live' | 'rejected' | 'archived';
export type OrderStatus = 'menunggu_bayar' | 'dibayar' | 'dikirim' | 'diterima' | 'hold' | 'selesai' | 'komplain' | 'refund';
export type LevelToko = 1 | 2 | 3 | 4;

export const LEVEL_NAMES: Record<LevelToko, { nama: string; icon: string; color: string }> = {
  1: { nama: 'Calon Juragan', icon: '🟤', color: '#8b6914' },
  2: { nama: 'Juragan Menengah', icon: '🥈', color: '#9ca3af' },
  3: { nama: 'Juragan Besar', icon: '🥇', color: '#f59e0b' },
  4: { nama: 'Dewa Juragan', icon: '💎', color: '#00d4ff' },
};

export const bestSellersPerKategori: Record<string, string> = {
  'ram': 'seller-1',
  'ssd': 'seller-1',
  'laptop-gaming': 'seller-2',
  'baterai': 'seller-3',
  'laptop-bisnis': 'seller-2',
};

export const LEVEL_REQUIREMENTS = [
  { level: 2, pesanan: 500, rating: 4.5, keberhasilan: 90 },
  { level: 3, pesanan: 1000, rating: 4.7, keberhasilan: 95 },
  { level: 4, pesanan: 5000, rating: 4.8, keberhasilan: 98 },
];

export const BANKS = [
  'BCA', 'BRI', 'BNI', 'Mandiri', 'CIMB Niaga', 'Bank Danamon',
  'Bank Permata', 'Bank BTN', 'Bank Mega', 'Jenius (BTPN)',
  'OVO', 'GoPay', 'Dana', 'ShopeePay',
];

export const kategoris = [
  {
    id: 'sparepart-laptop',
    nama: 'Sparepart Laptop',
    slug: 'sparepart-laptop',
    icon: 'Wrench',
    holdPeriod: 3,
    fee: 2,
    perluModerasi: true,
    produkCount: 1240,
    subkategori: [
      { id: 'ram', nama: 'RAM', slug: 'ram', icon: 'Cpu', produkCount: 342, katalog: ['RAM DDR4 8GB 3200MHz Kingston', 'RAM DDR4 16GB 2666MHz Corsair Vengeance', 'RAM Sodimm DDR3 4GB 1600MHz Samsung'] },
      { id: 'ssd', nama: 'SSD & Storage', slug: 'ssd', icon: 'HardDrive', produkCount: 218, katalog: ['SSD NVMe 256GB Samsung 980', 'SSD SATA 512GB WD Blue', 'SSD M.2 1TB Kingston NV2'] },
      { id: 'baterai', nama: 'Baterai', slug: 'baterai', icon: 'Battery', produkCount: 189, katalog: ['Baterai Asus VivoBook A412', 'Baterai Lenovo ThinkPad T480'] },
      { id: 'lcd', nama: 'Layar & LCD', slug: 'lcd', icon: 'Monitor', produkCount: 156, katalog: ['LCD Panel 14.0 Slim 30 Pin', 'LCD Panel 15.6 IPS 144Hz'] },
      { id: 'keyboard', nama: 'Keyboard', slug: 'keyboard', icon: 'Keyboard', produkCount: 134, katalog: ['Keyboard Asus X441 Series', 'Keyboard Lenovo IdeaPad 320'] },
      { id: 'motherboard', nama: 'Motherboard', slug: 'motherboard', icon: 'Cpu', produkCount: 201, katalog: ['Motherboard Acer Nitro 5', 'Motherboard HP Pavilion 14'] },
    ],
  },
  {
    id: 'laptop',
    nama: 'Laptop',
    slug: 'laptop',
    icon: 'Laptop',
    holdPeriod: 7,
    fee: 2,
    perluModerasi: true,
    produkCount: 876,
    subkategori: [
      { id: 'laptop-gaming', nama: 'Laptop Gaming', slug: 'laptop-gaming', icon: 'Gamepad2', produkCount: 312, katalog: ['ASUS ROG Strix G15', 'Acer Predator Helios 300', 'Lenovo Legion 5 Pro'] },
      { id: 'laptop-bisnis', nama: 'Laptop Bisnis', slug: 'laptop-bisnis', icon: 'Briefcase', produkCount: 287, katalog: ['Lenovo ThinkPad X1 Carbon', 'Dell Latitude 7420', 'HP EliteBook 840 G8'] },
      { id: 'laptop-pelajar', nama: 'Laptop Pelajar', slug: 'laptop-pelajar', icon: 'BookOpen', produkCount: 277, katalog: ['Asus VivoBook 14', 'Lenovo IdeaPad Slim 3', 'Acer Aspire 5'] },
    ],
  },
  {
    id: 'aksesoris',
    nama: 'Aksesoris',
    slug: 'aksesoris',
    icon: 'Mouse',
    holdPeriod: 2,
    fee: 1.5,
    perluModerasi: false,
    produkCount: 543,
    subkategori: [
      { id: 'cooling-pad', nama: 'Cooling Pad', slug: 'cooling-pad', icon: 'Snowflake', produkCount: 98, katalog: ['DeepCool MultiCore X6', 'Kootek Laptop Cooling Pad'] },
      { id: 'tas-laptop', nama: 'Tas Laptop', slug: 'tas-laptop', icon: 'Briefcase', produkCount: 145, katalog: ['Targus Classic Clamshell 15.6"', 'Xiaomi Mi City Backpack'] },
      { id: 'mouse', nama: 'Mouse & Keyboard', slug: 'mouse', icon: 'MousePointer2', produkCount: 300, katalog: ['Logitech G102 Lightsync', 'Razer DeathAdder Essential', 'Logitech K380 Bluetooth'] },
    ],
  },
];

export const sellers = [
  {
    id: 'seller-1',
    username: 'techstore_id',
    namaToko: 'TechStore Indonesia',
    avatar: 'https://picsum.photos/seed/tech1/100/100',
    banner: '#1a1f5e',
    deskripsi: 'Spesialis sparepart laptop original dan laptop second berkualitas. Bergaransi 30 hari.',
    level: 3 as LevelToko,
    status: 'buka' as TokoStatus,
    jamBuka: '08:00',
    jamTutup: '22:00',
    verifikasi: 'verified' as VerifikasiStatus,
    rating: 4.9,
    totalPesananSelesai: 2847,
    keberhasilan: 98.2,
    totalProduk: 156,
    bergabungSejak: '2023-01-15',
    kota: 'Jakarta',
    pencapaian: [
      { kategori: 'RAM', bulan: 'April 2025', emblem: '🏅' },
      { kategori: 'SSD & Storage', bulan: 'Februari 2025', emblem: '🏅' },
    ],
    ulasanBreakdown: { 5: 951, 4: 11, 3: 1, 2: 0, 1: 4 },
  },
  {
    id: 'seller-2',
    username: 'laptop_murah',
    namaToko: 'Laptop Murah Official',
    avatar: 'https://picsum.photos/seed/tech2/100/100',
    banner: '#1a2f1e',
    deskripsi: 'Jual beli laptop second harga bersahabat. Stok selalu update!',
    level: 2 as LevelToko,
    status: 'buka' as TokoStatus,
    jamBuka: '09:00',
    jamTutup: '21:00',
    verifikasi: 'verified' as VerifikasiStatus,
    rating: 4.7,
    totalPesananSelesai: 634,
    keberhasilan: 96.4,
    totalProduk: 89,
    bergabungSejak: '2023-06-20',
    kota: 'Surabaya',
    pencapaian: [],
    ulasanBreakdown: { 5: 412, 4: 87, 3: 22, 2: 8, 1: 5 },
  },
  {
    id: 'seller-3',
    username: 'sparepart_jogja',
    namaToko: 'Sparepart Jogja',
    avatar: 'https://picsum.photos/seed/tech3/100/100',
    banner: '#2a1a3e',
    deskripsi: 'Toko sparepart laptop terpercaya di Jogja. Pengiriman same day available.',
    level: 1 as LevelToko,
    status: 'tutup' as TokoStatus,
    jamBuka: '09:00',
    jamTutup: '17:00',
    verifikasi: 'verified' as VerifikasiStatus,
    rating: 4.5,
    totalPesananSelesai: 187,
    keberhasilan: 94.1,
    totalProduk: 43,
    bergabungSejak: '2024-02-10',
    kota: 'Yogyakarta',
    pencapaian: [],
    ulasanBreakdown: { 5: 143, 4: 29, 3: 10, 2: 3, 1: 2 },
  },
];

export const produk = [
  {
    id: 'p-001',
    nama: 'RAM DDR4 8GB 3200MHz Kingston',
    slug: 'ram-ddr4-8gb-3200mhz-kingston',
    harga: 185000,
    hargaCoret: 220000,
    kategoriId: 'ram',
    kategoriNama: 'RAM',
    kondisi: 'Baru',
    stok: 15,
    terjual: 342,
    rating: 4.9,
    ulasanCount: 287,
    gambar: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&q=80'],
    deskripsi: 'RAM DDR4 8GB 3200MHz brand Kingston. Original bukan KW. Garansi resmi 5 tahun. Compatible dengan semua laptop modern.',
    spesifikasi: { kapasitas: '8GB', tipe: 'DDR4', kecepatan: '3200MHz', garansi: '5 tahun' },
    sellerId: 'seller-1',
    sellerNama: 'TechStore Indonesia',
    sellerLevel: 3,
    sellerRating: 4.9,
    status: 'live' as ProdukStatus,
    holdPeriod: 3,
    fee: 2,
    kota: 'Jakarta',
    featured: true,
    garansiInstan: true,
  },
  {
    id: 'p-002',
    nama: 'SSD NVMe 256GB Samsung 980',
    slug: 'ssd-nvme-256gb-samsung-980',
    harga: 425000,
    hargaCoret: 490000,
    kategoriId: 'ssd',
    kategoriNama: 'SSD & Storage',
    kondisi: 'Baru',
    stok: 8,
    terjual: 218,
    rating: 4.8,
    ulasanCount: 194,
    gambar: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80'],
    deskripsi: 'SSD NVMe Samsung 980 256GB. Read speed 3500 MB/s. Plug and play untuk laptop yang support M.2 NVMe.',
    spesifikasi: { kapasitas: '256GB', interface: 'NVMe M.2', readSpeed: '3500 MB/s', writeSpeed: '3000 MB/s' },
    sellerId: 'seller-1',
    sellerNama: 'TechStore Indonesia',
    sellerLevel: 3,
    sellerRating: 4.9,
    status: 'live' as ProdukStatus,
    holdPeriod: 3,
    fee: 2,
    kota: 'Jakarta',
    featured: true,
  },
  {
    id: 'p-003',
    nama: 'Laptop Gaming ASUS ROG Strix G15 RTX 3060',
    slug: 'laptop-gaming-asus-rog-strix-g15-rtx3060',
    harga: 12500000,
    hargaCoret: 15000000,
    kategoriId: 'laptop-gaming',
    kategoriNama: 'Laptop Gaming',
    kondisi: 'Second',
    stok: 1,
    terjual: 12,
    rating: 4.7,
    ulasanCount: 11,
    gambar: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80'],
    deskripsi: 'ASUS ROG Strix G15 second mulus. RAM 16GB, SSD 512GB NVMe, RTX 3060 6GB. Beli 2023, jarang pakai. Mulus tidak ada goresan. Bonus tas + charger original.',
    spesifikasi: { prosesor: 'AMD Ryzen 7 5800H', ram: '16GB DDR4', storage: '512GB NVMe', gpu: 'RTX 3060 6GB', layar: '15.6" 144Hz' },
    sellerId: 'seller-2',
    sellerNama: 'Laptop Murah Official',
    sellerLevel: 2,
    sellerRating: 4.7,
    status: 'pending' as ProdukStatus,
    holdPeriod: 7,
    fee: 2,
    kota: 'Surabaya',
    featured: true,
  },
  {
    id: 'p-004',
    nama: 'Baterai Laptop Asus VivoBook A412',
    slug: 'baterai-laptop-asus-vivobook-a412',
    harga: 185000,
    hargaCoret: null,
    kategoriId: 'baterai',
    kategoriNama: 'Baterai',
    kondisi: 'Baru',
    stok: 20,
    terjual: 189,
    rating: 4.6,
    ulasanCount: 156,
    gambar: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80'],
    deskripsi: 'Baterai replacement untuk Asus VivoBook A412. Kapasitas 3550mAh. OEM quality. Garansi 6 bulan.',
    spesifikasi: { kompatibilitas: 'Asus VivoBook A412 Series', kapasitas: '3550mAh', tipe: 'Li-ion', garansi: '6 bulan' },
    sellerId: 'seller-3',
    sellerNama: 'Sparepart Jogja',
    sellerLevel: 1,
    sellerRating: 4.5,
    status: 'pending' as ProdukStatus,
    holdPeriod: 3,
    fee: 2,
    kota: 'Yogyakarta',
    featured: false,
  },
  {
    id: 'p-005',
    nama: 'RAM DDR4 16GB 2666MHz Corsair Vengeance',
    slug: 'ram-ddr4-16gb-corsair-vengeance',
    harga: 340000,
    hargaCoret: 410000,
    kategoriId: 'ram',
    kategoriNama: 'RAM',
    kondisi: 'Baru',
    stok: 7,
    terjual: 127,
    rating: 4.9,
    ulasanCount: 98,
    gambar: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80'],
    deskripsi: 'RAM DDR4 16GB Corsair Vengeance. Performa tinggi untuk multitasking dan gaming. Garansi lifetime.',
    spesifikasi: { kapasitas: '16GB', tipe: 'DDR4', kecepatan: '2666MHz', garansi: 'Lifetime' },
    sellerId: 'seller-1',
    sellerNama: 'TechStore Indonesia',
    sellerLevel: 3,
    sellerRating: 4.9,
    status: 'live' as ProdukStatus,
    holdPeriod: 3,
    fee: 2,
    kota: 'Jakarta',
    featured: true,
  },
  {
    id: 'p-006',
    nama: 'Laptop Bisnis ThinkPad X1 Carbon i7 Gen 9',
    slug: 'thinkpad-x1-carbon-i7-gen9',
    harga: 9800000,
    hargaCoret: 11500000,
    kategoriId: 'laptop-bisnis',
    kategoriNama: 'Laptop Bisnis',
    kondisi: 'Second',
    stok: 1,
    terjual: 5,
    rating: 5.0,
    ulasanCount: 5,
    gambar: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80'],
    deskripsi: 'ThinkPad X1 Carbon Gen 9 i7-1185G7, RAM 16GB LPDDR4x, SSD 512GB. Layar 14" IPS. Kondisi 98% mulus. Baterai masih kuat 6-7 jam.',
    spesifikasi: { prosesor: 'Intel i7-1185G7', ram: '16GB LPDDR4x', storage: '512GB SSD', layar: '14" IPS FHD', berat: '1.13kg' },
    sellerId: 'seller-2',
    sellerNama: 'Laptop Murah Official',
    sellerLevel: 2,
    sellerRating: 4.7,
    status: 'live' as ProdukStatus,
    holdPeriod: 7,
    fee: 2,
    kota: 'Surabaya',
    featured: false,
  },
];

export const ulasanContoh = [
  {
    id: 'u-001',
    buyerNama: 'Muhammad Raffi P.',
    rating: 5,
    komentar: 'Barang sesuai deskripsi, pengiriman cepat. RAM langsung terpasang dan berfungsi. Penjual responsif.',
    produkNama: 'RAM DDR4 8GB Kingston',
    waktu: '2026-05-24T03:15:57+07:00',
    foto: [],
  },
  {
    id: 'u-002',
    buyerNama: 'Sholeh A.',
    rating: 5,
    komentar: 'Top banget, sudah beli 3x di sini. Selalu oke!',
    produkNama: 'RAM DDR4 8GB Kingston',
    waktu: '2026-05-23T23:58:49+07:00',
    foto: [],
  },
  {
    id: 'u-003',
    buyerNama: 'Lisa R.',
    rating: 4,
    komentar: 'Produk bagus, cuma pengiriman agak lama 3 hari.',
    produkNama: 'SSD NVMe 256GB Samsung',
    waktu: '2026-05-23T23:53:04+07:00',
    foto: [],
  },
];

export const transaksiContoh = [
  {
    id: 'TRX-20260524-001',
    produkId: 'p-001',
    produkNama: 'RAM DDR4 8GB 3200MHz Kingston',
    harga: 185000,
    fee: 3700,
    netSeller: 181300,
    buyerNama: 'Budi Santoso',
    sellerId: 'seller-1',
    status: 'hold' as OrderStatus,
    holdSampai: '2026-05-27T10:00:00+07:00',
    tanggal: '2026-05-24T10:00:00+07:00',
    resi: 'JNE123456789',
    ekspedisi: 'JNE',
  },
  {
    id: 'TRX-20260523-042',
    produkId: 'p-002',
    produkNama: 'SSD NVMe 256GB Samsung 980',
    harga: 425000,
    fee: 8500,
    netSeller: 416500,
    buyerNama: 'Sari Dewi',
    sellerId: 'seller-1',
    status: 'selesai' as OrderStatus,
    holdSampai: null,
    tanggal: '2026-05-23T14:30:00+07:00',
    resi: 'SICEPAT987654',
    ekspedisi: 'SiCepat',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export function getSellerById(id: string) {
  return sellers.find(s => s.id === id);
}

export function getProdukByKategori(slug: string) {
  return produk.filter(p => p.status === 'live' && (p.kategoriId === slug || kategoris.find(k => k.slug === slug)?.subkategori?.some(s => s.slug === p.kategoriId)));
}

export function getTokoIsOpen(seller: typeof sellers[0]): { isOpen: boolean; statusLabel: string; statusColor: string } {
  if (seller.status === 'tutup') return { isOpen: false, statusLabel: 'Sedang Tutup', statusColor: '#ef4444' };
  const now = new Date();
  const [openH, openM] = seller.jamBuka.split(':').map(Number);
  const [closeH, closeM] = seller.jamTutup.split(':').map(Number);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
    return { isOpen: true, statusLabel: 'Sedang Buka', statusColor: '#00c896' };
  }
  return { isOpen: true, statusLabel: 'Di Luar Jam Operasional', statusColor: '#f59e0b' };
}

export function getSellerLevel(pesananSelesai: number, rating: number, keberhasilan: number): LevelToko {
  if (pesananSelesai >= 5000 && rating >= 4.8 && keberhasilan >= 98) return 4;
  if (pesananSelesai >= 1000 && rating >= 4.7 && keberhasilan >= 95) return 3;
  if (pesananSelesai >= 500 && rating >= 4.5 && keberhasilan >= 90) return 2;
  return 1;
}
