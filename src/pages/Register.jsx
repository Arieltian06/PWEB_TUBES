import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('SMA Kelas 12');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (fullName && email && password) {
      setIsLoading(true);
      
      // Simulasi proses pendaftaran
      setTimeout(() => {
        // Simpan data user ke localStorage (BELUM login)
        const userData = {
          fullName,
          email,
          grade,
          hasSubscription: false,  // 👈 Belum berlangganan
          subscription: null,       // 👈 Belum ada paket
          myCourses: []
        };
        
        localStorage.setItem('learnify_user', JSON.stringify(userData));
        // 👇 JANGAN set isLoggedIn = true di sini
        
        setIsLoading(false);
        
        // 👇 Arahkan ke halaman LOGIN (bukan dashboard)
        navigate('/login', { 
          state: { 
            message: 'Pendaftaran berhasil! Silakan login dengan akun Anda.',
            email: email 
          } 
        });
      }, 1000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left side - Image/Branding */}
      <div style={{ flex: 1, background: 'var(--gradient-hero)', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden' }} className="login-banner">
        <div style={{ position: 'absolute', top: '10%', right: '-20%', width: '500px', height: '500px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '40px', textDecoration: 'none' }}>
            <BookOpen size={36} strokeWidth={2.5} />
            <span>learnify</span>
          </Link>
          <h1 style={{ fontSize: '40px', marginBottom: '16px', lineHeight: 1.2 }}>Langkah Awal<br/>Menuju PTN Impian</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '400px' }}>Daftar sekarang dan dapatkan akses ke ribuan video belajar animasi serta latihan soal HOTS.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div style={{ flex: 1, background: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-dark)' }}>Daftar Akun Baru</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '32px', fontSize: '15px' }}>Lengkapi data di bawah ini untuk memulai belajarmu.</p>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Nama Lengkap</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama sesuai ijazah"
                style={{ width: '100%', padding: '14px 20px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--bg-white)', fontSize: '15px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Kelas</label>
              <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={{ width: '100%', padding: '14px 20px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--bg-white)', color: 'var(--text-dark)', fontFamily: 'inherit', fontSize: '15px', outline: 'none', cursor: 'pointer' }}
              >
                <option>SMA Kelas 12 / Alumni</option>
                <option>SMA Kelas 11</option>
                <option>SMA Kelas 10</option>
                <option>SMP Kelas 9</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Nomor HP atau Email</label>
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Kata Sandi</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Buat kata sandi minimal 8 karakter"
                style={{ width: '100%', padding: '14px 20px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--bg-white)', fontSize: '15px' }}
                minLength={8}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '14px', width: '100%', marginTop: '8px', fontSize: '16px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-gray)', fontSize: '15px' }}>
            Sudah punya akun? <Link to="/login" style={{ color: 'var(--rg-blue-light)', fontWeight: 700, textDecoration: 'none' }}>Masuk di sini</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-banner { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;