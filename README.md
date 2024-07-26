# Dnit Frontend

Repositório para hospedar o código da interface de usuário do DNIT.

### Pré-requisitos

- [Node.js v18+](https://nodejs.org/en/download)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- [Docker Compose](https://docs.docker.com/compose/install/) (instale na versão
plugin como recomendado)

## Executar a aplicação nativamente

```sh
git clone https://github.com/fga-eps-mds/2024.1-Dnit-Front
cd 2024.1-Dnit-Front
```

Copie o `.env.example` em `.env`

```sh
cp .env.example .env
```

E preencha os endereços dos microsserviços apropriadamente.

Instale as dependências:

```sh
yarn
```

Inicie o servidor de desenvolvimento

```sh
yarn start
```

No seu navegador, acesse o endereço: http://localhost:3000.

Para encerrar a aplicação, use Ctrl + C.

## Executar a aplicação em container Docker

Na primeira vez que for usar, ou após instalar uma nova dependencia.
No terminal, dentro da raíz do projeto:

- Rodar o comando `yarn`
- Rodar o comando `docker compose build`
- Rodar o comando `docker compose up`
   
Nas vezes subsequentes, caso não tenha adicionado novas dependencias:
- Rodar o comando `docker compose up`

No seu navegador, acesse o endereço: http://localhost:3000.

Para encerrar a aplicação, use Ctrl + C.
