const express = require('express')
const app = express()   // cria instancia de uma nova app
const bodyParser = require('body-parser')
//const axios = require('axios')

const categorias = require('./routes/categorias')
const publicacoes = require('./routes/publicacoes')

app.set('view engine', 'ejs') // tipo de linguagem para criar HTML de forma mais fácil (outros: pug, jade)
app.use(bodyParser.urlencoded())

// podemos pegar a porta de uma var de ambiente => a vantagem é que provedor pode pegar isso dinamicamente
const port = process.env.PORT || 3000

app.get('/', async (request, response) => {
    response.render('index') // irá procurar um arquivo chamado index.ejs dentro da pasta views, e passa o param i
})

// chama um router para as categorias e coloca ja um "/categorias" antes de cada URI
app.use('/categorias', categorias)
app.use('/publicacoes', publicacoes)

app.listen(port, (err) => {
    if (err) {
        console.log('errrror')
    } else {
        console.log('Como-fazer Server is running on port ', port)
    }
})