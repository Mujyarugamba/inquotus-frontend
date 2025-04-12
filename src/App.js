import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [utente, setUtente] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('Accesso in corso...');
    try {
      const res = await fetch('https://inquotus-backend-auth.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        const token = data.token;
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica il JWT
        const userId = payload.id;

        // Recupera dati utente
        const userRes = await fetch(`https://inquotus-backend-auth.onrender.com/api/user/${userId}`);
        const userData = await userRes.json();

        setUtente(userData);
        setMessage('Login riuscito!');
      } else {
        setMessage(data.error || 'Errore nel login');
      }
    } catch (err) {
      console.error(err);
      setMessage('Errore di rete');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Login Inquotus</h1>
      {!utente ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              required
            /><br /><br />
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              required
            /><br /><br />
            <button type="submit">Accedi</button>
          </form>
          <p>{message}</p>
        </>
      ) : (
        <div>
          <h2>Benvenuto, {utente.nome}!</h2>
          <p>Email: {utente.email}</p>
          <p>Ruolo: {utente.ruolo}</p>
        </div>
      )}
    </div>
  );
}

export default App;
