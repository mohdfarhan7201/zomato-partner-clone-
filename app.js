/* Zomato Partner clone – vanilla JS SPA (hash routing) */
const WEEKS = [32, 33, 34, 35, 36, 37, 38, 39, 40];
const WL = WEEKS.map(w => 'Week ' + w);
const WR = ['3 - 9 Aug 2026', '10 - 16 Aug 2026', '17 - 23 Aug 2026', '24 - 30 Aug 2026', '31 Aug - 6 Sep 2026', '7 - 13 Sep 2026', '14 - 20 Sep 2026', '21 - 27 Sep 2026', '28 Sep - 4 Oct 2026'];
const D = {
  sales: [185420, 192600, 199850, 208300, 216750, 225900, 236400, 248850, 264320],
  orders: [596, 615, 634, 657, 679, 704, 733, 768, 811],
  aov: [311, 313, 315, 317, 319, 321, 323, 324, 326],
  rating: [4.2, 4.2, 4.3, 4.3, 4.3, 4.4, 4.4, 4.5, 4.5],
  bad: [9.8, 9.2, 8.6, 8.0, 7.3, 6.7, 6.1, 5.5, 4.8],
  comp: [16, 14, 13, 11, 10, 8, 7, 5, 4],
  lost: [750, 680, 590, 510, 420, 340, 260, 180, 90],
  online: [96.8, 97.2, 97.6, 98.1, 98.5, 98.9, 99.2, 99.5, 99.7],
  kpt: [14.2, 13.9, 13.6, 13.2, 12.9, 12.6, 12.3, 12.0, 11.7],
  imp: [38500, 41200, 44000, 47500, 51200, 55400, 60100, 65800, 72400],
  i2m: [9.4, 9.7, 10.1, 10.5, 10.9, 11.3, 11.8, 12.2, 12.8]
};
const S = {
  online: true, collapsed: false, finance: false, menuOpen: null,
  ordTab: 'preparing', hist: null, histQ: '',
  repTab: 'business', repView: 'table', outlet: null, modal: null, repOpt: { view: 'detailed', freq: 'daily', dur: '7' }, adTab: 'perf', adTile: 0,
  oi: 'about', day: 'Tuesday', drawer: false, inv: 'online', menuView: 'overview', menuTab: 'editor', menuCat: 0, menuFilter: 'all', offTab: 'create', trackSubTab: 'active', bannerDismissed: false,
  orders: [{id: '5094', name: 'ranjana', sub: '2nd order', addr: 'Mugalaha, Mughala, Gorakhpur (4 kms, 12 mins away)', placed: Date.now() - 14 * 60000, status: 'preparing', dl: Date.now() + (3 * 60 + 56) * 1000, total: 424.84, rider: 'Amit Kumar', otp: '3654', veg: true,
    items: [['Veg Penne in Pink Sauce', 263, 1], ['Jalebi with Rabadi', 97, 1], ['Choice of Shake', 171, 1]]}],
  inventory: {}
};
const HIST = [
  ['PREPARING', '5:27 PM | 29 September', '8664395094', 'ranjana', '1 x Veg Penne in Pink Sauce, 1 x Jalebi with Rabadi, 1 x Choice of Shake', 424.84],
  ['DELIVERED', '5:04 PM | 29 September', '8663463389', 'savita', '1 x Tandoori Roti, 1 x Chilli Paneer Dry', 214],
  ['DELIVERED', '4:45 PM | 29 September', '8658063485', 'Rajiv Joseph', '1 x Kadhai Paneer, 1 x Tandoori Roti', 214],
  ['DELIVERED', '4:27 PM | 29 September', '8664001925', 'Ankit Yadav', '1 x Jalebi with Rabadi, 1 x Moong Dal Halwa', 126.32, 'Food preparation delayed by 2 mins'],
  ['DELIVERED', '4:14 PM | 29 September', '8663124869', 'Nishant Soni', '1 x Jalebi with Rabadi, 2 x Moong Dal Halwa', 248.89],
  ['DELIVERED', '3:52 PM | 29 September', '8662980113', 'Pooja Verma', '1 x Chicken Dum Biryani, 1 x Butter Naan', 462],
  ['DELIVERED', '3:20 PM | 29 September', '8661764420', 'Sameer Khan', '1 x Handi Paneer, 2 x Tandoori Roti', 388.5]
];
const CATS = [
  ['Recommended Specials', 7, [['Chicken Dum Biryani [4 Pcs chicken]', 398, 'nv', '🍛'], ['Chicken Sandwich', 279, 'nv', '🥪', 'rej'], ['Handi Paneer', 320, 'v', '🍲', 'custom'], ['Margherita Pizza', 263, 'v', '🍕'], ['Paneer Tikka', 309, 'v', '🍢'], ['Tandoori Chicken', 449, 'nv', '🍗'], ['Veg Penne in Pink Sauce', 263, 'v', '🍝']]],
  ['Breakfast', 13, [['Aloo Paratha', 99, 'v', '🫓'], ['Poha', 79, 'v', '🍚'], ['Chole Bhature', 149, 'v', '🥘']], 'Timings applied'],
  ['Platter', 3, [['Veg Platter', 599, 'v', '🍱'], ['Non-Veg Platter', 749, 'nv', '🍱'], ['Kebab Platter', 699, 'nv', '🍢']]],
  ['Sizzlers', 2, [['Paneer Sizzler', 379, 'v', '🔥'], ['Chicken Sizzler', 429, 'nv', '🔥']]],
  ['Soups and Salads', 19, [['Tomato Soup', 149, 'v', '🍅'], ['Sweet Corn Soup', 159, 'v', '🌽'], ['Green Salad', 99, 'v', '🥗']]],
  ['Starters', 50, [['Chilli Paneer Dry', 269, 'v', '🌶️'], ['Paneer Tikka', 309, 'v', '🍢'], ['Chicken 65', 329, 'nv', '🍗']]],
  ['Thali', 3, [['Special Veg Thali', 249, 'v', '🍛'], ['Deluxe Thali', 329, 'v', '🍛'], ['Non-Veg Thali', 379, 'nv', '🍛']]],
  ['Main Course', 48, [['Kadhai Paneer', 289, 'v', '🥘'], ['Dal Makhani', 229, 'v', '🥣'], ['Butter Chicken', 389, 'nv', '🍗']]],
  ['Breads', 14, [['Tandoori Roti', 25, 'v', '🫓'], ['Butter Naan', 55, 'v', '🫓']]],
  ['Desserts', 9, [['Jalebi with Rabadi', 97, 'v', '🍥'], ['Moong Dal Halwa', 79, 'v', '🍮']]],
  ['Beverages', 12, [['Choice of Shake', 171, 'v', '🥤'], ['Cold Coffee', 119, 'v', '☕']]]
];
const NAV = [['orders', 'orders', 'Orders'], ['menu', 'menu', 'Menu'], ['history', 'history', 'Order history'], ['reporting', 'report', 'Reporting'], ['offers', 'offers', 'Offers'], ['hyperpure', 'hyper', 'Hyperpure'], ['ads', 'ads', 'Ads'], ['finance', 'finance', 'Finance'], ['outlet', 'outlet', 'Outlet info'], ['complaints', 'comp', 'Customer complaints'], ['reviews', 'reviews', 'Reviews'], ['help', 'help', 'Help centre'], ['growth', 'growth', 'Growth benefits'], ['learning', 'learn', 'Learning centre'], ['expansion', 'expand', 'Expansion hub']];
const FIN = [['payouts', 'Payouts'], ['invoices', 'Invoices & taxes'], ['utr', 'UTR reports'], ['fees', 'Fees & policies']];
const OUTLET = {name: 'Dinner Bell By Buddha Avenue', loc: 'Shahpur, Gorakhpur', id: '20964482'};
let timer = null;

