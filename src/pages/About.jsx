const About = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ background: 'var(--gradient-hero)', padding: '80px 0', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', marginBottom: '16px', color: 'white' }}>Tentang Learnify</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
            Learnify adalah perusahaan teknologi terbesar di Indonesia yang berfokus pada layanan berbasis pendidikan. 
            Kami telah memiliki lebih dari 15 juta pengguna.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="grid-2" style={{ alignItems: 'center', gap: '48px', marginBottom: '80px' }}>
          <div>
            {/* 👇 Path diperbaiki: hapus "public/" */}
            <img 
              src="/images/kami.jpeg" 
              alt="Tim Learnify" 
              style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}
              onError={(e) => { 
                e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=400&fit=crop'; 
              }}
            />
          </div>
          <div>
            <h3 style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--rg-blue-dark)' }}>Visi Kami</h3>
            <p style={{ color: 'var(--text-gray)', marginBottom: '24px', fontSize: '16px', lineHeight: 1.8 }}>
              Kami berkomitmen untuk menjadi mitra belajar terbaik bagi setiap siswa di Indonesia. 
              Melalui platform Learnify, kami menyediakan materi belajar yang komprehensif, berkualitas tinggi, namun dengan harga yang terjangkau.
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '16px', lineHeight: 1.8 }}>
              Misi kami adalah mendemokratisasi akses ke pendidikan terbaik agar setiap anak di mana pun mereka berada dapat menggapai impian mereka melalui prestasi akademis yang gemilang.
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--rg-blue-dark)' }}>Dampak Kami</h2>
        </div>
        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div className="card" style={{ padding: '40px 24px' }}>
            <h2 style={{ fontSize: '48px', color: 'var(--rg-orange)', marginBottom: '8px' }}>15M+</h2>
            <p style={{ fontWeight: 700, color: 'var(--text-gray)', fontSize: '16px' }}>Pengguna Terdaftar</p>
          </div>
          <div className="card" style={{ padding: '40px 24px' }}>
            <h2 style={{ fontSize: '48px', color: 'var(--rg-teal)', marginBottom: '8px' }}>300K+</h2>
            <p style={{ fontWeight: 700, color: 'var(--text-gray)', fontSize: '16px' }}>Guru Tersertifikasi</p>
          </div>
          <div className="card" style={{ padding: '40px 24px' }}>
            <h2 style={{ fontSize: '48px', color: 'var(--rg-blue-light)', marginBottom: '8px' }}>100+</h2>
            <p style={{ fontWeight: 700, color: 'var(--text-gray)', fontSize: '16px' }}>Mata Pelajaran</p>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default About;