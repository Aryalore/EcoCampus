import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Veriler alınamadı:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu ilanı sistemden kaldırmak istediğinize emin misiniz?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Silme işlemi başarısız oldu.");
      }
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#ffffff', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        
        {/* Header Bölümü */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ color: '#0f172a', margin: 0, fontSize: '26px', fontWeight: '800' }}>
              🌿 EcoCampus <span style={{ color: '#10b981' }}>Yönetim Paneli</span>
            </h1>
            <p style={{ color: '#64748b', marginTop: '5px', fontSize: '14px' }}>Kampüs içi ilan akışını ve bağışları buradan yönetin.</p>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.href='/'; }}
            style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', transition: '0.3s' }}
          >
            Güvenli Çıkış
          </button>
        </div>

        {/* İlan Tablosu */}
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
          <thead>
            <tr style={{ color: '#94a3b8', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '0 20px' }}>Ürün Detayı</th>
              <th style={{ padding: '0 20px' }}>Durum / Fiyat</th>
              <th style={{ padding: '0 20px', textAlign: 'right' }}>Eylem</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((product) => (
              <tr key={product.id} style={{ backgroundColor: '#fff', outline: '1px solid #e2e8f0', borderRadius: '12px' }}>
                <td style={{ padding: '20px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>{product.title}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{product.description?.substring(0, 45)}...</div>
                </td>
                <td style={{ padding: '20px' }}>
                  {parseFloat(product.price) === 0 ? (
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>🎁 BAĞIŞ</span>
                  ) : (
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{product.price} TL</span>
                  )}
                </td>
                <td style={{ padding: '20px', textAlign: 'right', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #fee2e2', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                  >
                    Kaldır
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Henüz aktif bir ilan bulunmamaktadır.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;