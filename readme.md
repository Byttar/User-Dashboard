# Teste dev mind-consulting

👋 Bem vindo ao meu projeto!

O primeiro passo para rodar o projeto é instalar o Node em seu computador

acesse o link: [https://nodejs.org/en/download/](https://nodejs.org/en/download/) e baixe a versão LTS (Long Term Service)

Você pode checar se esta tudo certo digitando o seguinte comando:

```jsx
npm -v
// >> 6.13.4
```

Caso o comando não funcione, talvez seja necessária a reinicialização do computador.

Após isso vamos instalar dependências através do NPM (Node Package Manager)

Primeiramente instalaremos o yarn, que também é um gestor de pacotes concorrente, e ele foi utilizado no desenvolvimento do projeto.

Digite o segundo comando para instalar o yarn globalmente em seu computador:

```jsx
npm install -g yarn
```

Após isso vamos instalar dependências através do Yarn 😎

Você precisará instalar o Knex.js para rodar alguns comandos no Backend:

```jsx
yarn global add knex
```

E para certificar-se que está tudo certo, digite: 

```jsx
knex --version
// >> Knex CLI version: 0.20.13
// >> Knex Local version: None
```

Agora o sistema está configurado para conseguir rodar o projeto, o primeiro passo é clonar do repositório do Github:

```jsx
git clone https://github.com/Byttar/User-Dashboard
```

Dentro do projeto existem 2 partes, na raiz está o Backend e o Frontend na pasta "frontend".

Você precisa rodar o comando `yarn` para instalar todas as dependencias dos projetos e conseguir utiliza-los. 

Para inicialização do projeto utiliza-se `yarn start` para ambos.

Antes de iniciar o servidor você precisa rodar as Migrations, que vão servir para criar as tabelas do banco de dados e tambem um Seeder para criar o usuário de Admin.

```jsx
knex migrate:latest
knex seed:run
```

Inicie os dois projetos com `yarn start` e acesse: [http://localhost:3000](http://localhost:3000).

O objeto do usuário de administrador é o seguinte:

```jsx
"user": {
    "id": 1,
    "name": "admin",
    "password": "$2b$10$VzpIW7h5OuONp51CW3y/GunFZfrULaN97xftu9dmjDOZu7F6sYVc2",
    "email": "admin@admin.com.br",
    "CPF": "71361094001",
    "access_level": 999,
    "profile_image": ""
  },

// senha = admin@123
```

Ao logar no sistema você sera enviado para a url "/profile", se quiser acessar o dashboard e admin acesse "/admin", você só pode acessar essa rota caso seu usuário tenha access_level igual á 999.