import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-perfil',
  templateUrl: './produto-perfil.component.html',
  styleUrls: ['./produto-perfil.component.css']
})
export class ProdutoPerfilComponent implements OnInit {

  private id: string = "";
  public produto: Produto = new Produto;

  constructor(
    private activatedRouter: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get("id");

    if(this.id){
      this.produtoService.getProduct(this.id).subscribe(
        res => {
          this.produto = res;
        }
      )
    }
  }

}
