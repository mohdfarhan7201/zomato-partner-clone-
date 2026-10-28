/* icons + chart helpers */
const P = {
  orders:'M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6M10.5 6h3',
  menu:'M6 3h12v18H6zM9 8h6M9 12h6M9 16h4',
  history:'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2',
  report:'M5 20v-5M10 20V8M15 20v-9M20 20V4',
  offers:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 15l6-6M9.5 9.5h.01M14.5 14.5h.01',
  hyper:'M4 9h16l-2 11H6zM8 9l3-5M16 9l-3-5M9 13v3M12 13v3M15 13v3',
  ads:'M3 17l6-6 4 4 8-8M15 7h6v6',
  finance:'M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l3-3h12M16 13.5h.01',
  outlet:'M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6M8 12h.01M12 12h.01M16 12h.01',
  comp:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16h.01',
  reviews:'M4 4h16v12H9l-5 4zM8 9h8M8 12h5',
  help:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01',
  growth:'M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.3-.9z',
  learn:'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.4c.9.9 1 1.7 1 2.6h6c0-.9.1-1.7 1-2.6A6 6 0 0 0 12 3z',
  expand:'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  dine:'M3 10h18M5 10v9M19 10v9M7 10V6h10v4M9 14h6',
  chev:'M6 9l6 6 6-6', right:'M9 6l6 6-6 6', left:'M15 6l-6 6 6 6',
  bell:'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  search:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  filter:'M4 6h16M7 12h10M10 18h4',
  dl:'M12 4v11M7 11l5 5 5-5M5 20h14',
  phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  pen:'M4 20l4-1 11-11-3-3L5 16zM14 6l3 3',
  trash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
  cam:'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  mic:'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4',
  mail:'M3 6h18v12H3zM3 7l9 7 9-7',
  user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  x:'M6 6l12 12M18 6L6 18',
  copy:'M9 9h11v11H9zM5 15V4h11',
  info:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 7.5h.01',
  pin:'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  star:'M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.3-.9z',
  print:'M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z',
  chat:'M4 4h16v12H9l-5 4z',
  track:'M12 21s6-5.5 6-10a6 6 0 0 0-12 0c0 4.5 6 10 6 10zM12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  chart:'M4 20V4M4 20h16M8 15l4-5 3 3 5-6',
  grid:'M4 4h16v16H4zM4 12h16M12 4v16',
  more:'M12 5h.01M12 12h.01M12 19h.01',
  wand:'M4 20L15 9M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 12l.7 1.3L21 14l-1.3.7L19 16l-.7-1.3L17 14l1.3-.7z',
  arrow:'M4 12h16M14 6l6 6-6 6',
  rupee:'M6 5h12M6 9h12M9 5c5 0 5 8 0 8H6l8 7',
  pulse:'M12 4v16M4 12h16M7 7l10 10M17 7L7 17',
  megaphone:'M4 10v4l12 5V5zM16 9a3 3 0 0 1 0 6M7 15l1 5h3l-1-4',
  recover:'M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5M18 3v4h-4M6 21v-4h4',
  doc:'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6'
};
const ic = (n, s) => `<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''}><path d="${P[n]||''}"/></svg>`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = n => '₹' + Number(n).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});

