'use client';
import React, { useEffect } from 'react';
import { transaksiContoh } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function CetakResiPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const order = transaksiContoh.find(t => t.id === resolvedParams.id);

  useEffect(() => {
    // Automatically trigger print dialog when page loads
    if (order) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [order]);

  if (!order) {
    return notFound();
  }

  // Simulasi data pembeli dan pengirim (karena di transaksiContoh tidak selengkap ini)
  const alamatPenerima = 'Jl. Jendral Sudirman No. 45, RT 02/RW 01, Kelurahan Senayan, Kecamatan Kebayoran Baru, Jakarta Selatan, 12190';
  const noHpPenerima = '0812-3456-7890';
  
  const namaPengirim = 'TechStore Indonesia';
  const noHpPengirim = '0899-8877-6655';
  const berat = '1.2 kg';

  return (
    <div id="printable-receipt" style={{ padding: 40, fontFamily: 'Arial, sans-serif', color: '#000', maxWidth: 800, margin: '0 auto', background: '#fff' }}>
      {/* Hide everything else when printing except this container */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px !important;
          }
          @page { margin: 0; }
        }
      `}} />

      <div style={{ border: '2px solid #000', borderRadius: 8, padding: 24 }}>
        {/* Header: Ekspedisi & Marketplace */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #000', paddingBottom: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: -1 }}>METEOR<span style={{ color: '#0066cc' }}>PC</span></div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Marketplace Sparepart Laptop Terpercaya</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 900 }}>{order.ekspedisi.toUpperCase()}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Resi: {order.resi || '_________________'}</div>
          </div>
        </div>

        {/* Barcode Mock */}
        <div style={{ textAlign: 'center', margin: '20px 0', borderBottom: '2px dashed #000', paddingBottom: 24 }}>
          {/* Faking a barcode using repeating vertical borders */}
          <div style={{ display: 'inline-flex', height: 60, alignItems: 'center' }}>
            <div style={{ width: 4, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 2, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 6, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 3, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 1, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 5, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 2, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 4, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 2, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 6, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 1, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 3, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 5, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 2, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 4, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 1, height: '100%', background: '#000', margin: '0 2px' }}></div>
            <div style={{ width: 6, height: '100%', background: '#000', margin: '0 2px' }}></div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8, letterSpacing: 2 }}>{order.id}</div>
        </div>

        {/* Sender & Receiver Info */}
        <div style={{ display: 'flex', gap: 24, borderBottom: '2px solid #000', paddingBottom: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>PENGIRIM:</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{namaPengirim}</div>
            <div style={{ fontSize: 14 }}>{noHpPengirim}</div>
          </div>
          <div style={{ width: 2, background: '#000' }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>PENERIMA:</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{order.buyerNama}</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{noHpPenerima}</div>
            <div style={{ fontSize: 14, lineHeight: 1.4 }}>{alamatPenerima}</div>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
            <div>Isi Paket</div>
            <div>Berat: {berat}</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #000', padding: 8, width: '85%' }}>{order.produkNama}</td>
                <td style={{ border: '1px solid #000', padding: 8, textAlign: 'center', fontWeight: 700 }}>1 Pcs</td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontSize: 11, marginTop: 12, fontStyle: 'italic', textAlign: 'center' }}>
            Pesanan ini sudah dibayar secara sistem. Jangan menagih biaya apapun ke penerima kecuali pesanan COD.
          </div>
        </div>
      </div>
    </div>
  );
}
