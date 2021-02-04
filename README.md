# Smarkio-WatsonIBM
Teste prático para desenvolvedor

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Express](https://www.npmjs.com/package/express)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Watson](https://www.npmjs.com/package/ibm-watson)
- [EJS](https://ejs.co/)

1. Clone o repositório.

```
git clone https://github.com/GravetoGeek/Smarkio-WatsonIBM.git
```

2. Instale as dependências.

```
npm install
```

3. Crie um banco de dados.

4. Renomeie o arquivo ".env.example" para ".env" e altere as configurações.

```
# Server
NODE_PORT=8888

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=UsuarioDB
MYSQL_PASS=SenhaDB
MYSQL_DB=bancodedados

# IBM Cloud
TTS_API_KEY=key
TTS_URL=url
```

5. Acesse o terminal no diretório /Smarkio-WatsonIBM e execute o comando:

```
nodemon index.js
```


