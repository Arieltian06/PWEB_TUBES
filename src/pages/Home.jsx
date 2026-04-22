import { useState, useEffect } from 'react';
import { ArrowRight, Star, GraduationCap, Video, BookOpen, MonitorPlay, Users, Award, TrendingUp, MessageCircle, Shield, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('sma');
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false); // 👈 State untuk cek subscription

  // 👇 Cek status berlangganan saat komponen dimuat
  useEffect(() => {
    const userStr = localStorage.getItem('learnify_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const hasSub = user?.hasSubscription === true || user?.subscription?.status === 'active';
        setHasActiveSubscription(hasSub);
      } catch(e) {
        setHasActiveSubscription(false);
      }
    }
  }, []);

  // Data kursus berdasarkan level
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

  // Level options untuk dropdown
  const levelOptions = [
    { value: 'utbk', label: 'UTBK' },
    { value: 'sma', label: 'SMA' },
    { value: 'smp', label: 'SMP' },
  ];

  const popularCourses = coursesByLevel[selectedLevel] || coursesByLevel.sma;

  const menuItems = [
    { title: 'Persiapan UTBK-SNBT', icon: <GraduationCap size={24} color="#E1306C" />, bg: '#FFE4E1', path: '/courses?level=utbk' },
    { title: 'Bimbel Tatap Muka', icon: <Users size={24} color="#4169E1" />, bg: '#E6E6FA', path: '/courses?level=sma' },
    { title: 'Bimbel Online Interaktif', icon: <MonitorPlay size={24} color="#14C3A2" />, bg: '#E0FFFF', path: '/courses?level=sma' },
    { title: 'Video Belajar dan Soal', icon: <Video size={24} color="#FF7A00" />, bg: '#FFEBCD', path: '/courses?level=utbk' },
    { title: 'English Academy', icon: <BookOpen size={24} color="#8A2BE2" />, bg: '#F8F8FF', path: '/courses?level=smp' }
  ];

  // Data Keunggulan Learnify
  const features = [
    {
      icon: <Award size={32} color="#14C3A2" />,
      title: 'Master Teacher Berpengalaman',
      desc: 'Diajar langsung oleh tutor ahli dan lulusan PTN ternama dengan rekam jejak terbukti.',
      bg: 'rgba(20, 195, 162, 0.1)'
    },
    {
      icon: <TrendingUp size={32} color="#4169E1" />,
      title: 'Progress Tracking',
      desc: 'Pantau perkembangan belajar dengan laporan detail dan rekomendasi materi personal.',
      bg: 'rgba(65, 105, 225, 0.1)'
    },
    {
      icon: <Shield size={32} color="#FF7A00" />,
      title: 'Tryout Berkala',
      desc: 'Simulasi UTBK dengan sistem mirip aslinya, lengkap dengan pembahasan mendalam.',
      bg: 'rgba(255, 122, 0, 0.1)'
    },
    {
      icon: <MessageCircle size={32} color="#8A2BE2" />,
      title: 'Konsultasi 24/7',
      desc: 'Tanya jawab dengan tutor kapan saja melalui forum diskusi dan klinik PR.',
      bg: 'rgba(138, 43, 226, 0.1)'
    }
  ];

  // Data Testimoni Alumni
  const testimonials = [
    {
      name: 'Rina Anggraini',
      achievement: 'Lolos UGM - Kedokteran 2025',
      quote: 'Berkat Learnify, aku lolos UGM jurusan Kedokteran. Materinya lengkap, tutornya sabar, dan tryout-nya mirip banget sama aslinya!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      rating: 5
    },
    {
      name: 'Dimas Pratama',
      achievement: 'Lolos ITB - Teknik Informatika 2025',
      quote: 'Fitur Adapto bantu aku fokus ke materi yang belum kuasai. Belajar jadi lebih efektif dan nggak buang-buang waktu!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      rating: 5
    },
    {
      name: 'Salsa Nabila',
      achievement: 'Lolos UI - Psikologi 2025',
      quote: 'Tryout-nya rutin dan pembahasannya detail. Aku jadi lebih percaya diri waktu ujian. Terima kasih Learnify!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      rating: 5
    }
  ];

  const handleTakeCourse = (courseId) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    const userStr = localStorage.getItem('learnify_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const hasSub = user?.hasSubscription === true || user?.subscription?.status === 'active';
      
      if (!hasSub) {
        navigate('/pricing');
        return;
      }
    } else {
      navigate('/login');
      return;
    }
    
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-shape" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px' }}></div>
        <div className="hero-shape" style={{ width: '200px', height: '200px', bottom: '50px', left: '10%' }}></div>
        <div className="hero-shape" style={{ width: '600px', height: '600px', top: '10%', right: '20%', opacity: 0.02 }}></div>
        
        <div className="container grid-2" style={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <h1 style={{ fontSize: '42px', marginBottom: '16px', color: 'white', lineHeight: 1.3 }}>
              Bimbel Online & Offline Terbesar,<br/>Terlengkap, dan Terbukti di Indonesia
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', fontWeight: 600 }}>
              Diskon spesial untukmu dengan isi nomor HP sekarang
            </p>
            
            <div style={{ display: 'flex', background: 'white', padding: '6px', borderRadius: '100px', maxWidth: '500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', color: 'var(--text-dark)', fontWeight: 700, borderRight: '1px solid #eee' }}>
                +62
              </div>
              <input 
                type="text" 
                placeholder="Masukkan nomor HP..." 
                style={{ border: 'none', background: 'transparent', flex: 1, boxShadow: 'none', padding: '0 16px' }}
              />
              <button className="btn btn-primary" style={{ padding: '12px 32px' }}>
                Dapatkan Diskon <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Students learning" style={{ width: '90%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', objectFit: 'cover', height: '350px' }} />
          </div>
        </div>
      </section>

      {/* Overlapping Menu Cards */}
      <div className="container overlap-container">
        <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', gap: '16px', overflowX: 'auto' }}>
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              onClick={() => navigate(item.path)}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '16px', minWidth: '200px', flex: 1, cursor: 'pointer', transition: 'all 0.2s' }} 
              className="menu-item-hover"
            >
              <div style={{ background: item.bg, padding: '12px', borderRadius: '12px' }}>
                {item.icon}
              </div>
              <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.3 }}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: Kenapa Harus Learnify? */}
      <section className="section container" style={{ paddingTop: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--text-dark)' }}>
            Kenapa Harus Learnify?
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
            Platform belajar terlengkap dengan fitur unggulan untuk bantu kamu raih mimpi
          </p>
        </div>

        <div className="grid-4">
          {features.map((feature, index) => (
            <div key={index} className="card" style={{ 
              padding: '32px 24px', 
              textAlign: 'center',
              border: '1px solid var(--border-color)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: feature.bg, 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text-dark)' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Testimoni Alumni */}
      <section className="section container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--text-dark)' }}>
            Cerita Sukses Alumni
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
            125.000+ siswa sudah membuktikan dan lolos ke PTN impian
          </p>
        </div>

        <div className="grid-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card" style={{ 
              padding: '32px', 
              position: 'relative',
              border: '1px solid var(--border-color)'
            }}>
              <Quote size={40} color="var(--rg-teal)" style={{ opacity: 0.2, position: 'absolute', top: '20px', right: '20px' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              
              <p style={{ 
                fontSize: '15px', 
                color: 'var(--text-gray)', 
                lineHeight: 1.7, 
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                "{testimonial.quote}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '3px solid var(--rg-teal)'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px', color: 'var(--text-dark)' }}>
                    {testimonial.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--rg-teal)', fontWeight: 600 }}>
                    {testimonial.achievement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👇 CTA Section - HANYA MUNCUL JIKA BELUM BERLANGGANAN */}
      {!hasActiveSubscription && (
        <section className="section" style={{ 
          background: 'var(--gradient-hero)', 
          padding: '60px 0', 
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'white' }}>
              Siap Raih PTN Impianmu?
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
              Bergabunglah dengan 125.000+ siswa yang sudah membuktikan
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/pricing" className="btn btn-white btn-interactive" style={{ padding: '14px 32px', fontSize: '16px' }}>
                Pilih Paket Belajar
              </Link>
              <Link to="/courses" className="btn btn-interactive" style={{ 
                padding: '14px 32px', 
                fontSize: '16px', 
                background: 'rgba(255,255,255,0.15)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.3)' 
              }}>
                Lihat Produk
              </Link>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .menu-item-hover:hover {
          border-color: var(--rg-blue-light) !important;
          background: #f8fafc;
          transform: translateY(-4px);
        }
        
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        
        @media (max-width: 992px) {
          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;