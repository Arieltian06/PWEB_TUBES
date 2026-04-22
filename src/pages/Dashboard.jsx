import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, Clock, CheckCircle, Flame, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }
    
    const userDataStr = localStorage.getItem('learnify_user');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      
      const hasActiveSubscription = userData.subscription?.status === 'active' || 
                                     userData.subscription?.package || 
                                     userData.hasSubscription === true;
      
      if (!hasActiveSubscription) {
        navigate('/pricing');
        return;
      }
      
      setUser(userData);
    } else {
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  // 👇 Fungsi untuk mendapatkan link materi berdasarkan course (LENGKAP & SPESIFIK)
  const getCourseLink = (course) => {
    const courseId = course.id;
    const courseName = course.name || '';
    const courseType = course.type || '';
    
    // ========== LINK SPESIFIK BERDASARKAN ID COURSE ==========
    const specificLinks = {
      // UTBK Courses
      1: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=SNBT+2025+video+pembelajaran+lengkap'
      },
      5: {
        type: 'web',
        link: 'https://www.ruangguru.com/blog/persiapan-ujian-mandiri-ptn'
      },
      101: {
        type: 'tryout',
        link: 'https://www.ruangguru.com/tryout/utbk-snbt'
      },
      102: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=penalaran+umum+kuantitatif+UTBK'
      },
      103: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=strategi+lolos+PTN+2026'
      },
      
      // SMA Courses
      3: {
        type: 'live',
        link: 'https://www.youtube.com/results?search_query=live+teaching+SMA+interaktif'
      },
      201: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=fisika+kimia+SMA+lanjutan+materi'
      },
      202: {
        type: 'web',
        link: 'https://www.ruangguru.com/blog/matematika-peminatan-sma'
      },
      6: {
        type: 'web',
        link: 'https://www.ruangguru.com/konseling-jurusan-kuliah'
      },
      203: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=biologi+kimia+intensif+UTBK'
      },
      
      // SMP Courses
      2: {
        type: 'web',
        link: 'https://www.ruangguru.com/brain-academy-center-smp'
      },
      301: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=OSN+SMP+persiapan+olimpiade'
      },
      302: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=matematika+IPA+SMP+kelas+7+8+9'
      },
      303: {
        type: 'video',
        link: 'https://www.youtube.com/results?search_query=bahasa+inggris+SMP+dasar+menengah'
      },
    };
    
    // Jika ada link spesifik untuk ID ini, gunakan
    if (specificLinks[courseId]) {
      return specificLinks[courseId].link;
    }
    
    // ========== FALLBACK: Generate link berdasarkan nama ==========
    
    // Keywords untuk video YouTube
    if (courseType.includes('Video') || courseName.toLowerCase().includes('video')) {
      if (courseName.toLowerCase().includes('snbt') || courseName.toLowerCase().includes('utbk')) {
        return 'https://www.youtube.com/results?search_query=UTBK+SNBT+video+pembelajaran';
      }
      if (courseName.toLowerCase().includes('fisika')) {
        return 'https://www.youtube.com/results?search_query=fisika+SMA+materi+lengkap';
      }
      if (courseName.toLowerCase().includes('kimia')) {
        return 'https://www.youtube.com/results?search_query=kimia+SMA+materi+lengkap';
      }
      if (courseName.toLowerCase().includes('biologi')) {
        return 'https://www.youtube.com/results?search_query=biologi+SMA+materi+lengkap';
      }
      if (courseName.toLowerCase().includes('matematika')) {
        return 'https://www.youtube.com/results?search_query=matematika+pembahasan+soal';
      }
      if (courseName.toLowerCase().includes('inggris')) {
        return 'https://www.youtube.com/results?search_query=belajar+bahasa+inggris';
      }
      return 'https://www.youtube.com/results?search_query=belajar+online';
    }
    
    // Keywords untuk Tryout
    if (courseType.includes('Simulasi') || courseType.includes('Tryout') || 
        courseName.toLowerCase().includes('tryout')) {
      return 'https://www.ruangguru.com/tryout/utbk-snbt';
    }
    
    // Keywords untuk Live Teaching
    if (courseType.includes('Live') || courseName.toLowerCase().includes('live')) {
      return 'https://www.youtube.com/results?search_query=live+teaching+interaktif';
    }
    
    // Keywords untuk Olimpiade
    if (courseName.toLowerCase().includes('olimpiade') || courseName.toLowerCase().includes('osn')) {
      return 'https://pusatprestasinasional.kemdikbud.go.id/';
    }
    
    // Keywords untuk Konseling
    if (courseType.includes('Konseling') || courseName.toLowerCase().includes('konseling')) {
      return 'https://www.ruangguru.com/konseling';
    }
    
    // Default: Ruangguru belajar
    return 'https://www.ruangguru.com/belajar';
  };

  const handleContinueLearning = (course) => {
    const link = getCourseLink(course);
    
    // Update progress (simulasi)
    const userStr = localStorage.getItem('learnify_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const courseIndex = user.myCourses?.findIndex(c => c.id === course.id);
      
      if (courseIndex !== -1) {
        // Tambah progress 20% setiap kali lanjutkan
        const newProgress = Math.min((user.myCourses[courseIndex].progress || 0) + 20, 100);
        user.myCourses[courseIndex].progress = newProgress;
        localStorage.setItem('learnify_user', JSON.stringify(user));
        setUser(user);
      }
    }
    
    // Buka link di tab baru
    window.open(link, '_blank');
  };

  if (isLoading || !user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-light)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--border-color)',
            borderTopColor: 'var(--rg-teal)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: 'var(--text-gray)' }}>Memuat Ruang Belajar...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const firstName = user.fullName ? user.fullName.split(' ')[0] : 'Siswa';
  const myCourses = user.myCourses || [];
  const completedCourses = myCourses.filter(c => c.progress >= 100).length;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ background: 'var(--gradient-hero)', padding: '40px 0 100px 0', color: 'white' }}>
        <div className="container">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
              <Flame size={16} color="#FFD700" fill="#FFD700" /> {user.grade || 'SMA Kelas 12'}
            </div>
            <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'white' }}>Halo, {firstName}!</h1>
            <p style={{ opacity: 0.9, fontSize: '16px', margin: 0 }}>Paket aktif: <span style={{ fontWeight: 800 }}>{user.subscription?.package || 'ruangbelajar'}</span></p>
          </div>
        </div>
      </div>

      <div className="container overlap-container" style={{ marginTop: '-60px' }}>
        {/* Stat Cards */}
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ padding: '16px', background: 'rgba(0, 167, 211, 0.1)', borderRadius: '16px', color: 'var(--rg-blue-light)' }}><BookOpen size={28} /></div>
            <div><h3 style={{ fontSize: '28px', margin: 0, lineHeight: 1 }}>{myCourses.length}</h3><p style={{ color: 'var(--text-gray)', fontSize: '13px', margin: 0, fontWeight: 700 }}>Materi Aktif</p></div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ padding: '16px', background: 'rgba(20, 195, 162, 0.1)', borderRadius: '16px', color: 'var(--rg-teal)' }}><CheckCircle size={28} /></div>
            <div><h3 style={{ fontSize: '28px', margin: 0, lineHeight: 1 }}>{completedCourses}</h3><p style={{ color: 'var(--text-gray)', fontSize: '13px', margin: 0, fontWeight: 700 }}>Materi Selesai</p></div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ padding: '16px', background: 'rgba(255, 122, 0, 0.1)', borderRadius: '16px', color: 'var(--rg-orange)' }}><Clock size={28} /></div>
            <div><h3 style={{ fontSize: '28px', margin: 0, lineHeight: 1 }}>{myCourses.length * 5}</h3><p style={{ color: 'var(--text-gray)', fontSize: '13px', margin: 0, fontWeight:700 }}>Menit Belajar</p></div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ padding: '16px', background: 'rgba(106, 90, 205, 0.1)', borderRadius: '16px', color: '#6A5ACD' }}><Award size={28} /></div>
            <div><h3 style={{ fontSize: '28px', margin: 0, lineHeight: 1 }}>{completedCourses}</h3><p style={{ color: 'var(--text-gray)', fontSize: '13px', margin: 0, fontWeight: 700 }}>Pencapaian</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', margin: 0, color: 'var(--text-dark)' }}>Lanjutkan Belajarmu</h2>
        </div>

        {myCourses.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 40px', border: 'none', background: 'white' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-light)',
              borderRadius: '50%'
            }}>
              <BookOpen size={48} color="var(--rg-teal)" opacity={0.5} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-dark)' }}>Belum ada materi yang dipelajari</h3>
            <p style={{ fontSize: '15px', color: 'var(--text-gray)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px auto' }}>
              Yuk, cari materi atau tryout yang sesuai dengan target jurusan dan kampus impianmu.
            </p>
            <button 
              onClick={() => navigate('/courses')}
              className="btn btn-primary btn-interactive" 
              style={{ padding: '14px 32px' }}
            >
              Cari Materi Belajar
            </button>
          </div>
        ) : (
          <div className="grid-2">
            {myCourses.map(course => (
              <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', background: 'white' }}>
                <div style={{ padding: '24px', flex: 1 }}>
                  <span className="badge" style={{ 
                    marginBottom: '12px', 
                    background: course.type?.includes('Video') ? '#6A5ACD' : 
                               course.type?.includes('Tryout') ? '#FF4500' :
                               course.type?.includes('Live') ? '#1E90FF' : 'var(--rg-teal)', 
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'inline-block'
                  }}>
                    {course.level?.toUpperCase() || 'SMA'}
                  </span>
                  <h4 style={{ marginBottom: '8px', fontSize: '18px', lineHeight: 1.4, color: 'var(--text-dark)' }}>{course.name}</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px' }}>Master Teacher: {course.instructor}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
                    <span>Progres Belajar</span>
                    <span style={{ color: 'var(--rg-blue-light)' }}>{course.progress || 0}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress || 0}%`, height: '100%', background: 'var(--rg-teal)', borderRadius: '100px' }}></div>
                  </div>
                </div>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    onClick={() => handleContinueLearning(course)}
                    className="btn btn-primary btn-interactive" 
                    style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    Lanjutkan <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;