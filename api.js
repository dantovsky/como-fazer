const axios = require('axios')
const baseURL = 'https://como-fazer-devmarinho.firebaseio.com/'
const auth = 'KzyOAJy1D9mRRclvKy4hdOdycaIj8xJqq939YgCl'

const list = async (key) => {
    const content = await axios.get(baseURL + key + '.json?auth=' + auth)
    if (content.data) {
        const objetos = Object
            .keys(content.data)
            .map(key => {
                return {
                    id: key,
                    ...content.data[key] // ... spread operator (pega tudo que tem no content.data[key] e converte num objeto)
                }
            })
        //res.render('categorias/index', { categorias: categorias })
        return objetos
    }
    return []
}

const apagar = async (key, id) => {
    await axios.delete(baseURL + key + "/" + id + '.json?auth=' + auth)
    return true
}

const get = async (key, id) => {
    const content = await axios.get(`${baseURL}/${key}/${id}.json?auth=` + auth)
    // faz o render e envia dados para usar na pagina de destino
    // "..." espalha os valores deste conteúro
    return {
        id: id,
        ...content.data
    }
}

const update = async (key, id, data) => {
    await axios.put(`${baseURL}/${key}/${id}.json?auth=` + auth, data)
}

const create = async (key, data) => {
    await axios.post(`${baseURL}/${key}.json?auth=` + auth, data)
}
module.exports = {
    list, apagar, get, update, create
}