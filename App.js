import { useState, useEffect, useRef } from "react";

// ── CSS VARIABLES & GLOBAL STYLES ──
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    :root {
      --navy:#1B2D5B; --navy-dark:#111E3F; --navy-light:#243570;
      --gold:#C9921A; --gold-light:#E8A820; --gold-pale:#FFF8EC; --gold-border:#F0D080;
      --white:#fff; --off-white:#F7F9FC; --grey-50:#F0F4F8;
      --grey-100:#E2E8F0; --grey-300:#94A3B8; --grey-600:#475569;
      --text:#1A2540; --text-muted:#4A6080; --border:#DDE5F0;
      --shadow-sm:0 2px 8px rgba(27,45,91,0.08);
      --shadow-md:0 8px 24px rgba(27,45,91,0.13);
      --shadow-lg:0 20px 48px rgba(27,45,91,0.18);
      --shadow-xl:0 32px 64px rgba(27,45,91,0.22);
      --radius:12px; --radius-lg:20px; --radius-xl:28px;
      --transition:0.3s cubic-bezier(0.4,0,0.2,1);
      --font-head:'Montserrat',sans-serif; --font-body:'Open Sans',sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--white); color: var(--text); font-family: var(--font-body); font-size: 16px; line-height: 1.7; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--grey-50); }
    ::-webkit-scrollbar-thumb { background: var(--navy); border-radius: 3px; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes bdot { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.6; } }
    @keyframes bfill { from { width: 0 !important; } }
    @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .page-enter { animation: fadeIn 0.4s ease; }

    /* Navbar */
    .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 900; background: rgba(255,255,255,0.97); border-bottom: 1px solid var(--border); backdrop-filter: blur(16px); transition: var(--transition); }
    .navbar.scrolled { box-shadow: 0 4px 20px rgba(27,45,91,0.1); }
    .nav-inner { display: flex; align-items: center; gap: 1.5rem; max-width: 1400px; margin: 0 auto; padding: 0.6rem 2rem; }
    .nav-logo { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; cursor: pointer; }
    .nav-logo-text { display: flex; flex-direction: column; line-height: 1.15; }
    .brand-name { font-family: var(--font-head); font-weight: 900; font-size: 1rem; color: var(--navy); letter-spacing: 0.02em; }
    .brand-tag { font-family: var(--font-head); font-size: 0.58rem; font-weight: 600; color: var(--gold); letter-spacing: 0.06em; font-style: italic; }
    .nav-links { display: flex; gap: 0.1rem; margin-left: auto; }
    .nav-link { padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.82rem; font-weight: 700; font-family: var(--font-head); color: var(--text-muted); transition: var(--transition); white-space: nowrap; cursor: pointer; border: none; background: none; }
    .nav-link:hover { color: var(--navy); background: var(--gold-pale); }
    .nav-link.active { color: var(--gold); background: var(--gold-pale); }
    .nav-cta { padding: 0.6rem 1.4rem; background: var(--navy); color: #fff; border: none; border-radius: 8px; font-family: var(--font-head); font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: var(--transition); white-space: nowrap; flex-shrink: 0; }
    .nav-cta:hover { background: var(--gold); transform: translateY(-1px); box-shadow: var(--shadow-md); }
    .hamburger { display: none; background: none; border: 1px solid var(--border); color: var(--text); padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer; font-size: 1.1rem; margin-left: auto; }
    .mobile-menu { display: none; flex-direction: column; padding: 1rem 2rem; border-top: 1px solid var(--border); gap: 0.3rem; background: #fff; }
    .mobile-menu.open { display: flex; animation: slideIn 0.2s ease; }
    .mobile-menu button { padding: 0.6rem 1rem; border-radius: 8px; color: var(--text-muted); font-size: 0.9rem; font-family: var(--font-head); font-weight: 600; transition: var(--transition); border: none; background: none; text-align: left; cursor: pointer; }
    .mobile-menu button:hover { color: var(--navy); background: var(--gold-pale); }

    /* Buttons */
    .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.82rem 1.9rem; background: var(--navy); color: #fff; border: none; border-radius: 10px; font-family: var(--font-head); font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: var(--transition); letter-spacing: 0.01em; }
    .btn-primary:hover { background: var(--navy-dark); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
    .btn-primary.gold { background: var(--gold); }
    .btn-primary.gold:hover { background: #b07814; }
    .btn-primary.large { padding: 0.95rem 2.2rem; font-size: 0.95rem; }
    .btn-ghost { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.82rem 1.9rem; background: transparent; color: var(--navy); border: 2px solid var(--navy); border-radius: 10px; font-family: var(--font-head); font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: var(--transition); }
    .btn-ghost:hover { background: var(--navy); color: #fff; transform: translateY(-2px); }
    .btn-ghost.white { color: #fff; border-color: rgba(255,255,255,0.7); }
    .btn-ghost.white:hover { background: #fff; color: var(--navy); }
    .btn-ghost.gold-outline { color: var(--gold); border-color: var(--gold); }
    .btn-ghost.gold-outline:hover { background: var(--gold); color: #fff; }

    /* Layout */
    .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .section-label { font-family: var(--font-head); font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: var(--gold); margin-bottom: 0.5rem; }
    .section-title { font-family: var(--font-head); font-size: clamp(1.75rem,3vw,2.4rem); font-weight: 800; letter-spacing: -0.02em; color: var(--navy); margin-bottom: 0.9rem; }
    .section-sub { color: var(--text-muted); max-width: 600px; line-height: 1.8; font-size: 0.94rem; }

    /* Hero banner */
    .hero-banner-section { position: relative; width: 100%; overflow: hidden; background: #0a1628; min-height: 580px; display: flex; align-items: center; }
    .hero-banner-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center right; opacity: 1; }
    .hero-banner-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 45%, rgba(10,22,40,0.15) 100%); }
    .hero-banner-content { position: relative; z-index: 2; width: 100%; max-width: 1400px; margin: 0 auto; padding: 5rem 4rem; display: flex; align-items: center; }
    .hero-banner-text { max-width: 640px; }
    .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.42rem 1.1rem; background: rgba(201,146,26,0.15); border: 1.5px solid rgba(201,146,26,0.6); border-radius: 100px; margin-bottom: 1.4rem; font-family: var(--font-head); font-size: 0.74rem; font-weight: 700; color: var(--gold-light); letter-spacing: 0.05em; }
    .badge-dot { width: 7px; height: 7px; background: var(--gold-light); border-radius: 50%; animation: bdot 2s infinite; display: inline-block; flex-shrink: 0; }
    .hero-banner-text h1 { font-family: var(--font-head); font-size: clamp(2.6rem,4.5vw,4rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.025em; color: #fff; margin-bottom: 0.7rem; }
    .hero-gold { color: var(--gold-light); font-style: italic; }
    .hero-tagline { font-family: var(--font-head); font-weight: 700; font-size: 1.05rem; color: rgba(255,255,255,0.9); margin-bottom: 1.4rem; font-style: italic; padding-left: 1rem; border-left: 3px solid var(--gold); }
    .hero-sub { font-size: 0.96rem; color: rgba(255,255,255,0.75); margin-bottom: 2.2rem; line-height: 1.85; max-width: 520px; }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

    /* Navbar logo image */
    .nav-logo-img { height: 48px; width: auto; object-fit: contain; flex-shrink: 0; }

    /* Video Section */
    .video-section { padding: 5.5rem 2rem; background: var(--off-white); }
    .video-section-inner { max-width: 1280px; margin: 0 auto; }
    .video-section-head { text-align: center; margin-bottom: 3rem; }
    .video-section-head .section-sub { margin: 0 auto; }
    .video-wrapper { position: relative; max-width: 900px; margin: 0 auto; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-xl); border: 3px solid var(--border); background: var(--navy-dark); }
    .video-wrapper iframe { display: block; width: 100%; aspect-ratio: 16/9; border: none; }
    .video-placeholder { aspect-ratio: 16/9; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg,var(--navy-dark) 0%,#0d1e4a 50%,#0a1628 100%); cursor: pointer; position: relative; overflow: hidden; }
    .video-placeholder::before { content:''; position:absolute; inset:0; background-image: radial-gradient(circle,rgba(201,146,26,0.05) 1px,transparent 1px); background-size:30px 30px; }
    .video-play-btn { width: 80px; height: 80px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1.5rem; box-shadow: 0 0 0 16px rgba(201,146,26,0.15), 0 0 0 32px rgba(201,146,26,0.07); transition: var(--transition); cursor: pointer; border: none; color: #fff; z-index:1; }
    .video-play-btn:hover { transform: scale(1.1); background: var(--gold-light); }
    .video-placeholder-text { font-family: var(--font-head); font-weight: 700; font-size: 1.1rem; color: rgba(255,255,255,0.85); z-index:1; }
    .video-placeholder-sub { font-size: 0.83rem; color: rgba(255,255,255,0.45); margin-top: 0.4rem; font-family: var(--font-head); z-index:1; }
    .video-features { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
    .video-feature-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.75rem; text-align: center; transition: var(--transition); }
    .video-feature-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: var(--gold-border); }
    .vfc-icon { font-size: 2rem; margin-bottom: 0.85rem; }
    .vfc-title { font-family: var(--font-head); font-weight: 800; font-size: 0.95rem; color: var(--navy); margin-bottom: 0.4rem; }
    .vfc-desc { color: var(--text-muted); font-size: 0.82rem; line-height: 1.6; }

    /* Stats bar */
    .hero-stats-bar { background: #fff; border-bottom: 1px solid var(--border); padding: 1.25rem 2rem; }
    .hero-stats-inner { display: flex; align-items: center; justify-content: center; gap: 3rem; flex-wrap: wrap; max-width: 1400px; margin: 0 auto; }
    .hstat { text-align: center; }
    .hstat-num { display: block; font-family: var(--font-head); font-size: 1.75rem; font-weight: 900; color: var(--navy); }
    .hstat-label { font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; }
    .hstat-divider { width: 1px; height: 40px; background: var(--border); }

    /* Trust bar */
    .trust-bar { background: var(--navy); padding: 1rem 2rem; display: flex; align-items: center; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
    .trust-item { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.88); font-family: var(--font-head); font-size: 0.76rem; font-weight: 600; letter-spacing: 0.04em; }
    .trust-icon { font-size: 0.95rem; }
    .trust-divider { width: 1px; height: 18px; background: rgba(255,255,255,0.18); }

    /* Services home */
    .services-home { padding: 5.5rem 2rem; background: var(--off-white); }
    .svc-tabs { display: flex; gap: 0.75rem; flex-wrap: wrap; margin: 2rem 0 2.5rem; }
    .svc-tab { padding: 0.5rem 1.25rem; border-radius: 100px; font-family: var(--font-head); font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1.5px solid var(--border); background: #fff; color: var(--text-muted); transition: var(--transition); }
    .svc-tab:hover, .svc-tab.active { background: var(--navy); color: #fff; border-color: var(--navy); }
    .svc-category { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 1rem; animation: fadeIn 0.3s ease; }
    .svc-mini-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 1.4rem 1.25rem; transition: var(--transition); cursor: pointer; position: relative; overflow: hidden; }
    .svc-mini-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--navy),var(--gold)); transform: scaleX(0); transform-origin: left; transition: var(--transition); }
    .svc-mini-card:hover::before { transform: scaleX(1); }
    .svc-mini-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: var(--gold-border); }
    .svc-mini-icon { font-size: 1.6rem; margin-bottom: 0.75rem; }
    .svc-mini-name { font-family: var(--font-head); font-weight: 700; font-size: 0.88rem; color: var(--navy); line-height: 1.3; }
    .svc-mini-arrow { color: var(--gold); font-size: 0.8rem; font-weight: 700; margin-top: 0.6rem; transition: var(--transition); font-family: var(--font-head); }
    .svc-mini-card:hover .svc-mini-arrow { transform: translateX(4px); }

    /* Why us */
    .why-us { padding: 5.5rem 2rem; }
    .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
    .why-text h2 { font-family: var(--font-head); font-size: 2.1rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1rem; color: var(--navy); }
    .why-text > p { color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem; font-size: 0.94rem; }
    .why-features { display: flex; flex-direction: column; gap: 1.1rem; margin-bottom: 2.5rem; }
    .why-feature { display: flex; gap: 1rem; align-items: flex-start; }
    .feature-check { width: 24px; min-width: 24px; height: 24px; background: var(--gold-pale); border: 1px solid var(--gold-border); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 0.72rem; margin-top: 0.15rem; font-weight: 900; }
    .why-feature strong { display: block; font-family: var(--font-head); font-weight: 700; font-size: 0.9rem; margin-bottom: 0.2rem; color: var(--navy); }
    .why-feature p { color: var(--text-muted); font-size: 0.84rem; }
    .metrics-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 2.5rem; box-shadow: var(--shadow-lg); border-top: 4px solid var(--gold); }
    .metric-item { margin-bottom: 1.5rem; }
    .metric-item:last-child { margin-bottom: 0; }
    .metric-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .metric-name { font-family: var(--font-head); font-weight: 700; font-size: 0.83rem; color: var(--text); }
    .metric-val { font-family: var(--font-head); font-weight: 900; font-size: 0.88rem; color: var(--navy); }
    .metric-bar { height: 7px; background: var(--grey-100); border-radius: 4px; overflow: hidden; }
    .metric-fill { height: 100%; background: linear-gradient(90deg,var(--navy),var(--gold)); border-radius: 4px; animation: bfill 1.5s ease-out; }

    /* Testimonials */
    .testimonials-section { padding: 5.5rem 2rem; background: var(--navy-dark); position: relative; overflow: hidden; }
    .testimonials-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle,rgba(201,146,26,0.06) 1px,transparent 1px); background-size: 28px 28px; }
    .testimonials-section .section-label { color: var(--gold-light); }
    .testimonials-section .section-title { color: #fff; }
    .testimonials-section .section-sub { color: rgba(255,255,255,0.6); }
    .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
    .testi-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-lg); padding: 2rem; transition: var(--transition); position: relative; }
    .testi-card:hover { background: rgba(255,255,255,0.08); border-color: rgba(201,146,26,0.4); transform: translateY(-4px); }
    .testi-stars { color: var(--gold-light); font-size: 0.9rem; margin-bottom: 1rem; letter-spacing: 2px; }
    .testi-quote { font-style: italic; color: rgba(255,255,255,0.82); line-height: 1.75; font-size: 0.92rem; margin-bottom: 1.5rem; }
    .testi-author { display: flex; align-items: center; gap: 0.85rem; }
    .testi-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg,var(--navy-light),var(--gold)); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 900; color: #fff; font-size: 1rem; flex-shrink: 0; }
    .testi-name { font-family: var(--font-head); font-weight: 700; font-size: 0.88rem; color: #fff; }
    .testi-role { font-size: 0.75rem; color: rgba(255,255,255,0.5); }
    .testi-featured { border-color: rgba(201,146,26,0.5); background: rgba(201,146,26,0.07); }
    .quote-mark { position: absolute; top: 1.25rem; right: 1.5rem; font-size: 3rem; color: rgba(201,146,26,0.15); font-family: Georgia,serif; line-height: 1; }

    /* CTA */
    .cta-strip { background: linear-gradient(135deg,var(--navy-dark) 0%,var(--navy) 60%,var(--navy-light) 100%); padding: 5rem 2rem; }
    .cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
    .cta-inner h2 { font-family: var(--font-head); font-size: 2.1rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
    .cta-inner p { color: rgba(255,255,255,0.72); font-size: 0.93rem; }
    .cta-gold { color: var(--gold-light); }

    /* Page hero */
    .page-hero { padding: 4rem 2rem 3.5rem; text-align: center; position: relative; overflow: hidden; background: linear-gradient(160deg,#EBF2FF 0%,var(--off-white) 55%,#FFF8EC 100%); }
    .page-hero-content { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
    .page-hero h1 { font-family: var(--font-head); font-size: clamp(1.9rem,4.5vw,3rem); font-weight: 900; letter-spacing: -0.02em; color: var(--navy); margin-bottom: 1rem; }
    .page-hero p { color: var(--text-muted); font-size: 1rem; line-height: 1.8; }
    .dots-bg { position: absolute; inset: 0; background-image: radial-gradient(circle,rgba(27,45,91,0.06) 1px,transparent 1px); background-size: 26px 26px; }
    .page-hero-wave { position: absolute; bottom: 0; left: 0; right: 0; height: 50px; background: var(--white); clip-path: ellipse(60% 100% at 50% 100%); }
    .page-hero-wave.grey { background: var(--off-white); }

    /* Services full page */
    .services-full { padding: 4.5rem 2rem 5rem; }
    .services-full.alt { background: var(--off-white); }
    .srv-category-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 2px solid var(--border); }
    .srv-cat-icon { width: 60px; min-width: 60px; height: 60px; background: var(--navy); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: var(--shadow-md); }
    .srv-category-header h2 { font-family: var(--font-head); font-size: 1.65rem; font-weight: 800; color: var(--navy); margin-bottom: 0.3rem; }
    .srv-category-header p { color: var(--text-muted); font-size: 0.9rem; max-width: 500px; }
    .srv-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 1rem; }
    .srv-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 1.4rem; transition: var(--transition); display: flex; flex-direction: column; gap: 0.5rem; }
    .srv-card:hover { border-color: var(--gold); box-shadow: var(--shadow-md); transform: translateY(-3px); }
    .srv-num { font-family: var(--font-head); font-size: 0.62rem; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 0.12em; }
    .srv-name { font-family: var(--font-head); font-weight: 700; font-size: 0.88rem; color: var(--navy); line-height: 1.3; }
    .srv-desc { color: var(--text-muted); font-size: 0.78rem; line-height: 1.55; }
    .srv-arrow { color: var(--navy); font-size: 0.8rem; margin-top: auto; font-weight: 700; transition: var(--transition); font-family: var(--font-head); }
    .srv-card:hover .srv-arrow { transform: translateX(4px); color: var(--gold); }

    /* About */
    .about-section { padding: 5rem 2rem; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
    .about-text h2 { font-family: var(--font-head); font-size: 1.9rem; font-weight: 800; margin-bottom: 1.4rem; color: var(--navy); }
    .about-text p { color: var(--text-muted); margin-bottom: 1rem; line-height: 1.8; font-size: 0.93rem; }
    .about-values { background: var(--off-white); border-radius: var(--radius-xl); padding: 2rem; border: 1px solid var(--border); }
    .about-values h3 { font-family: var(--font-head); font-weight: 800; margin-bottom: 1.25rem; color: var(--navy); font-size: 1.05rem; }
    .value-card { display: flex; gap: 0.9rem; align-items: flex-start; padding: 1.05rem; background: #fff; border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 0.8rem; transition: var(--transition); }
    .value-card:hover { border-color: var(--gold-border); box-shadow: var(--shadow-sm); }
    .value-icon { width: 38px; min-width: 38px; height: 38px; background: var(--gold-pale); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; border: 1px solid var(--gold-border); }
    .value-card strong { display: block; font-family: var(--font-head); font-weight: 700; font-size: 0.85rem; margin-bottom: 0.18rem; color: var(--navy); }
    .value-card p { color: var(--text-muted); font-size: 0.78rem; line-height: 1.5; }

    /* Team */
    .team-section { padding: 4.5rem 2rem 5.5rem; background: var(--off-white); }
    .team-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(260px,1fr)); gap: 1.5rem; }
    .team-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2rem; text-align: center; transition: var(--transition); position: relative; overflow: hidden; }
    .team-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg,var(--navy),var(--gold)); }
    .team-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-5px); }
    .team-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg,var(--navy),var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 1.9rem; margin: 0 auto 1rem; font-family: var(--font-head); font-weight: 900; color: #fff; box-shadow: 0 8px 20px rgba(27,45,91,0.25); }
    .team-card h4 { font-family: var(--font-head); font-weight: 800; font-size: 1.05rem; margin-bottom: 0.25rem; color: var(--navy); }
    .team-role { color: var(--gold); font-size: 0.73rem; font-family: var(--font-head); font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.07em; }
    .team-card p { color: var(--text-muted); font-size: 0.84rem; line-height: 1.65; }

    /* Blog */
    .blog-section { padding: 4.5rem 2rem 6rem; }
    .blog-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; }
    .blog-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .blog-filter { padding: 0.4rem 1rem; border-radius: 100px; font-family: var(--font-head); font-size: 0.75rem; font-weight: 700; cursor: pointer; border: 1.5px solid var(--border); background: #fff; color: var(--text-muted); transition: var(--transition); }
    .blog-filter.active, .blog-filter:hover { background: var(--navy); color: #fff; border-color: var(--navy); }
    .blog-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(340px,1fr)); gap: 2rem; }
    .blog-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: var(--transition); display: flex; flex-direction: column; }
    .blog-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-5px); border-color: var(--gold-border); }
    .blog-img-wrap { overflow: hidden; position: relative; }
    .blog-img { width: 100%; height: 200px; object-fit: cover; display: block; transition: var(--transition); }
    .blog-card:hover .blog-img { transform: scale(1.03); }
    .blog-category-badge { position: absolute; top: 0.85rem; left: 0.85rem; padding: 0.25rem 0.75rem; background: var(--navy); color: #fff; border-radius: 100px; font-family: var(--font-head); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em; text-transform: capitalize; }
    .blog-body { padding: 1.75rem; display: flex; flex-direction: column; flex: 1; }
    .blog-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; flex-wrap: wrap; }
    .blog-date { font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-head); font-weight: 600; }
    .blog-read-time { font-size: 0.72rem; color: var(--gold); font-family: var(--font-head); font-weight: 700; }
    .blog-card h3 { font-family: var(--font-head); font-size: 1.05rem; font-weight: 800; color: var(--navy); margin-bottom: 0.75rem; line-height: 1.4; }
    .blog-card > .blog-body > p { color: var(--text-muted); font-size: 0.85rem; line-height: 1.7; margin-bottom: 1.25rem; flex: 1; }
    .blog-read-link { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-head); font-size: 0.8rem; font-weight: 700; color: var(--navy); transition: var(--transition); background: none; border: none; cursor: pointer; }
    .blog-read-link:hover { color: var(--gold); }
    .blog-newsletter { background: linear-gradient(135deg,var(--navy-dark),var(--navy)); border-radius: var(--radius-xl); padding: 3rem; text-align: center; margin-top: 4rem; }
    .blog-newsletter h3 { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
    .blog-newsletter p { color: rgba(255,255,255,0.7); margin-bottom: 1.5rem; font-size: 0.92rem; }
    .newsletter-form { display: flex; gap: 0.75rem; max-width: 480px; margin: 0 auto; flex-wrap: wrap; }
    .newsletter-form input { flex: 1; min-width: 200px; padding: 0.82rem 1.1rem; border-radius: 9px; border: 1.5px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: #fff; font-family: var(--font-body); font-size: 0.93rem; }
    .newsletter-form input::placeholder { color: rgba(255,255,255,0.45); }
    .newsletter-form input:focus { outline: none; border-color: var(--gold); background: rgba(255,255,255,0.12); }

    /* Contact */
    .contact-section { padding: 4.5rem 2rem 6rem; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1.65fr; gap: 3.5rem; align-items: start; }
    .contact-info-wrap { background: var(--navy); border-radius: var(--radius-xl); padding: 2.5rem; }
    .contact-info-wrap h3 { font-family: var(--font-head); font-size: 1.35rem; font-weight: 800; color: #fff; margin-bottom: 0.35rem; }
    .contact-tagline { color: var(--gold-light); font-size: 0.8rem; font-style: italic; font-family: var(--font-head); font-weight: 600; margin-bottom: 1.75rem; }
    .info-item { display: flex; gap: 0.85rem; align-items: flex-start; margin-bottom: 1.35rem; }
    .info-icon-wrap { width: 38px; min-width: 38px; height: 38px; background: rgba(255,255,255,0.1); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
    .info-item strong { display: block; font-family: var(--font-head); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(255,255,255,0.5); margin-bottom: 0.18rem; font-weight: 700; }
    .info-item span { color: #fff; font-size: 0.87rem; }
    .social-links h4 { font-family: var(--font-head); font-size: 0.67rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.45); margin-bottom: 0.65rem; margin-top: 1.75rem; font-weight: 700; }
    .socials { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .social-btn { padding: 0.38rem 0.95rem; border: 1px solid rgba(255,255,255,0.22); border-radius: 8px; font-size: 0.78rem; font-family: var(--font-head); font-weight: 600; color: #fff; transition: var(--transition); cursor: pointer; background: none; }
    .social-btn:hover { background: rgba(201,146,26,0.2); border-color: var(--gold); color: var(--gold-light); }
    .contact-form-wrap { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 2.5rem; box-shadow: var(--shadow-md); }
    .contact-form-wrap h3 { font-family: var(--font-head); font-size: 1.3rem; font-weight: 800; color: var(--navy); margin-bottom: 1.75rem; }
    .contact-form { display: flex; flex-direction: column; gap: 1.1rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group label { font-family: var(--font-head); font-size: 0.75rem; font-weight: 700; color: var(--text); }
    .form-group input, .form-group select, .form-group textarea { padding: 0.75rem 1rem; border: 1.5px solid var(--border); border-radius: 9px; font-family: var(--font-body); font-size: 0.92rem; color: var(--text); background: var(--off-white); transition: var(--transition); width: 100%; }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--navy); background: #fff; box-shadow: 0 0 0 3px rgba(27,45,91,0.08); }
    .form-group textarea { resize: vertical; min-height: 120px; }
    .form-success { text-align: center; padding: 2rem; }
    .form-success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .form-success h4 { font-family: var(--font-head); font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 0.5rem; }
    .form-success p { color: var(--text-muted); font-size: 0.9rem; }

    /* Footer */
    .footer { background: var(--navy-dark); padding: 4rem 2rem 0; }
    .footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .footer-brand { }
    .footer-logo { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .footer-logo-text .brand-name { font-size: 1.05rem; color: #fff; }
    .footer-logo-text .brand-tag { color: var(--gold); }
    .footer-tagline { font-family: var(--font-head); font-size: 0.78rem; font-weight: 600; color: var(--gold-light); font-style: italic; margin-bottom: 0.75rem; }
    .footer-brand p { color: rgba(255,255,255,0.55); font-size: 0.84rem; line-height: 1.7; }
    .footer-links h5 { font-family: var(--font-head); font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.45); margin-bottom: 1rem; }
    .footer-links a, .footer-links button { display: block; color: rgba(255,255,255,0.65); font-size: 0.86rem; margin-bottom: 0.55rem; transition: var(--transition); cursor: pointer; background: none; border: none; text-align: left; padding: 0; font-family: var(--font-body); }
    .footer-links a:hover, .footer-links button:hover { color: var(--gold-light); }
    .footer-bottom { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 0; flex-wrap: wrap; gap: 0.5rem; }
    .footer-bottom span { color: rgba(255,255,255,0.4); font-size: 0.78rem; font-family: var(--font-head); }
    .footer-tag { color: var(--gold) !important; font-style: italic; }

    /* Toast */
    .toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; background: var(--navy); color: #fff; padding: 1rem 1.5rem; border-radius: 10px; font-weight: 700; font-size: 0.88rem; box-shadow: 0 8px 24px rgba(27,45,91,0.35); font-family: var(--font-head); border-left: 4px solid var(--gold); animation: slideIn 0.3s ease; }

    /* Responsive */
    @media (max-width: 1024px) {
      .why-grid { grid-template-columns: 1fr; gap: 3rem; }
      .testi-grid { grid-template-columns: repeat(2,1fr); }
      .about-grid { grid-template-columns: 1fr; gap: 2rem; }
      .contact-grid { grid-template-columns: 1fr; }
      .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
      .video-features { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-cta { display: none; }
      .hamburger { display: block; }
      .hero-banner-content { padding: 3rem 1.5rem; }
      .hero-banner-text h1 { font-size: 2.2rem; }
      .hero-banner-section { min-height: 480px; }
      .testi-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .footer-inner { grid-template-columns: 1fr; }
      .cta-inner { flex-direction: column; text-align: center; }
      .video-features { grid-template-columns: 1fr; }
      .video-play-btn { width: 64px; height: 64px; font-size: 1.5rem; }
    }
  `}</style>
);

// ── DATA ──
const defaultData = {
  dmServices: [
    {id:1,name:"Social Media Security",desc:"Protect your brand's social accounts from takeovers, impersonation, and phishing attacks."},
    {id:2,name:"Digital Marketing",desc:"Holistic digital marketing strategies tailored to your business goals and target audience."},
    {id:3,name:"SEO",desc:"Technical SEO, on-page optimisation, and link building to dominate search rankings."},
    {id:4,name:"GEO (Generative Engine Optimisation)",desc:"Optimise your brand presence for AI-powered search engines like ChatGPT and Gemini."},
    {id:5,name:"Brand Marketing",desc:"Build a powerful, recognisable brand identity that resonates with your audience."},
    {id:6,name:"Performance Marketing",desc:"ROI-focused paid campaigns across Google, Meta, and beyond for maximum conversions."},
    {id:7,name:"Email Marketing",desc:"Automated email sequences that nurture leads, retain customers, and drive sales."},
    {id:8,name:"Social Media Management",desc:"Full management of your social channels — content, scheduling, engagement, and growth."},
    {id:9,name:"Website Development",desc:"Fast, secure, and conversion-optimised websites built to represent your brand perfectly."},
    {id:10,name:"Digital Footprint",desc:"Audit and manage your complete online presence across all digital touchpoints."},
    {id:11,name:"Website Optimisation",desc:"Speed, UX, and CRO improvements to turn more visitors into paying customers."},
    {id:12,name:"Google Ads",desc:"Expert Google Ads management with keyword research, bidding strategy, and ROI tracking."},
    {id:13,name:"Meta Ads",desc:"High-converting Facebook and Instagram ad campaigns targeted to your ideal customers."},
    {id:14,name:"Google Analytics",desc:"Setup, configuration, and reporting dashboards so you understand every click and conversion."},
  ],
  csServices: [
    {id:1,name:"Cybersecurity Services",desc:"Comprehensive cybersecurity consulting and implementation tailored to your risk profile."},
    {id:2,name:"Vulnerability Assessment",desc:"Identify, classify, and prioritise security vulnerabilities before attackers can exploit them."},
    {id:3,name:"Penetration Testing",desc:"Ethical hacking simulations to uncover real weaknesses in your systems and networks."},
    {id:4,name:"Website Security",desc:"OWASP-based testing, hardening, and continuous monitoring of your web applications."},
    {id:5,name:"Technical Support",desc:"Hands-on expert support for security configurations, incidents, and technical queries."},
  ],
  aiServices: [
    {id:1,name:"AI Agent Development",desc:"Custom AI agents built to automate complex workflows, handle queries, and drive efficiency."},
    {id:2,name:"Agent Integration",desc:"Seamlessly integrate AI agents into your existing systems, tools, and business processes."},
    {id:3,name:"Agent Security",desc:"Ensure your AI deployments are secure, compliant, and protected from adversarial attacks."},
  ],
  ctServices: [
    {id:1,name:"Career Counselling",desc:"Personalised one-on-one guidance to navigate your career path with clarity and confidence."},
    {id:2,name:"Job Hunt Support",desc:"Resume building, LinkedIn optimisation, interview prep, and active job search assistance."},
    {id:3,name:"Education Counselling",desc:"Guidance on higher education, courses, certifications, scholarships, and academic pathways."},
    {id:4,name:"Training Programs",desc:"Practical, industry-relevant training programs for individuals and corporate teams."},
  ],
  team: [
    {id:1,name:"Missy Bharti",role:"Founder & Digital Marketing Expert",bio:"Visionary founder with deep expertise in digital marketing, brand building, and business growth strategy.",emoji:"M"},
    {id:2,name:"BK Singh",role:"Career Consultant",bio:"30 years of Experienced educational consultant guiding students and professionals toward the right academic and career paths.",emoji:"B"},
    {id:3,name:"Rita Kumari",role:"Education Counsellor",bio:"20 years of Experienced Education Counsellor guiding the school students about study wellbeings and education systems.",emoji:"A"},
  ],
  blogs: [
    {id:1,title:"Top 10 Cybersecurity Threats in 2025 and How to Defend Against Them",excerpt:"The threat landscape is evolving rapidly. From AI-powered phishing to supply chain attacks, here's what every business needs to know and do to stay protected.",category:"cybersecurity",date:"Jan 15, 2025",readTime:"7 min read",img:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"},
    {id:2,title:"GEO vs SEO: Why Generative Engine Optimisation is the Future of Search",excerpt:"As AI search engines like ChatGPT and Google Gemini reshape how people find information, GEO is becoming essential for brand visibility in the AI era.",category:"digital-marketing",date:"Jan 22, 2025",readTime:"6 min read",img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"},
    {id:3,title:"How AI Agents are Transforming Business Operations in 2025",excerpt:"Intelligent AI agents are no longer science fiction — they're automating customer service, lead generation, and complex workflows for businesses of all sizes.",category:"ai",date:"Feb 3, 2025",readTime:"8 min read",img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80"},
    {id:4,title:"5 Resume Mistakes That Are Costing You Job Interviews",excerpt:"Your resume might be the reason you're not hearing back. Our career experts break down the most common mistakes and exactly how to fix them.",category:"career",date:"Feb 10, 2025",readTime:"5 min read",img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"},
    {id:5,title:"Why Your Website is Leaking Revenue (And How to Fix It)",excerpt:"Most businesses lose 60-80% of visitors due to poor UX, slow loading speeds, and weak CTAs. Here's a complete website optimisation checklist.",category:"digital-marketing",date:"Feb 18, 2025",readTime:"9 min read",img:"https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80"},
    {id:6,title:"Penetration Testing 101: What It Is and Why Your Business Needs It",excerpt:"Penetration testing simulates real cyberattacks on your systems to find weaknesses before hackers do. Here's everything you need to know to get started.",category:"cybersecurity",date:"Mar 5, 2025",readTime:"6 min read",img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80"},
  ],
};

// ── COMPONENTS ──

function Navbar({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (page) => { setCurrentPage(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const pages = ["home","services","about","blog","contact"];
  const labels = ["Home","Services","About","Blog","Contact"];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => nav("home")}>
          <img
            src="/mnt/user-data/uploads/logo.png"
            alt="NOMADS Secure Logo"
            className="nav-logo-img"
          />
          <div className="nav-logo-text">
            <span className="brand-name">NOMADS SECURE</span>
            <span className="brand-tag">Build Brands with AI and Security</span>
          </div>
        </div>
        <div className="nav-links">
          {pages.map((p, i) => (
            <button key={p} className={`nav-link${currentPage === p ? " active" : ""}`} onClick={() => nav(p)}>{labels[i]}</button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => nav("contact")}>Free Consultation →</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {pages.map((p, i) => (
          <button key={p} onClick={() => nav(p)}>{labels[i]}</button>
        ))}
      </div>
    </nav>
  );
}

function Toast({ message, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);
  return <div className="toast">✓ {message}</div>;
}

// ── VIDEO SECTION ──
function VideoSection({ setCurrentPage }) {
  const [playing, setPlaying] = useState(false);
  // Replace this YouTube embed ID with your actual video ID when ready
  const videoId = "dQw4w9WgXcQ";

  return (
    <section className="video-section">
      <div className="video-section-inner">
        <div className="video-section-head">
          <div className="section-label">Who We Are</div>
          <h2 className="section-title">See NOMADS Secure in Action</h2>
          <p className="section-sub">Watch our short introductory video to understand how we help businesses build stronger brands through AI-powered solutions and bulletproof cybersecurity.</p>
        </div>

        <div className="video-wrapper">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="NOMADS Secure Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="video-placeholder" onClick={() => setPlaying(true)}>
              <button className="video-play-btn" aria-label="Play video">▶</button>
              <div className="video-placeholder-text">Watch: Build Brands with AI and Security</div>
              <div className="video-placeholder-sub">2 min · Introduction to NOMADS Secure</div>
            </div>
          )}
        </div>

        <div className="video-features">
          {[
            { icon: "🛡️", title: "Cybersecurity First", desc: "We protect your digital assets with enterprise-grade security — vulnerability assessments, pentesting, and 24/7 monitoring." },
            { icon: "🤖", title: "AI-Powered Growth", desc: "Our custom AI agents automate workflows, enhance customer experience, and give you a measurable competitive edge." },
            { icon: "📈", title: "Digital Marketing Mastery", desc: "From SEO and performance ads to social media management — we drive real traffic and real revenue for your business." },
          ].map(f => (
            <div key={f.title} className="video-feature-card">
              <div className="vfc-icon">{f.icon}</div>
              <div className="vfc-title">{f.title}</div>
              <div className="vfc-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:"2.5rem"}}>
          <button className="btn-primary gold" onClick={() => setCurrentPage("contact")}>Book a Free Consultation →</button>
        </div>
      </div>
    </section>
  );
}

// ── HOME PAGE ──
function HomePage({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState("digital");

  const tabs = [
    { id: "digital", label: "📈 Digital Marketing", cards: [
      {icon:"📱",name:"Social Media Security"},{icon:"📈",name:"Digital Marketing"},
      {icon:"🔍",name:"SEO"},{icon:"🌐",name:"GEO"},
      {icon:"🏷️",name:"Brand Marketing"},{icon:"🎯",name:"Performance Marketing"},
      {icon:"📧",name:"Email Marketing"},{icon:"📲",name:"Social Media Management"},
      {icon:"💻",name:"Website Development"},{icon:"🔎",name:"Digital Footprint"},
      {icon:"⚡",name:"Website Optimization"},{icon:"📊",name:"Google Ads"},
      {icon:"📘",name:"Meta Ads"},{icon:"📉",name:"Google Analytics"},
    ]},
    { id: "cyber", label: "🛡️ Cybersecurity", cards: [
      {icon:"🛡️",name:"Cybersecurity Services"},{icon:"🔍",name:"Vulnerability Assessment"},
      {icon:"💉",name:"Pentesting"},{icon:"🌐",name:"Website Security"},
      {icon:"🔧",name:"Technical Support"},
    ]},
    { id: "ai", label: "🤖 AI Services", cards: [
      {icon:"🤖",name:"AI Agent Development"},{icon:"🔗",name:"Agent Integration"},
      {icon:"🔐",name:"Agent Security"},
    ]},
    { id: "career", label: "🎓 Career & Training", cards: [
      {icon:"🎯",name:"Career Counselling"},{icon:"💼",name:"Job Hunt Support"},
      {icon:"🎓",name:"Education Counselling"},{icon:"📚",name:"Training Programs"},
    ]},
  ];

  const metrics = [
    {name:"Vulnerability Detection Rate", val:"98.7%", pct:98.7},
    {name:"Client Traffic Growth (Avg.)", val:"+90%", pct:80},
    {name:"System Uptime SLA", val:"99.9%", pct:99.9},
    {name:"Client Satisfaction Score", val:"4.9 / 5", pct:98},
    {name:"AI Agent Deployment Success", val:"97%", pct:97},
  ];

  const testimonials = [
    {q:"NOMADS Secure completely transformed our online presence. Our website traffic grew by 3x in just 4 months, and their SEO team is truly world-class.",name:"Rahul Agarwal",role:"CEO, TechVenture India",init:"R",featured:true},
    {q:"Their penetration testing uncovered 14 critical vulnerabilities we didn't know about. The team is thorough, professional, and explains everything clearly.",name:"Priya Sharma",role:"CTO, FinSecure Solutions",init:"P",featured:false},
    {q:"The AI agent they built for our customer service cut response time by 80%. NOMADS Secure is ahead of the curve — highly recommended!",name:"Amit Verma",role:"Founder, AutomateX",init:"A",featured:false},
    {q:"Their career counselling program helped 30 of our employees transition into tech roles successfully. The guidance was practical, personalised, and impactful.",name:"Sunita Kapoor",role:"HR Director, GlobalEdge Corp",init:"S",featured:false},
    {q:"Our Meta Ads ROAS jumped from 1.8x to 5.4x after NOMADS Secure took over. The performance marketing team knows exactly what they're doing.",name:"Vikas Joshi",role:"E-commerce Director, StyleHub",init:"V",featured:false},
    {q:"As a startup, we needed everything — branding, security, and a website. NOMADS Secure delivered all three on time and on budget. Exceptional team!",name:"Neha Pandey",role:"Co-founder, LaunchPad Studio",init:"N",featured:false},
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="page-enter">
      {/* Hero Banner - using uploaded banner image */}
      <section className="hero-banner-section">
        <img
          className="hero-banner-bg"
          src="/mnt/user-data/uploads/banner.png"
          alt="NOMADS Secure Hero Banner"
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <div className="hero-banner-text">
            <div className="hero-badge">
              <span className="badge-dot" />
              India's Trusted IT &amp; Cybersecurity Partner
            </div>
            <h1>Build Brands with<br /><span className="hero-gold">AI and Security</span></h1>
            <div className="hero-tagline"><strong><em>Freedom to Grow. Security to Lead.</em></strong></div>
            <p className="hero-sub">Cybersecurity, digital marketing, AI solutions, and career development — all under one roof. We protect what you build and help you grow further.</p>
            <div className="hero-actions">
              <button className="btn-primary gold" onClick={() => setCurrentPage("services")}>Explore Our Services</button>
              <button className="btn-ghost white" onClick={() => setCurrentPage("contact")}>Book a Free Call →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="hero-stats-bar">
        <div className="hero-stats-inner">
          {[{num:"25+",label:"Services Offered"},{num:"50+",label:"Clients Served"},{num:"98.7%",label:"Security Score"},{num:"4.9/5",label:"Client Rating"}].map((s, i, arr) => (
            <>
              <div key={s.label} className="hstat">
                <span className="hstat-num">{s.num}</span>
                <span className="hstat-label">{s.label}</span>
              </div>
              {i < arr.length - 1 && <div key={`d${i}`} className="hstat-divider" />}
            </>
          ))}
        </div>
      </div>

      {/* Trust Bar */}
      <div className="trust-bar">
        {[{icon:"🔒",label:"ISO-aligned Security"},{icon:"🤖",label:"AI-Powered Solutions"},{icon:"✅",label:"Certified IT Professionals"},{icon:"📊",label:"Data-Driven Strategies"},{icon:"🌐",label:"End-to-End Digital Solutions"}].map((t, i, arr) => (
          <>
            <div key={t.label} className="trust-item"><span className="trust-icon">{t.icon}</span>{t.label}</div>
            {i < arr.length - 1 && <div key={`td${i}`} className="trust-divider" />}
          </>
        ))}
      </div>

      {/* Intro Video Section */}
      <VideoSection setCurrentPage={setCurrentPage} />

      {/* Services Tabs */}
      <section className="services-home">
        <div className="container">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Everything Your Business Needs to Thrive</h2>
          <p className="section-sub">From securing your systems to growing your brand online and empowering your team — NOMADS Secure covers it all.</p>
          <div className="svc-tabs">
            {tabs.map(t => (
              <button key={t.id} className={`svc-tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>
          <div className="svc-category">
            {activeTabData.cards.map(c => (
              <div key={c.name} className="svc-mini-card">
                <div className="svc-mini-icon">{c.icon}</div>
                <div className="svc-mini-name">{c.name}</div>
                <div className="svc-mini-arrow">→</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button className="btn-primary" onClick={() => setCurrentPage("services")}>View All Services →</button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-text">
              <div className="section-label">Why Choose Us</div>
              <h2>Built on Trust. Driven by Results.</h2>
              <p>At NOMADS Secure, we combine AI-powered tools with cybersecurity expertise and digital marketing mastery to deliver measurable, secure, and scalable results.</p>
              <div className="why-features">
                {[
                  {t:"AI-Powered Solutions",d:"We leverage cutting-edge AI agents and automation to give you a competitive edge."},
                  {t:"Security-First Approach",d:"Every deliverable is built with security baked in — not bolted on afterward."},
                  {t:"End-to-End Digital Growth",d:"From SEO to performance ads, we drive real traffic and real revenue."},
                  {t:"Expert Mentorship & Training",d:"We empower your team with skills, knowledge, and career direction."},
                ].map(f => (
                  <div key={f.t} className="why-feature">
                    <div className="feature-check">✓</div>
                    <div><strong>{f.t}</strong><p>{f.d}</p></div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setCurrentPage("about")}>Meet Our Team</button>
            </div>
            <div>
              <div className="metrics-card">
                {metrics.map(m => (
                  <div key={m.name} className="metric-item">
                    <div className="metric-row">
                      <span className="metric-name">{m.name}</span>
                      <span className="metric-val">{m.val}</span>
                    </div>
                    <div className="metric-bar"><div className="metric-fill" style={{width:`${m.pct}%`}} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-label">Client Testimonials</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-sub">Real results, real relationships. Here's what businesses say after working with NOMADS Secure.</p>
          <div className="testi-grid">
            {testimonials.map(t => (
              <div key={t.name} className={`testi-card${t.featured ? " testi-featured" : ""}`}>
                <div className="quote-mark">"</div>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{t.q}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.init}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2>Ready to <span className="cta-gold">Build, Secure & Scale</span>?</h2>
              <p>Build Brands with AI and Security — Let's create your digital future together.</p>
            </div>
            <button className="btn-ghost white large" onClick={() => setCurrentPage("contact")}>Start a Conversation →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SERVICES PAGE ──
function ServicesPage() {
  const data = defaultData;
  const categories = [
    {id:"dm", icon:"📈", bg:"", label:"Vertical 01", title:"Digital Marketing & Brand Growth", desc:"Data-driven marketing strategies to amplify your brand, capture qualified leads, and convert audiences into loyal customers.", services: data.dmServices, alt: false},
    {id:"cs", icon:"🛡️", bg:"background:linear-gradient(135deg,#111E3F,#1B2D5B)", label:"Vertical 02", title:"Cybersecurity Services", desc:"Enterprise-grade protection for your digital infrastructure, data, and reputation — 24/7 monitoring and response.", services: data.csServices, alt: true},
    {id:"ai", icon:"🤖", bg:"background:linear-gradient(135deg,#C9921A,#E8A820)", label:"Vertical 03", title:"AI Agent Services", desc:"Cutting-edge AI agent development, integration, and security to automate workflows and future-proof your business.", services: data.aiServices, alt: false},
    {id:"ct", icon:"🎓", bg:"background:linear-gradient(135deg,#2E7D45,#10b981)", label:"Vertical 04", title:"Career & Training Services", desc:"Empowering individuals and organisations through career development, professional training, and strategic education guidance.", services: data.ctServices, alt: true},
  ];

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="dots-bg" />
        <div className="page-hero-content">
          <div className="section-label">Our Services</div>
          <h1>Comprehensive IT & AI Solutions</h1>
          <p>Four powerful service verticals — built to protect, grow, automate, and develop your business and people.</p>
        </div>
        <div className="page-hero-wave" />
      </section>
      {categories.map((cat, ci) => (
        <section key={cat.id} className={`services-full${cat.alt ? " alt" : ""}`}>
          <div className="container">
            <div className="srv-category-header">
              <div className="srv-cat-icon" style={cat.bg ? {background: cat.bg.replace("background:","")} : {}}>{cat.icon}</div>
              <div>
                <div className="section-label">{cat.label}</div>
                <h2>{cat.title}</h2>
                <p>{cat.desc}</p>
              </div>
            </div>
            <div className="srv-grid">
              {cat.services.map((s, i) => (
                <div key={s.id} className="srv-card">
                  <div className="srv-num">Service {String(i+1).padStart(2,"0")}</div>
                  <div className="srv-name">{s.name}</div>
                  <div className="srv-desc">{s.desc}</div>
                  <div className="srv-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ── ABOUT PAGE ──
function AboutPage({ setCurrentPage }) {
  const team = defaultData.team;

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="dots-bg" />
        <div className="page-hero-content">
          <div className="section-label">About Us</div>
          <h1>Who We Are</h1>
          <p>A dedicated team of AI specialists, security experts, digital marketers, and educators united by one mission — your growth and security.</p>
        </div>
        <div className="page-hero-wave grey" />
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-label">Our Mission</div>
              <h2>Delivering Secure, Innovative & AI-Powered Solutions</h2>
              <p>NOMADS Secure is a comprehensive IT and digital services organisation that builds brands with AI and security. We support businesses and institutions in enhancing their online presence through SEO, social media marketing, performance advertising, and data-driven digital strategies.</p>
              <p>Our cybersecurity vertical ensures the protection of digital assets through vulnerability assessments, penetration testing, website security, and continuous monitoring — we treat security as an ongoing commitment, not a one-time fix.</p>
              <p>Our AI services team develops and deploys intelligent agents that automate workflows and integrate seamlessly into your existing systems — securely and effectively. Combined with our career and training programmes, we offer end-to-end value for businesses and individuals alike.</p>
              <button className="btn-primary" onClick={() => setCurrentPage("contact")} style={{marginTop:"1.5rem"}}>Get in Touch →</button>
            </div>
            <div className="about-values">
              <h3>Our Core Values</h3>
              {[
                {icon:"🔐",title:"Security First",desc:"Every solution we build has security as its foundation, not an afterthought."},
                {icon:"🤖",title:"AI-Driven Innovation",desc:"We leverage AI to build smarter, faster, and more efficient solutions."},
                {icon:"🤝",title:"Long-Term Partnership",desc:"We treat every client as a long-term partner, invested in their growth."},
                {icon:"📊",title:"Results-Driven",desc:"Measurable outcomes and transparent reporting at every stage."},
              ].map(v => (
                <div key={v.title} className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <div><strong>{v.title}</strong><p>{v.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-label">The Team</div>
          <h2 className="section-title">Meet the Experts Behind NOMADS Secure</h2>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-avatar">{m.emoji}</div>
                <h4>{m.name}</h4>
                <div className="team-role">{m.role}</div>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── BLOG PAGE ──
function BlogPage() {
  const [filter, setFilter] = useState("all");
  const [email, setEmail] = useState("");
  const blogs = defaultData.blogs;
  const filters = [
    {id:"all",label:"All Posts"},
    {id:"cybersecurity",label:"Cybersecurity"},
    {id:"digital-marketing",label:"Digital Marketing"},
    {id:"ai",label:"AI & Tech"},
    {id:"career",label:"Career"},
  ];
  const filtered = filter === "all" ? blogs : blogs.filter(b => b.category === filter);

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="dots-bg" />
        <div className="page-hero-content">
          <div className="section-label">Blog & Insights</div>
          <h1>Knowledge Hub</h1>
          <p>Expert insights on cybersecurity, AI, digital marketing, and career development from the NOMADS Secure team.</p>
        </div>
        <div className="page-hero-wave" />
      </section>
      <section className="blog-section">
        <div className="container">
          <div className="blog-top">
            <div className="blog-filters">
              {filters.map(f => (
                <button key={f.id} className={`blog-filter${filter === f.id ? " active" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
          </div>
          <div className="blog-grid">
            {filtered.map(b => (
              <div key={b.id} className="blog-card">
                <div className="blog-img-wrap">
                  <img className="blog-img" src={b.img} alt={b.title} />
                  <div className="blog-category-badge">{b.category.replace("-"," ")}</div>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span className="blog-date">{b.date}</span>
                    <span className="blog-read-time">⏱ {b.readTime}</span>
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.excerpt}</p>
                  <button className="blog-read-link">Read Article <span className="blog-arrow">→</span></button>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-newsletter">
            <h3>Stay in the Loop</h3>
            <p>Get our latest insights on AI, cybersecurity, and digital growth delivered to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="btn-primary gold" onClick={() => { if(email.includes("@")){setEmail("");alert("Thank you for subscribing!");} else { alert("Please enter a valid email.");}}}>Subscribe →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── CONTACT PAGE ──
function ContactPage() {
  const [formData, setFormData] = useState({name:"",email:"",phone:"",service:"",budget:"",message:""});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({name:"",email:"",phone:"",service:"",budget:"",message:""}); }, 5000);
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="dots-bg" />
        <div className="page-hero-content">
          <div className="section-label">Contact Us</div>
          <h1>Let's Build Something Great</h1>
          <p>Book a free consultation, ask about our services, or simply reach out — we'd love to hear from you.</p>
        </div>
        <div className="page-hero-wave" />
      </section>
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-wrap">
              <h3>Get In Touch</h3>
              <p className="contact-tagline">" Build Brands with AI and Security "</p>
              {[
                {icon:"📧",label:"Email",val:"info@nomadssecure.com"},
                {icon:"📞",label:"Phone",val:"+91 XXXXX XXXXX"},
                {icon:"📍",label:"Location",val:"India"},
                {icon:"⏰",label:"Hours",val:"Mon–Sat, 9:00 AM – 6:00 PM IST"},
              ].map(i => (
                <div key={i.label} className="info-item">
                  <div className="info-icon-wrap">{i.icon}</div>
                  <div><strong>{i.label}</strong><span>{i.val}</span></div>
                </div>
              ))}
              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="socials">
                  <button className="social-btn">LinkedIn</button>
                  <button className="social-btn">Twitter / X</button>
                  <button className="social-btn">Instagram</button>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <h3>Send Us a Message</h3>
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">✅</div>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" placeholder="Your full name" required value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" placeholder="you@email.com" required value={formData.email} onChange={e => setFormData({...formData,email:e.target.value})} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({...formData,phone:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Service Interested In</label>
                      <select value={formData.service} onChange={e => setFormData({...formData,service:e.target.value})}>
                        <option value="">Select a service...</option>
                        <option>Digital Marketing / SEO</option>
                        <option>Social Media Management</option>
                        <option>Performance Marketing</option>
                        <option>Cybersecurity / VAPT</option>
                        <option>AI Agent Development</option>
                        <option>Website Development</option>
                        <option>Career Counselling</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select value={formData.budget} onChange={e => setFormData({...formData,budget:e.target.value})}>
                      <option value="">Select budget range...</option>
                      <option>Under ₹25,000</option>
                      <option>₹25,000 – ₹50,000</option>
                      <option>₹50,000 – ₹1,00,000</option>
                      <option>₹1,00,000+</option>
                      <option>Let's discuss</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea placeholder="Tell us about your project, goals, or questions..." required value={formData.message} onChange={e => setFormData({...formData,message:e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary gold" style={{width:"100%",justifyContent:"center"}}>Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ──
function Footer({ setCurrentPage }) {
  const nav = (p) => { setCurrentPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/mnt/user-data/uploads/logo.png" alt="NOMADS Secure" style={{height:"48px",width:"auto",objectFit:"contain",filter:"brightness(0) invert(1)"}} />
            <div className="footer-logo-text nav-logo-text">
              <span className="brand-name" style={{color:"#fff"}}>NOMADS SECURE</span>
              <span className="brand-tag">Build Brands with AI and Security</span>
            </div>
          </div>
          <div className="footer-tagline">" Build Brands with AI and Security "</div>
          <p>Secure, innovative, and AI-powered digital solutions for modern businesses and professionals.</p>
        </div>
        <div className="footer-links">
          <h5>Services</h5>
          <button onClick={() => nav("services")}>Digital Marketing</button>
          <button onClick={() => nav("services")}>Cybersecurity</button>
          <button onClick={() => nav("services")}>AI Agent Services</button>
          <button onClick={() => nav("services")}>Career & Training</button>
        </div>
        <div className="footer-links">
          <h5>Company</h5>
          <button onClick={() => nav("about")}>About Us</button>
          <button onClick={() => nav("blog")}>Blog</button>
          <button onClick={() => nav("contact")}>Contact</button>
        </div>
        <div className="footer-links">
          <h5>Legal</h5>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 NOMADS Secure. All rights reserved.</span>
        <span className="footer-tag">Build Brands with AI and Security ◈</span>
      </div>
    </footer>
  );
}

// ── APP ROOT ──
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  const renderPage = () => {
    switch(currentPage) {
      case "home":     return <HomePage setCurrentPage={setCurrentPage} />;
      case "services": return <ServicesPage />;
      case "about":    return <AboutPage setCurrentPage={setCurrentPage} />;
      case "blog":     return <BlogPage />;
      case "contact":  return <ContactPage />;
      default:         return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{paddingTop:"64px"}}>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </>
  );
}
