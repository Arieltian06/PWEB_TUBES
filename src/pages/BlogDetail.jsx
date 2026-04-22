import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  
  // Data lengkap untuk setiap artikel
  const blogPosts = [
    {
      id: 1,
      title: 'Tips Lolos SNBT 2025: Strategi Belajar yang Efektif',
      tag: 'Persiapan SNBT',
      date: '21 Apr 2026',
      author: 'Tim Akademik Learnify',
      readTime: '5 Menit',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
      content: {
        intro: 'Ujian Tulis Berbasis Komputer Seleksi Nasional Berdasarkan Tes (UTBK-SNBT) 2025 sudah di depan mata. Banyak persiapan yang harus dilakukan agar bisa lolos ke Perguruan Tinggi Negeri (PTN) impian.',
        sections: [
          {
            title: '1. Kenali Format Soal Terbaru',
            content: 'Pastikan kamu tahu format soal SNBT terbaru. Fokus pada Tes Potensi Skolastik (TPS), Literasi dalam Bahasa Indonesia dan Bahasa Inggris, serta Penalaran Matematika. Jangan membuang waktu mempelajari materi yang sudah tidak diujikan.'
          },
          {
            title: '2. Ikuti Tryout Secara Rutin',
            content: 'Mengikuti simulasi ujian atau Tryout sangat penting untuk mengukur kemampuan diri sekaligus membiasakan diri dengan tekanan waktu. Platform Learnify menyediakan Tryout mingguan yang sistemnya 100% mirip dengan aslinya.'
          },
          {
            title: '3. Evaluasi dan Perbaiki Kelemahan',
            content: 'Setelah tryout, jangan hanya lihat nilainya. Analisis soal mana yang salah, pelajari pembahasannya, dan fokus perbaiki kelemahan di topik tersebut. Learnify menyediakan video pembahasan lengkap untuk setiap soal tryout.'
          },
          {
            title: '4. Jaga Kesehatan Fisik dan Mental',
            content: 'Belajar terus-menerus tanpa istirahat justru kontraproduktif. Pastikan tidur cukup 7-8 jam sehari, olahraga ringan, dan konsumsi makanan bergizi. Otak yang segar lebih mudah menyerap materi.'
          }
        ],
        quote: 'Ingat, konsistensi adalah kunci. Lebih baik belajar 2 jam setiap hari daripada belajar 14 jam dalam satu hari sebelum ujian.',
        conclusion: 'Dengan persiapan yang matang dan strategi yang tepat, peluangmu lolos SNBT 2025 akan semakin besar. Jangan lupa untuk tetap optimis dan percaya pada kemampuan diri sendiri. Semangat!'
      }
    },
    {
      id: 2,
      title: 'Jurusan Kuliah Paling Dicari di Era Digital',
      tag: 'Karir',
      date: '18 Apr 2026',
      author: 'Tim Karir Learnify',
      readTime: '4 Menit',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      content: {
        intro: 'Era digital membawa perubahan besar dalam dunia kerja. Banyak profesi baru bermunculan sementara profesi lama mulai ditinggalkan. Berikut jurusan kuliah yang paling dibutuhkan di era digital.',
        sections: [
          {
            title: '1. Data Science dan Artificial Intelligence',
            content: 'Data adalah minyak baru di era digital. Lulusan Data Science dan AI sangat dibutuhkan oleh perusahaan teknologi, perbankan, e-commerce, hingga startup. Gaji awal untuk profesi ini bisa mencapai Rp 10-15 juta per bulan.'
          },
          {
            title: '2. Cybersecurity',
            content: 'Semakin banyak data digital, semakin tinggi risiko kebocoran data. Ahli keamanan siber menjadi profesi krusial untuk melindungi sistem dan data perusahaan. Kebutuhan tenaga ahli cybersecurity diperkirakan naik 300% dalam 5 tahun ke depan.'
          },
          {
            title: '3. Digital Marketing',
            content: 'Semua bisnis kini berlomba-lomba hadir secara digital. Digital marketer yang paham SEO, social media, dan content marketing selalu dicari. Skill ini juga bisa dipelajari sambil bekerja sebagai freelancer.'
          },
          {
            title: '4. UI/UX Design',
            content: 'Pengalaman pengguna (user experience) menjadi pembeda utama produk digital. UI/UX designer bertugas membuat aplikasi dan website yang mudah digunakan sekaligus menarik secara visual.'
          }
        ],
        quote: 'Pilihlah jurusan yang sesuai dengan passion dan potensi masa depan. Jangan hanya ikut-ikutan tren semata.',
        conclusion: 'Dunia kerja terus berevolusi. Pastikan kamu memilih jurusan yang tidak hanya diminati sekarang, tapi juga relevan untuk 5-10 tahun ke depan.'
      }
    },
    {
      id: 3,
      title: 'Cara Mengatasi Rasa Malas Belajar Saat Weekend',
      tag: 'Motivasi',
      date: '15 Apr 2026',
      author: 'Tim Psikologi Learnify',
      readTime: '6 Menit',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      content: {
        intro: 'Weekend seharusnya menjadi waktu ideal untuk belajar tanpa gangguan sekolah atau kuliah. Namun, godaan untuk rebahan dan scrolling media sosial sering kali lebih kuat. Bagaimana mengatasinya?',
        sections: [
          {
            title: '1. Terapkan Teknik Pomodoro',
            content: 'Belajar 25 menit, istirahat 5 menit. Siklus ini diulang 4 kali, lalu istirahat panjang 15-30 menit. Teknik ini membuat belajar terasa lebih ringan dan tidak membosankan. Gunakan timer di HP atau aplikasi khusus Pomodoro.'
          },
          {
            title: '2. Buat Target Kecil yang Realistis',
            content: 'Alih-alih memasang target "belajar Matematika seharian", buat target spesifik seperti "menyelesaikan 10 soal integral" atau "memahami 1 bab tentang turunan". Target kecil yang tercapai akan memicu dopamin dan motivasi untuk lanjut.'
          },
          {
            title: '3. Ubah Lingkungan Belajar',
            content: 'Belajar di kamar dengan kasur di samping memang menggoda. Coba pindah ke ruang tamu, perpustakaan, atau kafe favorit. Lingkungan baru bisa meningkatkan fokus dan semangat belajar.'
          },
          {
            title: '4. Gunakan Sistem Reward',
            content: 'Beri hadiah untuk diri sendiri setelah menyelesaikan target belajar. Misalnya: "Setelah selesai 2 jam belajar, aku boleh nonton 1 episode drama Korea". Sistem reward membuat otak mengasosiasikan belajar dengan hal positif.'
          }
        ],
        quote: 'Motivasi datang dan pergi. Disiplinlah yang akan membawamu pada hasil.',
        conclusion: 'Rasa malas adalah manusiawi, tapi jangan biarkan ia menguasai harimu. Dengan strategi yang tepat, weekend bisa menjadi waktu produktif tanpa kehilangan kesempatan untuk bersantai.'
      }
    },
    {
      id: 4,
      title: 'Memilih Bimbel Online vs Offline, Mana Lebih Baik?',
      tag: 'Tips Edukasi',
      date: '10 Apr 2026',
      author: 'Tim Edukasi Learnify',
      readTime: '5 Menit',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop',
      content: {
        intro: 'Bimbingan belajar adalah investasi penting untuk pendidikan. Tapi muncul pertanyaan klasik: pilih bimbel online atau tatap muka (offline)? Mari kita bandingkan kelebihan dan kekurangan masing-masing.',
        sections: [
          {
            title: '1. Fleksibilitas Waktu dan Tempat',
            content: 'Bimbel online: Bisa diakses kapan saja dan di mana saja. Cocok untuk siswa dengan jadwal padat. Bimbel offline: Jadwal tetap di lokasi tertentu. Cocok untuk yang butuh struktur dan rutinitas.'
          },
          {
            title: '2. Interaksi dengan Tutor',
            content: 'Bimbel online: Interaksi melalui chat atau video call. Bisa rekam sesi untuk diputar ulang. Bimbel offline: Interaksi langsung tatap muka, lebih personal, dan bisa langsung tanya jawab.'
          },
          {
            title: '3. Biaya',
            content: 'Bimbel online: Umumnya lebih terjangkau karena tidak ada biaya operasional tempat. Bimbel offline: Biaya cenderung lebih tinggi untuk menutup sewa gedung dan fasilitas fisik.'
          },
          {
            title: '4. Efektivitas Belajar',
            content: 'Bimbel online: Cocok untuk siswa mandiri yang bisa mengatur waktu sendiri. Bimbel offline: Cocok untuk siswa yang butuh pengawasan langsung dan suasana belajar kompetitif.'
          }
        ],
        quote: 'Tidak ada pilihan yang mutlak lebih baik. Yang terbaik adalah yang paling sesuai dengan gaya belajar dan kebutuhanmu.',
        conclusion: 'Kabar baiknya, Learnify menyediakan keduanya! Kamu bisa memilih paket ruangbelajar (online) atau BA Center (tatap muka) sesuai preferensimu.'
      }
    },
    {
      id: 5,
      title: '5 Kebiasaan Siswa Berprestasi yang Wajib Ditiru',
      tag: 'Motivasi',
      date: '5 Apr 2026',
      author: 'Tim Akademik Learnify',
      readTime: '4 Menit',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
      content: {
        intro: 'Pernah bertanya-tanya apa rahasia siswa berprestasi? Ternyata bukan semata-mata IQ tinggi, melainkan kebiasaan sehari-hari yang konsisten. Yuk, tiru 5 kebiasaan ini!',
        sections: [
          {
            title: '1. Membuat Jadwal dan To-Do List',
            content: 'Siswa berprestasi selalu punya rencana. Mereka membuat jadwal belajar mingguan dan to-do list harian. Ini membantu mereka tetap on track dan tidak ada tugas yang terlewat.'
          },
          {
            title: '2. Belajar Aktif, Bukan Pasif',
            content: 'Mereka tidak hanya membaca dan menghafal. Mereka membuat catatan dengan kata-kata sendiri, mengajarkan materi ke teman, dan mengerjakan banyak latihan soal.'
          },
          {
            title: '3. Tidur Cukup dan Teratur',
            content: 'Ironisnya, siswa berprestasi justru tidak begadang setiap malam. Mereka paham bahwa otak butuh istirahat untuk mengkonsolidasi memori. 7-8 jam tidur adalah prioritas.'
          },
          {
            title: '4. Bertanya Tanpa Malu',
            content: 'Mereka tidak takut dianggap bodoh. Ketika ada yang tidak dipahami, mereka langsung bertanya ke guru atau mencari tahu sendiri. Rasa ingin tahu adalah bahan bakar prestasi.'
          },
          {
            title: '5. Jaga Keseimbangan Hidup',
            content: 'Siswa berprestasi tidak belajar 24/7. Mereka tetap punya waktu untuk hobi, olahraga, dan bersosialisasi. Keseimbangan ini mencegah burnout dan menjaga kesehatan mental.'
          }
        ],
        quote: 'Prestasi bukanlah hasil dari satu hari kerja keras, melainkan akumulasi kebiasaan baik setiap hari.',
        conclusion: 'Mulailah dengan mengadopsi 1-2 kebiasaan dulu, jangan langsung semua. Konsistensi lebih penting daripada intensitas.'
      }
    },
    {
      id: 6,
      title: 'Panduan Lengkap Memilih Jurusan Kuliah Sesuai Minat',
      tag: 'Persiapan Kuliah',
      date: '1 Apr 2026',
      author: 'Tim Konseling Learnify',
      readTime: '7 Menit',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
      content: {
        intro: 'Memilih jurusan kuliah adalah salah satu keputusan terpenting dalam hidup. Salah pilih bisa berakibat kuliah terasa berat atau karir tidak sesuai harapan. Berikut panduan lengkapnya.',
        sections: [
          {
            title: '1. Kenali Minat dan Bakat Diri',
            content: 'Apa mata pelajaran yang kamu sukai? Aktivitas apa yang membuatmu lupa waktu? Coba ikuti tes minat bakat atau konsultasi dengan guru BK. Jangan memilih jurusan hanya karena ikut-ikutan teman.'
          },
          {
            title: '2. Riset Prospek Karir',
            content: 'Setelah punya beberapa kandidat jurusan, riset prospek karirnya 5-10 tahun ke depan. Apakah lapangan kerjanya luas? Bagaimana kisaran gajinya? Apakah ada peluang kerja remote atau di luar negeri?'
          },
          {
            title: '3. Pelajari Kurikulum Perkuliahan',
            content: 'Buka website universitas incaran, lihat mata kuliah yang akan dipelajari. Jangan sampai kamu memilih jurusan Psikologi tapi ternyata tidak suka statistika, padahal itu mata kuliah wajib.'
          },
          {
            title: '4. Diskusi dengan Profesional di Bidangnya',
            content: 'Cari mentor atau kenalan yang sudah bekerja di bidang tersebut. Tanyakan suka duka pekerjaannya sehari-hari. Ini akan memberi gambaran nyata, bukan sekadar teori.'
          },
          {
            title: '5. Pertimbangkan Faktor Praktis',
            content: 'Selain minat, pertimbangkan juga biaya kuliah, lokasi kampus, dan akreditasi jurusan. Semua faktor ini akan mempengaruhi pengalaman kuliahmu selama 4 tahun ke depan.'
          }
        ],
        quote: 'Pekerjaan terbaik adalah ketika hobimu dibayar. Tapi ingat, setiap pekerjaan punya sisi membosankannya sendiri.',
        conclusion: 'Tidak ada jurusan yang sempurna. Yang ada adalah jurusan yang paling cocok dengan dirimu. Ambil waktu sejenak untuk refleksi, jangan terburu-buru.'
      }
    }
  ];

  // Cari artikel berdasarkan ID
  const post = blogPosts.find(p => p.id === parseInt(id));
  
  // Jika artikel tidak ditemukan, redirect ke halaman blog
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ 
        background: 'var(--bg-white)', 
        borderBottom: '1px solid var(--border-color)', 
        padding: '40px 0' 
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link 
            to="/blog" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--rg-blue-dark)', 
              marginBottom: '32px', 
              fontWeight: 700 
            }}
            className="btn-interactive"
          >
            <ArrowLeft size={18} /> Kembali ke Ruangbaca
          </Link>
          
          <span className="badge" style={{ 
            marginBottom: '16px',
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
          
          <h1 style={{ 
            fontSize: '36px', 
            marginBottom: '16px', 
            lineHeight: 1.3, 
            color: 'var(--text-dark)' 
          }}>
            {post.title}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            color: 'var(--text-light)', 
            fontSize: '14px', 
            fontWeight: 600,
            flexWrap: 'wrap'
          }}>
            <span style={{ color: 'var(--rg-teal)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} />
              {post.author}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} />
              {post.date}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} />
              Waktu baca: {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container section" style={{ maxWidth: '800px', paddingTop: '40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <img 
            src={post.image} 
            alt={post.title} 
            style={{ 
              width: '100%', 
              borderRadius: '16px', 
              boxShadow: 'var(--shadow-sm)' 
            }} 
          />
        </div>

        <div style={{ 
          color: 'var(--text-dark)', 
          fontSize: '18px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px', 
          lineHeight: 1.8 
        }}>
          {/* Intro */}
          <p style={{ color: 'var(--text-gray)' }}>
            {post.content.intro}
          </p>
          
          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <div key={index}>
              <h3 style={{ 
                fontSize: '24px', 
                marginBottom: '16px', 
                color: 'var(--rg-blue-dark)' 
              }}>
                {section.title}
              </h3>
              <p style={{ color: 'var(--text-gray)' }}>
                {section.content}
              </p>
            </div>
          ))}

          {/* Quote */}
          <div style={{ 
            padding: '24px', 
            background: 'rgba(20, 195, 162, 0.05)', 
            borderLeft: '4px solid var(--rg-teal)', 
            borderRadius: '0 12px 12px 0', 
            margin: '16px 0' 
          }}>
            <p style={{ 
              margin: 0, 
              fontStyle: 'italic', 
              color: 'var(--rg-blue-dark)', 
              fontWeight: 600, 
              fontSize: '16px' 
            }}>
              "{post.content.quote}"
            </p>
          </div>

          {/* Conclusion */}
          <p style={{ color: 'var(--text-gray)', marginTop: '16px' }}>
            {post.content.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;