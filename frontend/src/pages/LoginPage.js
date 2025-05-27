import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className='admin-login-wrapper'>
      <div className='admin-login'>
        <section>
          <h2>Admin Login</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button onClick={handleLogin}> Login </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
      </div>
    </div>
  );
}
