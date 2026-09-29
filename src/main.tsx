import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// Complemento do truque do 404.html: ao carregar o app, verifica se havia
// uma URL "perdida" salva (por causa de um F5 numa rota tipo /film/123).
// Se houver, restaura essa URL na barra de endereço antes do React Router
// montar as rotas, para que a página certa seja exibida.
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/visualizador-filmes-ghibli/'>
      <App />
    </BrowserRouter> 
  </StrictMode>,
)