/* ---------- shell ---------- */
function shell(key, sub, body) {
  const fin = key === 'finance';
  return `
  <header>
    <div class="logo">zomato</div>
    <div class="hdr-r">
      <div class="pulse" title="Live pulse">${ic('pulse')}</div>
      <div class="bell">${ic('bell', 20)}<b>${S.orders.filter(o => o.status === 'preparing').length + 1}</b></div>
      <button data-a="toast" data-v="Settings">${ic('gear', 20)}</button>
      <a class="fb" href="#" data-a="toast" data-v="Thanks for your feedback!">Share feedback</a>
      <div class="dd"><button class="dd-btn ${S.online ? 'online' : 'offline'}" data-a="menu" data-v="m1">${S.online ? 'Online' : 'Offline'}<span class="caret"></span></button>
        <div class="menu" id="m1"><button data-a="online" data-v="1">Online</button><button data-a="online" data-v="0">Offline</button></div></div>
      <div class="dd"><button class="dd-btn user" data-a="menu" data-v="m2"><span class="avatar">${ic('user', 14)}</span>Rudren…<span class="caret"></span></button>
        <div class="menu" id="m2"><button data-a="toast" data-v="Profile">Profile</button><button data-a="toast" data-v="Logged out (demo)">Logout</button></div></div>
    </div>
  </header>
  <div class="body">
    <div class="sw ${S.collapsed ? 'collapsed' : ''}">
    <aside class="${S.collapsed ? 'collapsed' : ''}">
      <button class="dine" data-a="toast" data-v="Dining is not part of this demo">${ic('dine', 16)}<span class="dine-txt">Switch to Dining</span></button>
      ${NAV.map(([k, i, l]) => k === 'finance' ? `
        <button class="nav ${fin && !S.finance ? 'active' : ''}" data-a="fin">${ic(i)}<span class="lbl">${l}</span><svg class="i chev ${S.finance || fin ? 'up' : ''}" viewBox="0 0 24 24"><path d="${P.chev}"/></svg></button>
        ${S.finance || fin ? FIN.map(([fk, fl]) => `<a class="sub ${fin && sub === fk ? 'active' : ''}" href="#/finance/${fk}" style="color:inherit">${fl}</a>`).join('') : ''}`
        : `<a class="nav ${key === k ? 'active' : ''}" href="#/${k}" style="color:inherit">${ic(i)}<span class="lbl">${l}</span></a>`).join('')}
    </aside>
    <button class="collapse" data-a="collapse">${ic('left')}</button>
    </div>
    <main>${body}</main>
  </div>
  ${S.modal === 'outlet' ? outletModal() : ''}
  ${S.modal === 'report' ? reportModal() : ''}
  ${S.drawer ? smartDrawer() : ''}`;
}
function outletModal() {
  return `<div class="overlay" data-a="closeModal"><div class="modal">
    <div class="modal-h"><span>${ic('outlet')} Show data for</span><button data-a="closeModal">${ic('x', 20)}</button></div>
    <div class="modal-b"><div style="display:flex;gap:8px;margin-bottom:14px"><span class="pill on">Restaurant</span><span class="pill">Legal Entity</span></div>
      <div class="search" style="margin-bottom:16px;height:36px"><input placeholder="Search by restaurant ID, name or address" style="font-size:11px"></div>
      <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer"><div><b>${OUTLET.name}</b><div class="muted" style="font-size:11.5px;margin-top:2px">${OUTLET.loc} | ID: ${OUTLET.id}</div></div><input type="radio" name="o" id="orad" ${S.outlet ? 'checked' : ''} style="width:17px;height:17px" onchange="document.getElementById('apply').disabled=false"></label></div>
    <div class="modal-f"><button class="btn primary" id="apply" data-a="applyOutlet" ${S.outlet ? '' : 'disabled'}>Apply</button></div></div></div>`;
}
function reportModal() {
  const ro = S.repOpt || { view: 'detailed', freq: 'daily', dur: '7' };
  return `<div class="overlay" data-a="closeModal"><div class="modal" style="width:490px;max-width:94vw;border-radius:8px">
    <div class="modal-h" style="padding:16px 20px;border-bottom:1px solid #e5e7eb">
      <span style="font-size:15px;font-weight:600;color:#111827">Generate Report</span>
      <button data-a="closeModal" style="color:#6b7280;display:flex;align-items:center;cursor:pointer">${ic('x', 18)}</button>
    </div>
    <div style="background:#fef9c3;padding:10px 20px;font-size:12.5px;color:#854d0e;border-bottom:1px solid #fef08a;line-height:1.4">
      You are generating a report for <b>${OUTLET.name}</b>
    </div>
    <div class="modal-b" style="padding:20px;height:auto;max-height:460px;overflow-y:auto">
      <div style="margin-bottom:20px">
        <label style="font-size:13.5px;font-weight:600;color:#1f2937;display:block;margin-bottom:10px">Select the report view:</label>
        <div style="display:flex;flex-direction:column;gap:10px">
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:#374151">
            <input type="radio" name="repViewOpt" value="detailed" ${ro.view === 'detailed' ? 'checked' : ''} data-a="roSet" data-k="view" data-v="detailed" style="width:16px;height:16px;accent-color:#2563eb;cursor:pointer">
            Detailed report
          </label>
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:#374151">
            <input type="radio" name="repViewOpt" value="items" ${ro.view === 'items' ? 'checked' : ''} data-a="roSet" data-k="view" data-v="items" style="width:16px;height:16px;accent-color:#2563eb;cursor:pointer">
            Item sales report
          </label>
        </div>
      </div>

      <div style="margin-bottom:20px">
        <label style="font-size:13.5px;font-weight:600;color:#1f2937;display:block;margin-bottom:8px">Select view for data:</label>
        <div style="display:flex;border:1px solid #d1d5db;border-radius:6px;overflow:hidden">
          ${[['daily', 'Daily'], ['weekly', 'Weekly'], ['monthly', 'Monthly']].map(([fk, fl], idx) => `
            <button data-a="roSet" data-k="freq" data-v="${fk}" style="flex:1;height:38px;font-size:13px;font-weight:500;text-align:center;cursor:pointer;${ro.freq === fk ? 'background:#2563eb;color:#fff;' : 'background:#fff;color:#4b5563;'}${idx > 0 && ro.freq !== fk ? 'border-left:1px solid #d1d5db;' : ''}">${fl}</button>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom:10px">
        <label style="font-size:13.5px;font-weight:600;color:#1f2937;display:block;margin-bottom:10px">Select duration for report:</label>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${[['7', 'Last 7 days'], ['14', 'Last 14 days'], ['30', 'Last 30 days'], ['custom', 'Custom']].map(([dk, dl]) => `
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:#374151">
              <input type="radio" name="repDurOpt" value="${dk}" ${ro.dur === dk ? 'checked' : ''} data-a="roSet" data-k="dur" data-v="${dk}" style="width:16px;height:16px;accent-color:#2563eb;cursor:pointer">
              ${dl}
            </label>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="modal-f" style="padding:14px 20px;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end">
      <button class="btn primary" style="background:#2563eb;border-color:#2563eb;width:auto;min-width:116px;height:38px;font-weight:600;font-size:13.5px;border-radius:6px" data-a="runReport">Generate</button>
    </div>
  </div></div>`;
}
function generateReportData(opt) {
  const ro = opt || { view: 'detailed', freq: 'daily', dur: '7' };
  if (ro.view === 'items') {
    let csv = `Item Sales Report - ${OUTLET.name}\nGenerated on,${new Date().toLocaleDateString()}\nFrequency,${ro.freq.toUpperCase()}\nDuration,${ro.dur === 'custom' ? 'Custom Range' : 'Last ' + ro.dur + ' days'}\n\n`;
    csv += 'Item Name,Category,Price (INR),Units Sold,Total Revenue (INR),Rating\n';
    const items = [
      ['Chicken Dum Biryani [4 Pcs chicken]', 'Recommended Specials', 398, 486, 193428, '4.8'],
      ['Handi Paneer', 'Recommended Specials', 320, 342, 109440, '4.7'],
      ['Paneer Tikka', 'Starters', 309, 284, 87756, '4.6'],
      ['Margherita Pizza', 'Recommended Specials', 263, 245, 64435, '4.6'],
      ['Veg Penne in Pink Sauce', 'Recommended Specials', 263, 198, 52074, '4.5'],
      ['Tandoori Chicken', 'Recommended Specials', 449, 165, 74085, '4.7'],
      ['Butter Naan', 'Breads', 55, 512, 28160, '4.9'],
      ['Dal Makhani', 'Main Course', 229, 210, 48090, '4.7'],
      ['Jalebi with Rabadi', 'Desserts', 97, 185, 17945, '4.8']
    ];
    items.forEach(r => { csv += `"${r[0]}",${r[1]},${r[2]},${r[3]},${r[4]},${r[5]}\n`; });
    return { name: `DinnerBell_Item_Sales_${ro.freq}_${ro.dur}days.csv`, content: csv };
  } else {
    let csv = `Detailed Business Report - ${OUTLET.name}\nGenerated on,${new Date().toLocaleDateString()}\nView,${ro.freq.toUpperCase()}\nDuration,${ro.dur === 'custom' ? 'Custom' : 'Last ' + ro.dur + ' days'}\n\n`;
    if (ro.freq === 'daily') {
      csv += 'Date,Delivered Orders,Sales (INR),Average Order Value (INR),Bad Orders (%),Rating,Total Complaints,Online (%)\n';
      const days = [
        ['28 Sep 2026', 122, 39772, 326, '4.6%', 4.5, 0, '99.8%'],
        ['27 Sep 2026', 118, 38232, 324, '4.8%', 4.5, 1, '99.6%'],
        ['26 Sep 2026', 125, 40625, 325, '5.0%', 4.4, 0, '99.5%'],
        ['25 Sep 2026', 114, 36936, 324, '5.2%', 4.4, 1, '99.2%'],
        ['24 Sep 2026', 108, 34776, 322, '5.4%', 4.4, 0, '99.1%'],
        ['23 Sep 2026', 112, 36176, 323, '5.3%', 4.3, 1, '98.9%'],
        ['22 Sep 2026', 112, 36176, 323, '5.5%', 4.3, 1, '98.8%']
      ];
      days.forEach(d => { csv += `${d.join(',')}\n`; });
    } else if (ro.freq === 'weekly') {
      csv += 'Metric,' + WL.join(',') + '\n';
      csv += 'Sales (INR),' + D.sales.join(',') + '\n';
      csv += 'Delivered orders,' + D.orders.join(',') + '\n';
      csv += 'Average order value (INR),' + D.aov.join(',') + '\n';
      csv += 'Rating,' + D.rating.join(',') + '\n';
      csv += 'Bad orders (%),' + D.bad.join(',') + '\n';
      csv += 'Complaints,' + D.comp.join(',') + '\n';
      csv += 'Online (%),' + D.online.join(',') + '\n';
    } else {
      csv += 'Month,Delivered Orders,Total Sales (INR),Average Order Value (INR),Average Rating\n';
      csv += 'August 2026,2482,786170,317,4.3\n';
      csv += 'September 2026,2932,953710,325,4.5\n';
      csv += 'October 2026 (MTD),811,264320,326,4.5\n';
    }
    return { name: `DinnerBell_Detailed_${ro.freq}_${ro.dur}days.csv`, content: csv };
  }
}
function smartDrawer() {
  return `<div class="drawer"><button class="x" data-a="drawer" data-v="0">${ic('x', 20)}</button>
  <div class="dhead"><h2>Partner Smart Link</h2><div style="font-size:9.5px;opacity:.9">Share your links effortlessly across all your favorite platforms like WhatsApp, Facebook, and Instagram with Zomato Partners Smart Link</div>
    <div class="dbox"><div class="rn"><div style="width:42px;height:42px;border-radius:50%;background:#f5c99b;display:grid;place-items:center;font-size:24px">🍕</div><b style="font-size:17px;font-weight:500">Dinner Bell By<br>Buddha Avenue</b></div>
    <div style="padding:6px 16px;color:#555">Purpose/Channel</div>
    <div class="fsel" style="margin:6px 14px 12px;justify-content:space-between;height:42px"><span style="font-size:12px">Default social media link</span><svg class="i" viewBox="0 0 24 24"><path d="${P.chev}"/></svg></div>
    <div style="padding:0 16px 6px;color:#555">Smart Link</div>
    <div class="pinput">${ic('copy', 16)}<input id="sl" readonly value="https://link.zomato.com/xqzv/rshare?id=6143921">
      <button style="color:#e23744" data-a="copy">Copy</button></div></div></div>
  <div style="padding:16px 12px;font-size:10px;text-align:center"><b style="font-size:10px">SMART LINK PERFORMANCE</b><div class="muted" style="text-align:left;margin:8px 0">Monitor the performance of your default social media smart link</div>
    <div class="fsel" style="font-size:12px;height:38px;border-color:#333;margin-bottom:14px"><span>Selected: 13th Sept to 28th Sept</span><span class="caret"></span></div>
    <div class="card" style="text-align:left;padding:14px;border:1px solid var(--line)"><div style="font-size:15px;font-weight:500">Conversion funnel</div><div class="muted" style="font-size:10px;margin:4px 0 14px">Customers who have visited and ordered from Zomato app using your smart link</div>
    ${[['Menu visits', '0'], ['Number of orders', '0'], ['Menu to cart', '-'], ['Cart to order', '-']].map(r => `<div style="display:flex;justify-content:space-between;padding:6px 4px;font-size:11.5px;color:#555"><span>${r[0]}</span><span style="color:#111">${r[1]}</span></div>`).join('')}</div></div></div>`;
}

/* ---------- pages ---------- */
function pgOrders() {
  const tabs = [['preparing', 'Preparing'], ['ready', 'Ready'], ['picked', 'Picked up']];
  const list = S.orders.filter(o => o.status === S.ordTab);
  const cnt = k => S.orders.filter(o => o.status === k).length;
  const mins = o => Math.max(1, Math.round((Date.now() - o.placed) / 60000));
  const card = o => `<div class="ocard" style="margin-bottom:12px">
    <div class="c1"><div class="ch">ZOMATO - DELIVERY</div><div style="margin:12px 0 8px;font-size:15px">ID: <b>${o.id}</b></div>
      <div style="display:flex;gap:8px"><button class="smallbtn" data-a="toast" data-v="KOT sent to printer">${ic('print', 13)}KOT</button><button class="smallbtn" data-a="toast" data-v="Order printed">${ic('print', 13)}ORDER</button></div>
      <div style="display:flex;justify-content:space-between;margin-top:14px;border-top:1px solid #eee;padding-top:12px;color:var(--blue)"><b style="font-weight:500">${o.name} ▸</b><span>${ic('phone', 14)} Call</span></div>
      <div class="muted" style="font-size:11.5px;margin-top:2px">${o.sub}<br>${o.addr}</div>
      <div style="display:flex;justify-content:space-between;margin-top:14px;border-top:1px solid #eee;padding-top:10px;font-size:12px" class="muted"><span>Placed: ${mins(o)} mins ago</span><a data-a="toast" data-v="Order timeline">🕐 Timeline</a></div></div>
    <div class="c2"><div style="color:#2a8a3f;font-size:11px;margin-bottom:4px">🌿 Send cutlery</div>
      ${o.items.map(i => `<div class="item"><span><span class="veg"></span>${i[2]} x <u>${i[0]}</u></span><span class="muted">₹${i[1].toFixed(2)}</span></div>`).join('')}
      <div style="display:flex;justify-content:space-between;border-top:1px solid #ddd;margin-top:8px;padding-top:12px"><span><u style="text-decoration:underline dotted">Total Bill</u> <span class="smallbtn" style="padding:0 5px;font-size:10px">PAID</span></span><b style="font-weight:500">₹${o.total.toFixed(2)}</b></div>
      <div style="text-align:center;color:#2a8a3f;margin-top:16px">🌿 VEG ONLY ORDER</div>
      ${o.status === 'preparing' ? `<button class="ready" data-a="ready" data-v="${o.id}"><i id="pg${o.id}"></i><span id="tm${o.id}">Order ready</span></button>` : o.status === 'ready' ? `<button class="ready" data-a="pick" data-v="${o.id}"><span>Mark picked up</span></button>` : `<div style="text-align:center;color:#2a8a3f;margin-top:12px">Delivered ✔</div>`}</div>
    <div class="c3"><div style="border:1px solid #eee;border-radius:6px;padding:12px;display:flex;gap:12px;font-size:12px"><div style="width:42px;height:42px;border-radius:50%;background:#fbd2d0;display:grid;place-items:center;font-size:22px">🧑</div><div>${o.rider} has arrived<div style="margin:6px 0"><a>${ic('phone', 12)} Call</a> | OTP: ${o.otp}</div><a>${ic('track', 12)} Track location</a></div></div>
      <div style="text-align:right;margin-top:12px"><button class="smallbtn" style="font-size:12px;padding:6px 8px" data-a="toast" data-v="Live chat opened">${ic('chat', 13)}Live order chat support</button></div>
      <div style="text-align:right;margin-top:12px"><button class="smallbtn" style="padding:6px 10px" data-a="toast" data-v="Order help">${ic('help', 13)}Order help</button></div></div></div>`;
  return `<div class="orders-top"><div class="otabs">${tabs.map(([k, l]) => `<button class="otab ${S.ordTab === k ? 'on' : ''}" data-a="ordTab" data-v="${k}">${l}${k === 'preparing' ? ` (${cnt(k)})` : cnt(k) ? ` (${cnt(k)})` : ''}</button>`).join('')}</div>
    <div style="display:flex;gap:12px"><select class="select"><option>Placed At</option><option>Ready by</option></select><div class="search" style="width:250px;height:32px;font-size:12px">${ic('search', 15)}<input id="oq" placeholder="Search by the 4 digit order ID"></div></div></div>
    ${list.length ? list.map(card).join('') : `<div class="empty" style="height:50vh"><div style="text-align:center" class="muted"><div style="font-size:48px">🛎️</div>No ${S.ordTab === 'preparing' ? 'orders being prepared' : S.ordTab === 'ready' ? 'orders ready' : 'orders picked up'}</div></div>`}
    ${S.orders.some(o => o.status === 'preparing') ? `<div class="snack" data-a="go" data-v="complaints"><div><b>Your 1 complaint is about to expire</b><small>Action to enhance customer experience</small></div>${ic('right', 24)}</div>` : ''}`;
}
function mountOrders() {
  const upd = () => S.orders.filter(o => o.status === 'preparing').forEach(o => {
    const left = Math.max(0, Math.round((o.dl - Date.now()) / 1000)), tot = 8 * 60;
    const t = $('#tm' + o.id), p = $('#pg' + o.id);
    if (t) t.textContent = `Order ready (${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')})`;
    if (p) p.style.width = Math.min(100, (1 - left / tot) * 100) + '%';
  });
  upd(); timer = setInterval(upd, 1000);
}

function pgMenuOverview() {
  const fries = `<svg width="48" height="48" viewBox="0 0 52 52" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 26l3 20h18l3-20" fill="#f8fafc" />
    <path d="M16 26l2-16h4l-1 16" fill="#fef08a" />
    <path d="M23 26l1-19h4l-1 19" fill="#fef08a" />
    <path d="M29 26l2-15h4l-2 15" fill="#fef08a" />
    <path d="M20 33a6 6 0 0 0 12 0" />
  </svg>`;
  const bin = `<svg width="48" height="48" viewBox="0 0 48 52" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="10" y="10" width="28" height="6" rx="2" fill="#f1f5f9" />
    <path d="M12 16l3 28h18l3-28" fill="#f8fafc" />
    <line x1="19" y1="22" x2="19" y2="38" />
    <line x1="24" y1="22" x2="24" y2="38" />
    <line x1="29" y1="22" x2="29" y2="38" />
    <path d="M20 10V6h8v4" />
  </svg>`;
  const burger = `<svg width="52" height="44" viewBox="0 0 54 46" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="6" y="8" width="22" height="30" rx="3" fill="#f8fafc" />
    <line x1="10" y1="14" x2="24" y2="14" />
    <line x1="10" y1="19" x2="20" y2="19" />
    <line x1="10" y1="24" x2="22" y2="24" />
    <path d="M28 24a8 8 0 0 1 16 0z" fill="#fed7aa" />
    <rect x="27" y="27" width="18" height="3" rx="1.5" fill="#86efac" />
    <rect x="27" y="32" width="18" height="3" rx="1.5" fill="#f87171" />
    <rect x="28" y="37" width="16" height="4" rx="2" fill="#fed7aa" />
  </svg>`;
  const condiments = `<svg width="48" height="48" viewBox="0 0 48 52" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 22l3-12h4l3 12v22H14z" fill="#f8fafc" />
    <path d="M19 10V5h2v5" />
    <ellipse cx="34" cy="34" rx="9" ry="8" fill="#f8fafc" />
    <path d="M28 34a6 6 0 0 0 12 0" />
  </svg>`;
  const bag = `<svg width="48" height="48" viewBox="0 0 48 52" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 15l3-7h20l3 7v30H11z" fill="#f8fafc" />
    <path d="M14 15c0 6 20 6 20 0" />
    <circle cx="24" cy="31" r="7" fill="#fff" stroke="#94a3b8" />
    <text x="24" y="34.5" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b" stroke="none">₹</text>
  </svg>`;
  const cutlery = `<svg width="42" height="54" viewBox="0 0 42 60" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 6v14a6 6 0 0 0 12 0V6" />
    <path d="M13 6v14" />
    <path d="M13 26v28" stroke-width="3.5" />
    <path d="M33 6v48" stroke-width="3.5" />
    <path d="M33 6c-8 6-8 18 0 24" fill="#fef9c3" stroke-width="2" />
  </svg>`;
  const camera = `<svg width="56" height="42" viewBox="0 0 56 42" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="11" width="46" height="27" rx="6" fill="#eaf6f6" />
    <path d="M18 11l3-5h14l3 5" fill="#f07241" />
    <circle cx="28" cy="24" r="8" fill="#fff" stroke="#111" stroke-width="2.2" />
    <circle cx="28" cy="24" r="4" fill="#38bdf8" />
    <circle cx="43" cy="18" r="2" fill="#111" />
  </svg>`;
  const video = `<svg width="42" height="48" viewBox="0 0 42 48" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="7" y="4" width="28" height="40" rx="5" fill="#e0f2fe" />
    <rect x="11" y="9" width="20" height="28" rx="2" fill="#fff" />
    <polygon points="18,17 27,23 18,29" fill="#f97316" stroke="#111" stroke-width="1.8" />
  </svg>`;

  return `<div class="mov-wrap">
    <div class="mov-cols">
      <div class="mov-col-l">
        <div class="mov-card mov-score">
          <div>
            <h2 class="mov-score-h">Your menu Score is Excellent <span class="mov-info" title="Based on items, pictures, descriptions and categorization">${ic('info', 16)}</span></h2>
            <p class="mov-score-p">Top restaurants in your area have a menu score of 90%</p>
            <span class="mov-score-d">Last updated on 2:38 pm, 24/10/2026</span>
          </div>
          <div class="mov-gauge">
            <svg width="128" height="106" viewBox="0 0 128 106">
              <path d="M 28 88 A 48 48 0 1 1 100 88" fill="none" stroke="#f1f3f7" stroke-width="12" stroke-linecap="round"/>
              <path d="M 28 88 A 48 48 0 1 1 100 88" fill="none" stroke="#22c55e" stroke-width="12" stroke-linecap="round" stroke-dasharray="212 240"/>
              <text x="64" y="64" text-anchor="middle" font-size="24" font-weight="800" fill="#1c1c1c" font-family="'Figtree',sans-serif">96%</text>
            </svg>
          </div>
        </div>

        <div class="mov-opp">
          <h3>Top opportunities to grow your business</h3>
          <div class="mov-grid">
            <div class="mov-opp-card">
              <div class="mov-opp-t">
                <h4>Add photos of your top selling items</h4>
                <a href="#/menu/editor" data-a="menuView" data-v="editor" class="mov-link">View items ▸</a>
              </div>
              <div class="mov-opp-i">${fries}</div>
            </div>
            <div class="mov-opp-card">
              <div class="mov-opp-t">
                <h4>Simplify your menu structure</h4>
                <a href="#/menu/editor" data-a="menuView" data-v="editor" class="mov-link">View insights ▸</a>
              </div>
              <div class="mov-opp-i">${bin}</div>
            </div>
            <div class="mov-opp-card">
              <div class="mov-opp-t">
                <h4>Add descriptions of your top selling items</h4>
                <a href="#/menu/editor" data-a="menuView" data-v="editor" class="mov-link">View items ▸</a>
              </div>
              <div class="mov-opp-i">${burger}</div>
            </div>
            <div class="mov-opp-card">
              <div class="mov-opp-t">
                <h4>Add relevant add-ons to bring customer love</h4>
              </div>
              <div class="mov-opp-i">${condiments}</div>
            </div>
            <div class="mov-opp-card">
              <div class="mov-opp-t">
                <h4>Your packaging charges are optimal</h4>
              </div>
              <div class="mov-opp-i">${bag}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mov-col-r">
        <div class="mov-card mov-cta" data-a="menuView" data-v="editor">
          <div class="mov-cta-t">
            <div class="mov-cta-h">
              <span>Go to Menu Editor</span>
              <span class="mov-arr">➔</span>
            </div>
            <p>Edit menu, tax slabs and Inventory</p>
          </div>
          <div class="mov-cta-i">${cutlery}</div>
        </div>

        <div class="mov-promo-grid">
          <div class="mov-card mov-promo" data-a="toast" data-v="Photoshoot request initiated">
            <div class="mov-promo-h">
              <span>Request<br>photoshoot</span>
              <span class="mov-arr">➔</span>
            </div>
            <div class="mov-promo-i">${camera}</div>
          </div>
          <div class="mov-card mov-promo" data-a="toast" data-v="Menu video feature opened">
            <div class="mov-promo-h">
              <span>Add<br>videos on<br>menu</span>
              <span class="mov-arr">➔</span>
            </div>
            <div class="mov-promo-i">${video}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mov-banner">
      <span>Your menu tool has a new look! Take a tour to see what has changed.</span>
      <button class="mov-tour-btn" data-a="toast" data-v="Tutorial tour started">${ic('wand', 14)} Start tutorial</button>
    </div>
  </div>`;
}

function pgMenu() {
  if (S.menuView !== 'editor') {
    return pgMenuOverview();
  }
  const tabs = [['editor', 'Menu editor'], ['inventory', 'Manage inventory'], ['info', 'Restaurant information']];
  let b = '';
  if (S.menuTab === 'editor') {
    const c = CATS[S.menuCat];
    b = `<div class="mbar"><div class="search" style="width:388px">${ic('search', 15)}<input placeholder="Search"></div><div style="flex:1"></div>
      <button class="btn" data-a="toast" data-v="Filters">${ic('filter', 14)}Filters</button><button class="btn" data-a="toast" data-v="Actions">Actions <span class="caret"></span></button>
      <div class="seg"><button class="${S.menuFilter === 'all' ? 'on' : ''}" data-a="mf" data-v="all">Complete Menu</button><button class="${S.menuFilter === 'rej' ? 'on' : ''}" data-a="mf" data-v="rej">Rejected <span class="cnt">10</span></button></div>
      <button class="btn primary" data-a="toast" data-v="Menu changes submitted for review">Submit Changes</button></div>
    <div class="mgrid"><div class="cats"><h4>Categories (${CATS.length + 8})</h4><div class="addlink" data-a="toast" data-v="Add category" style="cursor:pointer">+ Add Category</div>
      ${CATS.map((k, i) => `<div class="cat ${S.menuCat === i ? 'on' : ''}" data-a="cat" data-v="${i}"><span>${k[0]} (${k[1]}) ${k[3] ? `<span class="tiny">⏲ ${k[3]}</span>` : ''}</span><span style="display:flex;align-items:center"><span class="dots">${ic('more', 14)}</span><svg class="i" viewBox="0 0 24 24" style="transform:rotate(${S.menuCat === i ? 180 : 0}deg)"><path d="${P.chev}"/></svg></span></div>
      ${S.menuCat === i ? `<div class="subcat" style="font-size:12px">${k[0]} (${k[1]})</div><div class="addlink" style="font-size:12px;height:34px;padding-left:22px">+ Add Subcategory</div>` : ''}`).join('')}
      <div class="addlink" data-a="toast" data-v="Add-ons" style="position:sticky;bottom:0;background:#fff;border-top:1px solid var(--line);height:48px;justify-content:space-between;cursor:pointer;font-weight:500">Go to Add Ons ${ic('arrow', 16)}</div></div>
      <div class="mitems"><h4>${c[0]} (${c[1]})<span class="dots cat" style="border:1px solid var(--line);width:28px;height:24px;padding:0;margin:0;background:#fff;display:grid;place-items:center">${ic('more', 14)}</span></h4>
      <div style="display:flex;gap:26px;padding:12px 14px" class="addlink"><span data-a="toast" data-v="Add item">+ Add New Item</span><span data-a="toast" data-v="Map item">+ Map existing item</span></div>
      ${c[2].filter(i => S.menuFilter === 'all' || i[4] === 'rej').map(i => `<div class="mrow"><div class="img">${i[3]}</div><div><span class="veg ${i[2] === 'nv' ? 'nveg' : ''}" style="margin:0 0 4px"></span><div class="nm">${i[0]}</div><div style="margin-top:4px">₹${i[1]}${i[4] === 'custom' ? ' <span class="muted">| customisable</span>' : ''}</div>${i[4] === 'rej' ? '<div class="rej" style="margin-top:4px">1 media rejected in moderation</div>' : ''}</div></div>`).join('') || '<div class="empty" style="padding:60px;color:#888">No items</div>'}</div></div>
`;
  } else if (S.menuTab === 'inventory') {
    b = `<div style="padding:16px"><h3 style="margin-bottom:12px;font-weight:600">Manage inventory</h3><div class="card" style="border:1px solid var(--line)">${CATS.flatMap(c => c[2]).map(i => { const on = S.inventory[i[0]] !== false; return `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #eee"><span>${i[0]} <span class="muted">₹${i[1]}</span></span><span style="display:flex;gap:10px;align-items:center;font-size:12px" class="muted">${on ? 'In stock' : 'Out of stock'}<span class="toggle ${on ? 'on' : ''}" data-a="stock" data-v="${i[0].replace(/"/g, '')}"></span></span></div>`; }).join('')}</div></div>`;
  } else {
    b = `<div class="ph"><h1>Restaurant information</h1><div class="card" style="border:1px solid var(--line);padding:18px;line-height:2"><b>${OUTLET.name}</b><br>${OUTLET.loc}<br>Cuisines: North Indian, Chinese, Pizza, Mughlai, Fast Food, Beverages, Continental<br>Restaurant ID: ${OUTLET.id}</div></div>`;
  }
  return `<div class="mtabs"><a href="#/menu" data-a="menuView" data-v="overview" style="color:inherit;display:flex;align-items:center;cursor:pointer" title="Back to Menu overview">${ic('left', 18)}</a>${tabs.map(([k, l]) => `<button class="mtab ${S.menuTab === k ? 'on' : ''}" data-a="mtab" data-v="${k}">${l}</button>`).join('')}<div style="flex:1"></div><a data-a="toast" data-v="No new changes" style="font-size:13px">${ic('wand', 14)} See what's changed</a></div>${b}`;
}

function pgHistory() {
  const q = S.histQ.trim();
  const rows = HIST.filter(h => !q || h[2].includes(q));
  const sel = HIST.find(h => h[2] === S.hist);
  const tg = s => `<span class="tag ${s === 'PREPARING' ? 'prep' : 'del'}">${s}</span>`;
  const det = sel ? `<div class="hr"><div style="display:flex;justify-content:space-between;align-items:center">${tg(sel[0])}<span class="muted">${sel[1]}</span></div>
    <h2 style="margin:16px 0 4px;font-size:20px">Order #${sel[2]}</h2><div class="muted">Placed by ${sel[3]}</div>
    <table class="dt" style="margin-top:18px">${sel[4].split(', ').map(x => `<tr><td>${x}</td><td style="text-align:right"></td></tr>`).join('')}<tr><td><b>Total</b></td><td style="text-align:right"><b>₹${sel[5].toFixed(2)}</b></td></tr></table>${sel[6] ? `<div style="color:var(--red);margin-top:14px;font-size:13px">${sel[6]}</div>` : ''}</div>`
    : `<div class="empty"><div style="text-align:center"><div style="font-size:54px;opacity:.55">🛎️</div><div style="margin-top:6px">No order selected</div></div></div>`;
  return `<div class="page-h"><h2>Order History</h2><div style="display:flex;gap:10px"><button class="btn" data-a="toast" data-v="Date range">${ic('cal', 14)}28th to 29th Sep <span class="caret"></span></button><button class="btn" data-a="toast" data-v="Filters">${ic('filter', 14)}Filter</button><button class="btn" data-a="dlData" style="min-width:158px;justify-content:space-between">Download data <span class="caret"></span></button></div></div>
  <div class="hist"><div class="hl"><div class="sr"><div class="search">${ic('search', 15)}<input id="hq" placeholder="Enter full order ID to search" value="${S.histQ}"></div><button class="btn disabled" style="height:38px;width:104px;justify-content:center">Search</button></div>
    ${rows.map(h => `<div class="ho ${S.hist === h[2] ? 'on' : ''}" data-a="hsel" data-v="${h[2]}"><div class="r1">${tg(h[0])}<span class="muted">${h[1].replace(' | ', ' | ')}</span></div><div class="r2"><span>ID: ${h[2]}</span><span class="muted">By ${h[3]}</span></div><div class="r3"><span>${h[4]}</span><span>${inr(h[5])}</span></div>${h[6] ? `<div class="r4">${h[6]}</div>` : ''}</div>`).join('') || '<div style="padding:30px;text-align:center" class="muted">No orders found</div>'}</div><div>${det}</div></div>`;
}

/* reporting */
const wk = a => a;
function pgReporting() {
  const t = S.repTab === 'business';
  const head = `<div class="page-h" style="height:56px;top:78px"><div class="rtabs"><button class="${!t ? 'on' : ''}" data-a="rtab" data-v="live">Live tracking</button><button class="${t ? 'on' : ''}" data-a="rtab" data-v="business">Business reports</button></div>
    <div style="display:flex;gap:10px">${t ? `<button class="btn" style="background:#f2f4f9;border:0;color:#555" data-a="modal" data-v="report">${ic('dl', 14)}Generate report</button>` : ''}<button class="btn" style="background:#f2f4f9;border:0;min-width:${t ? 208 : 210}px;justify-content:space-between">${ic('filter', 13)}${t ? 'Dinner Bell By Buddha Ave' : 'All outlets'}<span class="caret"></span></button></div></div>`;
  if (!t) return head + liveTracking();
  const sw = `<div class="viewsw"><button class="${S.repView === 'table' ? 'on' : ''}" data-a="rview" data-v="table">${ic('grid', 16)}</button><button class="${S.repView === 'chart' ? 'on' : ''}" data-a="rview" data-v="chart">${ic('chart', 16)}</button></div>`;
  return head + sw + (S.repView === 'table' ? repTable() : repCharts());
}
function repTable() {
  const spk = a => sparkline(a, 130, 30, true);
  const rows = [
    ['sec', 'Sales overview'],
    ['Sales', D.sales, v => inr(v)], ['Delivered orders', D.orders, v => v], ['Average order value', D.aov, v => inr(v)],
    ['sec', 'Customer experience'],
    ['Average rating', D.rating, v => v, 1], ['Bad orders', D.bad, v => v + '%', 1], ['Total complaints', D.comp, v => v, 1], ['Lost sales', D.lost, v => inr(v)], ['Online %', D.online, v => v + '%', 1],
    ['Kitchen preparation time', D.kpt, v => Math.round(v) + ' mins']
  ];
  return `<div class="tbl"><table><thead><tr><th>Metric <span style="float:right">${ic('info', 14)}</span></th><th style="min-width:170px">Week 32 to Week 40 trend</th>${WL.map((w, i) => `<th>${w}<small>${WR[i]}</small></th>`).join('')}<th>Week 41<small>(Week till date)</small></th></tr></thead><tbody>
    ${rows.map(r => r[0] === 'sec' ? `<tr><td class="secr" colspan="12">${r[1]}</td></tr>` : `<tr><td>${r[0]} ${r[3] ? `<span style="float:right">${ic('chev', 14)}</span>` : ''}</td><td class="spk">${spk(r[1])}</td>${r[1].map(v => `<td>${r[2](v)}</td>`).join('')}<td></td></tr>`).join('')}</tbody></table></div>
    <button class="btn primary compare" data-a="toast" data-v="Outlet comparison">Compare performance at outlet level ${ic('arrow', 14)}</button>`;
}
function cc(title, series, opt = {}) { return `<div class="cc"><h5>${title}</h5>${legend(series)}${chart({labels: WL, series, ...opt})}</div>`; }
function repCharts() {
  const B = '#9fbcfb';
  const k = v => v >= 1e5 ? '₹' + (v / 1e5).toFixed(2) + 'L' : v >= 1000 ? '₹' + (v / 1000).toFixed(2) + 'k' : '₹' + v.toFixed(2);
  const pc = v => v.toFixed(2) + '%';
  const n = v => v >= 1000 ? (v / 1000).toFixed(2) + 'k' : v.toFixed(2);
  return `<div class="chs">
  <h3>Sales overview</h3><div class="cgrid">
   ${cc('Sales & Orders', [{name: 'Sales', data: D.sales, kind: 'line', color: '#3d6ee8', fmt: k}, {name: 'Orders', data: D.orders, kind: 'bar', color: B, fmtBar: v => v.toFixed(2), axis: 'r'}], {yTitle: 'Sales'})}
   ${cc('Average order value', [{name: 'Average order value', data: D.aov, kind: 'line', fmt: v => '₹' + v.toFixed(2)}])}</div>
  <h3>Customer Experience</h3><div class="cgrid">
   ${cc('Rated orders & Rating', [{name: 'Rated orders', data: [14.2, 14.8, 15.3, 15.9, 16.5, 17.1, 17.8, 18.4, 19.2], kind: 'line', fmt: pc}, {name: 'Average rating', data: D.rating.map(v => v - 0.02), kind: 'bar', color: B, fmt: v => v.toFixed(2), axis: 'r'}], {yTitle: 'Rated orders'})}
   ${cc('Bad orders', [{name: 'Bad orders', data: D.bad, kind: 'line', color: '#3d6ee8'}, {name: 'Delayed orders', data: [5.2, 4.8, 4.4, 4.0, 3.6, 3.2, 2.8, 2.5, 2.1], kind: 'line', color: '#2fa39a'}, {name: 'Poor rated orders', data: [3.4, 3.1, 2.8, 2.5, 2.2, 2.0, 1.8, 1.6, 1.4], kind: 'line', color: '#e0793a'}, {name: 'Rejected orders', data: [0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.2, 0.1, 0.1], kind: 'line', color: '#e23f5b'}, {name: 'Total complaints', data: [2.2, 2.0, 1.8, 1.6, 1.4, 1.2, 1.0, 0.8, 0.6], kind: 'line', color: '#7b4fd8'}].map(s => ({...s, fmt: pc}))) }
   ${cc('Online percentage & Offline time', [{name: 'Online %', data: D.online, kind: 'line', fmt: pc}, {name: 'Offline time', data: [3.2, 2.8, 2.4, 1.9, 1.5, 1.1, 0.8, 0.5, 0.3].map(v => v * 30 / 3.7), kind: 'bar', color: B, fmt: v => v.toFixed(2) + '%', fmtBar: v => (v * 3.7 / 30).toFixed(2) + ' hrs'}], {yTitle: 'Online %'})}
   ${cc('FOR accuracy & KPT', [{name: 'FOR accuracy', data: [85, 85, 85, 85, 85, 85, 85, 85, 85], kind: 'line', fmt: pc}, {name: 'KPT', data: D.kpt.map(v => v * 6.5), kind: 'bar', color: B, fmt: pc, fmtBar: v => (v / 6.5).toFixed(2) + ' mins'}], {yTitle: 'FOR accuracy'})}</div>
  <h3>Customer funnel</h3><div class="cgrid">
   ${cc('Impressions', [{name: 'Impressions', data: D.imp, kind: 'line', fmt: n}])}
   ${cc('Impressions to menu', [{name: 'Impressions to menu', data: D.i2m, kind: 'line', fmt: pc}])}
   ${cc('M2O, M2C and C2O', [{name: 'M2O', data: [15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19], kind: 'line'}, {name: 'M2C', data: [38, 39, 40, 41, 42, 43, 44, 45, 46.5], kind: 'line', color: '#e0793a'}, {name: 'C2O', data: [32, 33, 34, 35, 36, 37, 38, 39, 41], kind: 'line', color: B}].map(s => ({...s, fmt: pc})))}
   ${cc('New users, Repeat users & Lapsed users', [{name: 'New users', data: [30, 31, 32, 33, 34, 35, 36, 37, 39], kind: 'line'}, {name: 'Repeat users', data: [52, 54, 56, 58, 60, 62, 63, 65, 66], kind: 'line', color: B}, {name: 'Lapsed users', data: [14, 13, 12, 11, 10, 9, 8, 7, 6], kind: 'line', color: '#e0793a'}].map(s => ({...s, fmt: pc})))}</div>
  <h3>Marketing</h3><div class="cgrid">
   ${cc('Impressions & Impressions from Ads', [{name: 'Impressions', data: D.imp, kind: 'line', fmt: n}, {name: 'Impressions from Ads', data: D.imp.map(v => v * .93), kind: 'line', color: '#e0793a', fmt: n}])}
   ${cc('Ads CTR', [{name: 'Ads CTR', data: [8.6, 8.8, 9.0, 9.3, 9.6, 9.9, 10.2, 10.6, 11.0], kind: 'line', fmt: pc}])}
   ${cc('Ads spent & ROI', [{name: 'Ads spent', data: [8000, 8500, 9000, 9600, 10200, 10800, 11500, 12200, 13000], kind: 'bar', color: B, fmt: k, fmtBar: v => (v / 2700).toFixed(2)}, {name: 'ROI', data: [9200, 10100, 11000, 12200, 13400, 14800, 16200, 17800, 19500], kind: 'line', color: '#3d6ee8', fmt: k}], {yTitle: 'Ads spent'})}
   ${cc('Total sales & Gross sales from offers', [{name: 'Total sales', data: [195000, 203000, 212000, 221000, 231000, 242000, 254000, 268000, 284000], kind: 'line', fmt: k}, {name: 'Gross sales for offers', data: [138000, 144000, 151000, 159000, 167000, 176000, 187000, 199000, 214000], kind: 'line', color: B, fmt: k}])}</div>
  <h3>Menu Trends</h3><div class="cgrid">${cc('Menu score & M2C', [{name: 'Menu score', data: [86, 88, 90, 92, 93, 94, 95, 96, 96], kind: 'line', color: '#22c55e', fmt: pc}, {name: 'M2C', data: [39.2, 40.1, 41.2, 42.1, 43.0, 44.1, 45.0, 45.8, 46.8], kind: 'bar', color: B, fmt: pc, fmtBar: v => v.toFixed(2) + '%'}], {yTitle: 'Menu score'})}</div></div>`;
}
function liveTracking() {
  const row = (l, arr) => `<div class="lr"><span>${l}</span><span>${sparkline(arr, 220, 30)}</span><span class="v"><a class="vb" data-a="rtab" data-v="business" style="cursor:pointer">View business reports</a></span></div>`;
  const fr = (l, arr, v, d) => `<div class="lr"><span style="display:flex;gap:10px;align-items:center"><span style="color:#3d6ee8">${ic('info', 16)}</span>${l}</span><span>${sparkline(arr, 220, 30)}</span><span class="v"><b style="font-weight:500">${v}</b><span class="delta ${d < 0 ? 'd' : 'u'}">${d > 0 ? '+' : ''}${d}% ${d < 0 ? '▼' : '▲'}</span></span></div>`;
  const s = [[4, 4, 4, 4, 4, 1], [6, 6, 5, 6, 4, 2]];
  return `<div class="live">
  <div class="lc"><div class="lh">📈 Sales overview</div>${fr('Sales', [4, 5, 5, 6, 8], '₹8,940', 18)}${fr('Delivered orders', [3, 4, 5, 6, 7], '28', 14)}${row('Average order value', [3, 4, 4, 5, 5])}</div>
  <div class="lc"><div class="lh">⭐ Customer experience</div>${row('Average rating', [4.2, 4.3, 4.3, 4.4, 4.5])}${row('Bad orders', [8, 7, 6, 5, 4])}${row('Online %', [96, 97, 98, 99, 99.5])}</div>
  <div class="lc"><div class="lh"><span style="color:#7b4fd8">▼</span> Customer funnel ${ic('info', 12)}</div>
    ${[['Impressions', [3, 3.5, 4, 5, 6], '2,180', 24], ['Impressions to menu', [6, 6.5, 7, 7.5, 8], '12.4%', 8], ['Menu to cart', [4, 4.2, 4.5, 4.8, 5.2], '48.0%', 12], ['Cart to order', [5, 5.2, 5.5, 6.0, 6.5], '45.8%', 15]].map(r => `<div class="lr"><span style="display:flex;gap:10px;align-items:center"><span style="color:var(--blue)">●</span>${r[0]}</span><span>${sparkline(r[1], 220, 34)}</span><span class="v"><b style="font-weight:500">${r[2]}</b><span class="delta ${r[3] < 0 ? 'd' : 'u'}">${r[3] > 0 ? '+' : ''}${r[3]}% ${r[3] < 0 ? '▼' : '▲'}</span></span></div>`).join('')}
    ${row('New users', [3, 3.5, 4.0, 4.4, 4.8])}${row('Repeat users', [4.5, 4.8, 5.2, 5.6, 6.0])}${row('Lapsed users', [5, 4.5, 4.0, 3.5, 3.0])}</div>
  <div class="lc"><div class="lh">📣 Ads & Offers</div>${fr('Sales from offers', [3, 3.5, 4, 5.5, 7], '₹7,420', 28)}${row('Sales from ads', [3, 3.5, 4, 5, 6])}</div>
  <div class="lc"><div class="lh">🍤 Dish trends</div><div style="padding:14px;border-top:1px solid #eee"><a class="vb" data-a="rtab" data-v="business" style="cursor:pointer">View business reports</a></div></div></div>`;
}

/* ads */
function pgAds() {
  const tabs = `<div class="adtop"><button class="cc-btn" data-a="toast" data-v="Campaign builder"><b>+</b>Create campaign</button><span style="width:1px;height:28px;background:#ddd"></span>
   <button class="adtab ${S.adTab === 'perf' ? 'on' : ''}" data-a="adtab" data-v="perf">Ad performance</button><button class="adtab ${S.adTab === 'all' ? 'on' : ''}" data-a="adtab" data-v="all">All campaigns</button></div>`;
  if (S.adTab === 'all') return tabs + `<div class="adbody"><div class="ph"><h1>All campaigns</h1><div class="card" style="padding:0;border:1px solid var(--line)"><table class="tbl2"><tr><th>Campaign</th><th>Type</th><th>Status</th><th>Spend</th><th>Sales</th><th>ROI</th></tr>
    ${[['Weekend Boost', 'Growth', 'Active', 8400, 41200], ['Lunch Special', 'Visibility', 'Active', 5100, 22800], ['New Dish Launch', 'Growth', 'Ended', 3200, 11900]].map(c => `<tr><td>${c[0]}</td><td>${c[1]}</td><td>${c[2]}</td><td>${inr(c[3])}</td><td>${inr(c[4])}</td><td>${(c[4] / c[3]).toFixed(2)}</td></tr>`).join('')}</table></div></div></div>`;
  if (!S.adsLoaded) return tabs + `<div class="adbody" style="background:#fff"><div style="display:flex;justify-content:space-between"><div><h2 style="font-size:17px">Ad Performance</h2><small class="muted" style="font-size:9.5px">(Data refreshes at 1PM everyday)</small></div></div>
    <div class="filters"><div class="fsel" style="width:334px">${ic('cal', 15)}Last 60 days <span class="muted" style="font-size:12px">(31/Jul/2026 - 28/Sep/2026)</span></div><div class="fsel" style="width:148px">All Products</div><div class="fsel" style="width:160px">All Cities (1)</div><div class="fsel" style="width:196px">All Restaurants (1)</div></div>
    <div class="card" style="padding:12px;border:1px solid var(--line)"><div class="skel" style="height:38px;width:174px;margin-left:auto"></div><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:14px;margin:12px 0">${Array(6).fill('<div class="skel" style="height:92px"></div>').join('')}</div><div class="skel" style="height:360px"></div></div></div>`;
  const tiles = [['Ad spend', '₹36.4K'], ['Ad sales', '₹1.42L'], ['ROI', '3.9'], ['Impressions', '2.1L'], ['Clicks', '18.6K'], ['Orders', '482']];
  const W = 1100, H = 240, L = 40, R = 40, T = 10, B = 40, iw = W - L - R, ih = H - T - B;
  const roi = [4.5, 4.8, 5.4, 6, 4.6, 3.3, 2.6, 2.9, 4.4, 3.5, 3.9, 4.2, 3.8], ads = [3, 3.8, 4.6, 6.6, 5, 3.9, 3.8, 3.9, 4.9, 5.5, 5.3, 4.8, 1.1];
  const px = i => L + iw * i / (roi.length - 1), pr = v => T + ih - (v - 2) / 4 * ih, pa = v => T + ih - (v - 1.1) / (10.3 - 1.1) * ih;
  const grid = [2, 3, 4, 5, 6].map(v => `<line x1="${L}" x2="${W - R}" y1="${pr(v)}" y2="${pr(v)}" stroke="#eee"/><text x="${L - 8}" y="${pr(v) + 3}" text-anchor="end" font-size="8">${v.toFixed(1)}</text>`).join('') + ['27 Jul', '10 Aug', '24 Aug', '07 Sep', '21 Sep'].map((d, i) => `<text x="${L + iw * i / 4}" y="${H - 8}" text-anchor="middle" font-size="8">${d}</text>`).join('') + ['10.3K', '8.0K', '5.7K', '3.4K', '1.1K'].map((d, i) => `<text x="${W - R + 10}" y="${pr(6 - i) + 3}" font-size="8">${d}</text>`).join('');
  return tabs + `<div class="adbody" style="background:#fff"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><h2 style="font-size:17px">Ad Performance</h2><small class="muted" style="font-size:9.5px">(Data refreshes at 1PM everyday)</small></div><button class="btn outline-blue" data-a="dlData">${ic('dl', 14)}Download report</button></div>
    <div class="filters"><div class="fsel" style="width:334px">${ic('cal', 15)}Last 60 days <span class="muted" style="font-size:12px">(31/Jul/2026 - 28/Sep/2026)</span></div><div class="fsel" style="width:148px">All Products</div><div class="fsel" style="width:160px">All Cities (1)</div><div class="fsel" style="width:196px">All Restaurants (1)</div></div>
    <div class="card" style="padding:14px;border:1px solid var(--line)"><b>Summary</b> <small class="muted">(Select below metrics to plot on graph)</small><div class="tiles">${tiles.map((t, i) => `<div class="tile ${S.adTile === i ? 'on' : ''}" data-a="tile" data-v="${i}"><small>${t[0]}</small><b>${t[1]}</b></div>`).join('')}</div>
    <svg viewBox="0 0 ${W} ${H}" width="100%"><text transform="translate(10 ${T + ih / 2}) rotate(-90)" font-size="8" text-anchor="middle">Return on Investment</text>${grid}
     <path d="${smoothPath(ads.map((v, i) => [px(i), pa(v)]))}" fill="none" stroke="#3fb15a" stroke-width="1.4"/><path d="${smoothPath(roi.map((v, i) => [px(i), pr(v)]))}" fill="none" stroke="#3d6ee8" stroke-width="1.4"/></svg></div>
    <div class="card" style="padding:16px;border:1px solid var(--line);margin-top:18px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="font-weight:600;font-size:17px">Customer trends</h3><div class="fsel" style="width:188px;font-size:12px">Ad sales <span class="caret"></span></div></div>
    <div class="donuts" style="margin-top:14px"><div class="dn"><h4>Engagement level ${ic('info', 13)}</h4>${donut([{pct: 5, color: '#b9bcdf'}, {pct: 87, color: '#727bbb'}, {pct: 8, color: '#1a1f5c'}], '₹65.7K', 165)}<div class="dleg"><span><i style="background:#b9bcdf"></i>₹3.2K<br>Lapsed</span><span><i style="background:#727bbb"></i>₹57.2K<br>New</span><span><i style="background:#1a1f5c"></i>₹5.2K<br>Repeat</span></div></div>
    <div class="dn"><h4>Dietary preference ${ic('info', 13)}</h4>${donut([{pct: 42, color: '#b1b6de'}, {pct: 58, color: '#727bbb'}], '₹65.7K', 165)}<div class="dleg"><span><i style="background:#b1b6de"></i>₹27.3K<br>Non Veg</span><span><i style="background:#727bbb"></i>₹38.4K<br>Veg</span></div></div></div></div></div>`;
}

/* finance & misc */
function needOutlet(title, body) {
  const bar = `<div class="page-h" style="height:66px"><h2 style="font-size:20px;font-weight:600">${title}</h2>${S.outlet ? `<button class="btn" data-a="modal" data-v="outlet" style="font-size:12px">${ic('outlet', 14)}${S.outlet.name.slice(0, 11)}… ${ic('pen', 13)}</button>` : `<button class="btn" data-a="modal" data-v="outlet" style="font-size:12px">${ic('outlet', 14)}Select outlets ${ic('pen', 13)}</button>`}</div>`;
  return bar + (S.outlet ? body : `<div class="empty" style="height:60vh;background:#f0f0f0">Please select an outlet to continue</div>`);
}
function pgInvoices() {
  const mons = [['June, 2024', 'Z25-UPOO-069570'], ['May, 2024', 'Z25-UPOO-033574'], ['April, 2024', 'Z25-UPOO-003059'], ['March, 2024', 'Z24-UPOO-270127'], ['February, 2024', 'Z24-UPOO-256542'], ['January, 2024', 'Z24-UPOO-231364'], ['Financial year: 2023'], ['December, 2023', 'Z24-UPOO-200380']];
  const cards = [['online', 'Online ordering', 'Monthly commission invoices on an outlet level', '#3a3f5c', 'rupee'], ['ads', 'Ads invoice', 'Monthly Ads invoices on a Legal entity level', '#1d6f8c', 'megaphone'], ['recovery', 'Recovery', 'Monthly recovery invoices on an outlet level', '#2b7a45', 'recover']];
  const suf = {online: 'UPOO', ads: 'ADSI', recovery: 'RECV'}[S.inv];
  const body = `<div style="padding:0 18px 4px;font-size:16px;font-weight:600;margin-top:6px">Download invoices</div>
  <div class="invg"><div>${cards.map(c => `<div class="icard ${S.inv === c[0] ? 'on' : ''}" data-a="inv" data-v="${c[0]}"><div class="th" style="background:${c[3]}">${ic(c[4], 24)}</div><div class="tx"><b>${c[1]}</b><small>${c[2]}</small></div></div>`).join('')}
    <div style="font-size:16px;font-weight:600;margin:0 0 14px">Download tax receipts</div><div class="icard" data-a="toast" data-v="TDS receipts"><div class="th" style="background:#3a3f5c">${ic('doc', 24)}</div><div class="tx"><b>TDS</b><small>Tax deducted at source for products & services</small></div></div></div>
   <div>${mons.map(m => m[1] ? `<div class="irow"><div><b style="font-weight:600">${m[0]}</b><small>${m[1].replace('UPOO', suf)}</small></div><button class="dlb" data-a="dlInv" data-v="${m[0]}|${m[1].replace('UPOO', suf)}">${ic('dl', 17)}</button></div>` : `<div style="font-size:16px;font-weight:600;margin:24px 0 12px">${m[0]}</div>`).join('')}</div></div>`;
  return needOutlet('Invoices & Taxes', body);
}
function pgPayouts() {
  const rows = [['22 Sep - 28 Sep', 142860, 27, 'Paid'], ['15 Sep - 21 Sep', 151320, 27, 'Paid'], ['8 Sep - 14 Sep', 139204, 27, 'Paid'], ['1 Sep - 7 Sep', 130118, 27, 'Paid']];
  return `<div class="ph"><h1>Payouts</h1><div class="card" style="border:1px solid var(--line)"><table class="tbl2"><tr><th>Period</th><th>Net sales</th><th>Service fee</th><th>Payout</th><th>Status</th></tr>${rows.map(r => `<tr><td>${r[0]}</td><td>${inr(r[1])}</td><td>${r[2]}%</td><td>${inr(Math.round(r[1] * (1 - r[2] / 100 - .0184)))}</td><td style="color:#2a8a3f">${r[3]}</td></tr>`).join('')}</table></div></div>`;
}
function pgFees() {
  const comp = [['If the order was picked up by the delivery partner:', '100% of net order value'], ['If the order was not picked up by the delivery partner, was marked \'Order ready\' and \'Order ready\' marking accuracy was more than 80% in the previous week:', '80% of net order value'], ['If the order was not picked up by the delivery partner and the restaurant had less than 80% \'Order ready\' marking accuracy in the previous week, or the order was not marked \'Order ready\':', '0% of net order value']];
  return `<div class="page-h" style="height:70px;background:#f4f4f4;top:78px"><h2 style="font-size:20px;font-weight:600">Fees and policies</h2><div style="display:flex;gap:10px"><div class="fsel" style="height:44px;width:166px;border-radius:6px">🌐 English <span class="caret"></span></div><div class="fsel" style="height:44px;width:166px;line-height:1.1;font-size:12px"><div><b>Dinner Bell By Buddh…</b><br><span class="muted" style="font-size:10.5px">Shahpur, Gorakhpur</span></div></div></div></div>
  <div style="background:#f4f4f4;padding:12px 16px 30px"><div class="card fees" style="padding:0 0 16px;margin-bottom:14px"><h3 style="padding:16px 14px;font-size:15px;border-bottom:1px solid #eee;font-weight:600">Service fee</h3><div style="padding:0 14px">
    ${[['Restaurant ID', OUTLET.id], ['Base service fees (% of net sales)', '27%'], ['Payment gateway charges', '1.84%'], ['Long distance enablement fees', '']].map(r => `<div class="row"><span class="muted" style="color:#333">${r[0]}</span><span>${r[1]}</span></div>`).join('')}
    <div class="ft"><div><span>Commissionable value</span><span>0 Rs - 150 Rs</span><span>150 Rs+</span></div>${[['0 - 4 km', 0, 0], ['4 - 6 km', 0, 10], ['6+ km', 25, 25]].map(r => `<div><span>${r[0]}</span><span>${r[1]}</span><span>${r[2]}</span></div>`).join('')}</div></div></div>
   <div class="card" style="padding:0 0 10px"><h3 style="padding:16px 14px;font-size:15px;border-bottom:1px solid #eee;font-weight:600">Compensation Policy</h3>${comp.map(c => `<div style="padding:14px;border-bottom:1px solid #eee;font-size:12px;color:#444">${c[0]}<div style="margin-top:12px"><span style="background:#f0f0f0;padding:8px 10px;border-radius:5px;color:#111;font-weight:500">${c[1]}</span></div></div>`).join('')}</div></div>`;
}

/* outlet info */
const OI = [['about', 'About outlet'], ['contact', 'Contact details'], ['numbers', 'Outlet contact numbers'], ['timings', 'Outlet timings'], ['am', 'Know your account manager'], ['name', 'Outlet name, address & location'], ['link', 'Smart link']];
function pgOutlet() {
  const t = S.oi;
  const pane = {
    about: () => `<div class="hero" style="background-image:linear-gradient(135deg,#f6c895,#e9955a 45%,#c9481f)"><span style="filter:drop-shadow(0 6px 10px rgba(0,0,0,.3))">🍕</span><span class="ep" data-a="toast" data-v="Photo editor">${ic('cam', 13)}Edit photo</span><div class="logo-c">BUDDHA<br>AVENUE<em>Rejected</em></div></div>
      <div style="padding:44px 26px 0;position:relative"><div style="display:flex;justify-content:space-between"><div><h2 style="font-size:17px;font-weight:600;margin-top:4px">${OUTLET.name} <span style="color:var(--blue)">${ic('pen', 14)}</span></h2><div class="muted" style="margin:10px 0 6px">Shahpur</div><div style="font-size:13px">North Indian, Chinese, Pizza, Mughlai, Fast Food, Beverages, Continental <a>›</a></div></div>
      <div style="text-align:right;font-size:10px;display:grid;gap:8px"><div style="display:flex;gap:8px;justify-content:flex-end;align-items:center"><span class="rate">4.3 ★</span><span style="text-align:left"><b style="font-weight:500">3231</b><br>Delivery Reviews</span></div><div style="display:flex;gap:8px;justify-content:flex-end;align-items:center"><span class="rate y" style="padding:4px 9px">4 ★</span><span style="text-align:left"><b style="font-weight:500">16</b><br>Dining Reviews</span></div></div></div>
      <div style="border-top:1px solid #eee;margin-top:18px;padding:16px 0;display:flex;justify-content:space-between;gap:20px;font-size:13.5px"><span>📍 <b style="font-weight:500">Address:</b> House 0238-T, H.N.Singh Chauraha, Medical College Road, Shahpur, Gorakhpur <span style="color:var(--blue)">${ic('pen', 12)}</span></span><a style="white-space:nowrap" data-a="toast" data-v="Map">View on map ▸</a></div>
      <div style="border-top:1px solid #eee;padding:16px 0"><a style="display:flex;gap:6px" data-a="toast" data-v="Recording…">${ic('mic', 15)}Record pickup instructions</a><p class="muted" style="font-size:12px;margin-top:8px">Help the delivery partner reach your location easily (e.g. take a right from gate no. 1). We will show this to each new delivery partner.</p></div>
      <div style="border-top:1px solid #eee;padding:16px 0;font-size:13.5px">🏪 <b style="font-weight:500">Restaurant ID: ${OUTLET.id}</b> &nbsp;|&nbsp; <b style="font-weight:500">Active since:</b> 13 Dec 2023</div></div>`,
    contact: () => `<div class="search" style="margin:8px;height:38px">${ic('search', 15)}<input placeholder="Search using name, email or phone number"></div>
      <div class="sec">Owner<a>View permissions</a></div><div class="person"><div class="av">${ic('user', 20)}</div><div><b style="font-weight:500">Rudrendra Singh</b><small>+91-7388882666</small><small style="margin-top:2px">rudra@buddhaavenue.in</small><small style="margin-top:2px">Logged into 8 devices ›</small></div><span class="ed">${ic('pen', 14)}</span></div>
      <div class="sec">Manager<a>View permissions</a></div><div style="padding:14px;font-size:13px">No one added as manager yet. <a data-a="toast" data-v="Invite sent">Invite someone now.</a></div>
      <div class="sec">Staff<a>View permissions</a></div><div style="padding:14px;font-size:13px">No one added as staff yet. <a data-a="toast" data-v="Invite sent">Invite someone now.</a></div>
      <div style="position:fixed;right:max(20px,calc((100vw - 1404px)/2 + 20px));bottom:14px;display:grid;gap:4px;z-index:5"><button class="btn primary" style="height:32px;font-size:12px" data-a="toast" data-v="Invite new user">${ic('user', 13)}Invite new user</button><button class="btn" style="height:32px;font-size:12px;background:#b83226;color:#fff;border-color:#b83226" data-a="toast" data-v="All users logged out">Logout all users</button></div>`,
    numbers: () => `<div class="sec">Restaurant page number<a data-a="toast" data-v="Add number">Add a new number</a></div>${numRow('Restaurant page number 1', '+91-8795266667', true)}<div class="sec" style="margin-top:0">Order reminder call</div>${numRow('Order reminder number #1', '+91-8795266667')}${numRow('Order reminder number #2', '+91-8795566667')}`,
    timings: () => `<div style="padding:16px 14px"><div class="card" style="border:1px solid var(--line);padding:12px 14px 20px"><div style="color:var(--blue);border-bottom:1px solid #ddd;padding:6px 0 10px;width:110px;font-size:12px;border-bottom:2px solid var(--blue)">Zomato delivery</div><div style="margin-top:12px">
      ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => `<div class="acc ${S.day === d ? 'on' : ''}"><button data-a="day" data-v="${d}"><span>${d}</span><svg class="i" viewBox="0 0 24 24" style="width:15px;transform:rotate(${S.day === d ? 180 : 0}deg)"><path d="${P.chev}"/></svg></button>
      ${S.day === d ? `<div class="in"><div class="slot"><span class="muted" style="font-size:10px;margin-top:20px">SLOT 1</span><div><div style="font-size:10px;margin:0 0 3px 6px">Start time</div><div class="tbox">11:00 AM ${ic('pen', 13)}</div></div><span style="margin-top:20px">to</span><div><div style="font-size:10px;margin:0 0 3px 6px">End time</div><div class="tbox">11:45 PM ${ic('pen', 13)}</div></div><span style="margin-top:20px">${ic('trash', 16)}</span><a style="margin:20px 0 0 auto" data-a="toast" data-v="Slot added">+ Add time slot</a></div>
      <div style="border-top:1px solid #eee;margin-top:16px;padding-top:14px;display:flex;align-items:center;gap:12px;font-size:12px"><input type="checkbox"> Copy above timings to all days <span class="muted">|</span><span class="toggle on" data-a="tg"></span> Outlet open<button class="btn disabled" style="margin-left:auto;height:26px;font-size:11px">Save</button></div></div>` : ''}</div>`).join('')}</div></div></div>`,
    am: () => `<div style="padding:16px"><div class="card" style="border:1px solid var(--line);padding:16px;line-height:2.1;font-size:12px"><div class="muted" style="letter-spacing:2px;font-size:11px;font-weight:600;margin-bottom:6px">ACCOUNT MANAGER</div><div>${ic('user', 12)} &nbsp;Anshuman Pandey</div><div>${ic('phone', 12)} &nbsp;+91 9839079021</div><div><a>${ic('mail', 12)} &nbsp;anshuman.pandey@zomato.com</a></div></div>
      <div class="card" style="border:1px solid var(--line);padding:14px 12px;margin-top:14px;display:flex;justify-content:space-between;cursor:pointer" data-a="toast" data-v="Concern raised">Have any long-pending unresolved concerns? Let us know ${ic('right', 16)}</div></div>`,
    name: () => `<div style="padding:14px"><div class="card" style="border:1px solid var(--line)"><div style="padding:12px 14px;background:#f4f4f4;font-size:12px;font-weight:600">Select an option to proceed</div>${['Update Outlet Name', 'Update Outlet Address & Location'].map(x => `<div style="display:flex;justify-content:space-between;padding:10px 14px;border-top:1px solid #eee;font-size:13px;cursor:pointer" data-a="toast" data-v="${x}">${x}${ic('right', 16)}</div>`).join('')}</div></div>`,
    link: () => `<div style="padding:14px;font-size:13px">Access the link generation tool in the side drawer</div>`
  }[t]();
  return `<div class="page-h" style="height:52px"><h2>Outlet information</h2><button class="btn" style="height:28px;font-size:12px;color:#555" data-a="toast" data-v="Opening Zomato…">View on Zomato</button></div>
  <div class="oi"><div class="oil">${OI.map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-a="oi" data-v="${k}">${l}${ic('right', 16)}</button>`).join('')}</div><div class="oir">${pane}</div></div>`;
}
function numRow(l, n, del) { return `<div class="person" style="align-items:center;border-bottom:1px solid #eee;padding:14px"><div class="av" style="background:#eee">${ic('phone', 18)}</div><div><span>${l}</span><small>${n}</small></div><span class="ed" style="right:${del ? 44 : 14}px">${ic('pen', 14)}</span>${del ? `<span class="ed" style="color:#d33">${ic('trash', 14)}</span>` : ''}</div>`; }

function pgHyper() {
  return `<div class="page-h"><h2 style="background:#3d6ee8;color:#fff;padding:2px 2px">Hyperpure</h2><div class="fsel" style="height:32px;width:225px;font-size:11.5px">${ic('pin', 13)}Dinner Bell By Buddha Ave… <span class="caret"></span></div></div>
   <div style="background:#f4f4f4;padding:12px"><div class="card hp"><h1>hyperpure<small>BY ZOMATO</small></h1>
   <div class="steps">${[['1', '🧺', 'Fresh, hygienic & high-quality ingredients', 'Buy all your kitchen requirements under one roof'], ['2', '📱', '4,000+ products across 20+ categories', 'Fruits & vegetables, dairy, packaging, cleaning essentials & more'], ['3', '🛒', 'Save up to ₹1,400 on first 4 orders', 'Get ₹200 in credits on sign-up and up to ₹300 cashback on delivery of your first 4 orders'], ['4', '🚚', 'Order until 11 pm & get next-day delivery', 'Get assured delivery in the slot of your choice']].map(s => `<div><div class="n">${s[0]}<span style="font-size:36px;margin-left:-14px">${s[1]}</span></div><h4>${s[2]}</h4><p>${s[3]}</p></div>`).join('')}</div>
   <button class="big" data-a="toast" data-v="Redirecting to Hyperpure…">Start buying</button></div></div>`;
}
function simple(title, rows, extra = '') { return `<div class="ph"><h1>${title}</h1>${extra}<div class="list">${rows.map(r => `<div class="li"><div>${r[0]}<div class="muted" style="font-size:12px;margin-top:3px">${r[1] || ''}</div></div><span>${r[2] || ''}</span></div>`).join('')}</div></div>`; }
const INACTIVE_OFFERS = [];
const TRACKED_OFFERS = [
  {
    title: 'Flat ₹100 off',
    start: '2nd Mar 2026', end: '1st Jan 2031',
    badges: ['new users only', 'Active'],
    grossSales: 35176,
    orders: 105,
    discount: 6272,
    effDiscount: 17,
    applicable: 'New offer sensitive users on all menu items, excluding MRP items',
    minOrder: 199,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '80% of the discount value is being funded by you',
    created: 'Offline'
  },
  {
    title: '20% off upto ₹50',
    start: '2nd Mar 2026', end: '1st Jan 2031',
    badges: ['new users only', 'Active'],
    grossSales: 34964,
    orders: 75,
    discount: 3750,
    effDiscount: 10,
    applicable: 'New premium users on all menu items, excluding MRP items',
    minOrder: 199,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '80% of the discount value is being funded by you',
    created: 'Offline'
  },
  {
    title: 'flat ₹150 off',
    start: '2nd Mar 2026', end: '1st Jan 2031',
    badges: ['new users only', 'Active'],
    grossSales: 43766,
    orders: 56,
    discount: 6720,
    effDiscount: 15,
    applicable: 'New offer sensitive users on all menu items, excluding MRP items',
    minOrder: 599,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '80% of the discount value is being funded by you',
    created: 'Offline'
  },
  {
    title: '10% off upto ₹40',
    start: '2nd Mar 2026', end: '1st Jan 2031',
    badges: ['Active'],
    grossSales: 28450,
    orders: 82,
    discount: 2940,
    effDiscount: 10,
    applicable: 'All users on all menu items, excluding MRP items',
    minOrder: 149,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '80% of the discount value is being funded by you',
    created: 'Offline'
  },
  {
    title: 'Free dish on ₹399+',
    start: '15th Feb 2026', end: '1st Jan 2031',
    badges: ['Active'],
    grossSales: 38210,
    orders: 68,
    discount: 4120,
    effDiscount: 11,
    applicable: 'Repeat customers on main course and starters',
    minOrder: 399,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '100% of the discount value is being funded by you',
    created: 'Online'
  },
  {
    title: '15% off up to ₹60',
    start: '10th Jan 2026', end: '1st Jan 2031',
    badges: ['Active'],
    grossSales: 31250,
    orders: 94,
    discount: 4680,
    effDiscount: 15,
    applicable: 'All users on orders placed before 7 PM',
    minOrder: 249,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '80% of the discount value is being funded by you',
    created: 'Offline'
  },
  {
    title: 'Flat ₹50 off on Breakfast',
    start: '1st Jan 2026', end: '1st Jan 2031',
    badges: ['Active'],
    grossSales: 24890,
    orders: 78,
    discount: 3900,
    effDiscount: 16,
    applicable: 'Breakfast menu only (8 AM to 11 AM)',
    minOrder: 199,
    validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
    sharing: '80% of the discount value is being funded by you',
    created: 'Offline'
  }
];

function pgOffers() {
  const tabs = [
    ['create', 'Create offers'],
    ['track', 'Track offers']
  ];
  const banner = !S.bannerDismissed && S.offTab === 'create' ? `
    <div class="off-banner">
      <div class="off-b-left">
        <div class="off-b-av">👨‍🍳</div>
        <div>
          <div class="off-b-title">Why Customers Ignore Your Online Delivery Menu</div>
          <div class="off-b-sub">Experts' Table Ft. Chimney Sizzlers</div>
        </div>
      </div>
      <div class="off-b-right">
        <button class="off-watch-btn" data-a="toast" data-v="Playing video…"><span style="color:#e23744">▶</span> Watch now</button>
        <button data-a="dismissBanner" style="color:#fff;opacity:.7;cursor:pointer;padding:4px;display:flex;align-items:center">${ic('x', 16)}</button>
      </div>
    </div>` : '';

  const createTab = `
    <div class="off-content">
      <div class="off-sec-title">CUSTOM OFFER FOR YOU</div>
      <div class="off-grid">
        <div class="off-card" data-a="toast" data-v="Promo code creator opened">
          <div class="off-card-l">
            <h3 class="off-card-title">Promo code</h3>
            <p class="off-card-desc">Delight customers with free discounts on every order</p>
          </div>
          <div class="off-card-r">
            <div class="off-badge promo">
              <span class="off-badge-code">"HUNGRY"</span>
              <span class="off-badge-sub">30% OFF upto ₹75</span>
            </div>
          </div>
        </div>

        <div class="off-card" data-a="toast" data-v="Freebies offer creator opened">
          <div class="off-card-l">
            <h3 class="off-card-title">Freebies</h3>
            <p class="off-card-desc">Offer a free dish above a certain order value</p>
          </div>
          <div class="off-card-r">
            <div class="off-badge freebie">
              <span style="font-size:24px">🎁</span>
              <div>
                <span class="off-badge-code">Free Cupcake</span>
                <span class="off-badge-sub">on total ₹200+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="off-note">
        For creating a fixed discount, percentage discount or buy one get one offer use the Zomato Restaurant Partner app on Android. This feature will be available on the web dashboard soon.
      </p>
    </div>`;

  const cur = S.trackSubTab || 'active';
  const filterTabs = [
    ['active', `Active (${TRACKED_OFFERS.length})`],
    ['scheduled', 'Scheduled'],
    ['inactive', `Inactive (${177 + INACTIVE_OFFERS.length})`],
    ['all', `All (${184})`]
  ];

  let list = [];
  if (cur === 'active') list = TRACKED_OFFERS;
  else if (cur === 'scheduled') list = [];
  else if (cur === 'inactive') list = [
    ...INACTIVE_OFFERS,
    {
      title: 'Free dessert on ₹499+',
      start: '1st Aug 2026', end: '12th Sep 2026',
      badges: ['Inactive'],
      grossSales: 48900,
      orders: 98,
      discount: 4900,
      effDiscount: 10,
      applicable: 'All users on orders above ₹499',
      minOrder: 499,
      validAt: 'Dinner Bell By Buddha Avenue, Shahpur',
      sharing: '80% of the discount value is being funded by you',
      created: 'Offline'
    }
  ];
  else list = [...TRACKED_OFFERS, ...INACTIVE_OFFERS];

  const trackTab = `
    <div class="off-content">
      <div class="track-filter-bar">
        ${filterTabs.map(([fk, fl]) => `
          <button class="track-filter-btn ${cur === fk ? 'on' : ''}" data-a="trackSub" data-v="${fk}">${fl}</button>
        `).join('')}
      </div>

      ${list.length ? list.map(o => `
        <div class="track-card">
          <div class="track-card-hdr">
            <div>
              <div class="track-card-title">${o.title}</div>
              <div class="track-card-dates">Start date : ${o.start} End date : ${o.end}</div>
            </div>
            <div class="track-badges">
              ${o.badges.map(b => `<span class="tb-tag ${b === 'new users only' ? 'red' : (b === 'Inactive' ? 'gray' : 'green')}">${b}</span>`).join('')}
            </div>
          </div>
          <div class="track-card-body">
            <div class="track-metrics">
              <div class="track-metric-box">
                <b>${inr(o.grossSales)}</b>
                <small>Gross sales</small>
              </div>
              <div class="track-metric-box">
                <b>${o.orders}</b>
                <small>Orders delivered</small>
              </div>
              <div class="track-metric-box">
                <b>${inr(o.discount)}</b>
                <small>Discount given</small>
              </div>
              <div class="track-metric-box">
                <b>${o.effDiscount}%</b>
                <small>Effective discount %</small>
              </div>
            </div>

            <div class="track-perf-note">Performance updated till yesterday</div>
            <div class="track-rules">
              <div>Offer applicable for: ${o.applicable}</div>
              <div>Minimum order value: ₹${o.minOrder}</div>
              <div>Valid at: ${o.validAt}</div>
              <div>Offer sharing: ${o.sharing}</div>
              <div>Created: <b>${o.created}</b></div>
            </div>

            ${o.badges.includes('Active') ? `<button class="track-stop-btn" data-a="stopOffer" data-v="${o.title}">Stop offer</button>` : ''}
            <div class="track-chev" data-a="toast" data-v="Offer details toggled">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
            </div>
          </div>
        </div>
      `).join('') : `
        <div class="empty" style="height:35vh;color:#888;text-align:center;padding:40px">
          <div style="font-size:36px;margin-bottom:8px">🎟️</div>
          <div>No ${cur} offers found</div>
        </div>
      `}
    </div>`;

  return `<div class="offers-page">
    ${banner}
    <div class="off-hdr">
      <h2>Offers</h2>
    </div>
    <div class="off-tabs">
      ${tabs.map(([k, l]) => `<button class="off-tab ${S.offTab === k ? 'on' : ''}" data-a="offTab" data-v="${k}">${l}</button>`).join('')}
    </div>
    ${S.offTab === 'track' ? trackTab : createTab}
  </div>`;
}
const PAGES = {
  complaints: () => simple('Customer complaints', [['Order #8664001925 – Food preparation delayed', 'Ankit Yadav · 29 Sep · Expires in 2 hrs', '<span style="color:var(--red)">Action needed</span>'], ['Order #8651122098 – Missing item', 'Priya S. · 27 Sep', '<span style="color:#2a8a3f">Resolved</span>']]),
  reviews: () => simple('Reviews', [['★★★★★  "Loved the biryani, delivered hot!"', 'Rohit M. · 28 Sep'], ['★★★★☆  "Tasty paneer, roti was slightly cold."', 'Sneha K. · 27 Sep'], ['★★★☆☆  "Portion was small for the price."', 'Arjun T. · 25 Sep']], `<div style="margin-bottom:14px"><span class="rate">4.3 ★</span> <span class="muted">3231 delivery reviews</span></div>`),
  help: () => simple('Help centre', [['Payments & payouts', 'Queries on settlements and UTRs'], ['Orders & delivery', 'Missing items, delays, rider issues'], ['Menu & photos', 'Updating items, prices and images'], ['Contact your account manager', 'Anshuman Pandey · +91 9839079021']]),
  growth: () => simple('Growth benefits', [['Zomato Gold partner', 'Reach 5x more customers'], ['Ads credits', '₹500 credit on next campaign'], ['Priority support', 'Faster resolution for your outlet']]),
  learning: () => simple('Learning centre', [['How to improve your KPT', '4 min video'], ['Menu photography tips', '6 min read'], ['Running your first ad campaign', '8 min video']]),
  expansion: () => simple('Expansion hub', [['Open a new outlet', 'Add another location to Zomato'], ['Cloud kitchen setup', 'Launch a delivery-only brand'], ['Track application', 'No applications yet']])
};

/* ---------- router ---------- */
function render() {
  clearInterval(timer);
  const parts = (location.hash.replace(/^#\/?/, '') || 'orders').split('/');
  const key = parts[0], sub = parts[1];
  let body, k = key;
  if (key === 'orders') body = pgOrders();
  else if (key === 'menu') {
    if (sub === 'editor') S.menuView = 'editor';
    else S.menuView = 'overview';
    body = pgMenu();
  }
  else if (key === 'history') body = pgHistory();
  else if (key === 'reporting') body = pgReporting();
  else if (key === 'offers') {
    if (sub === 'track') S.offTab = 'track';
    else if (sub === 'create') S.offTab = 'create';
    body = pgOffers();
  }
  else if (key === 'hyperpure') body = pgHyper();
  else if (key === 'ads') { body = pgAds(); if (!S.adsLoaded && S.adTab === 'perf') setTimeout(() => { S.adsLoaded = true; if (location.hash.includes('ads')) render(); }, 900); }
  else if (key === 'outlet') body = pgOutlet();
  else if (key === 'finance') {
    const f = sub || 'payouts';
    if (f === 'invoices') { if (!S.outlet && S.lastR !== 'finance/invoices') S.modal = 'outlet'; body = pgInvoices(); }
    else if (f === 'utr') body = needOutlet('Utr Reports', '<div class="empty" style="height:60vh;background:#f0f0f0">No UTR reports found for this outlet</div>');
    else if (f === 'fees') body = pgFees();
    else body = pgPayouts();
    document.getElementById('app').innerHTML = shell('finance', f, body);
    S.lastR = 'finance/' + f;
    return;
  }
  else if (PAGES[key]) body = PAGES[key]();
  else { location.hash = '#/orders'; return; }
  S.lastR = key;
  document.getElementById('app').innerHTML = shell(k, sub, body);
  if (key === 'orders') mountOrders();
}
function toast(m) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 1800); }
function dl(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type: 'text/plain'})); a.download = name; a.click(); URL.revokeObjectURL(a.href); }

document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (!e.target.closest('.dd')) $$('.menu.open').forEach(m => m.classList.remove('open'));
  if (!el) return;
  const a = el.dataset.a, v = el.dataset.v;
  if (a === 'menu') { e.stopPropagation(); const m = document.getElementById(v), o = m.classList.contains('open'); $$('.menu.open').forEach(x => x.classList.remove('open')); if (!o) m.classList.add('open'); return; }
  if (a === 'toast') { e.preventDefault(); return toast(v); }
  if (a === 'tg') { el.classList.toggle('on'); return; }
  const map = {
    online: () => S.online = v === '1', fin: () => { S.finance = !S.finance; if (S.finance) location.hash = '#/finance/payouts'; },
    collapse: () => S.collapsed = !S.collapsed, ordTab: () => S.ordTab = v,
    ready: () => { S.orders.find(o => o.id === v).status = 'ready'; S.ordTab = 'ready'; }, pick: () => { S.orders.find(o => o.id === v).status = 'picked'; S.ordTab = 'picked'; },
    go: () => location.hash = '#/' + v,
    menuView: () => { S.menuView = v; if (v === 'editor') location.hash = '#/menu/editor'; else location.hash = '#/menu'; },
    mtab: () => S.menuTab = v, cat: () => S.menuCat = +v, mf: () => S.menuFilter = v,
    stock: () => S.inventory[v] = S.inventory[v] === false, hsel: () => S.hist = v, rtab: () => S.repTab = v, rview: () => S.repView = v,
    adtab: () => S.adTab = v, tile: () => S.adTile = +v, modal: () => S.modal = v, closeModal: () => S.modal = null,
    applyOutlet: () => { S.outlet = OUTLET; S.modal = null; }, inv: () => S.inv = v, oi: () => { S.oi = v; S.drawer = v === 'link'; }, day: () => S.day = S.day === v ? '' : v,
    drawer: () => S.drawer = v === '1'
  };
  if (a === 'closeModal' && e.target.closest('.modal') && el.classList.contains('overlay') && e.target !== el) return;
  if (a === 'copy') { const i = $('#sl'); i.select(); try { navigator.clipboard.writeText(i.value); } catch (_) {} return toast('Link copied'); }
  if (a === 'dlData') return dl('zomato-report.csv', 'Metric,' + WL.join(',') + '\nSales,' + D.sales.join(',') + '\nOrders,' + D.orders.join(','));
  if (a === 'dlInv') { const [m, n] = v.split('|'); return dl(n + '.txt', `Zomato invoice\nPeriod: ${m}\nInvoice no: ${n}\nOutlet: ${OUTLET.name}`); }
  if (a === 'roSet') {
    S.repOpt = S.repOpt || { view: 'detailed', freq: 'daily', dur: '7' };
    S.repOpt[el.dataset.k] = v;
    render();
    return;
  }
  if (a === 'runReport') {
    const rep = generateReportData(S.repOpt);
    dl(rep.name, rep.content);
    toast('Report generated successfully');
    S.modal = null;
    render();
    return;
  }
  if (a === 'dismissBanner') { S.bannerDismissed = true; render(); return; }
  if (a === 'offTab') { S.offTab = v; if (v === 'track') location.hash = '#/offers/track'; else location.hash = '#/offers/create'; return; }
  if (a === 'trackSub') { S.trackSubTab = v; render(); return; }
  if (a === 'stopOffer') {
    const idx = TRACKED_OFFERS.findIndex(o => o.title === v);
    if (idx !== -1) {
      const stopped = TRACKED_OFFERS.splice(idx, 1)[0];
      stopped.badges = ['Inactive'];
      INACTIVE_OFFERS.unshift(stopped);
      toast(`Offer "${v}" stopped successfully`);
      render();
    }
    return;
  }
  if (map[a]) { const prev = location.hash; map[a](); if (location.hash === prev) render(); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'hq') { S.histQ = e.target.value; const pos = e.target.selectionStart; render(); const n = $('#hq'); n.focus(); n.setSelectionRange(pos, pos); }
  if (e.target.id === 'oq') { const q = e.target.value; $$('.ocard').forEach(c => c.style.display = !q || c.textContent.includes('ID: ' + q) ? '' : 'none'); }
});
window.addEventListener('hashchange', render);
render();
