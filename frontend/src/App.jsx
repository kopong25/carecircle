import { useState, useEffect } from "react";

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --terra: #C4714F;
      --terra-light: #E8A882;
      --terra-dark: #8B4A2F;
      --cream: #FAF6F0;
      --cream-dark: #F0E8DC;
      --sage: #7A9E7E;
      --sage-light: #A8C5AC;
      --sage-dark: #4D7A52;
      --charcoal: #2C2825;
      --warm-gray: #8B7D74;
      --warm-gray-light: #C4B8B0;
      --white: #FFFFFF;
      --shadow-sm: 0 2px 8px rgba(44,40,37,0.08);
      --shadow-md: 0 6px 24px rgba(44,40,37,0.12);
      --shadow-lg: 0 16px 48px rgba(44,40,37,0.16);
      --radius: 16px;
      --radius-sm: 8px;
      --radius-lg: 24px;
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--charcoal); }

    h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }

    .app-shell { min-height: 100vh; display: flex; flex-direction: column; }

    /* NAV */
    .top-nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 32px; background: var(--white);
      border-bottom: 1px solid var(--cream-dark);
      box-shadow: var(--shadow-sm); position: sticky; top: 0; z-index: 100;
    }
    .nav-logo { display: flex; align-items: center; gap: 10px; }
    .nav-logo-icon {
      width: 36px; height: 36px; background: linear-gradient(135deg, var(--terra), var(--terra-dark));
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
    .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--charcoal); }
    .nav-logo-text span { color: var(--terra); }
    .nav-tabs { display: flex; gap: 4px; background: var(--cream); padding: 4px; border-radius: 12px; }
    .nav-tab {
      padding: 8px 18px; border-radius: 9px; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      background: transparent; color: var(--warm-gray); transition: all 0.2s;
    }
    .nav-tab.active { background: var(--white); color: var(--charcoal); box-shadow: var(--shadow-sm); }
    .nav-tab:hover:not(.active) { color: var(--charcoal); }
    .nav-badge {
      background: var(--terra); color: white; font-size: 11px;
      padding: 1px 6px; border-radius: 20px; margin-left: 4px;
    }

    /* LANDING */
    .landing { overflow: hidden; }
    .hero {
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
      padding: 72px 64px; max-width: 1200px; margin: 0 auto;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--cream-dark); padding: 6px 14px; border-radius: 20px;
      font-size: 13px; color: var(--terra-dark); font-weight: 500; margin-bottom: 20px;
    }
    .hero-badge::before { content: '●'; color: var(--sage); }
    .hero h1 { font-size: 52px; line-height: 1.1; color: var(--charcoal); margin-bottom: 20px; }
    .hero h1 em { color: var(--terra); font-style: normal; }
    .hero p { font-size: 18px; color: var(--warm-gray); line-height: 1.7; margin-bottom: 32px; }
    .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn-primary {
      padding: 14px 28px; background: var(--terra); color: white; border: none;
      border-radius: var(--radius-sm); font-size: 15px; font-weight: 600; cursor: pointer;
      font-family: 'DM Sans', sans-serif; transition: all 0.2s;
      box-shadow: 0 4px 16px rgba(196,113,79,0.35);
    }
    .btn-primary:hover { background: var(--terra-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(196,113,79,0.45); }
    .btn-secondary {
      padding: 14px 28px; background: transparent; color: var(--charcoal);
      border: 2px solid var(--cream-dark); border-radius: var(--radius-sm);
      font-size: 15px; font-weight: 500; cursor: pointer;
      font-family: 'DM Sans', sans-serif; transition: all 0.2s;
    }
    .btn-secondary:hover { border-color: var(--terra); color: var(--terra); }
    .hero-visual {
      position: relative; display: flex; justify-content: center; align-items: center;
    }
    .hero-card-stack { position: relative; width: 320px; height: 380px; }
    .hero-card {
      position: absolute; border-radius: var(--radius-lg); padding: 24px;
      box-shadow: var(--shadow-lg); background: white;
    }
    .hero-card.main { width: 300px; top: 20px; left: 0; z-index: 3; }
    .hero-card.back1 { width: 280px; top: 0; left: 30px; z-index: 2; background: var(--cream-dark); transform: rotate(3deg); }
    .hero-card.back2 { width: 270px; top: 10px; left: 50px; z-index: 1; background: var(--sage-light); transform: rotate(-2deg); }

    .stats-bar {
      background: var(--charcoal); padding: 32px 64px; display: flex;
      justify-content: space-around; gap: 32px;
    }
    .stat { text-align: center; color: white; }
    .stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--terra-light); }
    .stat-label { font-size: 14px; color: var(--warm-gray-light); margin-top: 4px; }

    .features-section { padding: 72px 64px; max-width: 1200px; margin: 0 auto; }
    .section-label { font-size: 13px; font-weight: 600; color: var(--terra); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; }
    .section-title { font-size: 38px; margin-bottom: 48px; }
    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .feature-card {
      background: white; border-radius: var(--radius-lg); padding: 32px;
      border: 1px solid var(--cream-dark); transition: all 0.3s;
    }
    .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .feature-icon {
      width: 52px; height: 52px; border-radius: 14px; display: flex;
      align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px;
    }
    .feature-card h3 { font-size: 20px; margin-bottom: 10px; }
    .feature-card p { color: var(--warm-gray); font-size: 15px; line-height: 1.6; }

    /* FAMILY DASHBOARD */
    .dashboard { display: grid; grid-template-columns: 260px 1fr; min-height: calc(100vh - 64px); }
    .sidebar {
      background: white; border-right: 1px solid var(--cream-dark);
      padding: 28px 16px; display: flex; flex-direction: column; gap: 4px;
    }
    .sidebar-section-label {
      font-size: 11px; font-weight: 600; color: var(--warm-gray-light);
      text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 12px 8px;
    }
    .sidebar-item {
      display: flex; align-items: center; gap: 10px; padding: 10px 12px;
      border-radius: 10px; cursor: pointer; transition: all 0.15s;
      font-size: 14px; font-weight: 500; color: var(--warm-gray); border: none;
      background: transparent; text-align: left; width: 100%; font-family: 'DM Sans', sans-serif;
    }
    .sidebar-item:hover { background: var(--cream); color: var(--charcoal); }
    .sidebar-item.active { background: rgba(196,113,79,0.1); color: var(--terra); }
    .sidebar-item .icon { font-size: 18px; }
    .sidebar-footer { margin-top: auto; padding: 16px; background: var(--cream); border-radius: var(--radius); }
    .sidebar-footer p { font-size: 13px; color: var(--warm-gray); line-height: 1.5; }
    .sidebar-footer strong { color: var(--terra); }

    .main-content { padding: 32px; overflow-y: auto; }
    .page-header { margin-bottom: 28px; }
    .page-header h2 { font-size: 28px; margin-bottom: 6px; }
    .page-header p { color: var(--warm-gray); font-size: 15px; }

    .card { background: white; border-radius: var(--radius); border: 1px solid var(--cream-dark); padding: 24px; }
    .card-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }

    .metric-card {
      background: white; border-radius: var(--radius); border: 1px solid var(--cream-dark);
      padding: 20px 24px; display: flex; align-items: center; gap: 16px;
    }
    .metric-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; font-size: 22px;
      flex-shrink: 0;
    }
    .metric-value { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; line-height: 1; }
    .metric-label { font-size: 13px; color: var(--warm-gray); margin-top: 4px; }

    /* HELPERS */
    .helper-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .helper-card {
      background: white; border-radius: var(--radius-lg); border: 1px solid var(--cream-dark);
      padding: 24px; transition: all 0.25s; cursor: pointer; position: relative; overflow: hidden;
    }
    .helper-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, var(--terra), var(--terra-light));
      transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
    }
    .helper-card:hover::before { transform: scaleX(1); }
    .helper-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
    .helper-avatar {
      width: 60px; height: 60px; border-radius: 50%; font-size: 26px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 12px; position: relative;
    }
    .vetted-badge {
      position: absolute; bottom: -2px; right: -2px;
      width: 20px; height: 20px; background: var(--sage); border-radius: 50%;
      border: 2px solid white; display: flex; align-items: center; justify-content: center;
      font-size: 10px;
    }
    .helper-name { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
    .helper-meta { font-size: 13px; color: var(--warm-gray); margin-bottom: 12px; }
    .helper-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .tag {
      padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500;
      background: var(--cream); color: var(--warm-gray);
    }
    .tag.highlight { background: rgba(196,113,79,0.12); color: var(--terra-dark); }
    .stars { color: #F5A623; font-size: 13px; }
    .helper-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
    .price-tag { font-size: 16px; font-weight: 600; color: var(--charcoal); }
    .price-tag span { font-size: 12px; font-weight: 400; color: var(--warm-gray); }
    .btn-sm {
      padding: 8px 16px; border-radius: var(--radius-sm); border: none; cursor: pointer;
      font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
    }
    .btn-terra { background: var(--terra); color: white; }
    .btn-terra:hover { background: var(--terra-dark); }
    .btn-sage { background: var(--sage); color: white; }
    .btn-outline { background: transparent; border: 1.5px solid var(--cream-dark); color: var(--charcoal); }
    .btn-outline:hover { border-color: var(--terra); color: var(--terra); }

    /* BOOKINGS */
    .booking-list { display: flex; flex-direction: column; gap: 14px; }
    .booking-item {
      background: white; border-radius: var(--radius); border: 1px solid var(--cream-dark);
      padding: 18px 22px; display: flex; align-items: center; gap: 16px;
    }
    .booking-date-block {
      background: var(--cream); border-radius: 10px; padding: 8px 14px;
      text-align: center; min-width: 60px;
    }
    .booking-date-day { font-size: 22px; font-weight: 700; line-height: 1; color: var(--terra); }
    .booking-date-month { font-size: 11px; color: var(--warm-gray); font-weight: 500; text-transform: uppercase; }
    .booking-info { flex: 1; }
    .booking-title { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
    .booking-sub { font-size: 13px; color: var(--warm-gray); }
    .status-pill {
      padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
    }
    .status-confirmed { background: rgba(122,158,126,0.15); color: var(--sage-dark); }
    .status-pending { background: rgba(196,113,79,0.12); color: var(--terra-dark); }
    .status-completed { background: rgba(44,40,37,0.08); color: var(--warm-gray); }

    /* HELPER APP */
    .helper-app { max-width: 420px; margin: 0 auto; padding: 20px; }
    .phone-frame {
      background: var(--charcoal); border-radius: 40px; padding: 20px 16px;
      box-shadow: 0 32px 80px rgba(44,40,37,0.3);
    }
    .phone-screen { background: var(--cream); border-radius: 28px; overflow: hidden; min-height: 640px; }
    .phone-header {
      background: linear-gradient(135deg, var(--terra), var(--terra-dark));
      padding: 24px 20px; color: white;
    }
    .phone-greeting { font-size: 13px; opacity: 0.8; margin-bottom: 4px; }
    .phone-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; }
    .phone-earnings {
      background: rgba(255,255,255,0.15); border-radius: 12px;
      padding: 12px 16px; margin-top: 16px; display: flex; justify-content: space-between;
    }
    .earn-item { text-align: center; }
    .earn-val { font-size: 18px; font-weight: 700; }
    .earn-lab { font-size: 11px; opacity: 0.75; }
    .phone-body { padding: 16px; }
    .phone-section-title { font-size: 13px; font-weight: 700; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 1px; margin: 16px 0 10px; }
    .job-card {
      background: white; border-radius: 14px; padding: 16px; margin-bottom: 10px;
      border: 1px solid var(--cream-dark); transition: all 0.2s;
    }
    .job-card:hover { box-shadow: var(--shadow-sm); }
    .job-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
    .job-title { font-size: 15px; font-weight: 600; }
    .job-pay { font-size: 16px; font-weight: 700; color: var(--sage-dark); }
    .job-meta { font-size: 12px; color: var(--warm-gray); margin-bottom: 10px; line-height: 1.5; }
    .client-note {
      background: rgba(196,113,79,0.08); border-radius: 8px; padding: 8px 10px;
      font-size: 12px; color: var(--terra-dark); border-left: 3px solid var(--terra);
      margin-bottom: 10px;
    }
    .job-actions { display: flex; gap: 8px; }

    /* ADMIN */
    .admin-layout { display: grid; grid-template-columns: 240px 1fr; min-height: calc(100vh - 64px); }
    .admin-sidebar { background: var(--charcoal); padding: 24px 16px; }
    .admin-sidebar-item {
      display: flex; align-items: center; gap: 10px; padding: 10px 12px;
      border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500;
      color: var(--warm-gray-light); border: none; background: transparent;
      text-align: left; width: 100%; font-family: 'DM Sans', sans-serif; transition: all 0.15s;
    }
    .admin-sidebar-item:hover { color: white; background: rgba(255,255,255,0.06); }
    .admin-sidebar-item.active { color: white; background: rgba(196,113,79,0.25); }
    .admin-main { padding: 28px 32px; overflow-y: auto; }
    .admin-section-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 12px 8px; }

    .approval-card {
      background: white; border-radius: var(--radius); border: 1px solid var(--cream-dark);
      padding: 20px 24px; display: flex; align-items: center; gap: 16px; margin-bottom: 14px;
    }
    .approval-avatar { width: 48px; height: 48px; border-radius: 50%; font-size: 22px; display: flex; align-items: center; justify-content: center; background: var(--cream); }
    .approval-info { flex: 1; }
    .approval-name { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
    .approval-sub { font-size: 13px; color: var(--warm-gray); }
    .approval-actions { display: flex; gap: 8px; }
    .btn-approve { background: var(--sage); color: white; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
    .btn-approve:hover { background: var(--sage-dark); }
    .btn-reject { background: transparent; color: #E05252; border: 1.5px solid #E05252; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
    .btn-reject:hover { background: rgba(224,82,82,0.08); }

    .chart-bar-wrap { display: flex; flex-direction: column; gap: 10px; }
    .chart-bar-row { display: flex; align-items: center; gap: 12px; }
    .chart-bar-label { font-size: 13px; color: var(--warm-gray); width: 60px; text-align: right; flex-shrink: 0; }
    .chart-bar-track { flex: 1; background: var(--cream); border-radius: 4px; height: 8px; overflow: hidden; }
    .chart-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
    .chart-bar-val { font-size: 12px; font-weight: 600; color: var(--charcoal); width: 36px; }

    .heat-alert {
      background: linear-gradient(135deg, #FFF3CD, #FFEAA7);
      border: 1px solid #F5A623; border-radius: var(--radius); padding: 16px 20px;
      display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
    }
    .heat-alert span { font-size: 24px; }
    .heat-alert-text strong { display: block; font-size: 14px; color: #8B6914; }
    .heat-alert-text p { font-size: 13px; color: #A07820; }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(44,40,37,0.5); z-index: 200;
      display: flex; align-items: center; justify-content: center; padding: 20px;
      backdrop-filter: blur(4px);
    }
    .modal {
      background: white; border-radius: var(--radius-lg); padding: 32px;
      width: 100%; max-width: 480px; box-shadow: var(--shadow-lg);
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .modal h3 { font-size: 22px; margin-bottom: 6px; }
    .modal p { color: var(--warm-gray); font-size: 14px; margin-bottom: 20px; }
    .modal-body { display: flex; flex-direction: column; gap: 14px; }
    .form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--charcoal); }
    .form-control {
      width: 100%; padding: 11px 14px; border: 1.5px solid var(--cream-dark); border-radius: 10px;
      font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--charcoal);
      background: var(--cream); transition: border-color 0.2s; outline: none;
    }
    .form-control:focus { border-color: var(--terra); background: white; }
    .modal-footer { display: flex; gap: 10px; margin-top: 20px; }
    .btn-full { flex: 1; padding: 13px; }

    .toast {
      position: fixed; bottom: 24px; right: 24px; z-index: 300;
      background: var(--charcoal); color: white; padding: 14px 20px;
      border-radius: 12px; font-size: 14px; font-weight: 500;
      box-shadow: var(--shadow-lg); animation: toastIn 0.3s ease;
      display: flex; align-items: center; gap: 10px;
    }
    @keyframes toastIn { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .premium-banner {
      background: linear-gradient(135deg, var(--terra), var(--terra-dark));
      border-radius: var(--radius); padding: 20px 24px; color: white;
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;
    }
    .premium-banner h3 { font-size: 18px; margin-bottom: 4px; }
    .premium-banner p { font-size: 13px; opacity: 0.85; }
    .btn-white { background: white; color: var(--terra); padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 700; font-family: 'DM Sans', sans-serif; }

    .trusted-circle {
      display: flex; gap: 12px; overflow-x: auto; padding-bottom: 4px;
    }
    .trusted-item {
      flex-shrink: 0; text-align: center; cursor: pointer;
    }
    .trusted-avatar {
      width: 56px; height: 56px; border-radius: 50%; font-size: 24px;
      display: flex; align-items: center; justify-content: center;
      background: var(--cream); border: 3px solid var(--sage); margin-bottom: 6px;
    }
    .trusted-name { font-size: 11px; font-weight: 600; color: var(--charcoal); }

    .timeline { border-left: 2px solid var(--cream-dark); padding-left: 20px; margin-left: 8px; }
    .timeline-item { position: relative; padding-bottom: 20px; }
    .timeline-dot {
      position: absolute; left: -27px; top: 3px; width: 12px; height: 12px;
      border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px var(--terra);
      background: var(--terra);
    }
    .timeline-dot.gray { background: var(--warm-gray-light); box-shadow: 0 0 0 2px var(--warm-gray-light); }
    .timeline-time { font-size: 11px; color: var(--warm-gray); margin-bottom: 3px; }
    .timeline-text { font-size: 14px; color: var(--charcoal); }

    select.form-control { appearance: auto; }
    textarea.form-control { resize: vertical; min-height: 80px; }

    .tab-content { animation: fadeIn 0.25s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--cream-dark); border-radius: 3px; }

    .rating-stars { display: flex; gap: 4px; }
    .star { font-size: 20px; cursor: pointer; transition: transform 0.1s; color: var(--cream-dark); }
    .star.lit { color: #F5A623; }
    .star:hover { transform: scale(1.2); }

    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; padding: 40px 24px; }
      .hero-visual { display: none; }
      .features-grid { grid-template-columns: 1fr; }
      .stats-bar { flex-direction: column; padding: 32px 24px; }
      .dashboard { grid-template-columns: 1fr; }
      .sidebar { display: none; }
      .grid-2, .grid-3 { grid-template-columns: 1fr; }
      .admin-layout { grid-template-columns: 1fr; }
      .admin-sidebar { display: none; }
    }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const HELPERS = [
  { id: 1, name: "Maria González", emoji: "👩", neighborhood: "Ahwatukee, Phoenix", rating: 4.9, jobs: 87, hours: 312, skills: ["Errands", "Companionship", "Español"], rate: 17, lang: "Bilingual", note: "Loves gardening talk; brings homemade tamales!" },
  { id: 2, name: "James Whitfield", emoji: "👨🏾", neighborhood: "Scottsdale", rating: 4.8, jobs: 63, hours: 218, skills: ["Transportation", "Shopping", "Golf chat"], rate: 18, lang: "English", note: "Former teacher; very patient & punctual" },
  { id: 3, name: "Sandra Kowalski", emoji: "👩🏼", neighborhood: "Tempe", rating: 5.0, jobs: 41, hours: 152, skills: ["Light housework", "Meal prep", "Companionship"], rate: 16, lang: "English", note: "Diabetic-meal specialist; non-smoker household only" },
  { id: 4, name: "Luis Ramírez", emoji: "👨", neighborhood: "Mesa", rating: 4.7, jobs: 29, hours: 98, skills: ["Errands", "Tech help", "Español"], rate: 15, lang: "Bilingual", note: "Great with phones & tablets; super helpful with Zoom calls" },
  { id: 5, name: "Patricia Chen", emoji: "👩🏻", neighborhood: "Chandler", rating: 4.9, jobs: 55, hours: 196, skills: ["Shopping", "Appointments", "Mandarin"], rate: 18, lang: "Trilingual", note: "Also speaks Mandarin; experienced with memory care family members" },
  { id: 6, name: "Robert Hawkins", emoji: "👴🏽", neighborhood: "Glendale", rating: 4.8, jobs: 72, hours: 260, skills: ["Yardwork", "Errands", "Handyman"], rate: 17, lang: "English", note: "Retired contractor; safe driver with clean record" },
];

const BOOKINGS = [
  { id: 1, day: "24", month: "FEB", title: "Weekly Errands — Maria G.", sub: "Grocery run + pharmacy · 2 hrs · $34", status: "confirmed" },
  { id: 2, day: "27", month: "FEB", title: "Companionship Visit — James W.", sub: "Tuesday morning chat + light walk · 1.5 hrs · $27", status: "confirmed" },
  { id: 3, day: "15", month: "FEB", title: "Meal Prep — Sandra K.", sub: "Week's cooking session · 3 hrs · $48", status: "completed" },
  { id: 4, day: "05", month: "MAR", title: "Tech Help — Luis R.", sub: "Phone & tablet setup · 1 hr · $15", status: "pending" },
];

const PENDING_HELPERS = [
  { id: 10, emoji: "👩🏽", name: "Amelia Torres", sub: "Mesa · 3 references · BG check submitted", hours: "Evenings & weekends" },
  { id: 11, emoji: "👨🏻", name: "Kevin Park", sub: "Scottsdale · 5 references · BG clear ✓", hours: "Mon–Fri daytime" },
  { id: 12, emoji: "👩🏿", name: "Diana Osei", sub: "Phoenix · 4 references · BG check submitted", hours: "Flexible" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function HeroCard() {
  return (
    <div className="hero-card-stack">
      <div className="hero-card back2" />
      <div className="hero-card back1" />
      <div className="hero-card main">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 36 }}>👩</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>Maria González</div>
            <div style={{ fontSize: 13, color: "var(--warm-gray)" }}>Ahwatukee · ⭐ 4.9 · 87 jobs</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div className="vetted-badge" style={{ position: "static", width: 28, height: 28, fontSize: 14 }}>✓</div>
          </div>
        </div>
        <div className="helper-tags">
          <span className="tag highlight">Errands</span>
          <span className="tag highlight">Español</span>
          <span className="tag">Companionship</span>
        </div>
        <div className="client-note">💛 "Loves talking about her garden. Brings tamales sometimes!"</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="price-tag">$17<span>/hr</span></div>
          <button className="btn-primary btn-sm">Book Maria</button>
        </div>
      </div>
    </div>
  );
}

function LandingPage({ onEnter: handleSignIn }) {
  const onEnter = handleSignIn;
  return (
    <div className="landing tab-content">
      <div className="hero">
        <div>
          <div className="hero-badge">🌵 Now live in Phoenix, AZ</div>
          <h1>Care that feels like <em>family</em>,<br/>built for your community</h1>
          <p>CareCircle connects Phoenix-area seniors with vetted, background-checked neighbors for errands, companionship, and everyday help — at half the cost of traditional home care.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => onEnter()}>Find a Helper →</button>
            <button className="btn-secondary" onClick={() => onEnter()}>Become a Helper</button>
          </div>
        </div>
        <div className="hero-visual"><HeroCard /></div>
      </div>

      <div className="stats-bar">
        {[["1.2M+", "Arizona seniors"], ["$15–20", "per hour avg"], ["4.9★", "avg helper rating"], ["72hrs", "to first booking"]].map(([n, l]) => (
          <div className="stat" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>

      <div className="features-section">
        <div className="section-label">Why CareCircle</div>
        <h2 className="section-title">Everything your family needs to feel confident</h2>
        <div className="features-grid">
          {[
            { icon: "🔍", bg: "rgba(196,113,79,0.12)", title: "Hyperlocal Vetting", text: "Background checks, video interviews, and references — not just checkboxes. Every helper earns a Vetted Circle badge." },
            { icon: "🔄", bg: "rgba(122,158,126,0.12)", title: "Recurring Relationships", text: "Same helper every Tuesday. Weekly subscriptions mean real relationships, not random strangers each visit." },
            { icon: "🌡️", bg: "rgba(245,166,35,0.12)", title: "Phoenix Heat Alerts", text: "Automatic rescheduling prompts when outdoor temps exceed safe limits. We built Arizona into the product." },
            { icon: "🗣️", bg: "rgba(196,113,79,0.12)", title: "Spanish First", text: "Full bilingual app — 40%+ of Phoenix seniors prefer Spanish. Helpers matched by language, not just zip." },
            { icon: "👨‍👩‍👧", bg: "rgba(122,158,126,0.12)", title: "Family Dashboard", text: "See your loved one's helper history, notes, ratings, and payments. Total peace of mind in one app." },
            { icon: "💳", bg: "rgba(44,40,37,0.06)", title: "Transparent Pricing", text: "$15–20/hr all-in. No hidden fees, no agency markup. Premium plans unlock priority matching & background reports." },
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FamilyDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [showBookModal, setShowBookModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [stars, setStars] = useState(0);
  const [filterLang, setFilterLang] = useState("all");

  const toast = (msg) => { setToastMsg(msg); setShowToast(true); setTimeout(() => setShowToast(false), 3000); };

  const filteredHelpers = filterLang === "all" ? HELPERS : HELPERS.filter(h => h.lang === "Bilingual" || h.lang === "Trilingual");

  const pages = {
    home: () => (
      <div className="tab-content">
        <div className="page-header">
          <h2>Good morning, Johnson family 👋</h2>
          <p>Here's what's coming up for Mom this week.</p>
        </div>

        <div className="heat-alert">
          <span>🌡️</span>
          <div className="heat-alert-text">
            <strong>Phoenix Heat Advisory — Feb 24, 10am–4pm</strong>
            <p>Outdoor errands rescheduled to 8–10am or after 5pm automatically suggested</p>
          </div>
        </div>

        <div className="grid-3">
          {[
            { icon: "📅", bg: "rgba(196,113,79,0.1)", val: "3", label: "Upcoming bookings" },
            { icon: "⭐", bg: "rgba(245,166,35,0.1)", val: "4.9", label: "Avg helper rating" },
            { icon: "💰", bg: "rgba(122,158,126,0.1)", val: "$144", label: "Spent this month" },
          ].map(m => (
            <div className="metric-card" key={m.label}>
              <div className="metric-icon" style={{ background: m.bg }}>{m.icon}</div>
              <div><div className="metric-value">{m.val}</div><div className="metric-label">{m.label}</div></div>
            </div>
          ))}
        </div>

        <div className="premium-banner">
          <div>
            <h3>Upgrade to CareCircle Premium</h3>
            <p>Priority matching · Background reports · Dedicated support · $9.99/month</p>
          </div>
          <button className="btn-white" onClick={() => toast("Premium plan coming soon! We'll notify you.")}>Upgrade →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card">
            <div className="card-title">Trusted Circle <span style={{ fontSize: 13, color: "var(--sage)", fontWeight: 600 }}>★ Saved</span></div>
            <div className="trusted-circle">
              {HELPERS.slice(0, 4).map(h => (
                <div className="trusted-item" key={h.id} onClick={() => { setSelectedHelper(h); setShowBookModal(true); }}>
                  <div className="trusted-avatar">{h.emoji}</div>
                  <div className="trusted-name">{h.name.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Recent Activity</div>
            <div className="timeline">
              {[["Today 9am", "Maria G. confirmed Tue errand run"],["Yesterday", "Sandra K. completed meal prep — 5★"],["Feb 15", "James W. added to Trusted Circle"]].map(([t, txt]) => (
                <div className="timeline-item" key={t}>
                  <div className="timeline-dot" />
                  <div className="timeline-time">{t}</div>
                  <div className="timeline-text">{txt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    helpers: () => (
      <div className="tab-content">
        <div className="page-header">
          <h2>Find a Helper</h2>
          <p>All helpers are background-checked, interviewed, and rated by your Phoenix neighbors.</p>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <select className="form-control" style={{ width: "auto", flex: 1, minWidth: 160 }}>
            <option>All zip codes</option><option>85044 – Ahwatukee</option><option>85254 – Scottsdale</option><option>85281 – Tempe</option>
          </select>
          <select className="form-control" style={{ width: "auto", flex: 1, minWidth: 160 }}>
            <option>All skills</option><option>Errands / Shopping</option><option>Companionship</option><option>Transportation</option><option>Meal Prep</option><option>Light Housework</option>
          </select>
          <button className={`btn-sm ${filterLang === "bilingual" ? "btn-terra" : "btn-outline"}`}
            onClick={() => setFilterLang(filterLang === "bilingual" ? "all" : "bilingual")}>
            🗣️ Español
          </button>
        </div>
        <div className="helper-grid">
          {filteredHelpers.map(h => (
            <div className="helper-card" key={h.id}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div className="helper-avatar" style={{ background: "var(--cream)" }}>{h.emoji}
                  <div className="vetted-badge">✓</div>
                </div>
              </div>
              <div className="helper-name">{h.name}</div>
              <div className="helper-meta">📍 {h.neighborhood} · {h.lang}</div>
              <div className="helper-tags">
                {h.skills.map(s => <span className="tag highlight" key={s}>{s}</span>)}
              </div>
              <div style={{ fontSize: 13, color: "var(--warm-gray)", marginBottom: 10 }}>
                <span className="stars">{"★".repeat(Math.round(h.rating))}</span> {h.rating} · {h.jobs} jobs · {h.hours} hrs
              </div>
              <div className="client-note">💛 "{h.note}"</div>
              <div className="helper-footer">
                <div className="price-tag">${h.rate}<span>/hr</span></div>
                <button className="btn-sm btn-terra" onClick={() => { setSelectedHelper(h); setShowBookModal(true); }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    bookings: () => (
      <div className="tab-content">
        <div className="page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div><h2>Bookings</h2><p>Manage one-time and recurring sessions.</p></div>
          <button className="btn-sm btn-terra" onClick={() => setActivePage("helpers")}>+ New Booking</button>
        </div>
        <div className="booking-list">
          {BOOKINGS.map(b => (
            <div className="booking-item" key={b.id}>
              <div className="booking-date-block">
                <div className="booking-date-day">{b.day}</div>
                <div className="booking-date-month">{b.month}</div>
              </div>
              <div className="booking-info">
                <div className="booking-title">{b.title}</div>
                <div className="booking-sub">{b.sub}</div>
              </div>
              <div className={`status-pill status-${b.status}`}>{b.status}</div>
              {b.status === "completed" && (
                <button className="btn-sm btn-outline" onClick={() => toast("⭐ Review submitted — thank you!")}>Review</button>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-section-label">Family App</div>
        {[["🏠", "home", "Home"], ["🔍", "helpers", "Find Helpers"], ["📅", "bookings", "Bookings"]].map(([icon, key, label]) => (
          <button key={key} className={`sidebar-item ${activePage === key ? "active" : ""}`} onClick={() => setActivePage(key)}>
            <span className="icon">{icon}</span> {label}
          </button>
        ))}
        <div className="sidebar-section-label" style={{ marginTop: 12 }}>Account</div>
        {[["👩‍👧", null, "Mom's Profile"], ["👨‍👩‍👧", null, "Family Members"], ["⚙️", null, "Settings"]].map(([icon, key, label]) => (
          <button key={label} className="sidebar-item" onClick={() => toast("Coming soon in full app!")}>
            <span className="icon">{icon}</span> {label}
          </button>
        ))}
        <div className="sidebar-footer">
          <p><strong>🌡️ Phoenix tip:</strong> We auto-flag outdoor bookings during heat advisory hours (10am–4pm, June–Sept).</p>
        </div>
      </div>
      <div className="main-content">{pages[activePage] ? pages[activePage]() : null}</div>

      {showBookModal && selectedHelper && (
        <div className="modal-overlay" onClick={() => setShowBookModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Book {selectedHelper.name.split(" ")[0]}</h3>
            <p>${selectedHelper.rate}/hr · {selectedHelper.neighborhood} · ⭐ {selectedHelper.rating}</p>
            <div className="modal-body">
              <div className="form-group"><label>Service Type</label>
                <select className="form-control"><option>Errands / Shopping</option><option>Companionship Visit</option><option>Meal Prep</option><option>Transportation</option><option>Light Housework</option></select>
              </div>
              <div className="form-group"><label>Date</label><input className="form-control" type="date" /></div>
              <div className="form-group"><label>Time</label><input className="form-control" type="time" defaultValue="09:00" /></div>
              <div className="form-group"><label>Duration</label>
                <select className="form-control"><option>1 hour</option><option>1.5 hours</option><option>2 hours</option><option>3 hours</option></select>
              </div>
              <div className="form-group"><label>Make it recurring?</label>
                <select className="form-control"><option>One-time</option><option>Weekly (same day)</option><option>Bi-weekly</option></select>
              </div>
              <div className="form-group"><label>Notes for {selectedHelper.name.split(" ")[0]}</label>
                <textarea className="form-control" placeholder="e.g., Please bring groceries from Fry's, not Walmart…" /></div>
            </div>
            <div className="modal-footer">
              <button className="btn-sm btn-outline btn-full" onClick={() => setShowBookModal(false)}>Cancel</button>
              <button className="btn-sm btn-terra btn-full" onClick={() => { setShowBookModal(false); setActivePage("bookings"); toast(`✅ Booked ${selectedHelper.name}! Confirmation sent.`); }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {showToast && <div className="toast">✅ {toastMsg}</div>}
    </div>
  );
}

// ─── HELPER ENROLLMENT + DASHBOARD ───────────────────────────────────────────
function HelperApp() {
  // "landing" | "enroll" | "pending" | "dashboard"
  const [screen, setScreen] = useState("landing");
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("jobs");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const toast = (msg) => { setToastMsg(msg); setShowToast(true); setTimeout(() => setShowToast(false), 3000); };

  const SKILLS_LIST = ["Errands / Shopping", "Companionship", "Transportation", "Meal Prep", "Light Housework", "Tech Help", "Yardwork / Outdoor", "Bilingual (Spanish)"];
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const toggleSkill = (s) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleDay = (d) => setAvailability(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const TOTAL_STEPS = 4;

  const JOBS = [
    { id: 1, title: "Grocery Run + Pharmacy", client: "Eleanor J., 78 · Ahwatukee", time: "Tue Feb 25 · 9:00am", hrs: "2 hrs", pay: "$34", note: "Loves golf talk. Diabetic—no candy snacks please.", urgent: false },
    { id: 2, title: "Companionship Visit", client: "Harold M., 82 · Chandler", time: "Wed Feb 26 · 10:30am", hrs: "1.5 hrs", pay: "$25.50", note: "Vietnam vet. Loves the Cardinals. Light walker OK.", urgent: true },
    { id: 3, title: "Tech Help — Phone Setup", client: "Dolores R., 70 · Mesa", time: "Thu Feb 27 · 2:00pm", hrs: "1 hr", pay: "$17", note: "Habla español. Quiere configurar WhatsApp para su familia.", urgent: false },
  ];

  // ── LANDING ──────────────────────────────────────────────────────────────
  if (screen === "landing") return (
    <div className="tab-content" style={{ maxWidth: 960, margin: "0 auto", padding: "48px 32px" }}>
      <style>{`
        .enroll-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-bottom: 56px; }
        .enroll-steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 48px; }
        .enroll-step-card { background: white; border-radius: var(--radius); border: 1px solid var(--cream-dark); padding: 24px; text-align: center; }
        .enroll-step-num { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--terra), var(--terra-dark)); color: white; font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
        .enroll-step-card h4 { font-size: 15px; margin-bottom: 6px; }
        .enroll-step-card p { font-size: 13px; color: var(--warm-gray); line-height: 1.5; }
        .earnings-card { background: linear-gradient(135deg, var(--charcoal), #3D3733); border-radius: var(--radius-lg); padding: 32px; color: white; }
        .earn-big { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: var(--terra-light); line-height: 1; margin-bottom: 8px; }
        .earn-row { display: flex; gap: 24px; margin-top: 20px; }
        .earn-stat { flex: 1; background: rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; text-align: center; }
        .earn-stat-val { font-size: 18px; font-weight: 700; color: white; }
        .earn-stat-lab { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }
        .testimonial-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px; }
        .testimonial { background: white; border-radius: var(--radius); border: 1px solid var(--cream-dark); padding: 20px; }
        .testimonial-quote { font-size: 14px; color: var(--charcoal); line-height: 1.6; margin-bottom: 12px; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 8px; }
        .testimonial-avatar { font-size: 24px; }
        .testimonial-name { font-size: 13px; font-weight: 600; }
        .testimonial-sub { font-size: 12px; color: var(--warm-gray); }
        .cta-banner { background: linear-gradient(135deg, var(--terra), var(--terra-dark)); border-radius: var(--radius-lg); padding: 40px 48px; text-align: center; color: white; }
        .cta-banner h2 { font-size: 32px; margin-bottom: 10px; }
        .cta-banner p { font-size: 16px; opacity: 0.85; margin-bottom: 24px; }
        .btn-white-lg { background: white; color: var(--terra-dark); font-size: 16px; font-weight: 700; padding: 16px 36px; border: none; border-radius: 10px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .btn-white-lg:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
        @media(max-width:768px){.enroll-hero{grid-template-columns:1fr}.enroll-steps-row{grid-template-columns:1fr 1fr}.testimonial-row{grid-template-columns:1fr}}
      `}</style>

      <div className="enroll-hero">
        <div>
          <div className="hero-badge">🌵 Phoenix helpers earn $15–20/hr</div>
          <h1 style={{ fontSize: 44, marginBottom: 16, lineHeight: 1.1 }}>Make a difference.<br/>Earn on <em style={{ color: "var(--terra)", fontStyle: "normal" }}>your schedule.</em></h1>
          <p style={{ fontSize: 17, color: "var(--warm-gray)", lineHeight: 1.7, marginBottom: 28 }}>
            CareCircle connects you with local seniors who need everyday help — errands, companionship, rides, and more. No medical training needed. Just kindness and reliability.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }} onClick={() => setScreen("enroll")}>Apply to be a Helper →</button>
            <button className="btn-secondary" style={{ fontSize: 15 }} onClick={() => setScreen("dashboard")}>Preview the Dashboard</button>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
            {[["✅","No medical license needed"],["📅","Set your own hours"],["💳","Weekly direct deposit"]].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--warm-gray)" }}>
                <span>{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>
        <div className="earnings-card">
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>Average helper earns</div>
          <div className="earn-big">$386<span style={{ fontSize: 24 }}>/mo</span></div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Working just 22 hrs/month</div>
          <div className="earn-row">
            {[["$17", "Avg hourly rate"],["87%", "Job acceptance"],["4.9★","Avg rating"]].map(([v, l]) => (
              <div className="earn-stat" key={l}><div className="earn-stat-val">{v}</div><div className="earn-stat-lab">{l}</div></div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            🏆 Top helpers in Phoenix earn <strong style={{ color: "var(--terra-light)" }}>$600+/month</strong> with Helper Pro
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div className="section-label">How It Works</div>
        <h2 className="section-title" style={{ fontSize: 30 }}>Get approved in 4 simple steps</h2>
      </div>
      <div className="enroll-steps-row">
        {[
          ["1", "📝", "Fill your profile", "Tell us about yourself, your skills, and your availability. Takes ~5 minutes."],
          ["2", "📹", "Record a quick intro", "A 60-second video so families know who's coming. No editing needed — just be yourself."],
          ["3", "🔍", "Background check", "We run a standard check. Most results clear within 24–48 hours."],
          ["4", "✅", "Start earning", "Once approved, jobs appear instantly in your feed. Accept what works for you."],
        ].map(([n, icon, title, desc]) => (
          <div className="enroll-step-card" key={n}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
            <div className="enroll-step-num">{n}</div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div className="section-label">Helper Stories</div>
        <h2 className="section-title" style={{ fontSize: 30, marginBottom: 24 }}>Real people. Real impact.</h2>
      </div>
      <div className="testimonial-row">
        {[
          ["👩", "Maria G.", "Ahwatukee · 87 jobs", "I retired early and didn't know what to do with my time. CareCircle gave me purpose and a paycheck. My Tuesday clients feel like family now."],
          ["👨🏾", "James W.", "Scottsdale · 63 jobs", "The app is so easy to use. I pick jobs that fit my week, accept them in one tap, and the money lands in my account every Friday."],
          ["👩🏻", "Patricia C.", "Chandler · 55 jobs", "Being bilingual opened so many doors here. Families specifically request me because I speak Mandarin. The community really values that."],
        ].map(([av, name, sub, quote]) => (
          <div className="testimonial" key={name}>
            <div className="testimonial-quote">"{quote}"</div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{av}</div>
              <div><div className="testimonial-name">{name}</div><div className="testimonial-sub">{sub}</div></div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-banner">
        <h2>Ready to join CareCircle?</h2>
        <p>89 helpers are already earning in Phoenix. New requests come in daily.</p>
        <button className="btn-white-lg" onClick={() => onEnter()}>Apply Now — It's Free</button>
        <div style={{ marginTop: 16, fontSize: 13, opacity: 0.65 }}>No commitment. Set your own schedule. Cancel anytime.</div>
      </div>
    </div>
  );

  // ── ENROLLMENT FORM ───────────────────────────────────────────────────────
  if (screen === "enroll") return (
    <div className="tab-content" style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
      <style>{`
        .progress-bar-track { height: 4px; background: var(--cream-dark); border-radius: 2px; margin-bottom: 32px; }
        .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--terra), var(--terra-light)); border-radius: 2px; transition: width 0.4s ease; }
        .step-header { margin-bottom: 28px; }
        .step-label { font-size: 12px; font-weight: 600; color: var(--terra); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; }
        .step-title { font-size: 28px; margin-bottom: 8px; }
        .step-sub { font-size: 15px; color: var(--warm-gray); line-height: 1.6; }
        .skill-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .skill-toggle { border: 2px solid var(--cream-dark); border-radius: 10px; padding: 12px 16px; cursor: pointer; font-size: 14px; font-weight: 500; background: white; text-align: left; font-family: 'DM Sans', sans-serif; transition: all 0.15s; display: flex; align-items: center; gap: 8px; color: var(--charcoal); }
        .skill-toggle.selected { border-color: var(--terra); background: rgba(196,113,79,0.08); color: var(--terra-dark); }
        .day-grid { display: flex; gap: 8px; flex-wrap: wrap; }
        .day-toggle { width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--cream-dark); background: white; cursor: pointer; font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all 0.15s; color: var(--warm-gray); }
        .day-toggle.selected { border-color: var(--terra); background: var(--terra); color: white; }
        .check-row { display: flex; align-items: flex-start; gap: 12px; padding: 14px; background: var(--cream); border-radius: 10px; cursor: pointer; }
        .check-box { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--cream-dark); background: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all 0.15s; }
        .check-box.checked { background: var(--sage); border-color: var(--sage); color: white; font-size: 13px; }
        .video-placeholder { border: 2px dashed var(--cream-dark); border-radius: var(--radius); padding: 40px; text-align: center; background: white; cursor: pointer; transition: all 0.2s; }
        .video-placeholder:hover { border-color: var(--terra); background: rgba(196,113,79,0.04); }
        .step-nav { display: flex; gap: 12px; margin-top: 28px; }
      `}</style>

      <button onClick={() => step === 1 ? setScreen("landing") : setStep(s => s - 1)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-gray)", fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
        ← {step === 1 ? "Back to overview" : "Previous step"}
      </button>

      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </div>

      {step === 1 && (
        <div>
          <div className="step-header">
            <div className="step-label">Step 1 of 4</div>
            <h2 className="step-title">Tell us about yourself</h2>
            <p className="step-sub">Basic info so we can match you with nearby seniors.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="form-group"><label>First name</label><input className="form-control" placeholder="Maria" /></div>
              <div className="form-group"><label>Last name</label><input className="form-control" placeholder="González" /></div>
            </div>
            <div className="form-group"><label>Email address</label><input className="form-control" type="email" placeholder="you@email.com" /></div>
            <div className="form-group"><label>Phone number</label><input className="form-control" type="tel" placeholder="(602) 555-0100" /></div>
            <div className="form-group"><label>Zip code</label><input className="form-control" placeholder="85044" /></div>
            <div className="form-group"><label>Languages spoken</label>
              <select className="form-control"><option>English only</option><option>Spanish / Español</option><option>English + Spanish (Bilingual)</option><option>Other / Multiple</option></select>
            </div>
            <div className="form-group"><label>How did you hear about us?</label>
              <select className="form-control"><option>Nextdoor</option><option>Facebook / Instagram</option><option>Friend or family</option><option>Senior center / church</option><option>Google search</option><option>Other</option></select>
            </div>
          </div>
          <div className="step-nav">
            <button className="btn-primary" style={{ flex: 1, padding: 14, fontSize: 15 }} onClick={() => setStep(2)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="step-header">
            <div className="step-label">Step 2 of 4</div>
            <h2 className="step-title">Your skills & schedule</h2>
            <p className="step-sub">Pick what you're comfortable doing and when you're available. No worries — you can update this anytime.</p>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>What can you help with? <span style={{ color: "var(--warm-gray)", fontWeight: 400 }}>(pick all that apply)</span></div>
            <div className="skill-grid">
              {SKILLS_LIST.map(s => (
                <button key={s} className={`skill-toggle ${skills.includes(s) ? "selected" : ""}`} onClick={() => toggleSkill(s)}>
                  <span>{skills.includes(s) ? "✓" : "+"}</span> {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Which days work for you?</div>
            <div className="day-grid">
              {DAYS.map(d => (
                <button key={d} className={`day-toggle ${availability.includes(d) ? "selected" : ""}`} onClick={() => toggleDay(d)}>{d}</button>
              ))}
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Preferred time of day</label>
            <select className="form-control"><option>Mornings (7am–12pm)</option><option>Afternoons (12pm–5pm)</option><option>Evenings (5pm–8pm)</option><option>Flexible — any time</option></select>
          </div>
          <div className="form-group">
            <label>Hourly rate you'd like to charge</label>
            <select className="form-control"><option>$15/hr</option><option>$16/hr</option><option>$17/hr (most common)</option><option>$18/hr</option><option>$19/hr</option><option>$20/hr</option></select>
          </div>
          <div className="step-nav">
            <button className="btn-secondary" style={{ padding: "13px 20px" }} onClick={() => setStep(1)}>← Back</button>
            <button className="btn-primary" style={{ flex: 1, padding: 14, fontSize: 15 }} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="step-header">
            <div className="step-label">Step 3 of 4</div>
            <h2 className="step-title">Record a 60-second intro</h2>
            <p className="step-sub">Families feel much more confident booking when they can see who's coming. Just say hi, mention what you love to help with, and be yourself!</p>
          </div>
          <div className="video-placeholder" onClick={() => toast("📹 Camera access requested — feature opens in native app.")}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎥</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Tap to record your intro</div>
            <div style={{ fontSize: 13, color: "var(--warm-gray)" }}>Max 60 seconds · No editing needed</div>
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--cream-dark)", padding: "16px 20px", marginTop: 16, borderRadius: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>💡 What to say (optional guide)</div>
            {["Your name and neighborhood", "What kinds of help you enjoy most", "A fun fact or something you love to talk about", "Why you want to help seniors in your community"].map(tip => (
              <div key={tip} style={{ fontSize: 13, color: "var(--warm-gray)", padding: "4px 0", display: "flex", gap: 8 }}><span>→</span>{tip}</div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "var(--warm-gray)", marginTop: 12, textAlign: "center" }}>Don't have a camera handy? You can upload a short video later.</div>
          <div className="step-nav">
            <button className="btn-secondary" style={{ padding: "13px 20px" }} onClick={() => setStep(2)}>← Back</button>
            <button className="btn-primary" style={{ flex: 1, padding: 14, fontSize: 15 }} onClick={() => setStep(4)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="step-header">
            <div className="step-label">Step 4 of 4</div>
            <h2 className="step-title">Almost there — background check</h2>
            <p className="step-sub">All CareCircle helpers go through a standard background check. Results usually take 24–48 hours. It's free for you.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {[
              ["🔍", "Criminal record search", "National + Arizona state database"],
              ["🚗", "Motor vehicle record", "Required for helpers offering rides"],
              ["📋", "Identity verification", "Confirms you are who you say you are"],
              ["📞", "Reference check", "We call 2–3 people you provide"],
            ].map(([icon, title, sub]) => (
              <div key={title} style={{ display: "flex", alignItems: "center", gap: 14, background: "white", border: "1px solid var(--cream-dark)", borderRadius: 12, padding: "14px 18px" }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div><div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div><div style={{ fontSize: 12, color: "var(--warm-gray)" }}>{sub}</div></div>
                <div style={{ marginLeft: "auto", color: "var(--sage)", fontSize: 13, fontWeight: 600 }}>Free ✓</div>
              </div>
            ))}
          </div>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label>Social Security Number (last 4 digits)</label>
            <input className="form-control" placeholder="_ _ _ _" maxLength={4} style={{ letterSpacing: 8, fontSize: 18 }} />
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Date of birth</label>
            <input className="form-control" type="date" />
          </div>
          <div className="check-row" onClick={() => setAgreed(!agreed)} style={{ marginBottom: 8 }}>
            <div className={`check-box ${agreed ? "checked" : ""}`}>{agreed ? "✓" : ""}</div>
            <div style={{ fontSize: 13, color: "var(--charcoal)", lineHeight: 1.6 }}>
              I authorize CareCircle to conduct a background check and agree to the <span style={{ color: "var(--terra)", textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "var(--terra)", textDecoration: "underline" }}>Helper Agreement</span>.
            </div>
          </div>
          <div className="step-nav">
            <button className="btn-secondary" style={{ padding: "13px 20px" }} onClick={() => setStep(3)}>← Back</button>
            <button className="btn-primary" style={{ flex: 1, padding: 14, fontSize: 15, opacity: agreed ? 1 : 0.5 }}
              onClick={() => { if (agreed) setScreen("pending"); }}>
              Submit Application →
            </button>
          </div>
        </div>
      )}

      {showToast && <div className="toast">✅ {toastMsg}</div>}
    </div>
  );

  // ── PENDING APPROVAL ─────────────────────────────────────────────────────
  if (screen === "pending") return (
    <div className="tab-content" style={{ maxWidth: 520, margin: "0 auto", padding: "72px 32px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, var(--sage), var(--sage-dark))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, margin: "0 auto 24px" }}>🎉</div>
      <h2 style={{ fontSize: 32, marginBottom: 12 }}>Application submitted!</h2>
      <p style={{ color: "var(--warm-gray)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
        You're in the queue! Our team will review your profile and background check results within <strong>24–48 hours</strong>. We'll text and email you the moment you're approved.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {[
          ["✅", "Profile received", "complete"],
          ["🔍", "Background check running", "active"],
          ["📹", "Video intro — under review", "active"],
          ["🟢", "Approval & account activation", "pending"],
        ].map(([icon, text, status]) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 14, background: "white", border: "1px solid var(--cream-dark)", borderRadius: 12, padding: "14px 18px", textAlign: "left" }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{text}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: status === "complete" ? "var(--sage-dark)" : status === "active" ? "var(--terra)" : "var(--warm-gray-light)", background: status === "complete" ? "rgba(122,158,126,0.12)" : status === "active" ? "rgba(196,113,79,0.1)" : "var(--cream)", padding: "3px 10px", borderRadius: 20 }}>
              {status === "complete" ? "Done" : status === "active" ? "In progress" : "Waiting"}
            </span>
          </div>
        ))}
      </div>
      <button className="btn-secondary" style={{ marginBottom: 12, width: "100%", padding: 14 }} onClick={() => setScreen("dashboard")}>
        Preview what your dashboard will look like →
      </button>
      <button onClick={() => { setScreen("landing"); setStep(1); setSkills([]); setAvailability([]); setAgreed(false); }}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-gray)", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
        Back to Helper overview
      </button>
    </div>
  );

  // ── ACTIVE HELPER DASHBOARD ───────────────────────────────────────────────
  return (
    <div className="tab-content" style={{ padding: "24px 32px", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 380px", maxWidth: 380 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(122,158,126,0.12)", border: "1px solid rgba(122,158,126,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, background: "var(--sage)", borderRadius: "50%" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sage-dark)" }}>Active Helper Dashboard</span>
          </div>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>Your Helper App</h2>
          <p style={{ color: "var(--warm-gray)", fontSize: 14 }}>This is what you'll see once approved.</p>
        </div>
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="phone-header">
              <div className="phone-greeting">Thursday, Feb 19</div>
              <div className="phone-name">Hey, Maria! 👋</div>
              <div className="phone-earnings">
                <div className="earn-item"><div className="earn-val">$386</div><div className="earn-lab">Feb earnings</div></div>
                <div className="earn-item"><div className="earn-val">3</div><div className="earn-lab">New jobs</div></div>
                <div className="earn-item"><div className="earn-val">4.9★</div><div className="earn-lab">Your rating</div></div>
              </div>
            </div>
            <div style={{ display: "flex", borderBottom: "1px solid var(--cream-dark)", background: "white" }}>
              {[["jobs", "💼 Jobs"], ["earnings", "💰 Earnings"], ["profile", "👤 Profile"]].map(([k, l]) => (
                <button key={k} onClick={() => setActiveTab(k)} style={{
                  flex: 1, padding: "12px 0", border: "none", background: "transparent", cursor: "pointer",
                  fontSize: 12, fontWeight: activeTab === k ? 700 : 400,
                  color: activeTab === k ? "var(--terra)" : "var(--warm-gray)",
                  borderBottom: activeTab === k ? "2px solid var(--terra)" : "2px solid transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{l}</button>
              ))}
            </div>
            <div className="phone-body">
              {activeTab === "jobs" && (
                <div>
                  <div className="phone-section-title">Available Near You</div>
                  {JOBS.map(j => (
                    <div className="job-card" key={j.id}>
                      <div className="job-header">
                        <div>
                          <div className="job-title">{j.title} {j.urgent && <span style={{ background: "rgba(196,113,79,0.15)", color: "var(--terra)", fontSize: 11, padding: "2px 7px", borderRadius: 20, fontWeight: 700, marginLeft: 4 }}>ASAP</span>}</div>
                          <div style={{ fontSize: 12, color: "var(--warm-gray)", marginTop: 2 }}>👤 {j.client}</div>
                        </div>
                        <div className="job-pay">{j.pay}</div>
                      </div>
                      <div className="job-meta">🕐 {j.time} · {j.hrs}</div>
                      <div className="client-note">💛 "{j.note}"</div>
                      <div className="job-actions">
                        <button className="btn-sm btn-terra" style={{ flex: 1 }} onClick={() => toast("✅ Job accepted! Client notified.")}>Accept</button>
                        <button className="btn-sm btn-outline" onClick={() => toast("Job declined.")}>Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "earnings" && (
                <div>
                  <div className="phone-section-title">February 2026</div>
                  <div className="card" style={{ marginBottom: 12, padding: 16 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "var(--terra)", marginBottom: 4 }}>$386.50</div>
                    <div style={{ fontSize: 13, color: "var(--warm-gray)" }}>22.7 hrs · 14 jobs completed</div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 8 }}>Weekly breakdown</div>
                      <div className="chart-bar-wrap">
                        {[["W1", 72],["W2", 98],["W3", 118],["W4", 98.5]].map(([l, v]) => (
                          <div className="chart-bar-row" key={l}>
                            <span className="chart-bar-label">{l}</span>
                            <div className="chart-bar-track"><div className="chart-bar-fill" style={{ width: `${(v/118)*100}%`, background: "var(--terra)" }} /></div>
                            <span className="chart-bar-val">${v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>Helper Pro</span>
                      <span style={{ background: "rgba(122,158,126,0.15)", color: "var(--sage-dark)", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Active</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--warm-gray)" }}>Priority job feed · Analytics · $29/month</div>
                    <div style={{ fontSize: 12, color: "var(--sage-dark)", marginTop: 8, fontWeight: 500 }}>↑ 23% more earnings vs. standard</div>
                  </div>
                </div>
              )}
              {activeTab === "profile" && (
                <div>
                  <div style={{ textAlign: "center", padding: "16px 0 16px" }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>👩</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>Maria González</div>
                    <div style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 12 }}>Ahwatukee · Bilingual</div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                      {[["87","Jobs"],["4.9★","Rating"],["312h","Hours"]].map(([v,l]) => (
                        <div key={l} style={{ textAlign: "center" }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--terra)" }}>{v}</div>
                          <div style={{ fontSize: 11, color: "var(--warm-gray)" }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card" style={{ padding: 14, marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Skills</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {["Errands","Companionship","Español","Meal Prep"].map(s => <span className="tag highlight" key={s} style={{ fontSize: 11 }}>{s}</span>)}
                    </div>
                  </div>
                  <div className="card" style={{ padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Recent Reviews</div>
                    {[["Eleanor J.","Absolutely wonderful. Knows exactly what I need."],["Harold M.","On time, cheerful, and fixed my TV remote!"]].map(([n,r]) => (
                      <div key={n} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid var(--cream-dark)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{n}</span>
                          <span style={{ color: "#F5A623", fontSize: 12 }}>★★★★★</span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--warm-gray)" }}>"{r}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={() => setScreen("landing")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-gray)", fontSize: 13, marginTop: 12, fontFamily: "'DM Sans', sans-serif", display: "block", margin: "12px auto 0" }}>
          ← Back to Helper overview
        </button>
      </div>
      {showToast && <div className="toast">✅ {toastMsg}</div>}
    </div>
  );
}

function AdminDashboard() {
  const [page, setPage] = useState("overview");
  const [pending, setPending] = useState(PENDING_HELPERS);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg) => { setToastMsg(msg); setShowToast(true); setTimeout(() => setShowToast(false), 3000); };

  const approve = (id) => { setPending(p => p.filter(h => h.id !== id)); toast("✅ Helper approved & notified by email!"); };
  const reject = (id) => { setPending(p => p.filter(h => h.id !== id)); toast("Helper rejected. Notification sent."); };

  const pages = {
    overview: (
      <div className="tab-content">
        <div className="page-header"><h2>Admin Overview</h2><p>CareCircle Phoenix — Week of Feb 17–23</p></div>
        <div className="grid-3" style={{ marginBottom: 20 }}>
          {[
            { icon: "👥", bg: "rgba(196,113,79,0.1)", val: "247", label: "Active Families" },
            { icon: "🤝", bg: "rgba(122,158,126,0.1)", val: "89", label: "Vetted Helpers" },
            { icon: "📋", bg: "rgba(245,166,35,0.1)", val: "1,840", label: "Jobs this month" },
            { icon: "💰", bg: "rgba(196,113,79,0.1)", val: "$5,320", label: "Platform revenue (20%)" },
            { icon: "⭐", bg: "rgba(122,158,126,0.1)", val: "4.86", label: "Avg rating across all" },
            { icon: "🔄", bg: "rgba(44,40,37,0.06)", val: "68%", label: "Recurring booking rate" },
          ].map(m => (
            <div className="metric-card" key={m.label}>
              <div className="metric-icon" style={{ background: m.bg }}>{m.icon}</div>
              <div><div className="metric-value">{m.val}</div><div className="metric-label">{m.label}</div></div>
            </div>
          ))}
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Weekly Bookings</div>
            <div className="chart-bar-wrap">
              {[["Mon", 48, 48],["Tue", 72, 72],["Wed", 61, 61],["Thu", 83, 83],["Fri", 55, 55],["Sat", 44, 44],["Sun", 29, 29]].map(([d, v, max]) => (
                <div className="chart-bar-row" key={d}>
                  <span className="chart-bar-label">{d}</span>
                  <div className="chart-bar-track"><div className="chart-bar-fill" style={{ width: `${(v/83)*100}%`, background: "linear-gradient(90deg, var(--terra), var(--terra-light))" }} /></div>
                  <span className="chart-bar-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Top Services This Week</div>
            <div className="chart-bar-wrap">
              {[["Errands", 340, "#C4714F"],["Companion", 280, "#7A9E7E"],["Transport", 210, "#E8A882"],["Meals", 185, "#A8C5AC"],["Tech Help", 95, "#C4B8B0"]].map(([l, v, c]) => (
                <div className="chart-bar-row" key={l}>
                  <span className="chart-bar-label" style={{ width: 70 }}>{l}</span>
                  <div className="chart-bar-track"><div className="chart-bar-fill" style={{ width: `${(v/340)*100}%`, background: c }} /></div>
                  <span className="chart-bar-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    approvals: (
      <div className="tab-content">
        <div className="page-header">
          <h2>Helper Approvals <span className="nav-badge" style={{ fontSize: 14, padding: "3px 10px" }}>{pending.length}</span></h2>
          <p>Review applications before granting access to the platform.</p>
        </div>
        {pending.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 48 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>All caught up!</h3>
            <p style={{ color: "var(--warm-gray)" }}>No pending helper applications right now.</p>
          </div>
        ) : pending.map(h => (
          <div className="approval-card" key={h.id}>
            <div className="approval-avatar">{h.emoji}</div>
            <div className="approval-info">
              <div className="approval-name">{h.name}</div>
              <div className="approval-sub">{h.sub}</div>
              <div style={{ fontSize: 12, color: "var(--warm-gray)", marginTop: 3 }}>Availability: {h.hours}</div>
            </div>
            <div className="approval-actions">
              <button className="btn-approve" onClick={() => approve(h.id)}>✓ Approve</button>
              <button className="btn-reject" onClick={() => reject(h.id)}>✕ Reject</button>
            </div>
          </div>
        ))}

        <div className="card" style={{ marginTop: 8 }}>
          <div className="card-title">Recently Approved</div>
          {HELPERS.slice(0, 3).map(h => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--cream-dark)" }}>
              <div style={{ fontSize: 24 }}>{h.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: "var(--warm-gray)" }}>{h.neighborhood} · {h.jobs} jobs completed</div>
              </div>
              <div style={{ color: "var(--sage)", fontSize: 13, fontWeight: 600 }}>Active ✓</div>
            </div>
          ))}
        </div>
      </div>
    ),
    support: (
      <div className="tab-content">
        <div className="page-header"><h2>Support Queue</h2><p>Open tickets requiring attention.</p></div>
        {[
          { id: "T-291", tag: "🔴 Urgent", family: "Johnson Family", sub: "Helper no-show for Tue errand", time: "2 hrs ago" },
          { id: "T-288", tag: "🟡 Medium", family: "Garcia Family", sub: "Payment dispute — double charge Feb 18", time: "4 hrs ago" },
          { id: "T-285", tag: "🟢 Low", family: "Helper: Kevin Park", sub: "Trouble uploading background check PDF", time: "Yesterday" },
          { id: "T-282", tag: "🟢 Low", family: "Nguyen Family", sub: "Requesting Spanish-speaking helper only", time: "Yesterday" },
        ].map(t => (
          <div className="booking-item" key={t.id} style={{ cursor: "pointer" }} onClick={() => toast(`Opened ticket ${t.id}`)}>
            <div style={{ background: "var(--cream)", borderRadius: 10, padding: "8px 12px", textAlign: "center", minWidth: 64 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--warm-gray)" }}>{t.id}</div>
            </div>
            <div className="booking-info">
              <div className="booking-title">{t.family}</div>
              <div className="booking-sub">{t.sub} · {t.time}</div>
            </div>
            <div style={{ fontSize: 13 }}>{t.tag}</div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div style={{ padding: "0 4px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "white", fontWeight: 700 }}>CareCircle</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Admin Console · Phoenix</div>
        </div>
        <div className="admin-section-label">Dashboard</div>
        {[["📊", "overview", "Overview"], ["✅", "approvals", "Helper Approvals"], ["🎧", "support", "Support Queue"]].map(([icon, key, label]) => (
          <button key={key} className={`admin-sidebar-item ${page === key ? "active" : ""}`} onClick={() => setPage(key)}>
            {icon} {label} {key === "approvals" && pending.length > 0 && <span className="nav-badge" style={{ marginLeft: "auto" }}>{pending.length}</span>}
          </button>
        ))}
        <div className="admin-section-label" style={{ marginTop: 12 }}>Platform</div>
        {[["💰", null, "Revenue"], ["📱", null, "App Config"], ["📢", null, "Broadcasts"]].map(([icon, k, label]) => (
          <button key={label} className="admin-sidebar-item" onClick={() => toast("Coming in next sprint!")}>{icon} {label}</button>
        ))}
      </div>
      <div className="admin-main">{pages[page]}</div>
      {showToast && <div className="toast">✅ {toastMsg}</div>}
    </div>
  );
}

// ─── ROLE SELECT (LOGIN) ───────────────────────────────────────────────────────
function RoleSelect({ onSelect }) {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32, background: "var(--cream)" }}>
      <style>{`
        .role-card {
          background: white; border-radius: var(--radius-lg); border: 2px solid var(--cream-dark);
          padding: 40px 36px; width: 300px; text-align: center; cursor: pointer;
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .role-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(196,113,79,0.06), transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .role-card:hover { border-color: var(--terra); transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .role-card:hover::after { opacity: 1; }
        .role-emoji { font-size: 52px; margin-bottom: 16px; display: block; }
        .role-card h3 { font-size: 22px; margin-bottom: 8px; }
        .role-card p { font-size: 14px; color: var(--warm-gray); line-height: 1.6; margin-bottom: 20px; }
        .role-pill { display: inline-block; background: var(--cream); border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: 600; color: var(--terra-dark); }
      `}</style>

      <div style={{ maxWidth: 720, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--terra)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Welcome to CareCircle</div>
          <h2 style={{ fontSize: 36, marginBottom: 10 }}>How are you using CareCircle?</h2>
          <p style={{ color: "var(--warm-gray)", fontSize: 16 }}>One platform, two experiences. Pick your role to continue.</p>
        </div>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          <div className="role-card" onClick={() => onSelect("family")}>
            <span className="role-emoji">👨‍👩‍👧</span>
            <h3>I'm looking for help</h3>
            <p>Find vetted, background-checked helpers for a senior in your family — errands, companionship, and everyday support.</p>
            <div className="role-pill">For families & seniors</div>
          </div>
          <div className="role-card" onClick={() => onSelect("helper")}>
            <span className="role-emoji">🤝</span>
            <h3>I want to help</h3>
            <p>Earn $15–20/hr on your own schedule by supporting local seniors in your neighborhood with everyday tasks.</p>
            <div className="role-pill">For helpers & earners</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button onClick={() => onSelect("admin")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-gray-light)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            Admin / Operations access →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // "home" = marketing landing, "login" = role select, "app" = signed-in experience
  const [screen, setScreen] = useState("home");
  const [role, setRole] = useState(null); // "family" | "helper" | "admin"
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleSignIn = () => setScreen("login");
  const handleRoleSelect = (r) => { setRole(r); setScreen("app"); };
  const handleSignOut = () => { setRole(null); setScreen("home"); setShowRoleMenu(false); };
  const handleSwitch = (r) => { setRole(r); setShowRoleMenu(false); };

  const roleConfig = {
    family: { label: "Family member", color: "var(--terra)", bg: "rgba(196,113,79,0.1)", emoji: "👨‍👩‍👧" },
    helper: { label: "Helper",        color: "var(--sage-dark)", bg: "rgba(122,158,126,0.12)", emoji: "🤝" },
    admin:  { label: "Admin",         color: "var(--charcoal)", bg: "rgba(44,40,37,0.08)", emoji: "⚙️" },
  };

  const isSignedIn = screen === "app" && role;

  return (
    <div className="app-shell" onClick={() => showRoleMenu && setShowRoleMenu(false)}>
      <FontLoader />
      <style>{`
        .role-switcher { position: relative; }
        .role-badge {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 14px; border-radius: 20px; border: 1.5px solid var(--cream-dark);
          cursor: pointer; background: white; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600; color: var(--charcoal); transition: all 0.15s;
        }
        .role-badge:hover { border-color: var(--terra); }
        .role-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--sage); flex-shrink: 0; }
        .role-menu {
          position: absolute; right: 0; top: calc(100% + 8px); background: white;
          border: 1px solid var(--cream-dark); border-radius: var(--radius); padding: 8px;
          min-width: 200px; box-shadow: var(--shadow-md); z-index: 200;
          animation: fadeIn 0.15s ease;
        }
        .role-menu-label { font-size: 11px; font-weight: 600; color: var(--warm-gray-light); text-transform: uppercase; letter-spacing: 1px; padding: 6px 10px 4px; }
        .role-menu-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--charcoal); border: none; background: none; width: 100%; font-family: 'DM Sans', sans-serif; text-align: left; transition: background 0.12s; }
        .role-menu-item:hover { background: var(--cream); }
        .role-menu-item.active { background: var(--cream); font-weight: 700; }
        .role-menu-divider { height: 1px; background: var(--cream-dark); margin: 6px 0; }
        .role-menu-signout { color: #E05252 !important; }
      `}</style>

      {/* ── UNIFIED NAV ─────────────────────────────────────────────────── */}
      <nav className="top-nav">
        <div className="nav-logo" style={{ cursor: "pointer" }} onClick={() => { setScreen("home"); setRole(null); }}>
          <div className="nav-logo-icon">🌵</div>
          <div className="nav-logo-text">Care<span>Circle</span></div>
        </div>

        {/* Context-aware center nav */}
        {!isSignedIn && (
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["How it works", "For Seniors & Families", "Become a Helper"].map(l => (
              <button key={l} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--warm-gray)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                onClick={handleSignIn}>{l}</button>
            ))}
          </div>
        )}

        {isSignedIn && role === "family" && (
          <div className="nav-tabs">
            {[["🏠", "Home"], ["🔍", "Find Helpers"], ["📅", "Bookings"]].map(([icon, label]) => (
              <button key={label} className="nav-tab active" style={{ fontWeight: 400 }}>{icon} {label}</button>
            ))}
          </div>
        )}

        {isSignedIn && role === "helper" && (
          <div className="nav-tabs">
            {[["💼", "Jobs"], ["💰", "Earnings"], ["👤", "Profile"]].map(([icon, label]) => (
              <button key={label} className="nav-tab active" style={{ fontWeight: 400 }}>{icon} {label}</button>
            ))}
          </div>
        )}

        {isSignedIn && role === "admin" && (
          <div style={{ fontSize: 13, color: "var(--warm-gray)", fontStyle: "italic" }}>Admin Console · Phoenix, AZ</div>
        )}

        {/* Right: sign in OR role badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isSignedIn && (
            <>
              <button className="btn-secondary" style={{ padding: "8px 18px", fontSize: 14 }} onClick={handleSignIn}>Sign in</button>
              <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 14 }} onClick={handleSignIn}>Get started</button>
            </>
          )}
          {isSignedIn && (
            <div className="role-switcher" onClick={e => e.stopPropagation()}>
              <div className="role-badge" onClick={() => setShowRoleMenu(!showRoleMenu)}>
                <span className="dot" style={{ background: roleConfig[role].color }} />
                {roleConfig[role].emoji} {roleConfig[role].label}
                <span style={{ fontSize: 10, color: "var(--warm-gray)", marginLeft: 2 }}>▾</span>
              </div>
              {showRoleMenu && (
                <div className="role-menu">
                  <div className="role-menu-label">Switch view</div>
                  {Object.entries(roleConfig).map(([key, cfg]) => (
                    <button key={key} className={`role-menu-item ${role === key ? "active" : ""}`} onClick={() => handleSwitch(key)}>
                      {cfg.emoji} {cfg.label} {role === key && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--sage)" }}>✓ current</span>}
                    </button>
                  ))}
                  <div className="role-menu-divider" />
                  <button className="role-menu-item role-menu-signout" onClick={handleSignOut}>↩ Sign out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ── SCREENS ─────────────────────────────────────────────────────── */}
      {screen === "home"  && <LandingPage onEnter={handleSignIn} />}
      {screen === "login" && <RoleSelect onSelect={handleRoleSelect} />}
      {screen === "app"   && role === "family" && <FamilyDashboard />}
      {screen === "app"   && role === "helper" && <HelperApp />}
      {screen === "app"   && role === "admin"  && <AdminDashboard />}
    </div>
  );
}
