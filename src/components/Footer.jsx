import { Link } from 'react-router-dom';
import { BookOpen, Globe, Mail, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'white', padding: '80px 0 40px 0', marginTop: 'auto', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '60px' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '28px', fontWeight: 900, color: 'var(--rg-blue-dark)', marginBottom: '24px' }}>
              <BookOpen color="var(--rg-teal)" size={32} strokeWidth={2.5} />
              <span>learnify</span>
            </Link>
            <p style={{ color: 'var(--text-gray)', marginBottom: '24px', fontSize: '15px' }}>
              Platform Bimbingan Belajar Online & Offline Terbesar dan Terlengkap di Indonesia.
            </p>
            <div style={{ display: 'flex', gap: '16px', color: 'white' }}>
              <div style={{ background: '#3b5998', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><Globe size={20} /></div>
              <div style={{ background: '#E1306C', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><Mail size={20} /></div>
              <div style={{ background: '#1DA1F2', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><MessageCircle size={20} /></div>
              <div style={{ background: '#FF0000', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><Share2 size={20} /></div>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '18px', color: 'var(--text-dark)' }}>Tentang Kami</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-gray)', fontSize: '15px' }}>
              <li><Link to="/about">Profil Perusahaan</Link></li>
              <li><Link to="/blog">Ruangbaca (Blog)</Link></li>
              <li><Link to="/contact">Karir</Link></li>
              <li><Link to="/contact">Hubungi Kami</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '18px', color: 'var(--text-dark)' }}>Produk & Layanan</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-gray)', fontSize: '15px' }}>
              <li><Link to="/courses">Bimbel Online (UTBK)</Link></li>
              <li><Link to="/courses">Brain Academy Center</Link></li>
              <li><Link to="/courses">English Academy</Link></li>
              <li><Link to="/courses">Skill Academy</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '18px', color: 'var(--text-dark)' }}>Bantuan & Dukungan</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-gray)', fontSize: '15px' }}>
              <li><Link to="/contact">FAQ</Link></li>
              <li><Link to="/pricing">Cara Pembayaran</Link></li>
              <li><Link to="/">Syarat & Ketentuan</Link></li>
              <li><Link to="/">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-light)', fontSize: '14px' }}>
          <p>&copy; {new Date().getFullYear()} PT Learnify Indonesia. Hak Cipta Dilindungi.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Indonesia</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
