import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Produto } from './produto';
import { NotaFiscal } from './nota';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  selectedValue: Produto;
  title = 'Loja de Rafael';
  authors = 'Rafael Augusto de Souza Silva 2018001576';
  nome = "";
  exibeTabela = true;
  desabilitaCompra = false;
  adicionei = true;
  nomeVazio=false;

  notaFiscal: NotaFiscal;

  displayedColumns = ['codigo', 'descricao', 'valorUnitario', 'desconto', 'quantidade']; //colunas exibidas

  produtos: Produto[] = [ ];

  ELEMENT_DATA: { produto: Produto, quantidade: number }[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  quantidade = 0;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(prods => this.produtos = prods);
  }

  atualizaTabela(event: Event) {
    if (this.selectedValue == undefined) {
      // caso nao tiver nada selecionado, não adicionará nada
    } else {
      this.quantidade++;
      this.adicionei = false;
      let flag = 0;
      if (this.ELEMENT_DATA.length > 0) {
        this.ELEMENT_DATA.forEach(element => {
          if (element.produto.codigo == this.selectedValue.codigo) {
            element.quantidade++;
            flag = 1;
          }
        })
        if (flag == 0) {
          this.ELEMENT_DATA.push({ produto: this.selectedValue, quantidade: 1 });
        }
      } else {
        this.ELEMENT_DATA.push({ produto: this.selectedValue, quantidade: 1 })
      }
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  /** Pega o custo total dos produtos da nota. */
  getTotalCost() {
    let total = 0;
    this.ELEMENT_DATA.forEach(p => {
      if (p.produto.desconto > 0) {
        total += (p.produto.valorUnitario * p.quantidade) * (1 - p.produto.desconto / 100);
        if (total < 0)
          total = 0;
      } else {
        total += (p.produto.valorUnitario * p.quantidade);
        if (total < 0)
          total = 0;
      }
    })
    return total;
  }
  confirm_msg = 'Antes confirme';
  data_submitted = '';

  emitirNota(dados) {
    this.exibeTabela = false;
    this.desabilitaCompra = true;
    let produtosNota: Produto[] = [];
    this.ELEMENT_DATA.forEach(p => {
      produtosNota.push(p.produto);
    })
    let notaFiscal = new NotaFiscal(produtosNota, this.nome, this.getTotalCost());
    this.productService.saveNota(notaFiscal).subscribe((notaFiscal: NotaFiscal)=>{
      console.log(notaFiscal);
    },
    (err)=>{
      console.log(err);
    });
    this.productService.getNotas().subscribe(nota =>console.log(nota));
   // console.log(this.notaFiscal);
  }
}


