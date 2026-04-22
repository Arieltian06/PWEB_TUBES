import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, PlayCircle, CheckCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success'); // 'success' or 'warning'

  // Data course berdasarkan ID (simulasi)
  const getCourseById = (courseId) => {
    const courses = {
      // UTBK
      1: { id: 1, name: 'Video belajar dan latihan soal SNBT 2025', instructor: 'Master Teacher Andi', level: 'utbk', type: 'Video Belajar' },
      5: { id: 5, name: 'Persiapan Mandiri Ujian Mandiri PTN', instructor: 'Master Teacher Budi', level: 'utbk', type: 'Bank Soal' },
      101: { id: 101, name: 'Tryout SNBT Intensif Mingguan', instructor: 'Tim Akademik', level: 'utbk', type: 'Ujian Simulasi' },
      102: { id: 102, name: 'Kupas Tuntas Penalaran Umum & Kuantitatif', instructor: 'Master Teacher Citra', level: 'utbk', type: 'Live Teaching' },
      103: { id: 103, name: 'Strategi Lolos PTN Impian 2026', instructor: 'Tim Sukses PTN', level: 'utbk', type: 'Video Belajar' },
      // SMA
      3: { id: 3, name: 'Live Teaching interaktif bareng Master Teacher (SMA)', instructor: 'Master Teacher Dewi', level: 'sma', type: 'Live Teaching' },
      201: { id: 201, name: 'Fisika Lanjutan & Kimia Organik', instructor: 'Prof. Eko', level: 'sma', type: 'Video Belajar' },
      202: { id: 202, name: 'Matematika Peminatan Kelas 10-12', instructor: 'Dr. Fajar', level: 'sma', type: 'Fasilitas Lengkap' },
      6: { id: 6, name: 'Bimbingan Konseling Jurusan Kuliah', instructor: 'Konselor Gita', level: 'sma', type: 'Konseling 1-on-1' },
      203: { id: 203, name: 'Biologi & Kimia Intensif UTBK', instructor: 'Dr. Hadi', level: 'sma', type: 'Video Belajar' },
      // SMP
      2: { id: 2, name: 'Kelas tatap muka + Tryout Eksklusif (SMP)', instructor: 'Master Teacher Indra', level: 'smp', type: 'Fasilitas Lengkap' },
      301: { id: 301, name: 'Persiapan Olimpiade Sains Nasional (OSN) SMP', instructor: 'Tim OSN', level: 'smp', type: 'Live Teaching' },
      302: { id: 302, name: 'Matematika dan IPA Terpadu Kelas 7-9', instructor: 'Master Teacher Joko', level: 'smp', type: 'Video Belajar' },
      303: { id: 303, name: 'Bahasa Inggris Dasar Menengah', instructor: 'Ms. Kartini', level: 'smp', type: 'Video Belajar' },
    };
    return courses[courseId] || { id: parseInt(courseId), name: `Paket Belajar ${courseId}`, instructor: 'Master Teacher Learnify', level: 'sma', type: 'Video Belajar' };
  };

  useEffect(() => {
    const userStr = localStorage.getItem('learnify_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const hasSub = user?.hasSubscription === true || user?.subscription?.status === 'active';
      setHasActiveSubscription(hasSub);
    }
    
    const course = getCourseById(id);
    setCourseData(course);
  }, [id]);

  const showToast = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Hilangkan notifikasi setelah 4 detik
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleTakeCourse = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!hasActiveSubscription) {
      navigate('/pricing');
      return;
    }
    
    const userStr = localStorage.getItem('learnify_user');
    if (userStr && courseData) {
      const user = JSON.parse(userStr);
      
      const existingCourse = user.myCourses?.find(c => c.id === courseData.id);
      
      if (!existingCourse) {
        const newCourse = {
          id: courseData.id,
          name: courseData.name,
          instructor: courseData.instructor,
          progress: 0,
          level: courseData.level,
          type: courseData.type
        };
        
        user.myCourses = [...(user.myCourses || []), newCourse];
        localStorage.setItem('learnify_user', JSON.stringify(user));
        
        showToast('✅ Selamat! Pelajaran berhasil ditambahkan ke Dashboard Anda.', 'success');
        
        // Navigate ke dashboard setelah delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        showToast('⚠️ Pelajaran ini sudah ada di Dashboard Anda.', 'warning');
      }
    }
  };

  const syllabus = [
    'Tips & Trik Mengerjakan TPS Penalaran Umum',
    'Bedah Soal Literasi Bahasa Indonesia',
    'Mastering Literasi Bahasa Inggris SNBT',
    'Pengetahuan Kuantitatif Level HOTS',
    'Tryout Simulasi Sistem UTBK 2025'
  ];

  if (!courseData) return null;

  return (
    <div className="animate-fade-in">
      {/* Custom Notification Toast */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: notificationType === 'success' 
            ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
            : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease',
          maxWidth: '400px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle size={18} color="white" />
          </div>
          <span style={{ fontWeight: 600, fontSize: '15px', flex: 1 }}>{notificationMessage}</span>
          <button 
            onClick={() => setShowNotification(false)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'white',
              opacity: 0.7,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border-color)', padding: '60px 0 40px 0' }}>
        <div className="container grid-2" style={{ alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#6A5ACD', color: 'white', padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, marginBottom: '24px' }}>
              {courseData.type}
            </div>
            <h1 style={{ fontSize: '36px', marginBottom: '16px', color: 'var(--text-dark)', lineHeight: 1.3 }}>
              {courseData.name}
            </h1>
            <p style={{ color: 'var(--text-gray)', fontSize: '18px', marginBottom: '32px' }}>
              Siapkan dirimu hadapi UTBK-SNBT dengan ribuan video konsep, latihan soal HOTS, dan pembahasan super lengkap.
            </p>
            
            <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: 'var(--text-dark)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}><Star size={18} fill="#FFD700" color="#FFD700" /> 4.8 (2.5k Ulasan)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}><Users size={18} color="var(--rg-teal)" /> 125k+ Siswa Lulus</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}><Clock size={18} color="var(--rg-blue-light)" /> Akses 1 Tahun</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="card" style={{ padding: '32px', width: '100%', maxWidth: '380px', borderTop: '4px solid var(--rg-orange)' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 700 }}>Mulai Belajar Sekarang</p>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--rg-teal)', marginBottom: '24px' }}>Gratis untuk Pelanggan</div>
              <button 
                onClick={handleTakeCourse}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '16px', marginBottom: '16px' }}
              >
                Ambil Pelajaran
              </button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-light)' }}>
                {hasActiveSubscription ? 'Anda sudah berlangganan, silakan mulai belajar!' : 'Anda perlu berlangganan untuk mengakses materi ini'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container section grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Deskripsi Paket Belajar</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '40px', fontSize: '16px', lineHeight: 1.8 }}>
            Paket belajar paling komprehensif untuk pejuang PTN! Disusun langsung oleh Master Teacher berpengalaman. Materi selalu di-update mengikuti format soal SNBT terbaru. Belajar jadi lebih terarah dengan fitur Adapto yang menyesuaikan kecepatan pemahamanmu.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Apa saja yang akan dipelajari?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {syllabus.map((item, i) => (
              <div key={i} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: 'none' }}>
                <div style={{ color: 'var(--rg-blue-light)' }}>
                  <PlayCircle size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <span style={{ color: 'var(--rg-teal)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>Sesi {i+1}</span>
                  <h4 style={{ fontSize: '16px', margin: '4px 0 0 0', fontWeight: 700 }}>{item}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="card" style={{ padding: '32px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Fasilitas Spesial Untukmu</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-dark)' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 600 }}><CheckCircle size={20} color="var(--rg-teal)" /> <span>Ratusan Video Animasi</span></li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 600 }}><CheckCircle size={20} color="var(--rg-teal)" /> <span>Bank Soal Terupdate (HOTS)</span></li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 600 }}><CheckCircle size={20} color="var(--rg-teal)" /> <span>Rangkuman Modul PDF</span></li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 600 }}><CheckCircle size={20} color="var(--rg-teal)" /> <span>Forum Tanya Jawab Tutor</span></li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;