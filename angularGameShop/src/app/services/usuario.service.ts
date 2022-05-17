import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco';
import { Usuario } from '../model/usuario';
// import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
// import { ActionSequence } from 'protractor';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // private localURL = environment.apiDados;
  private colletionUser = "usuario";

  constructor(
    private http: HttpClient,
    private firedb: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  getEndereco(cep: string) {
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`)
  }

  addEndereco(endereco: Endereco, idUser) {
    let user: Usuario = new Usuario;
    this.getUser(idUser).subscribe(
      res => {
        user = res
      }
    )
    console.log(user)
    // user.endereco.push(endereco);
    // console.log(user)
    // return this.http.patch(this.localURL + this.colletionUser + "/" + idUser, user);
    return this.firedb.collection(this.colletionUser).doc(idUser).collection("endereco").add(endereco);
  }

  addUser(usuario: Usuario) {
    // return this.http.post<Usuario>(this.localURL + this.colletionUser, usuario)
    return this.firedb.collection(this.colletionUser).add(
      {
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.tel,
        ativo: usuario.ativo,
        foto: usuario.foto = "",
        pws: usuario.pws,
        //endereco: usuario.endereco = []
      }
    );
  }

  getUser(id: string) {
    // return this.http.get<Usuario>(this.localURL + this.colletionUser + "/" + id)
    return this.firedb.collection(this.colletionUser).doc<Usuario>(id).valueChanges();
  }

  getAll() {
    return this.firedb.collection(this.colletionUser).snapshotChanges().
    pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
  }

  getAllEndereco(key) {
    return this.firedb.collection(this.colletionUser).doc(key).collection("endereco").valueChanges();
  }

}
