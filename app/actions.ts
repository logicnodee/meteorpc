'use server';

import { produk } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function getReviewProducts() {
  // Hanya ambil produk yang pending, rejected, atau yang butuh moderasi
  // Untuk demo, kita ambil semua yang tidak 'live' atau kita tampilkan beberapa dari data
  const reviewQueue = produk.filter(p => p.status === 'pending' || p.status === 'rejected');
  
  // Return format yang disederhanakan untuk UI Review
  return reviewQueue.map(p => ({
    id: p.id,
    name: p.nama,
    seller: p.sellerNama,
    type: p.kondisi,
    price: p.harga,
    date: 'Hari ini', // Dummy date
    status: p.status === 'pending' ? 'Pending' : p.status === 'rejected' ? 'Ditolak' : 'Disetujui'
  }));
}

export async function updateProductStatus(id: string, action: 'approve' | 'reject') {
  const p = produk.find(item => item.id === id);
  if (p) {
    p.status = action === 'approve' ? 'live' : 'rejected';
  }
  
  // Revalidate homepage dan kategori agar data terupdate
  revalidatePath('/');
  revalidatePath('/kategori/[slug]', 'page');
  revalidatePath('/dashboard/admin/review-produk');
  
  return { success: true };
}
