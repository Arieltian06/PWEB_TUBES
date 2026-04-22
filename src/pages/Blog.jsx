import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';

const Blog = () => {
  const posts = [
    { 
      id: 1, 
      title: 'Tips Lolos SNBT 2025: Strategi Belajar yang Efektif', 
      date: '21 Apr 2026', 
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop', 
      tag: 'Persiapan Kuliah',
      excerpt: 'Persiapan SNBT membutuhkan strategi yang tepat. Pelajari tips dan trik dari para master teacher untuk memaksimalkan peluang lolos PTN impian.'
    },
    { 
      id: 2, 
      title: 'Jurusan Kuliah Paling Dicari di Era Digital', 
      date: '18 Apr 2026', 
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop', 
      tag: 'Karir',
      excerpt: 'Era digital membuka peluang karir baru. Simak jurusan-jurusan kuliah yang paling dibutuhkan di masa depan.'
    },
    { 
      id: 3, 
      title: 'Cara Mengatasi Rasa Malas Belajar Saat Weekend', 
      date: '15 Apr 2026', 
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop', 
      tag: 'Motivasi',
      excerpt: 'Weekend sering kali menjadi waktu yang sulit untuk tetap produktif. Temukan cara efektif mengatasi rasa malas dan tetap semangat belajar.'
    },
    { 
      id: 4, 
      title: 'Memilih Bimbel Online vs Offline, Mana Lebih Baik?', 
      date: '10 Apr 2026', 
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', 
      tag: 'Tips Edukasi',
      excerpt: 'Bingung memilih antara bimbel online atau tatap muka? Kami bandingkan kelebihan dan kekurangan keduanya untuk membantu Anda memutuskan.'
    },
    { 
      id: 5, 
      title: '5 Kebiasaan Siswa Berprestasi yang Wajib Ditiru', 
      date: '5 Apr 2026', 
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop', 
      tag: 'Motivasi',
      excerpt: 'Ingin menjadi siswa berprestasi? Terapkan 5 kebiasaan sederhana ini dalam rutinitas belajar harian Anda.'
    },
    { 
      id: 6, 
      title: 'Panduan Lengkap Memilih Jurusan Kuliah Sesuai Minat', 
      date: '1 Apr 2026', 
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop', 
      tag: 'Persiapan Kuliah',
      excerpt: 'Memilih jurusan kuliah adalah keputusan penting. Ikuti panduan lengkap ini untuk menemukan jurusan yang sesuai dengan passion Anda.'
    },
  ];

  // Fallback image jika gambar gagal dimuat
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&h=400&fit=crop';
  };

  return (
    <div className="animate-fade-in">
      {/* Header - DENGAN TEXT ALIGN CENTER */}
      <div style={{ 
        background: 'var(--gradient-hero)', 
        padding: '60px 0', 
        borderBottom: '1px solid var(--border-color)',
        textAlign: 'center'  // 👈 Tambahkan textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '32px', 
            marginBottom: '16px', 
            color: 'white',
            textAlign: 'center'  // 👈 Pastikan h1 juga center
          }}>
            Ruangbaca Learnify
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',  // 👈 Pastikan p juga center
            maxWidth: '700px',     // 👈 Batasi lebar agar tidak terlalu panjang
            margin: '0 auto'       // 👈 Center secara horizontal
          }}>
            Temukan artikel informatif seputar dunia pendidikan, tips belajar, dan persiapan kampus.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container section">
        <div className="grid-3" style={{ alignItems: 'stretch' }}>
          {posts.map(post => (
            <div 
              key={post.id} 
              className="card" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                border: '1px solid var(--border-color)', 
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                height: '100%'
              }}
            >
              {/* Image Container */}
              <div style={{ 
                width: '100%', 
                height: '220px', 
                overflow: 'hidden',
                background: '#f1f5f9',
                position: 'relative'
              }}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  onError={handleImageError}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  className="blog-image"
                />
              </div>
              
              {/* Content */}
              <div style={{ 
                padding: '24px', 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column' 
              }}>
                {/* Meta Info */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <span className="badge" style={{
                    background: 'var(--rg-teal)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Tag size={12} />
                    {post.tag}
                  </span>
                  <span style={{ 
                    color: 'var(--text-light)', 
                    fontSize: '13px', 
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>
                
                {/* Title */}
                <h3 style={{ 
                  fontSize: '20px', 
                  marginBottom: '12px', 
                  lineHeight: 1.4, 
                  color: 'var(--text-dark)' 
                }}>
                  <Link 
                    to={`/blog/${post.id}`} 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      transition: 'color 0.2s ease'
                    }}
                    className="blog-title-link"
                  >
                    {post.title}
                  </Link>
                </h3>
                
                {/* Excerpt */}
                <p style={{ 
                  color: 'var(--text-gray)', 
                  marginBottom: '24px', 
                  flex: 1, 
                  fontSize: '14px',
                  lineHeight: 1.6
                }}>
                  {post.excerpt}
                </p>
                
                {/* Read More Button */}
                <Link 
                  to={`/blog/${post.id}`} 
                  className="btn btn-outline btn-interactive" 
                  style={{ 
                    alignSelf: 'flex-start', 
                    padding: '10px 24px', 
                    fontSize: '14px',
                    fontWeight: 600,
                    borderColor: 'var(--rg-teal)',
                    color: 'var(--rg-teal)'
                  }}
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS untuk Hover Effect */}
      <style>{`
        .blog-image:hover {
          transform: scale(1.05);
        }
        
        .blog-title-link:hover {
          color: var(--rg-teal) !important;
        }
        
        .btn-outline:hover {
          background: var(--rg-teal) !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Blog;