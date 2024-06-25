"use client"; 

import React, { useState } from 'react';

const VoejaEmail = ({ onEmailChange }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorMessage = '';

    if (!emailRegex.test(newEmail)) {
      errorMessage = 'Formato de email inválido';
    } else {
    
      const existingEmails = ['teste@exemplo.com', 'usuario@exemplo.com']; 
      if (existingEmails.includes(newEmail)) {
        errorMessage = 'Email já cadastrado';
      }
    }

    setError(errorMessage);
    onEmailChange(newEmail, errorMessage);
  };

  return (
    <div>
      <label className="block text-xs font-bold mb-1">Email</label>
      <input
        className={`w-full shadow-inner p-4 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
        type="email"
        name="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={handleEmailChange}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default VoejaEmail;