/* ------- SVG charts ------- */
const COL = ['#3d6ee8', '#e0793a', '#2fa39a', '#7b4fd8', '#e23f5b', '#9fbcfb'];
function niceTicks(max, n = 6) { const out = []; for (let i = 0; i < n; i++) out.push(max * (n - 1 - i) / (n - 1)); return out; }
/* series: {name, data, kind:'bar'|'line', color, axis:'l'|'r', fmt} */
function chart({labels, series, w = 570, h = 330, yTitle = '', showBarVals = true}) {
  const L = 62, R = 14, T = 12, B = 46, iw = w - L - R, ih = h - T - B;
  const n = labels.length, step = iw / n;
  const left = series.filter(s => s.axis !== 'r'), right = series.filter(s => s.axis === 'r');
  const mx = arr => Math.max(...arr.flatMap(s => s.data)) * 1.12 || 1;
  const lm = mx(left), rm = right.length ? mx(right) : lm;
  const fmtL = (left[0] && left[0].fmt) || (v => v.toFixed(0));
  let g = '';
  niceTicks(lm).forEach((t, i) => {
    const y = T + ih * i / 5;
    g += `<line x1="${L}" x2="${w - R}" y1="${y}" y2="${y}" stroke="#eee"/><text x="${L - 6}" y="${y + 3}" text-anchor="end" font-size="7.5" fill="#444">${fmtL(t)}</text>`;
  });
  if (right.length) niceTicks(rm).forEach((t, i) => { g += `<text x="${w - 2}" y="${T + ih * i / 5 + 3}" text-anchor="end" font-size="7.5" fill="#444">${(right[0].fmt || (v => v.toFixed(0)))(t)}</text>`; });
  labels.forEach((lb, i) => {
    const x = L + step * i + step / 2;
    g += `<line x1="${x}" x2="${x}" y1="${T}" y2="${T + ih}" stroke="#f3f3f3"/><text transform="translate(${x + 4} ${T + ih + 14}) rotate(30)" font-size="7.5" fill="#444">${lb}</text>`;
  });
  series.map((s, i) => ({...s, color: s.color || COL[i]})).sort((a, b) => (b.kind === 'bar') - (a.kind === 'bar')).forEach(s => {
    const m = s.axis === 'r' ? rm : lm, c = s.color;
    const X = i => L + step * i + step / 2, Y = v => T + ih - (v / m) * ih;
    if (s.kind === 'bar') {
      s.data.forEach((v, i) => {
        const bw = Math.min(26, step * .5), y = Y(v);
        g += `<rect x="${X(i) - bw / 2}" y="${y}" width="${bw}" height="${T + ih - y}" fill="${c}" rx="1"/>`;
        if (showBarVals) g += `<text x="${X(i)}" y="${(y + T + ih) / 2}" text-anchor="middle" font-size="7" font-weight="700" fill="#222" transform="rotate(0)">${s.fmtBar ? s.fmtBar(v) : (s.fmt || (q => q))(v)}</text>`;
      });
    } else {
      const pts = s.data.map((v, i) => [X(i), Y(v)]);
      g += `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="1.5"/>`;
      pts.forEach(p => g += `<circle cx="${p[0]}" cy="${p[1]}" r="2.2" fill="${c}"/>`);
    }
  });
  if (yTitle) g += `<text transform="translate(10 ${T + ih / 2}) rotate(-90)" font-size="8" text-anchor="middle" fill="#444">${yTitle}</text>`;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="display:block">${g}</svg>`;
}
function legend(series) {
  return `<div class="lg">${series.map((s, i) => `<span>${s.kind === 'bar' ? `<i class="b" style="background:${s.color || COL[i]}"></i>` : `<i style="background:${s.color || COL[i]}"></i>`}${s.name}</span>`).join('')}</div>`;
}
function sparkline(data, w = 220, h = 34, area = true) {
  const mn = Math.min(...data), mxv = Math.max(...data), r = (mxv - mn) || 1;
  const pts = data.map((v, i) => [4 + i * (w - 8) / (data.length - 1), 4 + (h - 8) * (1 - (v - mn) / r)]);
  const p = pts.map(q => q.join(',')).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${area ? `<polygon points="${pts[0][0]},${h - 2} ${p} ${pts[pts.length - 1][0]},${h - 2}" fill="#dfe8fc" opacity=".7"/>` : ''}<polyline points="${p}" fill="none" stroke="#3d6ee8" stroke-width="1.2"/>${pts.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="1.7" fill="#3d6ee8"/>`).join('')}</svg>`;
}
function smoothPath(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], cx = (a[0] + b[0]) / 2; d += ` C${cx},${a[1]} ${cx},${b[1]} ${b[0]},${b[1]}`; }
  return d;
}
function donut(parts, center, size = 160) {
  const r = 55, c = 2 * Math.PI * r; let off = 0;
  const segs = parts.map(p => { const len = c * p.pct / 100; const s = `<circle r="${r}" cx="80" cy="80" fill="none" stroke="${p.color}" stroke-width="30" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-off}" transform="rotate(-90 80 80)"/>`; off += len; return s; }).join('');
  let a = -90, labs = '';
  parts.forEach(p => { const mid = a + p.pct * 1.8; a += p.pct * 3.6; const rad = mid * Math.PI / 180; labs += `<text x="${80 + 55 * Math.cos(rad)}" y="${83 + 55 * Math.sin(rad)}" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">${p.pct}%</text>`; });
  return `<svg viewBox="0 0 160 160" width="${size}" height="${size}">${segs}${labs}<text x="80" y="84" text-anchor="middle" font-size="12" font-weight="700">${center}</text></svg>`;
}
