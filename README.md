
<h1 align="center">
  Shop List
</h1>

Shop List é um projeto desenvolvido para simplificar o gerenciamento das compras de supermercado, permitindo a visualização em tempo real dos preços dos produtos e do valor total da compra, evitando surpresas ao finalizar no caixa e eliminando a necessidade de anotações em papel. Além disso, oferece a funcionalidade de registrar a validade dos produtos e monitorar aqueles que estão próximos do vencimento, possibilitando um aproveitamento mais eficiente.


![Rocket Redis](https://ik.imagekit.io/lt1yvcbdq/layout.png?updatedAt=1729891127679)


## Instalar e rodar o projeto

Rodar o ShopList em sua máquina local é uma tarefa extremamente simples.

### Dependências globais

Você precisa ter uma principais dependências instaladas:

- Node.js LTS v20 (ou qualquer versão superior)

### Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`CLERK_SECRET_KEY`
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in`
`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up`
`NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/app`

`NEXT_PUBLIC_APP_URL="http://localhost:3000"`

`DATABASE_URL`
`DIRECT_URL`

### Dependências locais

Com o repositório clonado e as dependências globais instaladas, você pode instalar as dependências locais do projeto:

```bash
yarn install
```

### Rodar o projeto

Para rodar o projeto localmente, basta executar o comando abaixo:

```bash
yarn dev
```

Isto irá automaticamente rodar serviços como Banco de dados (incluindo as Migrations)

```bash
http://localhost:3000/
```

### Rodar os testes

Há várias formas de rodar os testes dependendo do que você deseja fazer, mas o primeiro passo antes de fazer qualquer alteração no projeto é rodar os testes de forma geral para se certificar que tudo está passando como esperado. O comando abaixo irá rodar todos os serviços necessários, rodar os testes e em seguida derrubar todos os serviços.

```bash
npx cypress run test
```
### Stack utilizada
**Front-end:** Next, TailwindCSS, React-hook-form, shadcnUI, zod

**Back-end** Next server actions,

**Teste** Cypress