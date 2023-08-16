class CaixaDaLanchonete {

    constructor(){
        this.codigos = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];
        this.valores = [3.00, 1.50, 6.20, 6.50, 2.00, 7.25, 9.50, 7.50];
        this.possuiItemInvalido = false;
        this.possuiQuantidadeInvalida = false;
        this.possuiExtraInvalido = false;
    }
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotal = 0.00;
        
        if(itens.length == 0){
            return "Não há itens no carrinho de compra!";
        }

        if(metodoDePagamento == "dinheiro") {
            valorTotal = this.calculaValorItens(itens) - (this.calculaValorItens(itens) * .05);
        } else if(metodoDePagamento == "debito") {
            valorTotal = this.calculaValorItens(itens);
        } else if(metodoDePagamento == "credito") {
            valorTotal = this.calculaValorItens(itens) + (this.calculaValorItens(itens) * .03);
        } else{
            return "Forma de pagamento inválida!";
        }

        if(this.possuiItemInvalido){
            return "Item inválido!";
        }

        if(this.possuiQuantidadeInvalida){
            return "Quantidade inválida!";
        }

        if(this.possuiExtraInvalido){
            return "Item extra não pode ser pedido sem o principal";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.',',')}`;
    }

    calculaValorItens(itens){
        let valorTotal = 0.00;
        let temChantily = false;
        let temQueijo = false;

        for(let i = 0; i < itens.length; i++){
            let codigo = itens[i].split(",")[0];
            let quantidade = itens[i].split(",")[1];
            let codigoEncontrado = false;

            if(codigo == "chantily"){
                temChantily = true;
            }

            if(codigo == "queijo"){
                temQueijo = true;
            }

            if(quantidade == 0){
                this.possuiQuantidadeInvalida = true;
            }

            for(let j = 0; j < this.codigos.length; j++){
                if(codigo == this.codigos[j]){
                    codigoEncontrado = true;
                    valorTotal = valorTotal + (quantidade * this.valores[j]);
                }
            }

            if(!codigoEncontrado){
                this.possuiItemInvalido = true;
            }
        }

        if(temChantily){
            this.verificarItemPrincipal(itens,"cafe");
        }
        if(temQueijo){
            this.verificarItemPrincipal(itens,"sanduiche");
        }

        return valorTotal;
    }

    verificarItemPrincipal(itens, principal){
        let temPrincipal = false;

        for(let i = 0; i < itens.length; i++){
            let codigo = itens[i].split(",")[0];

            if(codigo == principal){
                temPrincipal = true;
            }
        }

        if(!temPrincipal){
            this.possuiExtraInvalido = true;
        }
    }

}

export { CaixaDaLanchonete };