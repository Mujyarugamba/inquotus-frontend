import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    ruolo: 'committente'
  });
  const [message, setMessage] = useState('');
  const [view, setView] = useState('register');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://inquotus-backend-auth.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Registrazione completata!');
      } else {
        setMessage(data.error || '❌ Errore nella registrazione');
      }
    } catch (error) {
      setMessage('❌ Errore nel collegamento al backend');
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://inquotus-backend-auth.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Login riuscito! Token: ' + data.token);
      } else {
        setMessage(data.error || '❌ Credenziali errate');
      }
    } catch (error) {
      setMessage('❌ Errore nel collegamento al backend');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Inquotus</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('register')}>Registrati</button>
        <button onClick={() => setView('login')}>Accedi</button>
      </div>

      {view === 'register' ? (
        <>
          <h2>Registrazione</h2>
          <form onSubmit={handleRegister}>
            <input name="nome" placeholder="Nome" onChange={handleChange} required /><br /><br />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required /><br /><br />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br /><br />
            <select name="ruolo" onChange={handleChange} value={formData.ruolo}>
              <option value="committente">Committente</option>
              <option value="esecutore">Esecutore</option>
              <option value="tecnico">Tecnico</option>
            </select><br /><br />
            <button type="submit">Registrati</button>
          </form>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required /><br /><br />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br /><br />
            <button type="submit">Accedi</button>
          </form>
        </>
      )}
      
      <p>{message}</p>
    </div>
  );
}

export default App;
