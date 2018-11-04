const api = require('../api')

// ir para a page de nova cat
const novaForm = (req, res) => {
    res.render('categorias/nova')
}
// add nova cat
const nova = async (req, res) => {
    await api.create('categorias', {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
}
// listar cats
const list = async (req, res) => {
    const categorias = await api.list('categorias')
    res.render('categorias/index', { categorias })
}
// excluir cat
const excluir = async (req, res) => {
    await api.apagar('categorias', req.params.id)
    await api.apagar('publicacoes', req.params.id)
    // axios.delete(`https://como-fazer-devmarinho.firebaseio.com/categorias/${req.params.id}.json`)
    res.redirect('/categorias')
}
const editarForm = async(req, res) => {
    const categoria = await api.get('categorias', req.params.id)
    // faz o render e envia dados para usar na pagina de destino
    // "..." espalha os valores deste conteúro
    res.render('categorias/editar', {
        categoria
    })
}
const editar = async (req, res) => {
    await api.update('categorias', req.params.id, {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
}

module.exports = {
    novaForm, nova, list, excluir, editarForm, editar
}