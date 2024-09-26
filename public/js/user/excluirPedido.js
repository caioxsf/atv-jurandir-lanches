document.addEventListener('DOMContentLoaded', function() {
    
    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for(let btn of btnExcluir) {
        btn.addEventListener("click", excluir);
    }
    function excluir () {
        let id = this.dataset.id;
        let nome = this.dataset.nome;

        if(confirm(`Tem certeza que deseja excluir o pedido de: ${nome}?`)) {

            let that = this;
            if(id) {
                fetch(`/excluir/${id}`)
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    alert(body.msg);
                    if(body.ok) {
                        that.parentElement.parentElement.remove();
                    }
                })
                .catch (e => {
                    console.error(e);
                })
            }
            else {
                alert('id nao encontrado');
            }
        
        }   
    }
})