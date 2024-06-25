"use client";
import React, { useState } from 'react';
import InputEmail from './Input/voejaEmail';
import InputContato from './Input/voejaTelefone';
import FormContato from './Input/dadosDeContato';
import { supabase } from '../../utils/supabase/client';

const FormularioViagem = () => {
  const [emailData, setEmailData] = useState({ email: '', error: '' });
  const [phone, setPhone] = useState('');
  const [dadosContato, setDadosContato] = useState({
    endereco: {
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
    },
    informacoesAdicionais: ''
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const handleEmailUpdate = (email, error) => {
    setEmailData({ email, error });
  };

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleDadosContatoChange = (dados) => {
    setDadosContato(dados);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nomeCompleto = e.target.nome.value;
    const dataNascimento = e.target.data_nascimento.value;

    setIsLoading(true); 

    try {
      const { data, error } = await supabase
        .from('Formulario')
        .insert([
          {
            NomeCompleto: nomeCompleto,
            DataDeNascimento: dataNascimento,
            Telefone: phone,
            Email: emailData.email,
            CEP: dadosContato.endereco.cep,
            LOGRADOURO: dadosContato.endereco.logradouro,
            NUMERODACASA: dadosContato.endereco.numeroCasa,
            COMPLEMENTO: dadosContato.endereco.complemento,
            BAIRRO: dadosContato.endereco.bairro,
            CIDADE: dadosContato.endereco.cidade,
            ESTADO: dadosContato.endereco.estado,
            PAIS: dadosContato.endereco.pais,
            INFO: dadosContato.informacoesAdicionais
          }
        ]);

      if (error) {
        throw error;
      }

      setShowSuccessDialog(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    } catch (error) {
      console.error('Erro ao salvar dados:', error.message);
    } finally {
      setIsLoading(false); // Desativar indicador de carregamento
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    // Limpar formulário
    e.target.reset();
    setEmailData({ email: '', error: '' });
    setPhone('');
    setDadosContato({
      endereco: {
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
      },
      informacoesAdicionais: ''
    });
  };

  return (
    <section className="min-h-screen bg-cream text-charcoal p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-wide mb-4">Formulário de Viagem Internacional</h2>
          <p className="text-sm text-gray-600">Preencha as informações abaixo para a sua viagem internacional.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide mb-4">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Nome Completo</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="text"
                  name="nome"
                  placeholder="Nome Completo"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Data de Nascimento</label>
                <input
                  className="w-full shadow-inner p-4 border border-gray-300 rounded"
                  type="date"
                  name="data_nascimento"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <InputContato onPhoneChange={handlePhoneChange} />
          </div>

          <div className="mb-8">
            <InputEmail onEmailChange={handleEmailUpdate} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold uppercase tracking-wide mb-4">Informações para Envio do Passaporte</h3>
            <FormContato onDadosChange={handleDadosContatoChange} />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>

      {showSuccessDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg font-semibold">Formulário enviado com sucesso!</p>
            <button
              onClick={handleCloseSuccessDialog}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FormularioViagem;