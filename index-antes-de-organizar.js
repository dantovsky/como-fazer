const express = require('express')
const app = express()   // cria instancia de uma nova app
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs') // tipo de linguagem para criar HTML de forma mais fácil (outros: pug, jade)
app.use(bodyParser.urlencoded())

// podemos pegar a porta de uma var de ambiente => a vantagem é que provedor pode pegar isso dinamicamente
const port = process.env.PORT || 3000

app.get('/', async (request, response) => {
    const content = await axios.get('https://como-fazer-devmarinho.firebaseio.com/teste.json')
    console.log(content.data)
    response.render('index', { i: content.data }) // irá procurar um arquivo chamado index.ejs dentro da pasta views, e passa o param i
})

// ---------------------------------------------------------
// Ir para a page para add nova categoria
// ---------------------------------------------------------
app.get('/categorias/nova', (req, res) => {
    res.render('categorias/nova')
})

// ---------------------------------------------------------
// add nova categoria
// ---------------------------------------------------------
app.post('/categorias/nova', async (req, res) => {
    await axios.post('https://como-fazer-devmarinho.firebaseio.com/categorias.json', {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
})

// ---------------------------------------------------------
// exibir todas as categoras
// ---------------------------------------------------------
app.get('/categorias', async (req, res) => {
    const content = await axios.get('https://como-fazer-devmarinho.firebaseio.com/categorias.json')
    if (content.data) {
        const categorias = Object
            .keys(content.data)
            .map(key => {
                return {
                    id: key,
                    ...content.data[key] // ... spread operator (pega tudo que tem no content.data[key] e converte num objeto)
                }
            })
        res.render('categorias/index', { categorias: categorias })
    } else {
        res.render('categorias/index', { categorias: [] })
     }

})
app.get('/categorias/excluir/:id', async (req, res) => {
    await axios.delete(`https://como-fazer-devmarinho.firebaseio.com/categorias/${req.params.id}.json`)
    res.redirect('/categorias')
})

// ---------------------------------------------------------
// Ir para a page para editar categoria
// ---------------------------------------------------------
app.get('/categorias/editar/:id', async(req, res) => {
    const content = await axios.get(`https://como-fazer-devmarinho.firebaseio.com/categorias/${req.params.id}.json`)
    // faz o render e envia dados para usar na pagina de destino
    // "..." espalha os valores deste conteúro
    res.render('categorias/editar', {
        categoria: {
            id: req.params.id,
            ...content.data
        }
    })
})

// ---------------------------------------------------------
// editar categoria
// ---------------------------------------------------------
app.post('/categorias/editar/:id', async (req, res) => {
    await axios.put(`https://como-fazer-devmarinho.firebaseio.com/categorias/${req.params.id}.json`, {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
})

app.listen(port, (err) => {
    if (err) {
        console.log('errrror')
    } else {
        console.log('Como-fazer Server is running on port ', port)
    }
})