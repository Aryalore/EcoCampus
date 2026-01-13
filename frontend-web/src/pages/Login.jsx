import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert("Giriş Başarılı!");
      navigate('/dashboard');
    } catch (error) {
      alert("Giriş Başarısız: " + (error.response?.data?.message || "Bir hata oluştu"));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>EcoCampus - Yönetim Paneli Girişi</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '10px', padding: '8px' }} />
        <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '10px', padding: '8px' }} />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;