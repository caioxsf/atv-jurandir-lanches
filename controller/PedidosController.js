const AcompanhamentoModel = require("../models/AcompanhamentoModel");
const HamburguerModel = require("../models/HamburguerModel");
const PedidosModel = require("../models/PedidosModel");
const QueijoModel = require("../models/QueijoModel");
const PaoModel = require("../models/paoModel");

class PedidosController {

    async fazerPedidoView (req,res) {
        let paoSelect = new PaoModel();
        paoSelect = await paoSelect.listarPao();

        let hambSelect = new HamburguerModel();
        hambSelect = await hambSelect.listarHamburguer();

        let queijoSelect = new QueijoModel();
        queijoSelect = await queijoSelect.listarQueijo();

        let acompSelect = new AcompanhamentoModel();
        acompSelect = await acompSelect.listarAcompanhamento();

        let listaPedido = new PedidosModel();
        listaPedido = await listaPedido.listarPedido();

        res.render('user/fazerPedido.ejs', {pao: paoSelect, hamb: hambSelect, queijo: queijoSelect, acomp: acompSelect, pedidos: listaPedido});
    }

    async fazerPedido (req,res) {
        let ok;

        if(req.body.nome) {
            let pedido = new PedidosModel();
            pedido.nome = req.body.nome;
            pedido.endereco = req.body.endereco;
            pedido.pao = req.body.pao;
            pedido.queijo = req.body.queijo;
            pedido.hamburguer = req.body.hamb;
            pedido.acompanhamento = req.body.acomp;
            
            let resultado = await pedido.cadastrarPedido();

            if(resultado) {
                res.send({ok: true, msg: 'Pedido realizado com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao realizar o pedido'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    async adminView (req,res) {
        let listaPedido = new PedidosModel();
        listaPedido = await listaPedido.listarPedido();

        res.render('user/admin.ejs', {pedidos: listaPedido});
    }

    async editarView (req,res) {

        let id = req.params.id;
        let pedidoModel = new PedidosModel();
        pedidoModel = await pedidoModel.obter(id);

        let paoSelect = new PaoModel();
        paoSelect = await paoSelect.listarPao();

        let hambSelect = new HamburguerModel();
        hambSelect = await hambSelect.listarHamburguer();

        let queijoSelect = new QueijoModel();
        queijoSelect = await queijoSelect.listarQueijo();

        let acompSelect = new AcompanhamentoModel();
        acompSelect = await acompSelect.listarAcompanhamento();

        let listaPedido = new PedidosModel();
        listaPedido = await listaPedido.listarPedido();

        res.render('user/fazerPedido.ejs', {pao: paoSelect, hamb: hambSelect, queijo: queijoSelect, acomp: acompSelect, pedidos: listaPedido, pedidoAlteracao: pedidoModel});
    }

    async editar (req,res) {
        let ok;
        if(req.body.nome) {

            let pedido = new PedidosModel();
            pedido.id = req.body.id;
            pedido.nome = req.body.nome;
            pedido.endereco = req.body.endereco;
            pedido.pao = req.body.pao;
            pedido.hamburguer = req.body.hamb;
            pedido.queijo = req.body.queijo;
            pedido.acompanhamento = req.body.acomp;

            let resultado = await pedido.atualizar();
            if(resultado) {
                res.send({ok: true, msg: 'Atualização realizada com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizar o pedido!'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    async excluir (req,res) {
        let id = req.params.id;
        let pedido = new PedidosModel();
        let resultado = await pedido.excluir(id);
        let msg = '';
        if(resultado)
            msg = 'Usuário excluído com sucesso!';
        else 
            msg = 'Erro ao excluir usuário';

        res.send({ok: resultado, msg: msg});
    }
}

module.exports = PedidosController;
