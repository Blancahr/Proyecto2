import React, { useState, useEffect } from 'react';

const FormularioPresupuesto = () => {
  const [presupuesto, setPresupuesto] = useState('');
  const [moneda, setMoneda] = useState('MXN');
  const [tipoCambio, setTipoCambio] = useState(1);
  const [monedasDisponibles, setMonedasDisponibles] = useState([]);

  useEffect(() => {
    const fetchMonedas = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/MXN');
        const data = await response.json();
        const monedas = Object.keys(data.rates);
        const tiposCambio = Object.values(data.rates);
        setMonedasDisponibles(monedas);
        setTipoCambio(tiposCambio[0]);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchMonedas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Presupuesto total"
        value={presupuesto}
        onChange={(e) => setPresupuesto(e.target.value)}
      />
      <select value={moneda} onChange={(e) => setMoneda(e.target.value)}>
        {monedasDisponibles.map((moneda) => (
          <option key={moneda} value={moneda}>
            {moneda} ({tipoCambio.toFixed(2)})
          </option>
        ))}
      </select>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioPresupuesto;
