import { useState, useEffect } from 'react';
import { ArrowRight, Star, GraduationCap, Video, BookOpen, MonitorPlay, Users, Award, TrendingUp, MessageCircle, Shield, Quote, X, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('sma');
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  
  // State untuk diskon
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showDiscountBadge, setShowDiscountBadge] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('learnify_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const hasSub = user?.hasSubscription === true || user?.subscription?.status === 'active';
        setHasActiveSubscription(hasSub);
        setCurrentUserEmail(user?.email || '');
      } catch(e) {
        setHasActiveSubscription(false);
      }
    }
    
    // Cek apakah user ini sudah pernah klaim diskon
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const userStr = localStorage.getItem('learnify_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const userEmail = user?.email;
        
        if (userEmail) {
          const discountData = JSON.parse(localStorage.getItem('learnify_discounts') || '{}');
          
          if (discountData[userEmail]) {
            setDiscountPercentage(discountData[userEmail].discount);
            setPhoneNumber(discountData[userEmail].phone);
            setShowDiscountBadge(true);
            localStorage.setItem('learnify_active_discount', discountData[userEmail].discount.toString());
          }
        }
      }
    }
  }, []);

  const handleGetDiscount = () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      setErrorMessage('Masukkan nomor HP yang valid (minimal 8 digit)');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      setErrorMessage('Silakan login terlebih dahulu untuk mendapatkan diskon');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const userStr = localStorage.getItem('learnify_user');
    if (!userStr) {
      setErrorMessage('Data user tidak ditemukan');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const user = JSON.parse(userStr);
    const userEmail = user?.email;
    
    if (!userEmail) {
      setErrorMessage('Email user tidak ditemukan');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const discountData = JSON.parse(localStorage.getItem('learnify_discounts') || '{}');
    
    if (discountData[userEmail]) {
      setDiscountPercentage(discountData[userEmail].discount);
      setPhoneNumber(discountData[userEmail].phone);
      setShowDiscountBadge(true);
      setErrorMessage(`Anda sudah mendapatkan diskon ${discountData[userEmail].discount}%`);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const isPhoneUsed = Object.values(discountData).some(data => data.phone === phoneNumber);
    
    if (isPhoneUsed) {
      setErrorMessage('Nomor HP ini sudah digunakan oleh akun lain');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
      return;
    }
    
    const randomDiscount = Math.floor(Math.random() * 41) + 10;
    setDiscountPercentage(randomDiscount);
    setShowDiscountBadge(true);
    
    discountData[userEmail] = {
      phone: phoneNumber,
      discount: randomDiscount,
      claimedAt: new Date().toISOString()
    };
    
    localStorage.setItem('learnify_discounts', JSON.stringify(discountData));
    localStorage.setItem('learnify_active_discount', randomDiscount.toString());
    
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 5000);
  };

  const handleGoToPricing = () => {
    setShowSuccessPopup(false);
    navigate('/pricing');
  };

  const coursesByLevel = {
    utbk: [
      { id: 1, title: 'Video belajar dan latihan soal SNBT 2025', category: 'Persiapan SNBT', rating: 4.8, type: 'Video Belajar', color: '#6A5ACD', icon: <Video size={16} />, level: 'utbk' },
      { id: 101, title: 'Tryout SNBT Intensif Mingguan', category: 'Tryout UTBK', rating: 4.9, type: 'Ujian Simulasi', color: '#FF4500', icon: <MonitorPlay size={16} />, level: 'utbk' },
      { id: 102, title: 'Kupas Tuntas Penalaran Umum & Kuantitatif', category: 'Live Teaching SNBT', rating: 4.7, type: 'Live Teaching', color: '#1E90FF', icon: <Users size={16} />, level: 'utbk' },
      { id: 103, title: 'Strategi Lolos PTN Impian 2026', category: 'Persiapan SNBT', rating: 4.9, type: 'Video Belajar', color: '#20B2AA', icon: <GraduationCap size={16} />, level: 'utbk' },
    ],
    sma: [
      { id: 3, title: 'Live Teaching interaktif bareng Master Teacher', category: 'Brain Academy Online', rating: 4.7, type: 'Live Teaching', color: '#1E90FF', icon: <MonitorPlay size={16} />, level: 'sma' },
      { id: 201, title: 'Fisika Lanjutan & Kimia Organik', category: 'Sains Terpadu SMA', rating: 4.8, type: 'Video Belajar', color: '#2E8B57', icon: <Video size={16} />, level: 'sma' },
      { id: 202, title: 'Matematika Peminatan Kelas 10-12', category: 'Matematika Ekspert', rating: 4.9, type: 'Fasilitas Lengkap', color: '#4169E1', icon: <GraduationCap size={16} />, level: 'sma' },
      { id: 6, title: 'Bimbingan Konseling Jurusan Kuliah', category: 'Klinik Pintar', rating: 4.8, type: 'Konseling 1-on-1', color: '#2E8B57', icon: <Users size={16} />, level: 'sma' },
    ],
    smp: [
      { id: 2, title: 'Kelas tatap muka + Tryout Eksklusif', category: 'Brain Academy Center', rating: 4.9, type: 'Fasilitas Lengkap', color: '#4169E1', icon: <Users size={16} />, level: 'smp' },
      { id: 301, title: 'Persiapan Olimpiade Sains Nasional (OSN) SMP', category: 'Olimpiade Sains', rating: 4.8, type: 'Live Teaching', color: '#8A2BE2', icon: <GraduationCap size={16} />, level: 'smp' },
      { id: 302, title: 'Matematika dan IPA Terpadu Kelas 7-9', category: 'Paket Belajar SMP', rating: 4.7, type: 'Video Belajar', color: '#6A5ACD', icon: <Video size={16} />, level: 'smp' },
      { id: 303, title: 'Bahasa Inggris Dasar Menengah', category: 'English Academy', rating: 4.6, type: 'Video Belajar', color: '#FF6347', icon: <Video size={16} />, level: 'smp' },
    ],
  };

  const menuItems = [
    { title: 'Persiapan UTBK-SNBT', icon: <GraduationCap size={24} color="#E1306C" />, bg: '#FFE4E1' },
    { title: 'Bimbel Tatap Muka', icon: <Users size={24} color="#4169E1" />, bg: '#E6E6FA' },
    { title: 'Bimbel Online Interaktif', icon: <MonitorPlay size={24} color="#14C3A2" />, bg: '#E0FFFF' },
    { title: 'Video Belajar dan Soal', icon: <Video size={24} color="#FF7A00" />, bg: '#FFEBCD' },
    { title: 'English Academy', icon: <BookOpen size={24} color="#8A2BE2" />, bg: '#F8F8FF' }
  ];

  const features = [
    { icon: <Award size={32} color="#14C3A2" />, title: 'Master Teacher Berpengalaman', desc: 'Diajar langsung oleh tutor ahli dan lulusan PTN ternama.', bg: 'rgba(20, 195, 162, 0.1)' },
    { icon: <TrendingUp size={32} color="#4169E1" />, title: 'Progress Tracking', desc: 'Pantau perkembangan belajar dengan laporan detail.', bg: 'rgba(65, 105, 225, 0.1)' },
    { icon: <Shield size={32} color="#FF7A00" />, title: 'Tryout Berkala', desc: 'Simulasi UTBK dengan sistem mirip aslinya.', bg: 'rgba(255, 122, 0, 0.1)' },
    { icon: <MessageCircle size={32} color="#8A2BE2" />, title: 'Konsultasi 24/7', desc: 'Tanya jawab dengan tutor kapan saja.', bg: 'rgba(138, 43, 226, 0.1)' }
  ];

  const testimonials = [
    { name: 'Rina Anggraini', achievement: 'Lolos UGM - Kedokteran 2025', quote: 'Berkat Learnify, aku lolos UGM! Materinya lengkap dan tutornya sabar.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', rating: 5 },
    { name: 'Dimas Pratama', achievement: 'Lolos ITB - Teknik Informatika 2025', quote: 'Fitur Adapto bantu aku fokus ke materi yang belum kuasai.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', rating: 5 },
    { name: 'Salsa Nabila', achievement: 'Lolos UI - Psikologi 2025', quote: 'Tryout-nya rutin dan pembahasannya detail.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', rating: 5 }
  ];

  return (
    <div className="animate-fade-in">
      {/* Success Popup */}
      {showSuccessPopup && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }} onClick={() => setShowSuccessPopup(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', zIndex: 1000, maxWidth: '400px', width: '90%', textAlign: 'center', animation: 'popupFadeIn 0.3s ease' }}>
            <button onClick={() => setShowSuccessPopup(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={20} /></button>
            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><CheckCircle size={40} color="white" /></div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px', color: '#1a1a2e' }}>Selamat! 🎉</h3>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>Anda mendapatkan diskon <strong style={{ color: '#F59E0B', fontSize: '24px' }}>{discountPercentage}%</strong> untuk semua paket belajar!</p>
            <button onClick={handleGoToPricing} className="btn btn-primary" style={{ padding: '12px 32px', width: '100%' }}>Lihat Paket Diskon</button>
          </div>
        </>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '12px', animation: 'slideIn 0.3s ease', maxWidth: '350px' }}>
          <div style={{ color: '#DC2626' }}><X size={20} /></div>
          <span style={{ color: '#991B1B', fontWeight: 500, flex: 1 }}>{errorMessage}</span>
          <button onClick={() => setShowErrorPopup(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#991B1B' }}><X size={16} /></button>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-shape" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px' }}></div>
        <div className="hero-shape" style={{ width: '200px', height: '200px', bottom: '50px', left: '10%' }}></div>
        <div className="hero-shape" style={{ width: '600px', height: '600px', top: '10%', right: '20%', opacity: 0.02 }}></div>
        
        <div className="container grid-2" style={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <h1 style={{ fontSize: '42px', marginBottom: '16px', color: 'white', lineHeight: 1.3 }}>Bimbel Online & Offline Terbesar,<br/>Terlengkap, dan Terbukti di Indonesia</h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', fontWeight: 600 }}>Diskon spesial untukmu dengan isi nomor HP sekarang</p>
            
            {showDiscountBadge && (
              <div style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: 'white', padding: '10px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '16px', fontWeight: 700, fontSize: '16px', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}>🎉 Diskon {discountPercentage}% Aktif!</div>
            )}
            
            <div style={{ display: 'flex', background: 'white', padding: '6px', borderRadius: '100px', maxWidth: '500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', color: 'var(--text-dark)', fontWeight: 700, borderRight: '1px solid #eee' }}>+62</div>
              <input type="text" placeholder="Masukkan nomor HP..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ border: 'none', background: 'transparent', flex: 1, boxShadow: 'none', padding: '0 16px' }} />
              <button className="btn btn-primary" style={{ padding: '12px 32px' }} onClick={handleGetDiscount}>Dapatkan Diskon <ArrowRight size={18} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Students learning" style={{ width: '90%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', objectFit: 'cover', height: '350px' }} />
          </div>
        </div>
      </section>

      {/* Menu Cards */}
      <div className="container overlap-container">
        <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', gap: '16px', overflowX: 'auto' }}>
          {menuItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '16px', minWidth: '200px', flex: 1, transition: 'all 0.2s' }} className="menu-item-hover">
              <div style={{ background: item.bg, padding: '12px', borderRadius: '12px' }}>{item.icon}</div>
              <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.3 }}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="section container" style={{ paddingTop: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--text-dark)' }}>Kenapa Harus Learnify?</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>Platform belajar terlengkap dengan fitur unggulan</p>
        </div>
        <div className="grid-4">
          {features.map((feature, index) => (
            <div key={index} className="card" style={{ padding: '32px 24px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '80px', height: '80px', background: feature.bg, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text-dark)' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--text-dark)' }}>Cerita Sukses Alumni</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>125.000+ siswa sudah membuktikan dan lolos ke PTN impian</p>
        </div>
        <div className="grid-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card" style={{ padding: '32px', position: 'relative', border: '1px solid var(--border-color)' }}>
              <Quote size={40} color="var(--rg-teal)" style={{ opacity: 0.2, position: 'absolute', top: '20px', right: '20px' }} />
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>{[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}</div>
              <p style={{ fontSize: '15px', color: 'var(--text-gray)', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>"{testimonial.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src={testimonial.image} alt={testimonial.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--rg-teal)' }} />
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px', color: 'var(--text-dark)' }}>{testimonial.name}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--rg-teal)', fontWeight: 600 }}>{testimonial.achievement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!hasActiveSubscription && (
        <section className="section" style={{ background: 'var(--gradient-hero)', padding: '60px 0', marginTop: '20px', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'white' }}>Siap Raih PTN Impianmu?</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>Bergabunglah dengan 125.000+ siswa yang sudah membuktikan</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/pricing" className="btn btn-white btn-interactive" style={{ padding: '14px 32px', fontSize: '16px' }}>Pilih Paket Belajar</Link>
              <Link to="/courses" className="btn btn-interactive" style={{ padding: '14px 32px', fontSize: '16px', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>Lihat Produk</Link>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .menu-item-hover:hover { border-color: var(--rg-blue-light) !important; background: #f8fafc; transform: translateY(-4px); }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @keyframes popupFadeIn { from { opacity: 0; transform: translate(-50%, -60%); } to { opacity: 1; transform: translate(-50%, -50%); } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @media (max-width: 992px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 576px) { .grid-3 { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default Home;