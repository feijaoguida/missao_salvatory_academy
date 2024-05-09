const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('hello world')
})

app.get('/oi', function(req, res){
  res.send("olá mundo")
})

app.listen(3000, function(){
  console.log("Aplicativo rodando na porta 3000")
})