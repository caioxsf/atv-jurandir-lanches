const Database = require('../Utils/database');
const db = new Database();

class PedidosModel {

    #id;
    #nome;
    #endereco;
    #pao;
    #hamburguer;
    #queijo;
    #acompanhamento;

    constructor(v1, v2, v3, v4, v5, v6, v7) {
        this.#id = v1;
        this.#nome = v2;
        this.#endereco = v3;
        this.#pao = v4;
        this.#hamburguer = v5;
        this.#queijo = v6;
        this.#acompanhamento = v7;
    }

    get id() { return this.#id; }
    set id(value) { this.#id = value; }

    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }

    get endereco() { return this.#endereco; }
    set endereco(value) { this.#endereco = value; }

    get pao() { return this.#pao; }
    set pao(value) { this.#pao = value; }

    get hamburguer() { return this.#hamburguer; }
    set hamburguer(value) { this.#hamburguer = value; }

    get queijo() { return this.#queijo; }
    set queijo(value) { this.#queijo = value; }

    get acompanhamento() { return this.#acompanhamento; }
    set acompanhamento(value) { this.#acompanhamento = value; }

    async cadastrarPedido () {
        let sql = `insert into tb_pedido (ped_nome, ped_endereco, pao_id, ham_id, que_id, aco_id) values (?,?,?,?,?,?)`;
        let valores = [this.#nome, this.#endereco, this.#pao, this.#hamburguer, this.#queijo, this.#acompanhamento];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async listarPedido () {
        let sql = `select * from tb_pedido p
        inner join tb_pao pao on p.pao_id = pao.pao_id
        inner join tb_hamburguer ham on p.ham_id = ham.ham_id
        inner join tb_queijo que on p.que_id = que.que_id
        inner join tb_acompanhamento aco on p.aco_id = aco.aco_id`;

        let resultado = await db.ExecutaComando(sql);
        let listaPedido = [];
        for(let registro of resultado) {
            listaPedido.push(new PedidosModel(
                registro['ped_id'],
                registro['ped_nome'],
                registro['ped_endereco'],
                registro['pao_descricao'],
                registro['ham_descricao'],
                registro['que_descricao'],
                registro['aco_descricao']
            ));
        }
        return listaPedido;
    }

    async obter (id) {
        let sql = `select * from tb_pedido where ped_id = ?`;
        let valores = [id];

        let row = await db.ExecutaComando(sql,valores);

        if(row.length > 0) {
            return new PedidosModel(    row[0]['ped_id'],
                                        row[0]['ped_nome'],
                                        row[0]['ped_endereco'],
                                        row[0]['pao_id'],
                                        row[0]['que_id'],
                                        row[0]['ham_id'],
                                        row[0]['aco_id']
        
            )
        }
        return null;
    }

    async atualizar () {
        let sql = `update tb_pedido set ped_nome = ?,
                                        ped_endereco = ?,
                                        pao_id = ?,
                                        que_id = ?,
                                        ham_id = ?,
                                        aco_id = ?
                                        where ped_id = ?`;
        
        let valores = [this.#nome, this.#endereco, this.#pao, this.#queijo, this.#hamburguer, this.#acompanhamento, this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async excluir (id) {
        let sql = `delete from tb_pedido where ped_id = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

}

module.exports = PedidosModel;
