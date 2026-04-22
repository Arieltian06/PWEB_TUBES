import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ background: 'var(--bg-white)', padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--rg-blue-dark)' }}>Hubungi Layanan Pelanggan</h1>
          <p style={{ fontSize: '18px', color: 'var(--text-gray)' }}>Punya pertanyaan mengenai paket belajar? Kami siap membantumu!</p>
        </div>
      </div>

      <div className="container section">
        <div className="grid-2" style={{ gap: '48px', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '32px' }}>Informasi Kontak</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'rgba(0, 167, 211, 0.1)', borderRadius: '12px', color: 'var(--rg-blue-light)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Email Layanan</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '15px' }}>info@learnify.com</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'rgba(255, 122, 0, 0.1)', borderRadius: '12px', color: 'var(--rg-orange)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Call Center</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '15px' }}>021 - 1500 - 888 (Setiap Hari 08:00 - 22:00)</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'rgba(20, 195, 162, 0.1)', borderRadius: '12px', color: 'var(--rg-teal)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Kantor Pusat</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '15px' }}>Gedung Learnify Tower, Jl. Jend. Sudirman Kav 21<br/>Jakarta Pusat 10220</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>Kirim Pesan Langsung</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama" required />
                </div>
              </div>
              <div>
                <label>Alamat Email / Nomor HP</label>
                <input type="text" placeholder="contoh@email.com atau 0812..." required />
              </div>
              <div>
                <label>Pesan atau Pertanyaan</label>
                <textarea placeholder="Ceritakan kendala atau pertanyaan yang ingin ditanyakan" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '14px', marginTop: '8px', width: '100%', fontSize: '16px' }}>Kirim Pesan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
