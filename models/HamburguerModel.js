const Database = require('../Utils/database');
const db = new Database();

class HamburguerModel {

    #id
    #desc

    constructor (id,desc) {
        this.#id = id;
        this.#desc = desc;
    }

    get id () {
        return this.#id;
    }
    set id (value) {
        this.#desc = value;
    }

    get desc () {
        return this.#desc;
    }
    set desc (value) {
        this.#desc = value;
    }

    async listarHamburguer () {
        let sql = `select * from tb_hamburguer`;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new HamburguerModel(coluna['ham_id'],coluna['ham_descricao']));
        }
        return lista;
    }
}

module.exports = HamburguerModel;