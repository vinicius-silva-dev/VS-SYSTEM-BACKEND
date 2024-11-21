<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# App

<!-- Os requisitos funcionais dizem o que o usuário pode fazer dentro da nossa aplicação -->
## RFs (Requisitos funcionais)

<!-- Usuários-->
- [x] Deve ser possível fazer o CRUD dos usuários;
- [] Deve ser possível definir que tipo de usuário está sendo cadastrado;
- [] Deve ser possível autenticar o usuário;
- [] Deve ser possível gerenciar permissões e perfis dos usuários; 

<!--Produtos -->
- [x] Deve ser possível fazer o CRUD dos produtos;
- [x] Deve ser possível definir o estoque minímo e maximo dos produtos;
- [x] Deve ser possível definir a unidade de medida dos produtos;
- [x] Deve ser possível colocar o NCM dos produtos;
- [] Deve ser possível colocar o ICMS dos produtos;
- [] Deve ser possível dar entrada no estoque;

<!-- Vendas -->
- [] No sistema de PDV deve ser possível buscar o produto de duas formas, pela descrição e pelo código;
- [] Ao escanear o código de barras, o produto deve ser inserido na lista de compra;
- [] Deve ser possível fazer o CRUD das vendas;


<!-- As regras de negócio também diz o que o usário pode fazer na nossa aplicação, mas com algumas regras, por exemplo, o usuário só pode editar os dados que ele criou. -->
## RNs (Regras de negócio)

- [] Para fazer qualquer operação no sistema o usuário precisa estar logado;

<!-- Usuarios -->
- [x] Não pode ter usuários repetidos;
- [] Somente o Usuário ADM pode gerenciar as permissões para os usuários;
- [] O usuários pode acessar os módulos na qual o perfil do mesmo tenha as permissões correspondentes ao módulo;

<!-- Vendas -->
- [] As vendas poderão ser feitas se o caixa estiver aberto;
- [] O caixa tem que ser fechado diariamente;
- [] Somente o Admin pode reabrir o caixa em dias anteriores;

<!-- Produtos -->
- [x] Ao dar entrada no estoque, se o produto não existir no sistema ou código/descrição for diferente da nota, o sistema precisa ter uma ou mais funcionalidades para fazer essa conciliação;

<!-- Estoque -->
- [x] O sistema terá dois tipos de estoque, o disponível e o area de vendas;
- [x] Qualquer entrada de produtos será direcionado ao estoque disponível;
- [] Quando a venda for finalizada e emitido a nota fiscal ou quando houver troca de mercadoria e devoluções, o estoque da area de vendas deve ser movimentado;


<!-- O requisitos não-funcionais envolve mais a parte técnica da aplicação, como , qual Banco de dados usar, quais tecnologias usar, quais métodos ou mediadas utilizar. -->
## RNFs (Requisitos não-funcionais)

- [x] A senha dos usuarios precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] O usuário deve ser identificado por um JWT (Json Web TOken);
- [x] A aplicação será desenvolvida com o Nest.js;

## Banco de dados
# Tabelas
- [] User;
- [] Participantes;
- [] Enderecos

<!-- Produtos/Estoque -->
- [] Produto;
- [] Categorias;
- [-] Estoque;
- [] Estoque_Disponível;
- [] Estoque_Area_Vendas;
- [] Movimento_Estoque;

<!-- Vendas/Financeiro -->
- [] Vendas;
- [] Caixa;
- [] Cond_Pagamento

