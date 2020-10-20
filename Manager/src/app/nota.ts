import {Produto} from './produto';
export class NotaFiscal{

    produtos: Produto[];
    cliente: string;
    valorNota: number;

    constructor(produtos,cliente,valorNota){
        this.produtos = produtos;
        this.cliente = cliente;
        this.valorNota = valorNota;
    }
}

export interface Nota{
    cliente: string;
    produtos: Produto[];
    valorNota: number;
}