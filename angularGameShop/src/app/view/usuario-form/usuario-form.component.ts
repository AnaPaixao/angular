import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public usuario: Usuario = new Usuario;
  public conf: string = "";

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    // console.log(this.usuario, form)
    this.usuarioService.addUser(this.usuario).then( // Verifica a informação retornada
      res => {
        alert(`Usuário ${this.usuario.nome}, foi cadastrado com sucesso`);
        form.reset();
        this.router.navigate(['perfilUser', res.id])
      },
      () => {
        alert(`Não foi possível fazer o cadastro`);
      }
    )
  }

}
