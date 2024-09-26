const express = require('express');
const PedidosController = require('../controller/PedidosController');
const router = express.Router();

let ctrl = new PedidosController();
router.get('/', ctrl.fazerPedidoView);
router.post('/', ctrl.fazerPedido);
router.get('/admin', ctrl.adminView);
router.get('/editar/:id', ctrl.editarView);
router.post('/editar', ctrl.editar);
router.get('/excluir/:id', ctrl.excluir);


module.exports = router;