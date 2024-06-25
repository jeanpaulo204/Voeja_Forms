"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DadosDeContato = ({ onDadosChange }) => {
  const [endereco, setEndereco] = useState({
    enderecoCompleto: '',
    cep: '',
    logradouro: '',
    numeroCasa: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    tipoResidencia: '',
  });
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  const [errors, setErrors] = useState({});

  const validateNumeroCasa = (numeroCasa) => {
    const regex = /^[0-9]+$/; 
    if (!regex.test(numeroCasa)) {
      return "Número da Casa deve ser um número positivo";
    }
    return "";
  };

  const handleEnderecoChange = async (e) => {
    const { name, value } = e.target;

  
    if (name === 'numeroCasa') {
      const errorMessage = validateNumeroCasa(value);
      setErrors({ ...errors, numeroCasa: errorMessage });
      if (errorMessage) return;
    }

    setEndereco({ ...endereco, [name]: value });

   
    if (name === 'cep') {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        const data = response.data;

    
        setEndereco((prevEndereco) => ({
          ...prevEndereco,
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
          pais: 'Brasil', 
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleInformacoesAdicionaisChange = (e) => {
    setInformacoesAdicionais(e.target.value);
  };

  useEffect(() => {
    onDadosChange({
      endereco,
      informacoesAdicionais,
    });
  }, [endereco, informacoesAdicionais]);

  return (
    <section>
      <div>
        <form>
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">CEP</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  value={endereco.cep}
                  onChange={handleEnderecoChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Logradouro</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="logradouro"
                  placeholder="Logradouro"
                  value={endereco.logradouro}
                  onChange={handleEnderecoChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Número da Casa</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="numeroCasa"
                  placeholder="Número da Casa"
                  value={endereco.numeroCasa}
                  onChange={handleEnderecoChange}
                />
                {errors.numeroCasa && (
                  <p className="text-red-500 text-xs mt-1">{errors.numeroCasa}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Complemento</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="complemento"
                  placeholder="Complemento"
                  value={endereco.complemento}
                  onChange={handleEnderecoChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Bairro</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="bairro"
                  placeholder="Bairro"
                  value={endereco.bairro}
                  onChange={handleEnderecoChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Cidade</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  value={endereco.cidade}
                  onChange={handleEnderecoChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Estado</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="estado"
                  placeholder="Estado"
                  value={endereco.estado}
                  onChange={handleEnderecoChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">País</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="pais"
                  placeholder="País"
                  value={endereco.pais}
                  onChange={handleEnderecoChange}
                />
              </div>
            </div>
          </div>

          {}

          <div className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide mb-4">Informações Adicionais</h3>
            <textarea
              className="w-full shadow-inner p-4 border border-gray-300 rounded"
              placeholder="Informações adicionais relevantes para a sua viagem."
              rows={6}
              name="informacoes_adicionais"
              value={informacoesAdicionais}
              onChange={handleInformacoesAdicionaisChange}
            ></textarea>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DadosDeContato;
