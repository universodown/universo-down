# universo-down
Projeto Universo Down - SENAC/SC

## Pré-requisitos
- **NodeJS** (14.18.0)
- **npm**
- **Xampp** (to test local)

# Inicilizando o ambiente
```bash
npm install
npm run build
npm start
```

# Scripts - configurados no arquivo package.json
- `build`: Compila o código TypeScript do `src/` para o diretório `build/`
- `start`: Inicializa o servidor

# Exemplo execução com CURL

* Buscar todos os Usuários:
`curl --request GET http://localhost:3000/users`

* Buscar Usuário pelo ID
`curl --request GET http://localhost:3000/users/1`

* Inserir novo Usuário
`curl --request POST http://localhost:3000/users -H "Content-Type: application/json" --data "{ \"firstName\": \"Jackson\", \"lastName\": \"Machado\", \"email\": \"jackson@machado\", \"plainPassword\": \"123456\" }"`

* Alterar Usuário
`curl --request PUT http://localhost:3000/users/1 -H "Content-Type: application/json" --data "{ \"firstName\": \"Jackson\", \"lastName\": \"Machado\", \"email\": \"jackson@machado.com\", \"id\": 1 }"`

* Remover Usuário
`curl --request DELETE http://localhost:3000/users/1`