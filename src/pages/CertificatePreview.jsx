import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Award, BookOpen } from 'lucide-react';

const CertificatePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const [certificate, setCertificate] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('learnify_user') || '{}');
    setUserData(user);

    // Cari sertifikat berdasarkan ID
    const cert = user.certificates?.find(c => c.id === parseInt(id));
    if (cert) {
      setCertificate(cert);
    } else {
      navigate('/certificates');
    }
  }, [id, navigate]);

  const handleDownloadPDF = () => {
    if (!certificate) return;

    // Buat konten HTML untuk sertifikat
    const certificateHTML = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sertifikat - ${certificate.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .certificate {
            background: white;
            max-width: 1000px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            position: relative;
            overflow: hidden;
          }
          .certificate-border {
            margin: 20px;
            border: 3px solid #14C3A2;
            border-radius: 16px;
            padding: 40px;
            position: relative;
          }
          .certificate-border::before,
          .certificate-border::after {
            content: "★";
            position: absolute;
            color: #14C3A2;
            font-size: 24px;
          }
          .certificate-border::before {
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 0 20px;
          }
          .certificate-border::after {
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 0 20px;
          }
          .corner-decoration {
            position: absolute;
            width: 80px;
            height: 80px;
            border: 3px solid #14C3A2;
          }
          .corner-tl {
            top: -3px;
            left: -3px;
            border-right: none;
            border-bottom: none;
            border-radius: 16px 0 0 0;
          }
          .corner-tr {
            top: -3px;
            right: -3px;
            border-left: none;
            border-bottom: none;
            border-radius: 0 16px 0 0;
          }
          .corner-bl {
            bottom: -3px;
            left: -3px;
            border-right: none;
            border-top: none;
            border-radius: 0 0 0 16px;
          }
          .corner-br {
            bottom: -3px;
            right: -3px;
            border-left: none;
            border-top: none;
            border-radius: 0 0 16px 0;
          }
          .certificate-header {
            text-align: center;
            margin-bottom: 40px;
          }
          .certificate-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 28px;
            font-weight: 900;
            color: #1a1a2e;
            margin-bottom: 20px;
          }
          .certificate-title {
            font-size: 42px;
            font-weight: 900;
            color: #14C3A2;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 10px;
          }
          .certificate-subtitle {
            font-size: 16px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .certificate-body {
            text-align: center;
            margin-bottom: 40px;
          }
          .recipient-label {
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
          }
          .recipient-name {
            font-size: 48px;
            font-weight: 900;
            color: #1a1a2e;
            margin-bottom: 20px;
            font-family: 'Georgia', serif;
          }
          .certificate-text {
            font-size: 18px;
            color: #444;
            line-height: 1.8;
            max-width: 600px;
            margin: 0 auto 20px;
          }
          .course-name {
            font-size: 24px;
            font-weight: 700;
            color: #14C3A2;
            margin-bottom: 10px;
          }
          .certificate-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 60px;
          }
          .signature {
            text-align: center;
          }
          .signature-line {
            width: 260px;
            height: 1px;
            background: #14C3A2;
            margin: 10px 0 5px;
          }
          .signature-name {
            font-weight: 700;
            color: #1a1a2e;
            font-size: 13px;
          }
          .signature-title {
            font-size: 12px;
            color: #666;
          }
          .certificate-date {
            text-align: center;
          }
          .date-label {
            font-size: 12px;
            color: #666;
          }
          .date-value {
            font-weight: 600;
            color: #1a1a2e;
          }
          .certificate-badge {
            display: inline-block;
            background: linear-gradient(135deg, #14C3A2 0%, #0d9488 100%);
            color: white;
            padding: 8px 24px;
            border-radius: 100px;
            font-size: 14px;
            font-weight: 700;
            margin-top: 20px;
          }
          .watermark {
            position: absolute;
            bottom: 20px;
            right: 20px;
            opacity: 0.03;
            font-size: 120px;
            font-weight: 900;
            color: #000;
            transform: rotate(-15deg);
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="certificate-border">
            <div class="corner-decoration corner-tl"></div>
            <div class="corner-decoration corner-tr"></div>
            <div class="corner-decoration corner-bl"></div>
            <div class="corner-decoration corner-br"></div>
            
            <div class="certificate-header">
              <div class="certificate-logo">
                📚 learnify
              </div>
              <div class="certificate-title">SERTIFIKAT</div>
              <div class="certificate-subtitle">KELULUSAN</div>
            </div>
            
            <div class="certificate-body">
              <div class="recipient-label">Diberikan kepada</div>
              <div class="recipient-name">${userData?.fullName || 'Siswa Learnify'}</div>
              <div class="certificate-text">
                Atas keberhasilan menyelesaikan kursus
              </div>
              <div class="course-name">${certificate.title}</div>
              <div class="certificate-text">
                dengan nilai akhir yang memuaskan
              </div>
              <div class="certificate-badge">
                Nilai: ${certificate.score}
              </div>
            </div>
            
            <div class="certificate-footer">
              <div class="certificate-date">
                <div class="date-label">Tanggal Penerbitan</div>
                <div class="date-value">${certificate.date}</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-name">Dr. Judika Ebenezer Sianturi S.T., M.T., Ph.D.</div>
                <div class="signature-title">Direktur Akademik Learnify</div>
              </div>
            </div>
          </div>
          <div class="watermark">LEARNIFY</div>
        </div>
      </body>
      </html>
    `;

    // Buat blob dan download sebagai HTML (bisa dibuka di browser dan print to PDF)
    const blob = new Blob([certificateHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sertifikat_${certificate.title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Tampilkan pesan sukses
    alert('📜 Sertifikat berhasil diunduh! Buka file dan tekan Ctrl+P untuk menyimpan sebagai PDF.');
  };

  if (!certificate || !userData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-light)'
      }}>
        <p style={{ color: 'var(--text-gray)' }}>Memuat sertifikat...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ background: '#FAFAFA', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link 
            to="/certificates" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--text-gray)', 
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Kembali ke Sertifikat
          </Link>
          
          <button 
            onClick={handleDownloadPDF}
            className="btn btn-primary btn-interactive"
            style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={16} /> Unduh Sertifikat
          </button>
        </div>

        {/* Sertifikat Preview */}
        <div 
          ref={certificateRef}
          style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            margin: '20px',
            border: '3px solid var(--rg-teal)',
            borderRadius: '16px',
            padding: '40px',
            position: 'relative'
          }}>
            {/* Corner Decorations */}
            <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '80px', height: '80px', border: '3px solid var(--rg-teal)', borderRight: 'none', borderBottom: 'none', borderRadius: '16px 0 0 0' }}></div>
            <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '80px', height: '80px', border: '3px solid var(--rg-teal)', borderLeft: 'none', borderBottom: 'none', borderRadius: '0 16px 0 0' }}></div>
            <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '80px', height: '80px', border: '3px solid var(--rg-teal)', borderRight: 'none', borderTop: 'none', borderRadius: '0 0 0 16px' }}></div>
            <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '80px', height: '80px', border: '3px solid var(--rg-teal)', borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 16px 0' }}></div>
            
            {/* Stars di atas dan bawah border */}
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 20px', color: 'var(--rg-teal)', fontSize: '24px' }}>★</div>
            <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 20px', color: 'var(--rg-teal)', fontSize: '24px' }}>★</div>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '28px', fontWeight: 900, color: '#1a1a2e', marginBottom: '20px' }}>
                <BookOpen size={32} color="var(--rg-teal)" />
                <span>learnify</span>
              </div>
              <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'var(--rg-teal)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px' }}>
                SERTIFIKAT
              </h1>
              <p style={{ fontSize: '16px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px' }}>
                KELULUSAN
              </p>
            </div>

            {/* Body */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>Diberikan kepada</p>
              <h2 style={{ fontSize: '48px', fontWeight: 900, color: '#1a1a2e', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>
                {userData.fullName || 'Siswa Learnify'}
              </h2>
              <p style={{ fontSize: '18px', color: '#444', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 20px' }}>
                Atas keberhasilan menyelesaikan kursus
              </p>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--rg-teal)', marginBottom: '10px' }}>
                {certificate.title}
              </h3>
              <p style={{ fontSize: '18px', color: '#444', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 20px' }}>
                dengan nilai akhir yang memuaskan
              </p>
              <div style={{ 
                display: 'inline-block', 
                background: 'linear-gradient(135deg, var(--rg-teal) 0%, #0d9488 100%)', 
                color: 'white', 
                padding: '8px 24px', 
                borderRadius: '100px', 
                fontSize: '14px', 
                fontWeight: 700,
                marginTop: '20px'
              }}>
                Nilai: {certificate.score}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '60px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#666' }}>Tanggal Penerbitan</p>
                <p style={{ fontWeight: 600, color: '#1a1a2e' }}>{certificate.date}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '260px', height: '1px', background: 'var(--rg-teal)', margin: '10px 0 5px' }}></div>
                <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '13px' }}>Dr. Judika Ebenezer Sianturi S.T., M.T., Ph.D.</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Direktur Akademik Learnify</p>
              </div>
            </div>
          </div>
          
          {/* Watermark */}
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            right: '20px', 
            opacity: 0.03, 
            fontSize: '120px', 
            fontWeight: 900, 
            color: '#000', 
            transform: 'rotate(-15deg)' 
          }}>
            LEARNIFY
          </div>
        </div>

        {/* Info Print */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: '#FEF3C7', 
          borderRadius: '12px', 
          border: '1px dashed #F59E0B',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Award size={20} color="#F59E0B" />
          <span style={{ color: '#92400E', fontSize: '14px' }}>
            <strong>Tips:</strong> Setelah mengunduh, buka file dan tekan <strong>Ctrl+P</strong> (Windows) atau <strong>Cmd+P</strong> (Mac) lalu pilih "Save as PDF" untuk menyimpan sertifikat dalam format PDF.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;