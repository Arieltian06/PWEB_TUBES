import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Award, Download, Calendar, CheckCircle, Eye } from 'lucide-react';

const Certificates = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('learnify_user') || '{}');
    setUserData(user);
  }, [navigate]);

  // Ambil sertifikat dari localStorage
  const certificates = userData?.certificates || [];

  // Hitung rata-rata skor
  const averageScore = certificates.length > 0 
    ? Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length) 
    : 0;

  // Navigasi ke halaman preview sertifikat
  const handleViewCertificate = (certId) => {
    navigate(`/certificate/${certId}`);
  };

  if (!userData) return null;

  return (
    <div className="animate-fade-in" style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Link 
            to="/profile" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--text-gray)', 
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={16} /> Kembali ke Profil
          </Link>
          <h1 style={{ fontSize: '28px', color: 'var(--text-dark)' }}>Sertifikat Saya</h1>
          <p style={{ color: 'var(--text-gray)' }}>Kumpulan sertifikat dan pencapaian belajar Anda</p>
        </div>

        {certificates.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <Award size={64} color="var(--border-color)" style={{ marginBottom: '24px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-dark)' }}>Belum Ada Sertifikat</h3>
            <p style={{ color: 'var(--text-gray)', marginBottom: '32px' }}>
              Selesaikan kursus atau tryout untuk mendapatkan sertifikat
            </p>
            <Link to="/dashboard" className="btn btn-primary btn-interactive" style={{ padding: '12px 32px' }}>
              Lanjutkan Belajar
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {certificates.map(cert => (
              <div key={cert.id} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: 'linear-gradient(135deg, var(--rg-teal) 0%, #0d9488 100%)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Award size={32} color="white" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '18px', margin: 0, color: 'var(--text-dark)' }}>{cert.title}</h4>
                      <span style={{ 
                        background: '#10B981', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '100px', 
                        fontSize: '10px', 
                        fontWeight: 700 
                      }}>
                        SELESAI
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-gray)' }}>
                        <Calendar size={14} /> {cert.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-gray)' }}>
                        <CheckCircle size={14} color="var(--rg-teal)" /> Skor: {cert.score}
                      </span>
                      {cert.level && (
                        <span style={{ 
                          background: 'var(--bg-light)', 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          fontSize: '11px', 
                          fontWeight: 600,
                          color: 'var(--text-gray)',
                          textTransform: 'uppercase'
                        }}>
                          {cert.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleViewCertificate(cert.id)}
                    className="btn btn-outline btn-interactive" 
                    style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Eye size={16} /> Lihat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistik */}
        <div className="card" style={{ padding: '24px', marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-dark)' }}>Statistik Pencapaian</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--rg-teal)' }}>{certificates.length}</div>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Sertifikat</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--rg-teal)' }}>{certificates.length}</div>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Kursus Selesai</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--rg-teal)' }}>{averageScore}</div>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Rata-rata Skor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;