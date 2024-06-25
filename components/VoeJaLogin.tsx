import React from 'react';

export default function Login() {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen bg-white">
      
      <div className="w-1/2 h-screen hidden lg:block relative overflow-hidden">
        <img 
          src="https://viagemeturismo.abril.com.br/wp-content/uploads/2016/12/melhoresdestinosparaestudarfora.gif?w=500&h=333&crop=1" 
          alt="fundo Image" 
          className="object-cover w-full h-full opacity-70 slow-gif" 
        />
        <img 
          src="https://www.voeja.us/VOEJA-DOURADO-NOVO-PNG-FUNDO-TRANSPARENTE.png" 
          alt="Logo imagem" 
          className="absolute inset-0 m-auto h-1/3 w-auto" 
          style={{top: '0', bottom: '0', left: '0', right: '0'}}
        />
      </div>

      <div className="lg:p-36 md:p-20 sm:p-8 p-8 w-full lg:w-1/2 rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 flex items-center justify-center">
        
          <img 
            src="https://www.voeja.us/VOEJA-DOURADO-NOVO-PNG-FUNDO-TRANSPARENTE.png" 
            alt="Voeja Us Logo" 
            className="h-12 w-auto ml-2"
          />
        </h1>
        <form action="#" method="POST">
      
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium">Usuário</label>
            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
          </div>
    
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">Senha</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
          </div>

     

          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">Esqueceu Senha?</a>
          </div>

    <a href='/Home'> 
    <div  className="text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 w-full">Entrar</div>
    </a>
        </form>
      </div>
    </div>
  );
}
