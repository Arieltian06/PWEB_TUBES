import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Star, Filter, GraduationCap, Video, Users, MonitorPlay } from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentLevel = searchParams.get('level') || 'all';
  
  // 👇 Ambil data user untuk cek subscription & paket
  const [userData, setUserData] = useState(null);
  const [userPackageLevel, setUserPackageLevel] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('learnify_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserData(user);
      
      // 👇 Tentukan level berdasarkan paket user
      if (user.subscription?.package) {
        const pkg = user.subscription.package.toLowerCase();
        if (pkg.includes('smp')) setUserPackageLevel('smp');
        else if (pkg.includes('sma')) setUserPackageLevel('sma');
        else if (pkg.includes('utbk') || pkg.includes('snbt')) setUserPackageLevel('utbk');
      }
    }
  }, []);

  // Cek apakah user sudah berlangganan
  const hasActiveSubscription = userData?.hasSubscription === true || 
                                 userData?.subscription?.status === 'active';

  // 👇 Filter materi berdasarkan paket user (jika sudah login & berlangganan)
  const getAllowedLevels = () => {
    if (!hasActiveSubscription) return ['smp', 'sma', 'utbk']; // Belum berlangganan: semua level
    if (userPackageLevel) return [userPackageLevel]; // Sudah berlangganan: hanya level paketnya
    return ['smp', 'sma', 'utbk']; // Default
  };

  const allowedLevels = getAllowedLevels();

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLevel]);

  const allCourses = [
    // UTBK
    { id: 1, title: 'Video belajar dan latihan soal SNBT 2025', category: 'Persiapan SNBT', rating: 4.8, type: 'Video Belajar', color: '#6A5ACD', icon: <Video size={16} />, level: 'utbk', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop' },
    { id: 5, title: 'Persiapan Mandiri Ujian Mandiri PTN', category: 'Persiapan UM', rating: 4.6, type: 'Bank Soal', color: '#FF4500', icon: <Video size={16} />, level: 'utbk', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop' },
    { id: 101, title: 'Tryout SNBT Intensif Mingguan', category: 'Tryout UTBK', rating: 4.9, type: 'Ujian Simulasi', color: '#8A2BE2', icon: <MonitorPlay size={16} />, level: 'utbk', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop' },
    { id: 102, title: 'Kupas Tuntas Penalaran Umum & Kuantitatif', category: 'Live Teaching SNBT', rating: 4.7, type: 'Live Teaching', color: '#1E90FF', icon: <Users size={16} />, level: 'utbk', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop' },
    { id: 103, title: 'Strategi Lolos PTN Impian 2026', category: 'Persiapan SNBT', rating: 4.9, type: 'Video Belajar', color: '#20B2AA', icon: <GraduationCap size={16} />, level: 'utbk', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop' },

    // SMA
    { id: 3, title: 'Live Teaching interaktif bareng Master Teacher (SMA)', category: 'Brain Academy Online', rating: 4.7, type: 'Live Teaching', color: '#1E90FF', icon: <MonitorPlay size={16} />, level: 'sma', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop' },
    { id: 201, title: 'Fisika Lanjutan & Kimia Organik', category: 'Sains Terpadu SMA', rating: 4.8, type: 'Video Belajar', color: '#2E8B57', icon: <Video size={16} />, level: 'sma', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop' },
    { id: 202, title: 'Matematika Peminatan Kelas 10-12', category: 'Matematika Ekspert', rating: 4.9, type: 'Fasilitas Lengkap', color: '#4169E1', icon: <GraduationCap size={16} />, level: 'sma', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop' },
    { id: 6, title: 'Bimbingan Konseling Jurusan Kuliah', category: 'Klinik Pintar', rating: 4.8, type: 'Konseling 1-on-1', color: '#2E8B57', icon: <Users size={16} />, level: 'sma', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop' },
    { id: 203, title: 'Biologi & Kimia Intensif UTBK', category: 'Sains Terpadu SMA', rating: 4.7, type: 'Video Belajar', color: '#3CB371', icon: <Video size={16} />, level: 'sma', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop' },

    // SMP
    { id: 2, title: 'Kelas tatap muka + Tryout Eksklusif (SMP)', category: 'Brain Academy Center', rating: 4.9, type: 'Fasilitas Lengkap', color: '#4169E1', icon: <Users size={16} />, level: 'smp', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop' },
    { id: 301, title: 'Persiapan Olimpiade Sains Nasional (OSN) SMP', category: 'Olimpiade Sains', rating: 4.8, type: 'Live Teaching', color: '#8A2BE2', icon: <GraduationCap size={16} />, level: 'smp', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop' },
    { id: 302, title: 'Matematika dan IPA Terpadu Kelas 7-9', category: 'Paket Belajar SMP', rating: 4.7, type: 'Video Belajar', color: '#6A5ACD', icon: <Video size={16} />, level: 'smp', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop' },
    { id: 303, title: 'Bahasa Inggris Dasar Menengah', category: 'English Academy', rating: 4.6, type: 'Video Belajar', color: '#FF6347', icon: <Video size={16} />, level: 'smp', image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=600&auto=format&fit=crop' },
  ];

  const levelInfo = {
    all: { title: 'Eksplorasi Produk Belajar', desc: 'Temukan paket belajar yang paling sesuai dengan gaya belajar dan target akademismu.' },
    smp: { title: 'Persiapan Mantap SMP', desc: 'Kuasai konsep dasar dan persiapkan diri untuk olimpiade atau ujian sekolah.' },
    sma: { title: 'Pendalaman Materi SMA', desc: 'Materi mendalam untuk menaklukkan pelajaran sulit dan persiapan masuk kampus.' },
    utbk: { title: 'Pejuang PTN (SNBT/UTBK)', desc: 'Latihan soal intensif, tryout, dan strategi jitu lolos kampus impianmu.' }
  };

  const info = levelInfo[currentLevel] || levelInfo.all;

  const setLevel = (level) => {
    if (level === 'all') {
      searchParams.delete('level');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ level });
    }
  };

  // 👇 Handler untuk klik "Ambil Pelajaran"
  const handleTakeCourse = (courseId) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!hasActiveSubscription) {
      navigate('/pricing');
      return;
    }
    
    // Jika sudah berlangganan, arahkan ke detail course
    navigate(`/course/${courseId}`);
  };

  const filtered = allCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = currentLevel === 'all' ? allowedLevels.includes(c.level) : c.level === currentLevel;
    return matchesSearch && matchesLevel;
  });

  // 👇 Tentukan tab yang tersedia berdasarkan paket user
  const availableTabs = hasActiveSubscription && userPackageLevel 
    ? ['Semua', userPackageLevel.toUpperCase()]
    : ['Semua', 'SMP', 'SMA', 'UTBK'];

  return (
    <div className="animate-fade-in">
      {/* Header Full Width */}
      <div style={{ 
        background: 'var(--gradient-hero)', 
        padding: '60px 0', 
        color: 'white',
        width: '100%'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', marginBottom: '16px', color: 'white' }}>{info.title}</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', marginBottom: '32px' }}>{info.desc}</p>
          
          <div style={{ display: 'flex', gap: '16px', maxWidth: '700px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={20} />
              <input 
                type="text" 
                placeholder="Cari materi, kelas, atau tryout..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '100px', fontSize: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </div>
            <button className="btn btn-white btn-interactive" style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> Filter
            </button>
          </div>

          {/* Tabs - Menyesuaikan dengan paket user */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '32px', overflowX: 'auto', paddingBottom: '8px' }} className="hide-scrollbar">
            {availableTabs.map(tab => {
              const tabKey = tab === 'Semua' ? 'all' : tab.toLowerCase();
              const isActive = currentLevel === tabKey;
              return (
                <button 
                  key={tabKey}
                  onClick={() => setLevel(tabKey)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '100px',
                    border: 'none',
                    background: isActive ? 'white' : 'rgba(255,255,255,0.15)',
                    color: isActive ? 'var(--rg-teal)' : 'white',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  className="btn-interactive"
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--text-dark)' }}>
            {currentLevel === 'all' ? 'Semua Produk' : `Katalog ${currentLevel.toUpperCase()}`}
          </h2>
          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Menampilkan {filtered.length} produk</span>
        </div>

        <div className="grid-3">
          {filtered.map(course => (
            <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ height: '180px', position: 'relative' }}>
                <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 800, color: 'white', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '100px', backdropFilter: 'blur(4px)' }}>
                  <Star size={14} fill="#FFD700" color="#FFD700" /> {course.rating}
                </div>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: course.color, color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  {course.icon} {course.type}
                </div>
              </div>
              <div style={{ padding: '24px', background: 'white', flex: 1, borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ 
                    background: 'var(--bg-light)', 
                    color: 'var(--rg-teal)', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {course.level}
                  </span>
                  <p style={{ color: 'var(--text-gray)', fontSize: '13px', fontWeight: 700, margin: 0 }}>{course.category}</p>
                </div>
                <h3 style={{ fontSize: '18px', lineHeight: 1.4, marginBottom: '16px', color: 'var(--text-dark)' }}>{course.title}</h3>
              </div>
              {/* 👇 Harga dihilangkan, tombol diubah */}
              <div style={{ padding: '20px 24px', background: '#FAFAFA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button 
                  onClick={() => handleTakeCourse(course.id)}
                  className="btn btn-primary btn-interactive" 
                  style={{ padding: '10px 24px', fontSize: '14px', width: '100%' }}
                >
                  Ambil Pelajaran
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
              <Search size={48} style={{ margin: '0 auto 16px auto', color: 'var(--border-color)' }} />
              <h3 style={{ color: 'var(--text-gray)' }}>Waduh, produk yang kamu cari belum ada nih.</h3>
              <p style={{ color: 'var(--text-light)' }}>Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Courses;