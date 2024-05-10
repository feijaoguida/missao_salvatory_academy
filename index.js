const express = require('express')
const app = express()

app.use(express.json())

app.get('/', function(req, res) {
  res.send('hello world')
})

const lista = ['Java', 'kotlin', 'Android']

function validarExisteId(res, id) {
  const item = lista[id -1]

  if (!item) {
    return res.status(404).send("Item " + id + " não encontrado!")
  }
}

app.get('/personagem', function (req, res) {
  res.send(lista.filter(Boolean))
})

app.get('/personagem/:id', function (req, res) {
  const id = req.params.id

  if (validarExisteId(res, id)) return
  const item = lista[id -1]
  res.send(item)
})


app.post('/personagem', function(req, res) {
  const body = req.body

  const novoItem = body.nome

  if(!novoItem) {
    return res.status(400).send("Corpo da requisição deve conter a propriedade 'nome'.")
  }

  if(lista.includes(novoItem)) {
    return res.status(400).send("Este item já existe na lista")
  }

  lista.push(novoItem)
  res.status(201).send("Item adicionado com sucesso: " + novoItem)
})

app.put('/personagem/:id', function (req, res) {
  const id = req.params.id

  if (validarExisteId(res, id)) return

  const body = req.body
  const novoItem = body.nome
  lista[id -1] = novoItem

  res.status(200).send('Item atualizado com sucesso: ' + id + ' = ' + novoItem)
})

app.delete('/personagem/:id', function (req, res) {
  const id = req.params.id

  if (validarExisteId(res, id)) return

  delete lista[id -1]

  res.status(200).send('item Deletado com sucesso: ' + id)
})

app.listen(3000, function(){
  console.log("Aplicativo rodando na porta 3000")
})