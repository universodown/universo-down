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
`curl --request GET http://localhost:3000/user -H "x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjMzMzIyNzExLCJleHAiOjE2MzM0MDkxMTF9.5D9K0LJM6Kv4u03tvrEPyvIg1RdQR8UVTQyXtwN8054"`

* Buscar Usuário pelo ID
`curl --request GET http://localhost:3000/user/1`

* Inserir novo Usuário
`curl --request POST http://localhost:3000/user -H "Content-Type: application/json" --data "{ \"firstName\": \"Jackson\", \"lastName\": \"Machado\", \"email\": \"jackson@machado\", \"plainPassword\": \"123456\" }"`

* Alterar Usuário
`curl --request PUT http://localhost:3000/user/1 -H "Content-Type: application/json" -H "x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzMzMjIzOTAsImV4cCI6MTYzMzQwODc5MH0.5e6i-UKDNo9uU6twBji1Gl33_yuSqedlRPL47IW3zN8" --data "{ \"firstName\": \"Jackson\", \"lastName\": \"Machado\", \"email\": \"jackson@machado.com\", \"id\": 1 }"`

* Remover Usuário
`curl --request DELETE http://localhost:3000/user/1`


* Login
`curl --request POST http://localhost:3000/login -H "Content-Type: application/json" --data "{ \"email\": \"admin@domain.com\", \"password\": \"123456\" }"`

* Logout
`curl --request POST http://localhost:3000/logout -H "x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjMzMzIyNzExLCJleHAiOjE2MzM0MDkxMTF9.5D9K0LJM6Kv4u03tvrEPyvIg1RdQR8UVTQyXtwN8054"`

* Criar Nova Organiação
`curl --request POST http://localhost:3000/organization -H "Content-Type: application/json" --data "{ \"name\": \"Organização\", \"description\": \"Teste\", \"domain\": \"domain.com\" }"`