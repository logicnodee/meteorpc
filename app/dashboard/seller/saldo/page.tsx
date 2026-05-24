import type { Metadata } from 'next';
import { sellers, formatRupiah, transaksiContoh } from '@/lib/data';
import Link from 'next/link';
import { Wallet, TrendingDown, Clock, CheckCircle, ArrowDownToLine, Info } from 'lucide-react';

export const metadata: Metadata = { title: 'Saldo Toko' };

export default function SaldoPage() {
  const seller = sellers[0];
  const saldoTotal = 3731703;
  const saldoDicairkan = 27000;
  const saldoDitahan = 3704703;
  const sedangDicairkan = 0;

  const riwayatSaldo = [
    { keterangan: 'Transaksi TRX-20260523-042', waktu: '23 Mei 2026, 14:30 WIB', mutasi: 416500, tipe: 'masuk' },
    { keterangan: 'Pencairan Saldo', waktu: '20 Mei 2026, 09:00 WIB', mutasi: -500000, tipe: 'keluar' },
    { keterangan: 'Transaksi TRX-20260519-088', waktu: '19 Mei 2026, 11:20 WIB', mutasi: 181300, tipe: 'masuk' },
    { keterangan: 'Transaksi TRX-20260518-022', waktu: '18 Mei 2026, 16:45 WIB', mutasi: 416500, tipe: 'masuk' },
    { keterangan: 'Pencairan Saldo', waktu: '15 Mei 2026, 10:00 WIB', mutasi: -800000, tipe: 'keluar' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Saldo Toko</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Kelola saldo dan pencairan dana toko kamu.</p>

      {/* Saldo card utama */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1f5e, #0a0f3e)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 24,
        border: '1px solid rgba(0,212,255,0.2)',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start'
      }}>
        <div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Total Saldo</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 16 }}>{formatRupiah(saldoTotal)}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(0,200,150,0.15)', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Dapat Dicairkan</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#00c896' }}>{formatRupiah(saldoDicairkan)}</div>
            </div>
            <div style={{ background: 'rgba(245,158,11,0.15)', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>Saldo Ditahan</span> <Info size={11}/>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f59e0b' }}>{formatRupiah(saldoDitahan)}</div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
          <ArrowDownToLine size={16}/> Cairkan Saldo
        </button>
      </div>

      {/* Info saldo ditahan */}
      <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: 'var(--color-warning)' }}>
        <strong>⚠️ Sebagian saldo tidak bisa dicairkan karena ditahan.</strong>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 12 }}>
          Saldo dari transaksi yang masih dalam periode hold belum bisa dicairkan. Dana akan otomatis masuk ke saldo yang dapat dicairkan setelah periode hold berakhir.
        </p>
      </div>

      {/* Penjelasan saldo */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { title: '1. Total Saldo', desc: 'Semua saldo termasuk yang masih ditahan dan sedang dalam proses pencairan', color: '#fff' },
            { title: '2. Dapat Dicairkan', desc: 'Jumlah yang sudah melewati masa hold dan siap ditransfer ke rekening bank', color: '#00c896' },
            { title: '3. Saldo Ditahan', desc: 'Transaksi yang masih dalam masa hold. Akan otomatis cair setelah waktu hold habis', color: '#f59e0b' },
            { title: '4. Sedang Dicairkan', desc: 'Dalam proses transfer ke rekening bank kamu', color: '#00d4ff' },
          ].map(item => (
            <div key={item.title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Riwayat saldo */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontWeight: 700, fontSize: 15 }}>Riwayat Saldo</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Semua', 'Masuk', 'Keluar'].map(f => (
              <button key={f} className={`badge ${f === 'Semua' ? 'badge-cyan' : 'badge-info'}`} style={{ cursor: 'pointer', border: 'none' }}>{f}</button>
            ))}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Keterangan</th>
                <th>Waktu</th>
                <th>Mutasi</th>
              </tr>
            </thead>
            <tbody>
              {riwayatSaldo.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 13 }}>{r.keterangan}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.waktu}</td>
                  <td style={{ fontWeight: 700, color: r.tipe === 'masuk' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {r.tipe === 'masuk' ? '+' : ''}{formatRupiah(r.mutasi)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
