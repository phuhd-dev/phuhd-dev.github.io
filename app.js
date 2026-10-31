(function () {
  "use strict";

  const P = window.PROFILE;
  const LANGS = ["vi", "en"];

  const UI = {
    vi: {
      nav: { about: "Giới thiệu", experience: "Kinh nghiệm", projects: "Dự án", skills: "Kỹ năng", contact: "Liên hệ" },
      sec: {
        about: "Hành trình", experience: "Kinh nghiệm", projects: "Dự án tiêu biểu", skills: "Kỹ năng",
        education: "Học vấn", languages: "Ngoại ngữ", testimonials: "Đồng nghiệp nói gì", contact: "Liên hệ"
      },
      journeyNote: "Mỗi vạch là một công ty hoặc dự án, dài theo đúng số tháng.",
      lead: "Team Lead",
      emailMe: "Gửi email cho tôi",
      viewCv: "Xem CV (A4)",
      copyEmail: "Sao chép email",
      copied: "Đã sao chép email",
      copyFailed: "Không sao chép được — email: ",
      saveContact: "Lưu vào danh bạ",
      present: "Hiện tại",
      contactTitle: "Cùng trò chuyện nhé.",
      contactLead: "Nếu bạn đang tuyển một vị trí Flutter / mobile phù hợp, tôi rất muốn nghe.",
      mailSubject: (n) => `Cơ hội việc làm dành cho ${n}`,
      updated: "Cập nhật",
      sample: "Đang hiển thị dữ liệu mẫu — sửa file data.js rồi đặt isSample: false trước khi gửi link.",
      switchLang: "Switch to English",
      themeLight: "Chuyển sang giao diện sáng",
      themeDark: "Chuyển sang giao diện tối",
      skip: "Bỏ qua điều hướng",
      toTop: "Lên đầu trang",
      year: (n) => `${n} năm`,
      month: (n) => `${n} tháng`,
      call: "Gọi điện",
      deviceNote: "Minh hoạ: bố cục tự đổi khi gập / mở máy · dữ liệu giả lập",
      fold: "Gập máy",
      unfold: "Mở máy",
      watchlist: "Bảng giá",
      position: "Vị thế",
      buyQty: "Mua 10.000",
      qty: "Số lượng",
      pending: "Lệnh chờ",
      pendingRows: [["IFD", "Mua → Chốt lời", "152.200 → 152.600"], ["OCO", "Bán · Limit / Stop", "152.800 / 151.900"]],
      orderTypes: ["Thường", "IFD", "OCO", "IFD-OCO"],
      sell: "BÁN",
      buy: "MUA"
    },
    en: {
      nav: { about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
      sec: {
        about: "Career at a glance", experience: "Experience", projects: "Selected projects", skills: "Skills",
        education: "Education", languages: "Languages", testimonials: "What colleagues say", contact: "Contact"
      },
      journeyNote: "Each bar is a company or project, drawn to its length in months.",
      lead: "Team Lead",
      emailMe: "Email me",
      viewCv: "CV (A4, Vietnamese)",
      copyEmail: "Copy email",
      copied: "Email copied",
      copyFailed: "Couldn't copy — email: ",
      saveContact: "Save contact",
      present: "Present",
      contactTitle: "Let's talk.",
      contactLead: "If you're hiring for a Flutter / mobile role that fits, I'd love to hear about it.",
      mailSubject: (n) => `Job opportunity for ${n}`,
      updated: "Updated",
      sample: "Showing sample data — edit data.js and set isSample: false before sharing the link.",
      switchLang: "Chuyển sang tiếng Việt",
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
      skip: "Skip to content",
      toTop: "Back to top",
      year: (n) => `${n} yr${n > 1 ? "s" : ""}`,
      month: (n) => `${n} mo${n > 1 ? "s" : ""}`,
      call: "Call",
      deviceNote: "Illustration: the layout adapts when the phone folds / unfolds · simulated data",
      fold: "Fold",
      unfold: "Unfold",
      watchlist: "Watchlist",
      position: "Position",
      buyQty: "Buy 10,000",
      qty: "Quantity",
      pending: "Pending orders",
      pendingRows: [["IFD", "Buy → Take profit", "152.200 → 152.600"], ["OCO", "Sell · Limit / Stop", "152.800 / 151.900"]],
      orderTypes: ["Market", "IFD", "OCO", "IFD-OCO"],
      sell: "SELL",
      buy: "BUY"
    }
  };

  /* ── helpers ─────────────────────────────────────────── */

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isLocalized = (v) => v && typeof v === "object" && !Array.isArray(v) && (("vi" in v) || ("en" in v));
  const t = (v) => (isLocalized(v) ? (v[lang] != null ? v[lang] : (v.vi != null ? v.vi : v.en)) : v);
  const list = (v) => { const x = t(v); return Array.isArray(x) ? x : x ? [x] : []; };
  const has = (arr) => Array.isArray(arr) && arr.length > 0;
  // Escape rồi đổi **chữ** thành <strong>chữ</strong>.
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const plain = (s) => String(s == null ? "" : s).replace(/\*\*/g, "");

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function initLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    const saved = load("lang");
    if (LANGS.includes(saved)) return saved;
    return LANGS.includes(P.defaultLang) ? P.defaultLang : "vi";
  }

  let lang = initLang();
  const L = () => UI[lang];

  function ym(s) { const [y, m] = String(s).split("-").map(Number); return { y, m: m || 1 }; }
  const monthIndex = (s) => { const { y, m } = ym(s); return y * 12 + (m - 1); };
  const thisMonth = () => new Date().toISOString().slice(0, 7);

  function fmtMonth(s) {
    if (!s) return L().present;
    if (!String(s).includes("-")) return String(s);
    const { y, m } = ym(s);
    if (lang === "vi") return `${String(m).padStart(2, "0")}/${y}`;
    return new Date(y, m - 1).toLocaleString("en-US", { month: "short", year: "numeric" });
  }

  function duration(start, end) {
    const n = monthIndex(end || thisMonth()) - monthIndex(start) + 1;
    if (n <= 0) return "";
    const y = Math.floor(n / 12), mo = n % 12;
    return [y && L().year(y), mo && L().month(mo)].filter(Boolean).join(" ");
  }

  const telHref = (p) => "tel:" + String(p).replace(/[^\d+]/g, "");
  const mailHref = () => `mailto:${P.contact.email}?subject=${encodeURIComponent(L().mailSubject(P.name))}`;
  const prettyUrl = (u) => String(u).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const linkLabel = (u) => (/apps\.apple\.com/.test(u) ? "App Store" : /play\.google\.com/.test(u) ? "Google Play" : prettyUrl(u));
  const stack = (items) => list(items).map((s) => esc(t(s))).join(' <span class="sep">·</span> ');

  /* ── icons (24×24, stroke) ───────────────────────────── */

  const ICON = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/>',
    send: '<path d="M21 3 3 10.5l7 2.5M21 3l-4 18-7-8M21 3 10 13"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
    fold: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>'
  };
  const icon = (n) => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

  /* ── hero device: a foldable showing watchlist, position P/L and order ticket ── */

  const FX = [
    { sym: "USD/JPY", p: 152.346, d: 3, pip: 0.01, vol: 0.012 },
    { sym: "EUR/JPY", p: 164.812, d: 3, pip: 0.01, vol: 0.014 },
    { sym: "GBP/JPY", p: 197.455, d: 3, pip: 0.01, vol: 0.018 },
    { sym: "AUD/JPY", p: 99.873, d: 3, pip: 0.01, vol: 0.010 },
    { sym: "CHF/JPY", p: 175.208, d: 3, pip: 0.01, vol: 0.013 },
    { sym: "NZD/JPY", p: 90.415, d: 3, pip: 0.01, vol: 0.009 },
    { sym: "EUR/USD", p: 1.08214, d: 5, pip: 0.0001, vol: 0.00008 }
  ];
  FX.forEach((f) => { f.open = f.p; f.dir = 0; });
  // Chênh lệch giá mua/bán: 0.3 pip.
  const ask = (f) => f.p + f.pip * 0.3;
  // Vị thế mẫu: mua 10.000 USD/JPY, giá vào thấp hơn giá hiện tại một chút.
  const POS = { f: FX[0], qty: 10000, entry: FX[0].p - 0.124 };

  const fmt = (f, v) => v.toFixed(f.d);
  const pct = (f) => ((f.p - f.open) / f.open) * 100;
  const signed = (v, digits) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(digits)}`;
  const yen = (v) => `${v >= 0 ? "+" : "−"}¥${Math.round(Math.abs(v)).toLocaleString("en-US")}`;
  // Giá kiểu bảng điện: 2 chữ số pip to, chữ số cuối nhỏ.
  function bigPrice(f, v) {
    const s = fmt(f, v);
    return `<span>${s.slice(0, -3)}</span><b>${s.slice(-3, -1)}</b><small>${s.slice(-1)}</small>`;
  }

  const wideScreen = () => matchMedia("(min-width: 900px)").matches;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Máy bắt đầu ở dạng gập; trên màn hình rộng sẽ tự mở ra sau một nhịp để thấy bố cục đổi.
  let folded = true;

  function device() {
    const ui = L(), f0 = POS.f;
    const pos = (cls) => `
      <div class="dv-pos ${cls}">
        <div class="dv-pos__top"><span>${esc(ui.position)} · ${f0.sym}</span><span class="dv-pos__side">${esc(ui.buyQty)}</span></div>
        <div class="dv-pos__pl"><b data-pl-yen></b><span data-pl-pips></span></div>
      </div>`;
    const order = (cls) => `
      <div class="dv-order ${cls}">
        <span class="dv-btn dv-btn--sell"><small>${esc(ui.sell)}</small><b data-o-bid></b></span>
        <span class="dv-btn dv-btn--buy"><small>${esc(ui.buy)}</small><b data-o-ask></b></span>
      </div>`;
    return `
      <div class="fold${folded ? " is-folded" : ""}" aria-hidden="true">
        <div class="fold__screen">
          <div class="dv-status"><span>9:41</span><span class="dv-status__r"><i></i><i></i><i></i></span></div>
          <div class="fold__body">
            <section class="pane pane--list">
              <div class="dv-head"><span class="dv-head__title">${esc(ui.watchlist)}</span><span class="dv-live"><i></i>LIVE</span></div>
              <div class="dv-cols"><span></span><span>Bid</span><span>Ask</span></div>
              <ul class="dv-list">
                ${FX.map((f, i) => `
                  <li data-sym="${f.sym}"${i === 0 ? ' class="is-sel"' : ""}>
                    <span class="dv-list__sym">${f.sym}<small data-chg></small></span>
                    <span class="dv-px" data-bid>${fmt(f, f.p)}</span>
                    <span class="dv-px" data-ask>${fmt(f, ask(f))}</span>
                  </li>`).join("")}
              </ul>
              ${pos("dv-narrow")}
              ${order("dv-order--narrow dv-narrow")}
            </section>
            <section class="pane pane--detail">
              <div class="dv-sym">${f0.sym}</div>
              <div class="dv-big" data-big></div>
              ${pos("")}
              <div class="dv-pend">
                <div class="dv-pend__h">${esc(ui.pending)}</div>
                ${ui.pendingRows.map((r) => `<div class="dv-pend__row"><span class="dv-tag">${r[0]}</span><span>${esc(r[1])}</span><b>${r[2]}</b></div>`).join("")}
              </div>
              <div class="dv-types">${ui.orderTypes.map((x, i) => `<span class="${i ? "" : "on"}">${esc(x)}</span>`).join("")}</div>
              <div class="dv-qty"><span>${esc(ui.qty)}</span><b>10,000</b></div>
              ${order("dv-order--wide")}
            </section>
          </div>
          <i class="fold__hinge"></i>
        </div>
      </div>
      <div class="fold-ctl">
        <button class="fold-ctl__btn" type="button" data-action="fold">${icon("fold")}<span>${esc(folded ? ui.unfold : ui.fold)}</span></button>
        <p>${esc(ui.deviceNote)}</p>
      </div>`;
  }

  function setFolded(v) {
    folded = v;
    const el = document.querySelector(".fold");
    if (el) el.classList.toggle("is-folded", v);
    const b = document.querySelector("[data-action='fold'] span");
    if (b) b.textContent = v ? L().unfold : L().fold;
  }

  function paintDevice(flash) {
    const root = document.querySelector(".fold");
    if (!root) return;
    FX.forEach((f) => {
      const row = root.querySelector(`[data-sym="${f.sym}"]`);
      const bid = row.querySelector("[data-bid]"), ak = row.querySelector("[data-ask]");
      bid.textContent = fmt(f, f.p);
      ak.textContent = fmt(f, ask(f));
      const c = pct(f), ce = row.querySelector("[data-chg]");
      ce.textContent = `${signed(c, 2)}%`;
      ce.className = c >= 0 ? "up" : "down";
      if (flash && f.dir) { flashEl(bid, f.dir); flashEl(ak, f.dir); }
    });

    // Lãi/lỗ của vị thế mua tính theo giá bid: quy ra Yên và theo pips.
    const f = POS.f, diff = f.p - POS.entry;
    const big = root.querySelector("[data-big]");
    big.innerHTML = bigPrice(f, f.p);
    if (flash && f.dir) flashEl(big, f.dir);
    root.querySelectorAll("[data-pl-yen]").forEach((el) => (el.textContent = yen(diff * POS.qty)));
    root.querySelectorAll("[data-pl-pips]").forEach((el) => (el.textContent = `${signed(diff / f.pip, 1)} pips`));
    root.querySelectorAll(".dv-pos__pl").forEach((el) => (el.className = "dv-pos__pl " + (diff >= 0 ? "up" : "down")));
    root.querySelectorAll("[data-o-bid]").forEach((el) => (el.textContent = fmt(f, f.p)));
    root.querySelectorAll("[data-o-ask]").forEach((el) => (el.textContent = fmt(f, ask(f))));
  }

  function flashEl(el, dir) {
    el.classList.remove("flash-up", "flash-down");
    void el.offsetWidth;
    el.classList.add(dir > 0 ? "flash-up" : "flash-down");
  }

  function tick() {
    if (document.hidden) return;
    FX.forEach((f) => { f.dir = 0; });
    const n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const f = FX[Math.floor(Math.random() * FX.length)];
      const step = (Math.random() - 0.5) * 2 * f.vol;
      f.p = Math.max(f.open * 0.98, Math.min(f.open * 1.02, f.p + step));
      f.dir = step >= 0 ? 1 : -1;
    }
    paintDevice(true);
  }

  setInterval(tick, reduceMotion ? 3000 : 1100);

  /* ── sections ────────────────────────────────────────── */

  function head(id, title, note) {
    return `<header class="sec-head"><h2 id="${id}-h">${esc(title)}</h2>${note ? `<p>${esc(note)}</p>` : ""}</header>`;
  }

  function cvButton(cls) {
    const c = P.contact;
    if (!c.cvPage) return "";
    return `<a class="btn ${cls}" href="${esc(c.cvPage)}" target="_blank" rel="noopener">${icon("doc")}<span>${esc(L().viewCv)}</span></a>`;
  }

  function socials() {
    const c = P.contact, out = [];
    if (c.linkedin) out.push(`<a class="btn btn--ghost btn--square" href="${esc(c.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">${icon("linkedin")}</a>`);
    if (c.github) out.push(`<a class="btn btn--ghost btn--square" href="${esc(c.github)}" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">${icon("github")}</a>`);
    if (c.website) out.push(`<a class="btn btn--ghost btn--square" href="${esc(c.website)}" target="_blank" rel="noopener" aria-label="Website" title="Website">${icon("globe")}</a>`);
    return out.join("");
  }

  function hero() {
    const avatar = P.avatar
      ? `<img class="avatar" src="${esc(P.avatar)}" alt="${esc(P.name)}" width="56" height="56">`
      : `<span class="avatar avatar--initials" aria-hidden="true">${esc(P.initials)}</span>`;
    return `
      <section class="hero" id="top">
        <div class="wrap hero__grid">
          <div class="hero__main">
            <div class="hero__id">
              ${avatar}
              <p class="status"><span class="status__dot"></span>${esc(t(P.availability))}</p>
            </div>
            <p class="hero__role"><span>${esc(t(P.role))}</span>${P.level ? `<span class="badge">${esc(t(P.level))}</span>` : ""}</p>
            <h1 class="hero__name">${esc(P.name)}</h1>
            <p class="hero__tagline">${rich(t(P.tagline))}</p>
            <ul class="hero__meta">
              <li class="hero__loc">${icon("pin")}${esc(t(P.location))}</li>
              ${list(P.openTo).map((x) => `<li class="pill">${esc(x)}</li>`).join("")}
            </ul>
            <div class="cta">
              <a class="btn btn--primary" href="${mailHref()}">${icon("mail")}<span>${esc(L().emailMe)}</span></a>
              ${cvButton("btn--ghost")}
              <button class="btn btn--ghost btn--square" type="button" data-action="copy-email" aria-label="${esc(L().copyEmail)}" title="${esc(L().copyEmail)}">${icon("copy")}</button>
              ${socials()}
            </div>
            <p class="print-only">${[P.contact.email, P.contact.phone, P.contact.linkedin && prettyUrl(P.contact.linkedin)].filter(Boolean).map(esc).join("  ·  ")}</p>
          </div>
          <div class="hero__device">${device()}</div>
        </div>
      </section>`;
  }

  /* Dải thời gian: công ty ở hàng trên, dự án ở các hàng dưới, dài đúng theo số tháng. */
  function journey() {
    const items = P.experience;
    const y0 = Math.min(...items.map((x) => ym(x.start).y));
    const y1 = Math.max(...items.map((x) => ym(x.end || thisMonth()).y));
    const from = y0 * 12, total = (y1 - y0 + 1) * 12;
    const pos = (s, e) => {
      const a = monthIndex(s) - from;
      const w = monthIndex(e || thisMonth()) - monthIndex(s) + 1;
      return `--a:${(a / total).toFixed(4)};--w:${(w / total).toFixed(4)}`;
    };
    const leadPos = (p) => {
      const span = monthIndex(p.end) - monthIndex(p.start) + 1;
      const a = monthIndex(p.lead[0]) - monthIndex(p.start);
      const w = monthIndex(p.lead[1]) - monthIndex(p.lead[0]) + 1;
      return `--la:${(a / span).toFixed(4)};--lw:${(w / span).toFixed(4)}`;
    };

    // Xếp dự án vào các hàng sao cho không chồng lên nhau.
    const lanes = [];
    (P.projects || []).filter((p) => p.start).forEach((p) => {
      const s = monthIndex(p.start), e = monthIndex(p.end || thisMonth());
      let lane = lanes.find((l) => l.every((q) => e < q.s || s > q.e));
      if (!lane) { lane = []; lanes.push(lane); }
      lane.push({ s, e, p });
    });

    const years = [];
    for (let y = y0; y <= y1; y++) years.push(`<span style="--a:${((y * 12 - from) / total).toFixed(4)}">${y}</span>`);

    const companies = items.map((x, i) => `
      <a class="jr-co${i === 0 ? " is-now" : ""}" href="#job-${i}" style="${pos(x.start, x.end)}">
        <b>${esc(t(x.company))}</b>
        <span>${esc(duration(x.start, x.end))}</span>
      </a>`).join("");

    const projLanes = lanes.map((lane) => `
      <div class="jr-lane">${lane.map(({ p }) => `
        <div class="jr-proj" style="${pos(p.start, p.end)}">
          ${p.lead ? `<i class="jr-proj__lead" style="${leadPos(p)}"></i>` : ""}
          <span>${esc(t(p.name))}${p.lead ? ` <em>· ${esc(L().lead)}</em>` : ""}</span>
        </div>`).join("")}
      </div>`).join("");

    const facts = has(P.stats) ? `<dl class="facts">${P.stats.map((s) => `<div><dt>${esc(t(s.value))}</dt><dd>${esc(t(s.label))}</dd></div>`).join("")}</dl>` : "";

    return `
      <section class="journey" id="about" aria-labelledby="about-h">
        <div class="wrap">
          <div class="journey__top">
            <div class="journey__about">
              ${head("about", L().sec.about)}
              ${list(P.about).map((p) => `<p>${rich(p)}</p>`).join("")}
            </div>
            ${facts}
          </div>
          <div class="jr-scroll">
            <div class="jr" style="--years:${y1 - y0 + 1};--months:${total}" role="img" aria-label="${esc(L().journeyNote)}">
              <div class="jr-axis">${years.join("")}</div>
              <div class="jr-lane jr-lane--co">${companies}</div>
              ${projLanes}
            </div>
          </div>
          <p class="jr-note">${esc(L().journeyNote)}</p>
        </div>
      </section>`;
  }

  function experience() {
    const feature = (x, i) => {
      const titles = list(x.titles), wins = list(x.highlights);
      return `
        <article class="feature" id="job-${i}">
          <header class="feature__head">
            <div>
              <h3 class="feature__co">${esc(t(x.company))}</h3>
              <p class="feature__role">${esc(t(x.role))}</p>
            </div>
            <p class="when"><span>${esc(fmtMonth(x.start))} – ${esc(fmtMonth(x.end))}</span><span>${esc(duration(x.start, x.end))} · ${esc(t(x.location))}</span></p>
          </header>
          ${x.summary ? `<p class="feature__summary">${rich(t(x.summary))}</p>` : ""}
          <div class="works">${wins.map((w, k) => `
            <div class="work">
              <h4>${esc(titles[k] || "")}</h4>
              <p>${rich(w)}</p>
            </div>`).join("")}
          </div>
          ${has(x.tech) ? `<p class="stack">${stack(x.tech)}</p>` : ""}
        </article>`;
    };

    const past = (x, i) => `
      <article class="past" id="job-${i}">
        <p class="when"><span>${esc(fmtMonth(x.start))} – ${esc(fmtMonth(x.end))}</span><span>${esc(duration(x.start, x.end))}</span></p>
        <h3 class="past__co">${esc(t(x.company))}</h3>
        <p class="past__role">${esc(t(x.role))} · ${esc(t(x.location))}</p>
        ${x.summary ? `<p class="past__summary">${rich(t(x.summary))}</p>` : ""}
        ${list(x.highlights).length ? `<ul class="wins">${list(x.highlights).map((h) => `<li>${rich(h)}</li>`).join("")}</ul>` : ""}
        ${has(x.tech) ? `<p class="stack">${stack(x.tech)}</p>` : ""}
      </article>`;

    const feats = [], rest = [];
    P.experience.forEach((x, i) => (list(x.titles).length ? feats : rest).push([x, i]));
    return `
      <section class="section" id="experience" aria-labelledby="experience-h">
        <div class="wrap">
          ${head("experience", L().sec.experience)}
          ${feats.map(([x, i]) => feature(x, i)).join("")}
          ${rest.length ? `<div class="pasts">${rest.map(([x, i]) => past(x, i)).join("")}</div>` : ""}
        </div>
      </section>`;
  }

  function projects() {
    return `
      <section class="section section--alt" id="projects" aria-labelledby="projects-h">
        <div class="wrap">
          ${head("projects", L().sec.projects)}
          <div class="bento">${P.projects.map((p, i) => `
            <article class="tile${i < 2 ? " tile--lg" : ""}">
              <div class="tile__top">
                <span class="tile__when">${esc(t(p.period))}</span>
                ${p.link ? `<a class="tile__link" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(linkLabel(p.link))} ${icon("arrow")}</a>` : ""}
              </div>
              <h3>${esc(t(p.name))}</h3>
              <p class="tile__domain">${esc(t(p.domain))}</p>
              <p class="tile__role">${esc(t(p.role))}</p>
              ${has(p.tech) ? `<p class="stack">${stack(p.tech)}</p>` : ""}
            </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function skills() {
    const side = [];
    if (has(P.education)) side.push(`
      <div class="cred">
        <h3>${esc(L().sec.education)}</h3>
        ${P.education.map((e) => `<p><strong>${esc(t(e.degree))}</strong></p><p>${esc(t(e.school))} · ${esc(fmtMonth(e.start))} – ${esc(fmtMonth(e.end))}</p>`).join("")}
      </div>`);
    if (has(P.languages)) side.push(`
      <div class="cred">
        <h3>${esc(L().sec.languages)}</h3>
        ${P.languages.map((l) => `<p><strong>${esc(t(l.name))}</strong></p><p>${esc(t(l.level))}</p>`).join("")}
      </div>`);
    return `
      <section class="section" id="skills" aria-labelledby="skills-h">
        <div class="wrap">
          ${head("skills", L().sec.skills)}
          <dl class="skills">${P.skills.map((g) => `
            <div class="skill">
              <dt>${esc(t(g.group))}</dt>
              <dd>${list(g.items).map((s) => esc(t(s))).join(", ")}</dd>
            </div>`).join("")}
          </dl>
          ${side.length ? `<div class="creds">${side.join("")}</div>` : ""}
        </div>
      </section>`;
  }

  function testimonials() {
    if (!has(P.testimonials)) return "";
    return `
      <section class="section" id="testimonials" aria-labelledby="testimonials-h">
        <div class="wrap">
          ${head("testimonials", L().sec.testimonials)}
          ${P.testimonials.map((q) => `
            <figure class="quote">
              <blockquote>“${esc(t(q.quote))}”</blockquote>
              <figcaption><strong>${esc(q.author)}</strong><span>${esc(t(q.title))}</span></figcaption>
            </figure>`).join("")}
        </div>
      </section>`;
  }

  function contact() {
    const c = P.contact;
    const items = [];
    if (c.phone) items.push(`<li><a href="${telHref(c.phone)}">${icon("phone")}<span>${esc(c.phone)}</span></a></li>`);
    if (c.zalo) items.push(`<li><a href="https://zalo.me/${esc(String(c.zalo).replace(/\D/g, ""))}" target="_blank" rel="noopener">${icon("chat")}<span>Zalo</span></a></li>`);
    if (c.telegram) items.push(`<li><a href="${esc(c.telegram)}" target="_blank" rel="noopener">${icon("send")}<span>Telegram · @${esc(String(c.telegram).split("/").pop())}</span></a></li>`);
    if (c.linkedin) items.push(`<li><a href="${esc(c.linkedin)}" target="_blank" rel="noopener">${icon("linkedin")}<span>${esc(prettyUrl(c.linkedin))}</span></a></li>`);
    if (c.github) items.push(`<li><a href="${esc(c.github)}" target="_blank" rel="noopener">${icon("github")}<span>${esc(prettyUrl(c.github))}</span></a></li>`);
    if (c.website) items.push(`<li><a href="${esc(c.website)}" target="_blank" rel="noopener">${icon("globe")}<span>${esc(prettyUrl(c.website))}</span></a></li>`);

    return `
      <section class="contact" id="contact" aria-labelledby="contact-h">
        <div class="wrap contact__grid">
          <div>
            <h2 id="contact-h" class="contact__title">${esc(L().contactTitle)}</h2>
            <p class="contact__lead">${esc(L().contactLead)}</p>
            <a class="contact__email" href="${mailHref()}">${esc(c.email)}</a>
          </div>
          <div class="contact__side">
            <ul class="contact__list">${items.join("")}</ul>
            <div class="cta">
              <a class="btn btn--primary" href="${mailHref()}">${icon("mail")}<span>${esc(L().emailMe)}</span></a>
              <button class="btn btn--ghost" type="button" data-action="copy-email">${icon("copy")}<span>${esc(L().copyEmail)}</span></button>
              <button class="btn btn--ghost" type="button" data-action="vcard">${icon("user")}<span>${esc(L().saveContact)}</span></button>
              ${cvButton("btn--ghost")}
            </div>
            ${c.note ? `<p class="contact__note">${esc(t(c.note))}</p>` : ""}
          </div>
        </div>
      </section>`;
  }

  /* ── render ──────────────────────────────────────────── */

  function render() {
    const ui = L();
    document.documentElement.lang = lang;
    document.title = `${P.name} — ${plain(t(P.role))}`;
    $(".skip").textContent = ui.skip;

    const banner = $("#sample-banner");
    banner.hidden = !P.isSample;
    banner.textContent = ui.sample;

    $("#main").innerHTML = hero() + journey()
      + (has(P.experience) ? experience() : "")
      + (has(P.projects) ? projects() : "")
      + (has(P.skills) ? skills() : "")
      + testimonials() + contact() + `
      <footer class="footer">
        <div class="wrap footer__inner">
          <span>© ${new Date().getFullYear()} ${esc(P.name)}</span>
          <span>${esc(ui.updated)} ${esc(fmtMonth(P.updated))}</span>
          <a href="#top">${esc(ui.toTop)} ↑</a>
        </div>
      </footer>`;

    $("#mark").innerHTML = `<span>${esc(P.initials)}</span>`;
    $("#mark").setAttribute("aria-label", ui.toTop);
    const nav = ["about", "experience", "projects", "skills"].filter((id) => document.getElementById(id));
    $("#nav").innerHTML = nav.map((id) => `<a href="#${id}" data-nav="${id}">${esc(ui.nav[id])}</a>`).join("")
      + `<a href="#contact" data-nav="contact" class="nav__cta">${esc(ui.nav.contact)}</a>`;

    const lt = $("#lang-toggle");
    lt.textContent = lang === "vi" ? "EN" : "VI";
    lt.setAttribute("aria-label", ui.switchLang);
    lt.title = ui.switchLang;
    paintThemeButton();

    $("#dock").innerHTML = `
      <a class="btn btn--primary" href="${mailHref()}" tabindex="-1">${icon("mail")}<span>${esc(ui.emailMe)}</span></a>
      ${P.contact.phone ? `<a class="btn btn--ghost btn--square" href="${telHref(P.contact.phone)}" aria-label="${esc(ui.call)}" tabindex="-1">${icon("phone")}</a>` : ""}`;

    paintDevice(false);
    observe();
  }

  /* ── theme ───────────────────────────────────────────── */

  function currentTheme() {
    const forced = document.documentElement.dataset.theme;
    if (forced) return forced;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function paintThemeButton() {
    const dark = currentTheme() === "dark";
    const b = $("#theme-toggle");
    b.innerHTML = icon(dark ? "sun" : "moon");
    b.setAttribute("aria-label", dark ? L().themeLight : L().themeDark);
    b.title = b.getAttribute("aria-label");
  }

  /* ── actions ─────────────────────────────────────────── */

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  async function copyEmail() {
    const email = P.contact.email;
    try {
      await navigator.clipboard.writeText(email);
      toast(L().copied);
    } catch (e) {
      toast(L().copyFailed + email);
    }
  }

  function downloadVCard() {
    const c = P.contact;
    const esc_v = (s) => String(s).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const lines = [
      "BEGIN:VCARD", "VERSION:3.0",
      `FN:${esc_v(P.name)}`,
      `TITLE:${esc_v(plain(t(P.role)))}`,
      c.email && `EMAIL;TYPE=INTERNET:${c.email}`,
      c.phone && `TEL;TYPE=CELL:${c.phone}`,
      c.linkedin && `URL:${c.linkedin}`,
      c.telegram && `URL:${c.telegram}`,
      `URL:${location.href.split("#")[0].split("?")[0]}`,
      `NOTE:${esc_v(t(P.availability))}`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines], { type: "text/vcard" }));
    a.download = `${P.name}.vcf`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const a = el.dataset.action;
    if (a === "copy-email") copyEmail();
    else if (a === "vcard") downloadVCard();
    else if (a === "fold") setFolded(!folded);
  });

  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "vi" ? "en" : "vi";
    store("lang", lang);
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    render();
  });

  $("#theme-toggle").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store("theme", next);
    paintThemeButton();
  });

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintThemeButton);

  /* ── scroll effects ──────────────────────────────────── */

  let observers = [];
  function observe() {
    observers.forEach((o) => o.disconnect());
    observers = [];
    if (!("IntersectionObserver" in window)) return;

    const links = document.querySelectorAll("[data-nav]");
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.dataset.nav === en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

    const dock = $("#dock");
    const heroCta = document.querySelector(".hero .cta");
    const contactSec = $("#contact");
    let heroVisible = true, contactVisible = false;
    const syncDock = () => {
      const show = !heroVisible && !contactVisible;
      dock.classList.toggle("show", show);
      dock.setAttribute("aria-hidden", String(!show));
      dock.querySelectorAll("a").forEach((a) => (a.tabIndex = show ? 0 : -1));
    };
    const dockIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.target === heroCta) heroVisible = en.isIntersecting;
        else contactVisible = en.isIntersecting;
      });
      syncDock();
    });
    dockIO.observe(heroCta);
    dockIO.observe(contactSec);

    observers.push(spy, dockIO);
    reveal();
  }

  /* ── hiệu ứng khi cuộn ─────────────────────────────────
     Phần nằm ngay trong màn hình đầu tiên luôn hiện sẵn; chỉ những khối bên dưới
     mới được ẩn trước rồi trượt lên khi cuộn tới. Tắt hẳn nếu người xem chọn giảm chuyển động. */

  const REVEAL = [
    ".sec-head", ".journey__about", ".facts > div", ".jr",
    ".feature__head", ".feature__summary", ".work", ".past", ".tile", ".skill", ".cred",
    ".contact__grid > div"
  ].join(",");
  let revealIO;

  function reveal() {
    if (revealIO) revealIO.disconnect();
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const fold = innerHeight * 0.92;
    const groups = new Map();
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.remove("rv--pre");
        en.target.classList.add("rv--in");
        revealIO.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(REVEAL).forEach((el) => {
      el.classList.add("rv");
      // Các khối cùng cha xuất hiện lệch nhau một chút.
      const k = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, k + 1);
      el.style.setProperty("--i", String(k % 6));
      if (el.getBoundingClientRect().top > fold) {
        el.classList.add("rv--pre");
        revealIO.observe(el);
      } else {
        el.classList.add("rv--in");
      }
    });
  }

  // Thanh tiến độ đọc dưới thanh điều hướng, và bóng nhẹ khi đã cuộn.
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      document.documentElement.style.setProperty("--progress", p.toFixed(4));
      $(".topbar").classList.toggle("is-scrolled", scrollY > 8);
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  render();
  onScroll();
  if (wideScreen()) {
    if (reduceMotion) setFolded(false);
    else setTimeout(() => setFolded(false), 900);
  }
})();
