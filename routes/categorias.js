const express = require('express')
const router = express.Router()
const controller = require('../controllers/categorias')

// ---------------------------------------------------------
// Ir para a page para add nova categoria
// ---------------------------------------------------------
router.get('/nova', controller.novaForm)

// ---------------------------------------------------------
// add nova categoria
// ---------------------------------------------------------
router.post('/nova', controller.nova)

// ---------------------------------------------------------
// listar categorias :: exibir todas as categoras
// ---------------------------------------------------------
router.get('/', controller.list)

// ---------------------------------------------------------
// excluir categoria
// ---------------------------------------------------------
router.get('/excluir/:id', controller.excluir)

// ---------------------------------------------------------
// Ir para a page para editar categoria
// ---------------------------------------------------------
router.get('/editar/:id', controller.editarForm)

// ---------------------------------------------------------
// editar categoria
// ---------------------------------------------------------
router.post('/editar/:id', controller.editar)
module.exports = router