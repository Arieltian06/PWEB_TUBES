import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Book, Save, CheckCircle } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    grade: 'SMA Kelas 12'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('learnify_user') || '{}');
    setUserData(user);
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '0812-3456-7890',
      grade: user.grade || 'SMA Kelas 12'
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const updatedUser = {
        ...userData,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade
      };
      
      localStorage.setItem('learnify_user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  if (!userData) return null;

  return (
    <div className="animate-fade-in" style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
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
          <h1 style={{ fontSize: '28px', color: 'var(--text-dark)' }}>Pengaturan Akun</h1>
          <p style={{ color: 'var(--text-gray)' }}>Kelola informasi pribadi dan preferensi akun Anda</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div style={{
            background: 'rgba(20, 195, 162, 0.1)',
            border: '1px solid var(--rg-teal)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <CheckCircle size={20} color="var(--rg-teal)" />
            <span style={{ color: 'var(--rg-teal)', fontWeight: 600 }}>Perubahan berhasil disimpan!</span>
          </div>
        )}

        {/* Form */}
        <div className="card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>
                  <User size={16} color="var(--rg-teal)" /> Nama Lengkap
                </label>
                <input 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '15px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>
                  <Mail size={16} color="var(--rg-teal)" /> Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '15px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>
                  <Phone size={16} color="var(--rg-teal)" /> Nomor Handphone
                </label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '15px' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>
                  <Book size={16} color="var(--rg-teal)" /> Jenjang Pendidikan
                </label>
                <select 
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '15px', background: 'white' }}
                >
                  <option>SMA Kelas 12 / Alumni</option>
                  <option>SMA Kelas 11</option>
                  <option>SMA Kelas 10</option>
                  <option>SMP Kelas 9</option>
                  <option>SMP Kelas 8</option>
                  <option>SMP Kelas 7</option>
                </select>
              </div>

              <div style={{ paddingTop: '8px' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-interactive"
                  style={{ padding: '14px 32px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  disabled={isLoading}
                >
                  <Save size={18} />
                  {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;