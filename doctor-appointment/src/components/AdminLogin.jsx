import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Refer to new styles

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });
      if (response.data.loggedIn) {
        navigate('/appointments'); // Redirect to admin dashboard
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="image-section">
          <img src="login.png" alt="Doctor appointment illustration" />
        </div>
        <div className="form-section">
          <div className="login-form">
            <div className="logo-container">
              <img src="logo.png" alt="Logo" className="logo" />
            </div>
            <h2>Welcome to Samarth Labs</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Username or Email</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {/* <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
