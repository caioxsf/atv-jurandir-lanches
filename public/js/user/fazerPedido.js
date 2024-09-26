document.addEventListener('DOMContentLoaded', function() {

    
    let btnPedido = document.querySelectorAll('.btnPedido');

    for(let i=0;i<btnPedido.length;i++) {

        if(btnPedido[i].dataset.alteracao == 'true')
            btnPedido[i].addEventListener('click', editarPedido);
        else
            btnPedido[i].addEventListener('click', cadastrarPedido);
    }

    function limparValidacao () {
        document.getElementById("msgErro").innerHTML = "";
        document.getElementById('nome').style["border-color"] = "#ced4da";
        document.getElementById('endereco').style["border-color"] = "#ced4da";
        document.getElementById('pao').style["border-color"] = "#ced4da";
        document.getElementById('queijo').style["border-color"] = "#ced4da";
        document.getElementById('hamb').style["border-color"] = "#ced4da";
        document.getElementById('acomp').style["border-color"] = "#ced4da";
    }

    function validarCampos () {
        let nome = document.getElementById('nome');
        let endereco = document.getElementById('endereco');
        let pao = document.getElementById('pao');
        let hamb = document.getElementById('hamb');
        let queijo = document.getElementById('queijo');
        let acomp = document.getElementById('acomp');
        listaCampos = [];

        if(nome.value == "")
            listaCampos.push(nome);
        if(endereco.value == "")
            listaCampos.push(endereco);
        if(pao.value == 0)
            listaCampos.push(pao);
        if(hamb.value == 0)
            listaCampos.push(hamb);
        if(queijo.value == 0)
            listaCampos.push(queijo);
        if(acomp.value == 0)
            listaCampos.push(acomp);

        if(listaCampos.length == 0)
            return true;
        else {
            for(let i=0;i<listaCampos.length;i++) {
                listaCampos[i].style["border-color"] = "red";
            }

            alert("O formulário não foi preenchido corretamente, por favor, veja os campos destacados!");
            document.getElementById("msgErro").innerHTML = "O formulário não foi preenchido corretamente, por favor, veja os campos destacados!"

            return false;
        }
    }

    function editarPedido () {
        limparValidacao();
        let nome = document.getElementById('nome');
        let endereco = document.getElementById('endereco');
        let pao = document.getElementById('pao');
        let hamb = document.getElementById('hamb');
        let queijo = document.getElementById('queijo');
        let acomp = document.getElementById('acomp');
        let id = document.getElementById('id');

        if(validarCampos ()) {
            let obj = {
                nome: nome.value,
                endereco: endereco.value,
                pao: pao.value,
                hamb: hamb.value,
                queijo: queijo.value,
                acomp: acomp.value,
                id: id.value
            }

            let stringObj = JSON.stringify(obj);

            fetch ('/editar', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json' 
                },
                body: stringObj
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg)
                }
                else {
                    alert(resposta.msg);
                }
            })
            .catch (function(e) {
                console.error('ocorreu um erro no fetch' + e);
            }) 
            window.location.href = '/admin';
            location.reload();
        }
        
    }

    function cadastrarPedido () {
        limparValidacao();
        let nome = document.getElementById('nome');
        let endereco = document.getElementById('endereco');
        let pao = document.getElementById('pao');
        let hamb = document.getElementById('hamb');
        let queijo = document.getElementById('queijo');
        let acomp = document.getElementById('acomp');

        if(validarCampos ()) {
            let obj = {
                nome: nome.value,
                endereco: endereco.value,
                pao: pao.value,
                hamb: hamb.value,
                queijo: queijo.value,
                acomp: acomp.value
            }

            let stringObj = JSON.stringify(obj);

            fetch ('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringObj
                 
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg);
                }
                else {
                    alert(resposta.msg);
                }
            })
            .catch (function(e) {
                console.error('erro no fatch' + e);
            })
            location.reload();
        }
    }

});