
export class Produto{

    codigo: number;
    descricao: string;
    valorUnitario: number;
    desconto: number;

    constructor(codigo,descricao,valorUnitario,desconto){
        this.codigo = codigo;
        this.descricao = descricao;
        this.valorUnitario = valorUnitario;
        this.desconto = desconto;
    }
}

export interface Product{
    codigo: number;
    descricao: string;
    valorUnitario: number;
    desconto: number;
    _id?: string;

}