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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Dados</h1>
      <input
        type="text"
        placeholder="Filtrar por Nome Completo"
        className="mb-6 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {dados.length === 0 ? (
        <p className="text-gray-500 text-center">Carregando dados...</p>
      ) : (
        <div className="overflow-x-auto">
          {filteredDados.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum dado encontrado.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-gray-50">
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
                      className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDados.map((dado) => (
                  <tr key={dado.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.id}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.NomeCompleto}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.DataDeNascimento}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.Telefone}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.Email}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.CEP}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.LOGRADOURO}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.NUMERODACASA}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.COMPLEMENTO}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.BAIRRO}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.CIDADE}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.ESTADO}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">{dado.PAIS}</td>
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
