'use client';
import React, { useState } from 'react';
import { Search, Download, DollarSign, TrendingUp, Calendar, Filter, FileText, FileSpreadsheet, Activity, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { formatRupiah } from '@/lib/data';

const detailedReports = [
  { id: 'LAP-2026-05', period: 'Mei 2026', trxCount: 12450, totalGMV: 425000000, grossFee: 8500000, refund: 1200000, netIncome: 7300000, status: 'Berjalan' },
  { id: 'LAP-2026-04', period: 'April 2026', trxCount: 38200, totalGMV: 1120500000, grossFee: 22410000, refund: 410000, netIncome: 22000000, status: 'Final (Ditutup)' },
  { id: 'LAP-2026-03', period: 'Maret 2026', trxCount: 31050, totalGMV: 980000000, grossFee: 19600000, refund: 850000, netIncome: 18750000, status: 'Final (Ditutup)' },
  { id: 'LAP-2026-02', period: 'Februari 2026', trxCount: 28900, totalGMV: 850000000, grossFee: 17000000, refund: 500000, netIncome: 16500000, status: 'Final (Ditutup)' },
  { id: 'LAP-2026-01', period: 'Januari 2026', trxCount: 25400, totalGMV: 760000000, grossFee: 15200000, refund: 200000, netIncome: 15000000, status: 'Final (Ditutup)' },
];

const areaData = [
  { label: '18', fullDate: '18 Mei', value: 30000, display: 'Rp 30.000', x: 0, y: 188 },
  { label: '19', fullDate: '19 Mei', value: 48000, display: 'Rp 48.000', x: 100, y: 180.8 },
  { label: '20', fullDate: '20 Mei', value: 133000, display: 'Rp 133.000', x: 200, y: 146.8 },
  { label: '21', fullDate: 'Kamis, 21 Mei', value: 496810, display: 'Rp 496.810', x: 300, y: 1.3 },
  { label: '22', fullDate: '22 Mei', value: 233000, display: 'Rp 233.000', x: 400, y: 106.8 },
  { label: '23', fullDate: '23 Mei', value: 95000, display: 'Rp 95.000', x: 500, y: 162 },
  { label: '24', fullDate: '24 Mei', value: 20000, display: 'Rp 20.000', x: 600, y: 192 },
];

export default function LaporanKeuanganPage() {
  const [reports] = useState(detailedReports);
  const [hoveredPoint, setHoveredPoint] = useState<any>(areaData[3]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Analitik & Laporan Keuangan</h1>
          <p style={{ color: 'var(--text-muted)' }}>Pantau pergerakan arus kas (cashflow), pertumbuhan GMV, dan margin keuntungan platform secara mendetail.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" style={{ border: '1px solid var(--border-color)', background: '#fff' }}>
            <Calendar size={18} /> Filter Tanggal
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Download size={18} /> Export Semua (CSV)
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20, borderLeft: '4px solid var(--brand-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp color="var(--brand-blue)" size={20} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={14}/> +14.2%</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Total GMV (YTD)</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{formatRupiah(4135500000)}</div>
        </div>

        <div className="card" style={{ padding: 20, borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity color="#8b5cf6" size={20} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={14}/> +8.5%</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Total Transaksi Berhasil</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>136.000 <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>trx</span></div>
        </div>

        <div className="card" style={{ padding: 20, borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowDownRight color="#f59e0b" size={20} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-danger)', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={14}/> +1.2%</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Total Pengembalian (Refund)</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{formatRupiah(3160000)}</div>
        </div>

        <div className="card" style={{ padding: 20, borderLeft: '4px solid var(--color-success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(0, 200, 150, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign color="var(--color-success)" size={20} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={14}/> +22.4%</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Pendapatan Bersih (Net Income)</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-success)' }}>{formatRupiah(79550000)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {/* Advanced Chart Section */}
        <div className="card" style={{ flex: 1, padding: '24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Pendapatan</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Data dari 7 hari terakhir</p>
            </div>
            <a href="#" style={{ color: 'var(--brand-blue)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Lihat Selengkapnya</a>
          </div>
          
          <div style={{ display: 'flex', position: 'relative', height: 260 }}>
            {/* Y-Axis Labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: 12, color: 'var(--text-secondary)', fontSize: 13, height: 200, flexShrink: 0, textAlign: 'right' }}>
              <span>497 rb -</span>
              <span>233 rb -</span>
              <span>133 rb -</span>
              <span>48 rb -</span>
            </div>

            {/* Chart Area */}
            <div style={{ flex: 1, position: 'relative', height: 220 }}>
              {/* Horizontal Grid Lines */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px dashed #cbd5e1' }}></div>
              <div style={{ position: 'absolute', top: 66, left: 0, right: 0, borderTop: '1px dashed #cbd5e1' }}></div>
              <div style={{ position: 'absolute', top: 133, left: 0, right: 0, borderTop: '1px dashed #cbd5e1' }}></div>
              <div style={{ position: 'absolute', top: 200, left: 0, right: 0, borderTop: '1px solid var(--border-color)' }}></div>
              
              {/* Vertical Grid Lines */}
              {[0, 100, 200, 300, 400, 500, 600].map(x => (
                <div key={x} style={{ position: 'absolute', top: 0, bottom: 20, left: `${(x/600)*100}%`, borderLeft: '1px dashed #cbd5e1' }}></div>
              ))}

              {/* SVG Graphic */}
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: 200, position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area Path */}
                <path 
                  d={`M 0,188 L 100,180.8 L 200,146.8 L 300,1.3 L 400,106.8 L 500,162 L 600,192 L 600,200 L 0,200 Z`} 
                  fill="url(#areaGradient)" 
                />

                {/* Line Path */}
                <path 
                  d={`M 0,188 L 100,180.8 L 200,146.8 L 300,1.3 L 400,106.8 L 500,162 L 600,192`} 
                  fill="none" 
                  stroke="var(--brand-blue)" 
                  strokeWidth="2" 
                />

                {/* Hover Line Marker */}
                {hoveredPoint && (
                  <line 
                    x1={hoveredPoint.x} y1="0" x2={hoveredPoint.x} y2="200" 
                    stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" 
                  />
                )}

                {/* Data Points */}
                {areaData.map((pt, i) => (
                  <circle 
                    key={i} 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="4" 
                    fill={hoveredPoint?.x === pt.x ? "var(--brand-blue)" : "#fff"} 
                    stroke="var(--brand-blue)" 
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                ))}
              </svg>

              {/* Custom Tooltip */}
              {hoveredPoint && (
                <div style={{ 
                  position: 'absolute', 
                  left: `${(hoveredPoint.x / 600) * 100}%`, 
                  top: hoveredPoint.y + 10,
                  transform: hoveredPoint.x > 300 ? 'translateX(-100%)' : 'translateX(10px)',
                  background: '#fff', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '12px 16px',
                  borderRadius: 4,
                  zIndex: 10,
                  minWidth: 200
                }}>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 8 }}>{hoveredPoint.fullDate}</div>
                  <div style={{ fontSize: 14, color: 'var(--brand-blue)' }}>Pendapatan Bersih : {hoveredPoint.display}</div>
                </div>
              )}

              {/* X-Axis Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: -24, left: 0, right: 0, color: 'var(--text-secondary)', fontSize: 13 }}>
                {areaData.map(d => <span key={d.label}>{d.label}</span>)}
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, marginTop: 12 }}>
            18 Mei - 24 Mei
          </div>
        </div>
      </div>
      
      {/* Detailed Table */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800 }}>Rincian Laporan Per Periode</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Cari periode..." style={{ padding: '8px 12px 8px 36px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13 }} />
            </div>
            <button className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', padding: '0 12px' }}><Filter size={16}/></button>
          </div>
        </div>
        <table className="table">
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th>ID Laporan</th>
              <th>Periode Bulan</th>
              <th>Jml Transaksi</th>
              <th>Total Transaksi (GMV)</th>
              <th>Pendapatan Kotor (2%)</th>
              <th>Total Refund</th>
              <th>Pendapatan Bersih</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Unduh</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((rep) => (
              <tr key={rep.id}>
                <td style={{ fontWeight: 700, color: 'var(--brand-blue)' }}>{rep.id}</td>
                <td style={{ fontWeight: 700 }}>{rep.period}</td>
                <td>{rep.trxCount.toLocaleString('id-ID')} trx</td>
                <td style={{ fontWeight: 600 }}>{formatRupiah(rep.totalGMV)}</td>
                <td style={{ fontWeight: 600 }}>{formatRupiah(rep.grossFee)}</td>
                <td style={{ fontWeight: 600, color: 'var(--color-danger)' }}>- {formatRupiah(rep.refund)}</td>
                <td style={{ fontWeight: 800, color: 'var(--color-success)', fontSize: 15 }}>{formatRupiah(rep.netIncome)}</td>
                <td>
                  <span style={{ 
                    background: rep.status.includes('Final') ? 'rgba(0, 200, 150, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                    color: rep.status.includes('Final') ? 'var(--color-success)' : 'var(--brand-blue)', 
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 
                  }}>
                    {rep.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" title="Unduh PDF" style={{ padding: 6, color: '#dc2626', background: '#fee2e2' }}>
                      <FileText size={16}/>
                    </button>
                    <button className="btn btn-ghost btn-sm" title="Unduh Excel (CSV)" style={{ padding: 6, color: '#16a34a', background: '#dcfce7' }}>
                      <FileSpreadsheet size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
