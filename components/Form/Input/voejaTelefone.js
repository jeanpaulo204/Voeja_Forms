import React, { useState } from 'react';

const InputContato = ({ onPhoneChange }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); 

    if (input.length > 11) {
      input = input.substring(0, 11); 
    }

    const formattedPhone = input.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      '($1) $2-$3'
    ) || input.replace(
      /^(\d{2})(\d{4})(\d{4})$/,
      '($1) $2-$3'
    );

    setPhone(formattedPhone);

   
    if (formattedPhone.length !== 14) {
      setError('Número de telefone inválido');
    } else {
      setError('');
    }

    onPhoneChange(formattedPhone);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold uppercase tracking-wide mb-4">Contato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Telefone</label>
          <input
            className={`w-full shadow-inner p-4 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
            type="tel"
            name="telefone"
            value={phone}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default InputContato;
