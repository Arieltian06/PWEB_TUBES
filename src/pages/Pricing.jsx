import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [currentLevel, setCurrentLevel] = useState('sma');
  const navigate = useNavigate();
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    const savedDiscount = localStorage.getItem('learnify_discount');
    if (savedDiscount) {
      setDiscountPercentage(parseInt(savedDiscount));
    }
  }, []);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 👇 Fungsi untuk menghitung harga setelah diskon
  const getDiscountedPrice = (originalPrice) => {
    if (discountPercentage > 0) {
      return Math.round(originalPrice * (1 - discountPercentage / 100));
    }
    return originalPrice;
  };

  // 👇 Format harga ke Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubscribe = (planName, planPrice) => {
    // 👇 Gunakan harga setelah diskon
    const finalPrice = getDiscountedPrice(planPrice);
    
    if (isLoggedIn) {
      navigate('/payment', { 
        state: { 
          packageName: planName, 
          packagePrice: finalPrice,
          originalPrice: planPrice,
          discountPercentage: discountPercentage
        } 
      });
    } else {
      navigate('/register');
    }
  };

  const pricingData = {
    smp: [
      {
        name: 'ruangbelajar SMP',
        priceValue: 199000,
        period: '/bulan',
        desc: 'Penguatan konsep dasar',
        features: ['Video belajar lengkap', 'Bank soal ujian sekolah', 'Rangkuman materi terstruktur', 'Jadwal belajar mandiri'],
        isPopular: false,
        headerBg: 'var(--rg-teal)',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'BA Online SMP',
        priceValue: 399000,
        period: '/bulan',
        desc: 'Bimbel interaktif dengan Master Teacher',
        features: ['Semua fitur ruangbelajar', 'Live Teaching interaktif', 'Klinik PR bareng tutor eksklusif', 'Persiapan ujian OSN'],
        isPopular: true,
        headerBg: 'var(--rg-blue-dark)',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'BA Center SMP',
        priceValue: 599000,
        period: '/bulan',
        desc: 'Fasilitas tatap muka di cabang',
        features: ['Semua fitur BA Online', 'Belajar tatap muka di kelas', 'Tryout offline ujian sekolah', 'Modul cetak terpadu eksklusif'],
        isPopular: false,
        headerBg: 'var(--rg-orange)',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop'
      }
    ],
    sma: [
      {
        name: 'ruangbelajar SMA',
        priceValue: 249000,
        period: '/bulan',
        desc: 'Cocok untuk belajar materi sulit di rumah',
        features: ['Akses puluhan ribu video belajar', 'Latihan soal berjenjang (HOTS)', 'Rangkuman materi visual', 'Jadwal belajar pintar'],
        isPopular: false,
        headerBg: 'var(--rg-teal)',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'BA Online SMA',
        priceValue: 499000,
        period: '/bulan',
        desc: 'Bimbel interaktif untuk IPA/IPS/Bahasa',
        features: ['Semua fitur ruangbelajar', 'Live Teaching interaktif', 'Klinik PR bareng tutor eksklusif', 'Konseling jurusan dengan psikolog'],
        isPopular: true,
        headerBg: 'var(--rg-blue-dark)',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'BA Center SMA',
        priceValue: 699000,
        period: '/bulan',
        desc: 'Fasilitas tatap muka di cabang terdekat',
        features: ['Semua fitur BA Online', 'Belajar tatap muka di kelas', 'Tryout offline sistem SNBT', 'Modul cetak IPA/IPS eksklusif'],
        isPopular: false,
        headerBg: 'var(--rg-orange)',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop'
      }
    ],
    utbk: [
      {
        name: 'Intensif UTBK',
        priceValue: 299000,
        period: '/bulan',
        desc: 'Persiapan SNBT/Mandiri online mandiri',
        features: ['Video khusus TPS & Literasi', 'Bank soal asli UTBK tahun lalu', 'Rasionalisasi peluang lulus PTN', 'Simulasi Tryout UTBK rutin'],
        isPopular: false,
        headerBg: 'var(--rg-teal)',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'BA Online SNBT',
        priceValue: 599000,
        period: '/bulan',
        desc: 'Bimbel live fokus tembus PTN Favorit',
        features: ['Semua fitur Intensif UTBK', 'Live Teaching bahas soal HOTS', 'Klinik bahas soal tryout UTBK', 'Konsultasi prodi impian'],
        isPopular: true,
        headerBg: 'var(--rg-blue-dark)',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'
      },
      {
        name: 'Karantina PTN',
        priceValue: 899000,
        period: '/bulan',
        desc: 'Karantina tatap muka super intensif',
        features: ['Semua fitur BA Online SNBT', 'Belajar tatap muka setiap hari', 'Tryout simulasi sistem UTBK asli', 'Garansi lulus PTN (S&K Berlaku)'],
        isPopular: false,
        headerBg: 'var(--rg-orange)',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
      }
    ]
  };

  const plans = pricingData[currentLevel] || pricingData.sma;

  const levelTitles = {
    smp: 'Paket Belajar SMP',
    sma: 'Paket Belajar SMA',
    utbk: 'Paket Intensif UTBK/SNBT'
  };

  return (
    <div className="animate-fade-in">
      <div style={{ background: 'var(--gradient-hero)', padding: '60px 0', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', marginBottom: '16px', color: 'white' }}>Pilih Program Belajarmu</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
            {discountPercentage > 0 
              ? `🎉 Diskon ${discountPercentage}% aktif! Nikmati harga spesial sekarang!` 
              : 'Nikmati diskon spesial untuk langganan pertamamu.'}
          </p>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', overflowX: 'auto', paddingBottom: '8px' }} className="hide-scrollbar">
            {['SMP', 'SMA', 'UTBK'].map(tab => {
              const tabKey = tab.toLowerCase();
              const isActive = currentLevel === tabKey;
              return (
                <button 
                  key={tabKey}
                  onClick={() => setCurrentLevel(tabKey)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '100px',
                    border: 'none',
                    background: isActive ? 'white' : 'rgba(255,255,255,0.15)',
                    color: isActive ? 'var(--rg-teal)' : 'white',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  className="btn-interactive"
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container section">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '24px', color: 'var(--text-dark)' }}>{levelTitles[currentLevel]}</h2>
        <div className="grid-3" style={{ alignItems: 'flex-start' }}>
          {plans.map((plan, i) => {
            const discountedPrice = getDiscountedPrice(plan.priceValue);
            const hasDiscount = discountPercentage > 0;
            
            return (
              <div key={i} className="card" style={{ 
                position: 'relative',
                boxShadow: plan.isPopular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                transform: plan.isPopular ? 'translateY(-8px)' : 'none',
                border: plan.isPopular ? `2px solid ${plan.headerBg}` : '1px solid var(--border-color)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}>
                {plan.isPopular && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--rg-orange)', color: 'white', padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    PILIHAN FAVORIT
                  </div>
                )}
                
                <div style={{ height: '160px', position: 'relative' }}>
                  <img src={plan.image} alt={plan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 20%, ${plan.headerBg} 100%)` }}></div>
                  <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', color: 'white' }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '4px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{plan.name}</h3>
                    <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{plan.desc}</p>
                  </div>
                </div>
                
                <div style={{ padding: '32px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '32px' }}>
                    {hasDiscount ? (
                      <>
                        <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-gray)', textDecoration: 'line-through', marginRight: '8px' }}>
                          {formatRupiah(plan.priceValue)}
                        </span>
                        <span style={{ fontSize: '32px', fontWeight: 900, color: '#F59E0B' }}>
                          {formatRupiah(discountedPrice)}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-dark)' }}>
                        {formatRupiah(plan.priceValue)}
                      </span>
                    )}
                    <span style={{ fontWeight: 600, color: 'var(--text-gray)', marginLeft: '4px' }}>{plan.period}</span>
                  </div>
                  
                  {hasDiscount && (
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '-16px', 
                      marginBottom: '16px',
                      background: '#FEF3C7',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      display: 'inline-block',
                      width: 'auto',
                      margin: '-16px auto 16px'
                    }}>
                      <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>
                        Hemat {formatRupiah(plan.priceValue - discountedPrice)}
                      </span>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => handleSubscribe(plan.name, plan.priceValue)}
                    className={`btn ${plan.isPopular ? "btn-primary" : "btn-outline"} btn-interactive`} 
                    style={{ width: '100%', marginBottom: '32px', padding: '14px', display: 'block', textAlign: 'center' }}
                  >
                    Langganan Sekarang
                  </button>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {plan.features.map((f, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-gray)', fontWeight: 600 }}>
                        <Check size={18} color="var(--rg-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Pricing;