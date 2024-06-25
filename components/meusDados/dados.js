"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase/client';

const ListaDeDados = () => {
  const [dados, setDados] = useState([]);
  const [filteredDados, setFilteredDados] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchData = async () => {
    try {
      let { data, error } = await supabase
        .from("Formulario")
        .select(
          "id, NomeCompleto, DataDeNascimento, Telefone, Email, CEP, LOGRADOURO, NUMERODACASA, COMPLEMENTO, BAIRRO, CIDADE, ESTADO, PAIS, INFO"
        );

      if (error) {
        throw error;
      }

      
      setDados(data);
      setFilteredDados(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredDados(
      dados.filter(dado => 
        dado.NomeCompleto.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, dados]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Dados</h1>
      <input
        type="text"
        placeholder="Filtrar por Nome Completo"
        className="mb-4 p-2 border border-gray-300 rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {dados.length === 0 ? (
        <p className="text-gray-500">Carregando dados...</p>
      ) : (
        <div className="overflow-x-auto">
          {filteredDados.length === 0 ? (
            <p className="text-gray-500">Nenhum dado encontrado.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {[
                    "ID",
                    "Nome Completo",
                    "Data de Nascimento",
                    "Telefone",
                    "Email",
                    "CEP",
                    "Logradouro",
                    "Número da Casa",
                    "Complemento",
                    "Bairro",
                    "Cidade",
                    "Estado",
                    "País",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDados.map((dado) => (
                  <tr key={dado.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b border-gray-200">{dado.id}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.NomeCompleto}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.DataDeNascimento}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.Telefone}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.Email}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.CEP}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.LOGRADOURO}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.NUMERODACASA}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.COMPLEMENTO}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.BAIRRO}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.CIDADE}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.ESTADO}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{dado.PAIS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaDeDados;
