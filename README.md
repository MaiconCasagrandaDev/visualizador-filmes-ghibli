# 🎬 Visualizador de Filmes Ghibli

Catálogo interativo dos filmes do Studio Ghibli, consumindo a [Ghibli API](https://ghibliapi.vercel.app/). Desenvolvido como projeto de estudo, aplicando conceitos de rotas, consumo de API, estados assíncronos e estilização com Tailwind CSS v4.

🔗 **[Acesse o projeto ao vivo](https://maiconcasagrandadev.github.io/visualizador-filmes-ghibli/)**

## 📸 Preview

![Preview do Visualizador de Filmes Ghibli](./public/studio-ghibli.png)

## ✨ Funcionalidades

- Listagem dos filmes do Studio Ghibli em um grid responsivo
- Página de detalhes individual para cada filme
- Loading state com skeleton animation
- Tratamento de erros de requisição
- Tema visual customizado (cores e tipografia inspiradas no universo Ghibli)
- Totalmente responsivo (mobile, tablet e desktop)

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **Vite** — build tool
- **React Router DOM** — roteamento (rotas aninhadas com `Outlet`)
- **Tailwind CSS v4** — estilização utility-first, com tema customizado via `@theme`
- **Fredoka** e **Nunito** — tipografia 
- **GitHub Pages** — deploy

## 🗂️ Estrutura do projeto

```text
src/
components/
Header/
Footer/
pages/
Layout/ # estrutura compartilhada (Header + Outlet + Footer)
Home/ # listagem dos filmes
FilmDetails/ # detalhes de um filme específico
styles/
globals.css # tema (cores, fontes)
types/
Film.ts # tipagem dos dados da API
```


## 🚀 Rodando localmente

```bash
# clonar o repositório
git clone https://github.com/MaiconCasagrandaDev/visualizador-filmes-ghibli.git

# entrar na pasta
cd visualizador-filmes-ghibli

# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run dev
```

## 📦 Deploy

O projeto é publicado no GitHub Pages via `gh-pages`:

```bash
npm run deploy
```


## 📄 Observação

Projeto para fins educacionais. Dados fornecidos pela [Studio Ghibli API](https://ghibliapi.vercel.app/).
