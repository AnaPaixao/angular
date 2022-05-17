import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  public produto:Produto = new Produto;

  constructor( 
    private ProdutoService: ProdutoService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form:FormsModule){
    console.log(this.produto, form)

    this.ProdutoService.addProduct(this.produto).then(
      (res)=>{
        alert(`Produto: ${this.produto.nome}, cadastrado com sucesso!`);
        this.router.navigate(["perfilProduct", res.id])
      },
      ()=>{
        alert(`Não foi possível cadastrar o produto.`)
      }
    )

  }

}
