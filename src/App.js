import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    ruolo: 'committente'
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://inquotus-backend-auth.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registrazione completata!');
      } else {
        setMessage(data.error || 'Errore nella registrazione');
      }
    } catch (error) {
      setMessage('Errore nel collegamento al backend');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Registrati su Inquotus</h1>
      <form onSubmit={handleSubmit}>
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
      <p>{message}</p>
    </div>
  );
}

export default App;
