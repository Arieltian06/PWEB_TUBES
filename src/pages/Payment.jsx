import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Building, CheckCircle, Shield, Clock, Calendar } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { packageName, packagePrice, isRenewal, originalPrice, discountPercentage } = location.state || {
        packageName: 'ruangbelajar SMA',
        packagePrice: 249000,
        isRenewal: false,
        originalPrice: 249000,
        discountPercentage: 0
    };

    const [selectedPayment, setSelectedPayment] = useState('transfer');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [showSuccess]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Baca diskon langsung dari localStorage untuk memastikan sinkron
    const activeDiscount = localStorage.getItem('learnify_active_discount');
    const actualDiscountPercentage = activeDiscount ? parseInt(activeDiscount) : discountPercentage;
    const hasDiscount = actualDiscountPercentage > 0 && !isRenewal;
    
    const tax = Math.round(packagePrice * 0.11);
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

    const updateUserSubscription = () => {
        const userDataStr = localStorage.getItem('learnify_user');
        if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            
            let formattedDate;
            
            if (isRenewal && userData.subscription?.validUntil) {
                const currentValidUntil = userData.subscription.validUntil;
                const parts = currentValidUntil.split(' ');
                const day = parseInt(parts[0]);
                const monthName = parts[1];
                const year = parseInt(parts[2]);
                const month = months.indexOf(monthName);
                
                if (month !== -1) {
                    const currentDate = new Date(year, month, day);
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    
                    const newDay = currentDate.getDate();
                    const newMonth = months[currentDate.getMonth()];
                    const newYear = currentDate.getFullYear();
                    
                    formattedDate = `${newDay} ${newMonth} ${newYear}`;
                } else {
                    const today = new Date();
                    const validUntil = new Date(today.setMonth(today.getMonth() + 1));
                    formattedDate = `${validUntil.getDate()} ${months[validUntil.getMonth()]} ${validUntil.getFullYear()}`;
                }
            } else {
                const today = new Date();
                const validUntil = new Date(today.setMonth(today.getMonth() + 1));
                formattedDate = `${validUntil.getDate()} ${months[validUntil.getMonth()]} ${validUntil.getFullYear()}`;
            }
            
            userData.subscription = {
                package: packageName,
                price: packagePrice,
                originalPrice: originalPrice || packagePrice,
                discountPercentage: actualDiscountPercentage || 0,
                status: 'active',
                validUntil: formattedDate,
                purchasedAt: new Date().toISOString()
            };
            userData.hasSubscription = true;
            
            localStorage.setItem('learnify_user', JSON.stringify(userData));
            
            // Update juga di learnify_users
            const allUsers = JSON.parse(localStorage.getItem('learnify_users') || '{}');
            if (allUsers[userData.email]) {
                allUsers[userData.email] = userData;
                localStorage.setItem('learnify_users', JSON.stringify(allUsers));
            }
        }
    };

    const handlePayment = () => {
        setIsProcessing(true);
        
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        setTimeout(() => {
            setIsProcessing(false);
            updateUserSubscription();
            setShowSuccess(true);

            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        }, 2000);
    };

    const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);

    const successMessage = isRenewal 
        ? `Langganan ${packageName} Anda berhasil diperpanjang!` 
        : `Terima kasih telah berlangganan ${packageName}.`;
    
    const successSubMessage = isRenewal
        ? 'Masa berlaku langganan Anda telah ditambahkan 1 bulan.'
        : 'Anda akan diarahkan ke halaman dashboard...';

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
                                            <div style={{ color: selectedPayment === method.id ? 'white' : 'var(--rg-teal)' }}>
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
                                            {selectedPayment === method.id && <CheckCircle size={20} />}
                                        </button>

                                        {selectedPayment === 'transfer' && method.id === 'transfer' && (
                                            <div style={{ marginTop: '16px', padding: '20px', background: '#f1f5f9', borderRadius: '12px' }}>
                                                <p style={{ fontWeight: 600, marginBottom: '16px', color: 'var(--text-dark)' }}>Pilih Bank Tujuan:</p>
                                                <div style={{ display: 'grid', gap: '12px' }}>
                                                    {method.accounts.map((account, idx) => (
                                                        <div key={idx} style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                                <span style={{ fontWeight: 700 }}>{account.bank}</span>
                                                                <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 600 }}>{account.number}</span>
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: 'var(--text-gray)' }}>a.n. {account.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '16px' }}>
                                                    * Lakukan transfer tepat sesuai nominal untuk verifikasi otomatis
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '24px', padding: '24px', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
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

                            {hasDiscount && (
                                <div style={{
                                    padding: '16px',
                                    background: '#FEF3C7',
                                    borderRadius: '12px',
                                    marginBottom: '24px',
                                    border: '1px dashed #F59E0B'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, color: '#92400E' }}>🎉 Diskon {actualDiscountPercentage}%</span>
                                        <span style={{ fontWeight: 700, color: '#F59E0B' }}>
                                            Hemat {formatRupiah((originalPrice || packagePrice) - packagePrice)}
                                        </span>
                                    </div>
                                </div>
                            )}

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
                                        Masa aktif akan bertambah <strong>1 bulan</strong>
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