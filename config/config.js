require("dotenv").config()
module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASS,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "define":{
      "timestamps": false,
      "freezeTableName": true
    }
  },
  "test": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASS,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "define":{
      "timestamps": false,
      "freezeTableName": true
    }
  },
  "production": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASS,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "define":{
      "timestamps": false,
      "freezeTableName": true
    }
  }
}
