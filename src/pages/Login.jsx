import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setShowMessage(location.state.message);
      if (location.state?.email) {
        setEmail(location.state.email);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Email dan password harus diisi!');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      // 👇 Ambil SEMUA user yang terdaftar
      const allUsers = JSON.parse(localStorage.getItem('learnify_users') || '{}');
      const user = allUsers[email];
      
      // 👇 VALIDASI: Cek apakah user ada dan password cocok
      if (user && user.password === password) {
        // ✅ Login berhasil!
        
        // Simpan user yang sedang login (tanpa password)
        const loggedInUser = {
          fullName: user.fullName,
          email: user.email,
          grade: user.grade,
          phone: user.phone || '',
          hasSubscription: user.hasSubscription || false,
          subscription: user.subscription || null,
          myCourses: user.myCourses || [],
          certificates: user.certificates || []
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('learnify_user', JSON.stringify(loggedInUser));
        
        setIsLoading(false);
        navigate('/');
      } else {
        // ❌ Login gagal
        setIsLoading(false);
        setErrorMessage('Email atau password salah!');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left side - Image/Branding */}
      <div style={{ flex: 1, background: 'var(--gradient-hero)', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }} className="login-banner">
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '40px', textDecoration: 'none' }}>
            <BookOpen size={36} strokeWidth={2.5} />
            <span>learnify</span>
          </Link>
          <h1 style={{ fontSize: '40px', marginBottom: '16px', lineHeight: 1.2 }}>Platform Bimbingan<br/>Belajar No. 1</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '400px' }}>Masuk untuk melanjutkan proses belajar dan raih mimpimu bersama jutaan siswa lainnya.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div style={{ flex: 1, background: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-dark)' }}>Masuk ke Akun</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '32px', fontSize: '15px' }}>Selamat datang kembali! Silakan masukkan detail akunmu.</p>

          {/* 👇 Error Popup */}
          {showError && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.3s ease'
            }}>
              <AlertCircle size={20} color="#DC2626" />
              <span style={{ color: '#991B1B', fontWeight: 600, fontSize: '14px', flex: 1 }}>{errorMessage}</span>
              <button onClick={() => setShowError(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#991B1B' }}>
                <X size={16} />
              </button>
            </div>
          )}

          {/* 👇 Pesan sukses dari Register */}
          {showMessage && (
            <div style={{
              background: 'rgba(20, 195, 162, 0.1)',
              border: '1px solid var(--rg-teal)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle size={20} color="var(--rg-teal)" />
              <span style={{ color: 'var(--rg-teal)', fontWeight: 600, fontSize: '14px' }}>{showMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: nama@email.com"
                style={{ width: '100%', padding: '14px 20px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--bg-white)', fontSize: '15px' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ marginBottom: 0, fontWeight: 600, color: 'var(--text-dark)' }}>Kata Sandi</label>
                <Link to="/" style={{ color: 'var(--rg-teal)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Lupa Kata Sandi?</Link>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                style={{ width: '100%', padding: '14px 20px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--bg-white)', fontSize: '15px' }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '14px', width: '100%', marginTop: '8px', fontSize: '16px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-gray)', fontSize: '15px' }}>
            Belum punya akun? <Link to="/register" style={{ color: 'var(--rg-blue-light)', fontWeight: 700, textDecoration: 'none' }}>Daftar Sekarang</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-banner { display: none !important; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Login;