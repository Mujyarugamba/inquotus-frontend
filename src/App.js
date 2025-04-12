import React from 'react';

function App() {
  const handleClick = (ruolo) => {
    alert(`Hai selezionato: ${ruolo}`);
    // Qui puoi gestire la navigazione o il salvataggio dello stato utente
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem' }}>Esegui un lavoro in quota in sicurezza</h1>
      <p style={{ fontSize: '1.2rem' }}>Scegli chi sei per iniziare</p>
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => handleClick('committente')}
          style={buttonStyle}
        >
          Sono un Committente
        </button>
        <br /><br />
        <button
          onClick={() => handleClick('impresa')}
          style={buttonStyle}
        >
          Sono un Impresa
        </button>
        <br /><br />
        <button
          onClick={() => handleClick('professionista')}
          style={buttonStyle}
        >
          Sono un Professionista
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#0070f3',
  color: '#fff',
  cursor: 'pointer'
};

export default App;


