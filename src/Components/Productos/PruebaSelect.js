import React, { useState } from 'react';

const PruebaSelect = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <h2>Selecciona una opción:</h2>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>
      <p>Valor seleccionado: {selectedValue}</p>
    </div>
  );
};

export default PruebaSelect;