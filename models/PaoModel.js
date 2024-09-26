const Database = require('../Utils/database');
const db = new Database();

class PaoModel {

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

    async listarPao () {
        let sql = `select * from tb_pao`;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new PaoModel(coluna['pao_id'],coluna['pao_descricao']));
        }
        return lista;
    }
}

module.exports = PaoModel;