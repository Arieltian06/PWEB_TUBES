import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Book, LogOut, Settings, Award, LayoutDashboard, AlertCircle, X, CreditCard, Calendar, CheckCircle } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showRenewPopup, setShowRenewPopup] = useState(false); // 👈 State untuk popup perpanjang

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('learnify_user') || '{}');
    setUserData(user);
  }, [navigate]);

  // Fungsi untuk menampilkan alert sementara
  const showTemporaryAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 3000);
  };

  // Cek apakah user sudah berlangganan
  const hasActiveSubscription = userData?.hasSubscription === true || 
                                 userData?.subscription?.status === 'active';

  // Handler untuk tombol Dashboard
  const handleDashboardClick = (e) => {
    if (!hasActiveSubscription) {
      e.preventDefault();
      showTemporaryAlert('Anda belum berlangganan paket belajar. Silakan pilih paket terlebih dahulu.');
    }
  };

  // Handler untuk tombol Paket Belajar
  const handlePackageClick = () => {
    navigate('/pricing');
  };

  // 👇 Handler untuk tombol Perpanjang - Buka Popup
  const handleRenew = () => {
    setShowRenewPopup(true);
  };

  // 👇 Handler untuk konfirmasi perpanjangan
  const handleConfirmRenew = () => {
    const packageName = userData?.subscription?.package || 'ruangbelajar SMA';
    const packagePrice = userData?.subscription?.price || 249000;
    
    // Tutup popup
    setShowRenewPopup(false);
    
    // Arahkan ke halaman payment dengan data paket
    navigate('/payment', {
      state: {
        packageName: packageName,
        packagePrice: packagePrice,
        isRenewal: true // 👈 Flag untuk menandai ini perpanjangan
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('learnify_user');
    navigate('/login');
  };

  if (!userData) return null;

  return (
    <div className="animate-fade-in" style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* Sidebar */}
          <div style={{ width: '280px', flexShrink: 0, background: 'white', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '100px', height: '100px', background: 'var(--gradient-hero)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '16px', fontSize: '32px', fontWeight: 800 }}>
                {userData.fullName ? userData.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 style={{ fontSize: '20px', marginBottom: '4px', color: 'var(--text-dark)' }}>{userData.fullName || 'User Pelajar'}</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '12px' }}>{userData.email || 'user@example.com'}</p>
              <div style={{ 
                background: hasActiveSubscription ? 'var(--rg-teal)' : 'var(--text-gray)', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '100px', 
                fontSize: '12px', 
                fontWeight: 800 
              }}>
                {hasActiveSubscription ? 'Siswa Aktif' : 'Belum Berlangganan'}
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {hasActiveSubscription ? (
                <Link 
                  to="/dashboard" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px 16px', 
                    background: 'transparent', 
                    color: 'var(--text-gray)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }} 
                  className="hover-menu"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              ) : (
                <button 
                  onClick={handleDashboardClick}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px 16px', 
                    background: 'transparent', 
                    color: 'var(--text-gray)', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }} 
                  className="hover-menu"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </button>
              )}
              
              <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-light)', color: 'var(--rg-teal)', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                <User size={18} /> Profil Saya
              </button>
              
              <button 
                onClick={handlePackageClick}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', color: 'var(--text-gray)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease', width: '100%' }} 
                className="hover-menu"
              >
                <Book size={18} /> Paket Belajar
              </button>
              
              <Link 
                to="/certificates"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', color: 'var(--text-gray)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease', textDecoration: 'none' }} 
                className="hover-menu"
              >
                <Award size={18} /> Sertifikat
              </Link>
              
              <Link 
                to="/settings"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', color: 'var(--text-gray)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease', textDecoration: 'none' }} 
                className="hover-menu"
              >
                <Settings size={18} /> Pengaturan
              </Link>
              
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '8px 0' }}></div>
              
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease' }} className="hover-menu">
                <LogOut size={18} /> Keluar
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <User size={20} color="var(--rg-teal)" /> Informasi Pribadi
                </h3>
                <Link 
                  to="/settings"
                  style={{ 
                    color: 'var(--rg-teal)', 
                    fontWeight: 600, 
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Settings size={14} /> Edit Profil
                </Link>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 600 }}>Nama Lengkap</label>
                  <div style={{ padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-dark)', fontWeight: 500 }}>
                    {userData.fullName || 'User Pelajar'}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 600 }}>Email</label>
                  <div style={{ padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-dark)', fontWeight: 500 }}>
                    {userData.email || 'user@example.com'}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 600 }}>Nomor Handphone</label>
                  <div style={{ padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-dark)', fontWeight: 500 }}>
                    {userData.phone || '0812-3456-7890'}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 600 }}>Jenjang Pendidikan</label>
                  <div style={{ padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-dark)', fontWeight: 500 }}>
                    {userData.grade || 'SMA Kelas 12'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card Paket Belajar Aktif */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Book size={20} color="var(--rg-orange)" /> Paket Belajar Aktif
              </h3>
              
              {hasActiveSubscription ? (
                <div style={{ background: 'var(--gradient-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ background: 'var(--rg-teal)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, display: 'inline-block', marginBottom: '12px' }}>AKTIF</div>
                    <h4 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {userData.subscription?.package || 'ruangbelajar SMA'}
                    </h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '13px' }}>
                      Berlaku hingga {userData.subscription?.validUntil || '12 Agustus 2026'}
                    </p>
                  </div>
                  <button 
                    onClick={handleRenew}
                    className="btn btn-outline btn-interactive" 
                    style={{ padding: '8px 20px', fontSize: '14px' }}
                  >
                    Perpanjang
                  </button>
                </div>
              ) : (
                <div style={{ 
                  background: '#FEF3C7', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  border: '1px dashed #F59E0B',
                  textAlign: 'center'
                }}>
                  <AlertCircle size={48} color="#F59E0B" style={{ marginBottom: '16px' }} />
                  <h4 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    Belum Ada Paket Aktif
                  </h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px' }}>
                    Anda belum berlangganan paket belajar apapun. Yuk, pilih paket yang sesuai dengan kebutuhanmu!
                  </p>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="btn btn-primary btn-interactive"
                    style={{ padding: '12px 32px' }}
                  >
                    Pilih Paket Belajar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 👇 Popup Perpanjang Paket */}
      {showRenewPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          animation: 'fadeIn 0.2s ease'
        }} onClick={() => setShowRenewPopup(false)}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '450px',
            width: '90%',
            boxShadow: 'var(--shadow-xl)',
            animation: 'slideUp 0.3s ease'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(20, 195, 162, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Calendar size={32} color="var(--rg-teal)" />
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--text-dark)' }}>
                Perpanjang Langganan
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
                Anda akan memperpanjang paket belajar yang sedang aktif
              </p>
            </div>

            <div style={{
              background: 'var(--bg-light)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Paket</span>
                <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>
                  {userData?.subscription?.package || 'ruangbelajar SMA'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Harga per Bulan</span>
                <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>
                  Rp {userData?.subscription?.price?.toLocaleString('id-ID') || '249.000'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Berlaku Saat Ini</span>
                <span style={{ fontWeight: 600, color: 'var(--rg-teal)' }}>
                  {userData?.subscription?.validUntil || '12 Agustus 2026'}
                </span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '16px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Berlaku Setelah Perpanjang</span>
                <span style={{ fontWeight: 700, color: 'var(--rg-teal)' }}>
                  +1 Bulan
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowRenewPopup(false)}
                className="btn btn-outline btn-interactive"
                style={{ flex: 1, padding: '12px' }}
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmRenew}
                className="btn btn-primary btn-interactive"
                style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <CreditCard size={16} /> Lanjutkan Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Popup */}
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease',
          maxWidth: '400px'
        }}>
          <AlertCircle size={20} color="#DC2626" />
          <span style={{ color: '#991B1B', fontWeight: 600, fontSize: '14px', flex: 1 }}>{alertMessage}</span>
          <button 
            onClick={() => setShowAlert(false)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#991B1B',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <style>{`
        .hover-menu:hover {
          background-color: var(--bg-light) !important;
          color: var(--rg-teal) !important;
        }
        
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .container > div {
            flex-direction: column;
          }
          .container > div > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;