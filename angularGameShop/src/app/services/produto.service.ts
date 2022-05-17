import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    // private http: HttpClient,
    private firedb: AngularFirestore
  ) { }

  // private localURL = environment.apiDados;
  private colletionProduct = "produto";

  addProduct(produto: Produto) {
    //return this.http.post<Produto>(this.localURL + this.colletionProduct, produto)
    return this.firedb.collection(this.colletionProduct).add(
      {
        nome: produto.nome,
        descricao: produto.descricao,
        tamanho: produto.tamanho = "",
        quantidade: produto.quant,
        valor: produto.valor,
        ativo: produto.ativo = true,
        foto: produto.foto = "",
        galeria: produto.galeria = []
      }
    );
  }


  getProduct(id: string) {
    // return this.http.get<Produto>(this.localURL + this.colletionProduct + "/" + id)
    return this.firedb.collection(this.colletionProduct).doc<Produto>(id).valueChanges()
  }
}
