import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Building, CheckCircle, Shield, Clock, Calendar } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { packageName, packagePrice, isRenewal } = location.state || {
        packageName: 'ruangbelajar SMA',
        packagePrice: 249000,
        isRenewal: false
    };

    const [selectedPayment, setSelectedPayment] = useState('transfer');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Scroll ke atas setiap kali showSuccess berubah
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [showSuccess]);

    // Scroll ke atas saat komponen pertama kali dimuat
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Format harga ke Rupiah
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Hitung total dengan pajak
    const tax = Math.round(packagePrice * 0.11); // PPN 11%
    const total = packagePrice + tax;

    const paymentMethods = [
        {
            id: 'transfer',
            name: 'Transfer Bank',
            icon: <Building size={24} />,
            description: 'BCA, Mandiri, BNI, BRI',
            accounts: [
                { bank: 'BCA', number: '1234567890', name: 'PT Learnify Indonesia' },
                { bank: 'Mandiri', number: '0987654321', name: 'PT Learnify Indonesia' },
                { bank: 'BNI', number: '5678901234', name: 'PT Learnify Indonesia' },
                { bank: 'BRI', number: '4321098765', name: 'PT Learnify Indonesia' }
            ]
        },
        {
            id: 'ewallet',
            name: 'E-Wallet',
            icon: <Wallet size={24} />,
            description: 'GoPay, OVO, DANA, ShopeePay',
            accounts: []
        },
        {
            id: 'card',
            name: 'Kartu Kredit/Debit',
            icon: <CreditCard size={24} />,
            description: 'Visa, Mastercard, JCB',
            accounts: []
        }
    ];

    // 👇 Fungsi untuk update subscription user (DIPERBAIKI untuk renewal)
    const updateUserSubscription = () => {
        const userDataStr = localStorage.getItem('learnify_user');
        if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            
            // Daftar nama bulan dalam Bahasa Indonesia
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            
            let formattedDate;
            
            // 👇 Cek apakah ini perpanjangan (renewal) atau langganan baru
            if (isRenewal && userData.subscription?.validUntil) {
                // Jika perpanjangan, tambah 1 bulan dari tanggal berlaku saat ini
                const currentValidUntil = userData.subscription.validUntil;
                
                // Parse tanggal (format: "22 Mei 2026" atau "12 Agustus 2026")
                const parts = currentValidUntil.split(' ');
                const day = parseInt(parts[0]);
                const monthName = parts[1];
                const year = parseInt(parts[2]);
                const month = months.indexOf(monthName);
                
                if (month !== -1) {
                    const currentDate = new Date(year, month, day);
                    currentDate.setMonth(currentDate.getMonth() + 1); // Tambah 1 bulan
                    
                    const newDay = currentDate.getDate();
                    const newMonth = months[currentDate.getMonth()];
                    const newYear = currentDate.getFullYear();
                    
                    formattedDate = `${newDay} ${newMonth} ${newYear}`;
                } else {
                    // Fallback jika parse gagal
                    const today = new Date();
                    const validUntil = new Date(today.setMonth(today.getMonth() + 1));
                    formattedDate = `${validUntil.getDate()} ${months[validUntil.getMonth()]} ${validUntil.getFullYear()}`;
                }
            } else {
                // Jika langganan baru, hitung 1 bulan dari sekarang
                const today = new Date();
                const validUntil = new Date(today.setMonth(today.getMonth() + 1));
                formattedDate = `${validUntil.getDate()} ${months[validUntil.getMonth()]} ${validUntil.getFullYear()}`;
            }
            
            // Update data subscription
            userData.subscription = {
                package: packageName,
                price: packagePrice,
                status: 'active',
                validUntil: formattedDate,
                purchasedAt: new Date().toISOString()
            };
            userData.hasSubscription = true;
            
            // Simpan kembali ke localStorage
            localStorage.setItem('learnify_user', JSON.stringify(userData));
        }
    };

    const handlePayment = () => {
        setIsProcessing(true);
        
        // Scroll ke atas sebelum menampilkan halaman sukses
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        // Simulasi proses pembayaran
        setTimeout(() => {
            setIsProcessing(false);
            
            // 👇 Update subscription user sebelum menampilkan sukses
            updateUserSubscription();
            
            setShowSuccess(true);

            // Redirect ke dashboard setelah 3 detik
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        }, 2000);
    };

    const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);

    // 👇 Teks sukses yang berbeda untuk langganan baru vs perpanjangan
    const successMessage = isRenewal 
        ? `Langganan ${packageName} Anda berhasil diperpanjang!` 
        : `Terima kasih telah berlangganan ${packageName}.`;
    
    const successSubMessage = isRenewal
        ? 'Masa berlaku langganan Anda telah ditambahkan 1 bulan.'
        : 'Anda akan diarahkan ke halaman dashboard...';

    // Jika halaman sukses ditampilkan
    if (showSuccess) {
        return (
            <div className="animate-fade-in" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '48px',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--rg-teal)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <CheckCircle size={48} color="white" />
                    </div>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--text-dark)' }}>
                        {isRenewal ? 'Perpanjangan Berhasil!' : 'Pembayaran Berhasil!'}
                    </h2>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '8px', fontSize: '16px' }}>
                        {successMessage}
                    </p>
                    <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>
                        {successSubMessage}
                    </p>
                    <div style={{
                        width: '100%',
                        height: '4px',
                        background: '#e0e0e0',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'var(--rg-teal)',
                            animation: 'loadingBar 3s linear'
                        }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ background: '#f8fafc', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ background: 'var(--gradient-hero)', padding: '32px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            marginBottom: '20px',
                            fontWeight: 600
                        }}
                        className="btn-interactive"
                    >
                        <ArrowLeft size={18} />
                        {isRenewal ? 'Kembali ke Profil' : 'Kembali ke Pilih Paket'}
                    </button>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'white' }}>
                        {isRenewal ? 'Perpanjang Langganan' : 'Checkout Pembayaran'}
                    </h1>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)' }}>
                        {isRenewal ? 'Perpanjang masa aktif paket belajar Anda' : 'Selesaikan pembayaran untuk mengakses semua fitur belajar'}
                    </p>
                </div>
            </div>

            <div className="container section">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
                    {/* Left Column - Payment Methods */}
                    <div>
                        <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-dark)' }}>Pilih Metode Pembayaran</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {paymentMethods.map(method => (
                                    <div key={method.id}>
                                        <button
                                            onClick={() => setSelectedPayment(method.id)}
                                            style={{
                                                width: '100%',
                                                padding: '20px',
                                                background: selectedPayment === method.id ? 'var(--rg-teal)' : 'white',
                                                border: selectedPayment === method.id ? 'none' : '1px solid var(--border-color)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                color: selectedPayment === method.id ? 'white' : 'inherit'
                                            }}
                                            className="btn-interactive"
                                        >
                                            <div style={{
                                                color: selectedPayment === method.id ? 'white' : 'var(--rg-teal)'
                                            }}>
                                                {method.icon}
                                            </div>
                                            <div style={{ textAlign: 'left', flex: 1 }}>
                                                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>
                                                    {method.name}
                                                </div>
                                                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                                                    {method.description}
                                                </div>
                                            </div>
                                            {selectedPayment === method.id && (
                                                <CheckCircle size={20} />
                                            )}
                                        </button>

                                        {/* Bank Account Details for Transfer */}
                                        {selectedPayment === 'transfer' && method.id === 'transfer' && (
                                            <div style={{
                                                marginTop: '16px',
                                                padding: '20px',
                                                background: '#f1f5f9',
                                                borderRadius: '12px'
                                            }}>
                                                <p style={{ fontWeight: 600, marginBottom: '16px', color: 'var(--text-dark)' }}>
                                                    Pilih Bank Tujuan:
                                                </p>
                                                <div style={{ display: 'grid', gap: '12px' }}>
                                                    {method.accounts.map((account, idx) => (
                                                        <div key={idx} style={{
                                                            padding: '16px',
                                                            background: 'white',
                                                            borderRadius: '8px',
                                                            border: '1px solid var(--border-color)'
                                                        }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                                <span style={{ fontWeight: 700 }}>{account.bank}</span>
                                                                <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 600 }}>
                                                                    {account.number}
                                                                </span>
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
                                                                a.n. {account.name}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '16px' }}>
                                                    * Lakukan transfer tepat sesuai nominal untuk verifikasi otomatis
                                                </p>
                                            </div>
                                        )}

                                        {/* E-Wallet Info */}
                                        {selectedPayment === 'ewallet' && method.id === 'ewallet' && (
                                            <div style={{
                                                marginTop: '16px',
                                                padding: '20px',
                                                background: '#f1f5f9',
                                                borderRadius: '12px'
                                            }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                                    {['GoPay', 'OVO', 'DANA', 'ShopeePay'].map((wallet, idx) => (
                                                        <div key={idx} style={{
                                                            padding: '16px',
                                                            background: 'white',
                                                            borderRadius: '8px',
                                                            textAlign: 'center',
                                                            border: '1px solid var(--border-color)'
                                                        }}>
                                                            <div style={{ fontWeight: 700, marginBottom: '8px' }}>{wallet}</div>
                                                            <div style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                                                                08xxxxxxx
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '16px' }}>
                                                    * Anda akan diarahkan ke halaman pembayaran e-wallet
                                                </p>
                                            </div>
                                        )}

                                        {/* Credit Card Form */}
                                        {selectedPayment === 'card' && method.id === 'card' && (
                                            <div style={{
                                                marginTop: '16px',
                                                padding: '20px',
                                                background: '#f1f5f9',
                                                borderRadius: '12px'
                                            }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                                                            Nomor Kartu
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="1234 5678 9012 3456"
                                                            style={{
                                                                width: '100%',
                                                                padding: '12px',
                                                                border: '1px solid var(--border-color)',
                                                                borderRadius: '8px',
                                                                fontSize: '14px'
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                                                                Expiry Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '12px',
                                                                    border: '1px solid var(--border-color)',
                                                                    borderRadius: '8px',
                                                                    fontSize: '14px'
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                                                                CVV
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="123"
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '12px',
                                                                    border: '1px solid var(--border-color)',
                                                                    borderRadius: '8px',
                                                                    fontSize: '14px'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Info */}
                        <div style={{
                            display: 'flex',
                            gap: '24px',
                            padding: '24px',
                            background: 'white',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Shield size={18} color="var(--rg-teal)" />
                                <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Pembayaran Aman</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Clock size={18} color="var(--rg-teal)" />
                                <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Akses Instan</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div>
                        <div className="card" style={{ padding: '32px', position: 'sticky', top: '24px' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-dark)' }}>
                                {isRenewal ? 'Ringkasan Perpanjangan' : 'Ringkasan Pesanan'}
                            </h3>

                            <div style={{
                                padding: '20px',
                                background: isRenewal 
                                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' 
                                    : 'linear-gradient(135deg, var(--rg-teal) 0%, #0d9488 100%)',
                                borderRadius: '12px',
                                marginBottom: '24px',
                                color: 'white'
                            }}>
                                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                                    {isRenewal ? 'Perpanjang Paket' : 'Paket yang dipilih'}
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{packageName}</div>
                                <div style={{ fontSize: '28px', fontWeight: 900 }}>{formatRupiah(packagePrice)}</div>
                                <div style={{ fontSize: '14px', opacity: 0.9 }}>/bulan</div>
                            </div>

                            {/* 👇 Tampilkan info perpanjangan jika renewal */}
                            {isRenewal && (
                                <div style={{
                                    padding: '16px',
                                    background: 'rgba(245, 158, 11, 0.1)',
                                    borderRadius: '12px',
                                    marginBottom: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Calendar size={20} color="#F59E0B" />
                                    <span style={{ fontSize: '14px', color: 'var(--text-dark)' }}>
                                        Masa aktif akan bertambah <strong>1 bulan</strong> dari tanggal berlaku saat ini
                                    </span>
                                </div>
                            )}

                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-gray)' }}>
                                    <span>Harga Paket</span>
                                    <span>{formatRupiah(packagePrice)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-gray)' }}>
                                    <span>PPN (11%)</span>
                                    <span>{formatRupiah(tax)}</span>
                                </div>
                                <div style={{ height: '1px', background: 'var(--border-color)', margin: '16px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px', color: 'var(--text-dark)' }}>
                                    <span>Total</span>
                                    <span style={{ color: isRenewal ? '#F59E0B' : 'var(--rg-teal)' }}>{formatRupiah(total)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="btn btn-primary btn-interactive"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    marginBottom: '16px',
                                    background: isRenewal ? '#F59E0B' : 'var(--rg-teal)'
                                }}
                            >
                                {isProcessing ? 'Memproses...' : (isRenewal ? 'Perpanjang Sekarang' : `Bayar ${formatRupiah(total)}`)}
                            </button>

                            <p style={{ fontSize: '12px', color: 'var(--text-gray)', textAlign: 'center' }}>
                                Dengan melanjutkan, Anda menyetujui <a href="/terms" style={{ color: 'var(--rg-teal)' }}>Syarat & Ketentuan</a> dan <a href="/privacy" style={{ color: 'var(--rg-teal)' }}>Kebijakan Privasi</a> kami.
                            </p>

                            {/* Features included */}
                            <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                                <div style={{ fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>Termasuk dalam paket:</div>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--text-gray)' }}>
                                        <CheckCircle size={14} color="var(--rg-teal)" />
                                        Akses penuh semua video belajar
                                    </li>
                                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--text-gray)' }}>
                                        <CheckCircle size={14} color="var(--rg-teal)" />
                                        Latihan soal & tryout
                                    </li>
                                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--text-gray)' }}>
                                        <CheckCircle size={14} color="var(--rg-teal)" />
                                        Rangkuman materi eksklusif
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Style untuk animasi loadingBar */}
            <style>{`
                @keyframes loadingBar {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default Payment;