import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://inquotus-backend-auth.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Login riuscito!');
        localStorage.setItem('token', data.token);

        // ➕ Decodifica il token per recuperare i dati utente (ruolo, ecc.)
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        setUserInfo(payload);
      } else {
        setMessage(data.error || 'Errore durante il login');
      }
    } catch (error) {
      setMessage('Errore nel collegamento al backend');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {!userInfo ? (
        <>
          <h1>Login Inquotus</h1>
          <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required /><br /><br />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br /><br />
            <button type="submit">Accedi</button>
          </form>
          <p>{message}</p>
        </>
      ) : (
        <>
          <h1>Benvenuto, {userInfo.id}</h1>
          <p>Email: {formData.email}</p>
          <p>Ruolo: {userInfo.ruolo}</p>
        </>
      )}
    </div>
  );
}

export default App;

