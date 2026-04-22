import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, ChevronDown, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPackageLevel, setUserPackageLevel] = useState(null); // 👈 State untuk level paket user
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false); // 👈 State subscription
  const dropdownRef = useRef(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      try {
        const user = JSON.parse(localStorage.getItem('learnify_user'));
        setUserName(user?.fullName || 'Siswa');
        
        // 👇 Cek subscription dan tentukan level paket
        const hasSub = user?.hasSubscription === true || user?.subscription?.status === 'active';
        setHasActiveSubscription(hasSub);
        
        if (hasSub && user?.subscription?.package) {
          const pkg = user.subscription.package.toLowerCase();
          if (pkg.includes('smp')) {
            setUserPackageLevel('smp');
          } else if (pkg.includes('sma')) {
            setUserPackageLevel('sma');
          } else if (pkg.includes('utbk') || pkg.includes('snbt')) {
            setUserPackageLevel('utbk');
          }
        } else {
          setUserPackageLevel(null);
        }
      } catch(e) {
        setUserName('Siswa');
        setHasActiveSubscription(false);
        setUserPackageLevel(null);
      }
    } else {
      setHasActiveSubscription(false);
      setUserPackageLevel(null);
    }
  }, [location.pathname]);

  // 👇 Fungsi untuk mendapatkan dropdown items berdasarkan paket user
  const getDropdownItems = () => {
    const allItems = [
      { name: 'SMP', path: '/courses?level=smp' },
      { name: 'SMA', path: '/courses?level=sma' },
      { name: 'UTBK', path: '/courses?level=utbk' }
    ];
    
    // Jika sudah berlangganan, hanya tampilkan level yang sesuai paket
    if (hasActiveSubscription && userPackageLevel) {
      const levelMap = {
        'smp': [{ name: 'SMP', path: '/courses?level=smp' }],
        'sma': [{ name: 'SMA', path: '/courses?level=sma' }],
        'utbk': [{ name: 'UTBK', path: '/courses?level=utbk' }]
      };
      return levelMap[userPackageLevel] || allItems;
    }
    
    // Jika belum berlangganan, tampilkan semua
    return allItems;
  };

  const dropdownItems = getDropdownItems();

  const navLinks = [
    { 
      name: 'Beranda', 
      path: '/'
    },
    { 
      name: 'Produk', 
      path: '/courses',
      dropdown: dropdownItems // 👇 Gunakan dropdown dinamis
    },
    { name: 'Program', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tentang', path: '/about' }
  ];

  const isTransparent = isHome && !scrolled && !mobileMenuOpen;
  
  const navStyle = {
    background: isTransparent ? 'transparent' : 'white',
    boxShadow: isTransparent ? 'none' : 'var(--shadow-sm)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.3s ease',
    borderBottom: isTransparent ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border-color)'
  };

  const textStyle = {
    color: isTransparent ? 'white' : 'var(--text-dark)',
    fontWeight: 700,
    fontSize: '15px'
  };

  const toggleDropdown = (name, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <>
      <header style={navStyle}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', position: 'relative' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', ...textStyle, fontSize: '24px', fontWeight: 900, textDecoration: 'none' }}>
            <BookOpen color={isTransparent ? "white" : "var(--rg-teal)"} size={28} strokeWidth={2.5} />
            <span>learnify</span>
          </Link>

          {/* Desktop Menu */}
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '8px', margin: 0, padding: 0, listStyle: 'none', alignItems: 'center' }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.path || 
                              (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                <li key={link.name} style={{ position: 'relative' }} ref={link.name === 'Produk' ? dropdownRef : null}>
                  {link.dropdown && link.dropdown.length > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link
                        to={link.path}
                        className={`nav-link-item ${active ? 'active-nav-item' : ''}`}
                        style={{
                          ...textStyle,
                          opacity: (!active && isTransparent) ? 0.9 : 1,
                          textDecoration: 'none',
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          paddingRight: '4px'
                        }}
                      >
                        {link.name}
                      </Link>
                      <button
                        className="dropdown-arrow"
                        onClick={(e) => toggleDropdown(link.name, e)}
                        style={{
                          ...textStyle,
                          opacity: (!active && isTransparent) ? 0.9 : 1,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px 16px 8px 4px',
                          borderRadius: '0 100px 100px 0',
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '-4px'
                        }}
                      >
                        <ChevronDown size={16} style={{
                          transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.3s ease'
                        }} />
                      </button>
                    </div>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`nav-link-item ${active ? 'active-nav-item' : ''}`}
                      style={{
                        ...textStyle,
                        opacity: (!active && isTransparent) ? 0.9 : 1,
                        textDecoration: 'none'
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                  
                  {/* Dropdown Popup */}
                  {link.dropdown && link.dropdown.length > 0 && activeDropdown === link.name && (
                    <div className="dropdown-popup" style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '16px',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-lg)',
                      minWidth: '200px',
                      padding: '8px',
                      zIndex: 101,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      animation: 'fadeInUp 0.2s ease forwards',
                      border: '1px solid var(--border-color)'
                    }}>
                      <Link 
                        to="/courses"
                        style={{
                          padding: '10px 16px',
                          color: 'var(--rg-teal)',
                          textDecoration: 'none',
                          fontWeight: 700,
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                          borderBottom: '1px solid var(--border-color)',
                          marginBottom: '4px'
                        }}
                        className="dropdown-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        📚 Semua Produk
                      </Link>
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item.name} 
                          to={item.path}
                          style={{
                            padding: '10px 16px',
                            color: 'var(--text-dark)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                          }}
                          className="dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )})}
            </ul>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {isLoggedIn ? (
                <Link to="/profile" className={`nav-link-item ${location.pathname === '/profile' ? 'active-nav-item' : ''}`} style={{ ...textStyle, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: isTransparent ? 'rgba(255,255,255,0.15)' : 'var(--bg-light)', color: isTransparent ? 'white' : 'var(--rg-teal)' }}>
                  <div style={{ background: 'var(--gradient-hero)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  {userName.split(' ')[0]}
                </Link>
              ) : (
                <>
                  <Link to="/login" className={`nav-link-item ${location.pathname === '/login' ? 'active-nav-item' : ''}`} style={{ ...textStyle, textDecoration: 'none' }}>
                    Masuk
                  </Link>
                  <Link to="/register" className={`nav-link-item ${location.pathname === '/register' ? 'active-nav-item' : ''}`} style={{ ...textStyle, textDecoration: 'none' }}>
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn btn-interactive"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isTransparent ? 'white' : 'var(--text-dark)',
              padding: '8px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu Popup */}
        {mobileMenuOpen && (
          <div className="mobile-menu-popup" style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            background: 'white',
            boxShadow: 'var(--shadow-md)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderTop: '1px solid var(--border-color)',
            animation: 'slideDown 0.3s ease forwards',
            zIndex: 99,
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto'
          }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <Link 
                  to="/" 
                  style={{
                    color: 'var(--text-dark)',
                    fontWeight: 700,
                    fontSize: '16px',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '12px 0'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Beranda
                </Link>
              </li>
              
              {/* Produk dengan dropdown - MOBILE */}
              <li>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link 
                      to="/courses"
                      style={{
                        color: 'var(--text-dark)',
                        fontWeight: 700,
                        fontSize: '16px',
                        textDecoration: 'none',
                        padding: '12px 0',
                        flex: 1
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Produk
                    </Link>
                    {dropdownItems.length > 0 && (
                      <button
                        onClick={() => toggleDropdown('Produk-mobile')}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '12px',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <ChevronDown size={20} style={{
                          transform: activeDropdown === 'Produk-mobile' ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.3s ease'
                        }} />
                      </button>
                    )}
                  </div>
                  
                  {activeDropdown === 'Produk-mobile' && dropdownItems.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '8px 0 8px 16px',
                      borderLeft: '2px solid var(--border-color)',
                      marginLeft: '8px',
                      animation: 'fadeInUp 0.2s ease forwards'
                    }}>
                      <Link 
                        to="/courses"
                        style={{
                          color: 'var(--rg-teal)',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '15px',
                          padding: '8px 0',
                          display: 'block'
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        📚 Semua Produk
                      </Link>
                      {dropdownItems.map((item) => (
                        <Link 
                          key={item.name} 
                          to={item.path}
                          style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '15px',
                            padding: '8px 0',
                            display: 'block'
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
              
              <li>
                <Link 
                  to="/pricing" 
                  style={{
                    color: 'var(--text-dark)',
                    fontWeight: 700,
                    fontSize: '16px',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '12px 0'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Program
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  style={{
                    color: 'var(--text-dark)',
                    fontWeight: 700,
                    fontSize: '16px',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '12px 0'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  style={{
                    color: 'var(--text-dark)',
                    fontWeight: 700,
                    fontSize: '16px',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '12px 0'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tentang
                </Link>
              </li>
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary btn-interactive" style={{ textAlign: 'center', padding: '12px' }} onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="btn btn-outline btn-interactive" style={{ textAlign: 'center', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setMobileMenuOpen(false)}>
                    <User size={18} /> Profil Saya
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline btn-interactive" style={{ textAlign: 'center', padding: '12px' }} onClick={() => setMobileMenuOpen(false)}>
                    Masuk
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-interactive" style={{ textAlign: 'center', padding: '12px' }} onClick={() => setMobileMenuOpen(false)}>
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
        
        <style>{`
          .active-nav-item {
            background-color: var(--rg-teal) !important;
            color: white !important;
            box-shadow: 0 4px 12px rgba(20, 195, 162, 0.3);
            font-weight: 800 !important;
          }
          .active-nav-item:hover {
            background-color: #0fa387 !important;
            color: white !important;
            box-shadow: 0 6px 16px rgba(20, 195, 162, 0.4);
            transform: translateY(-2px);
          }
          .nav-link-item {
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
            transform-origin: center;
            padding: 8px 16px !important;
            border-radius: 100px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .nav-link-item:hover {
            background-color: rgba(0,0,0,0.03);
          }
          .dropdown-arrow:hover {
            background-color: rgba(0,0,0,0.03);
          }
          .btn-interactive {
            transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.2s, box-shadow 0.2s;
          }
          .btn-interactive:active {
            transform: scale(0.92) !important;
          }
          .dropdown-item:hover {
            background-color: var(--bg-light);
            color: var(--rg-teal) !important;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
        `}</style>
      </header>
      {!isHome && <div style={{ height: '70px' }}></div>}
    </>
  );
};

export default Navbar;