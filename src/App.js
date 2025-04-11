
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Caricamento...');

  useEffect(() => {
    fetch('https://inquotus-backend.onrender.com')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage('Errore nel collegamento al backend.'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Benvenuto su Inquotus</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
