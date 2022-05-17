import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validations } from './validations';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      cpf: ['', Validators.compose([Validators.required, Validators.maxLength(11),Validations.cpfValid])],
      userName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      mothersName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50)])],
      birth: ['', Validators.required],
      gender: [''],
    });
  }

  showMessage(msg:string):void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      panelClass: ['snackbar'],
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  onSubmit() {
    const birthFormat = JSON.stringify(this.userForm.value.birth);
    const changeBirthFormat = birthFormat.split("T")[0].replace(/['"]+/g, '');

    this.userService.insert({cpf: this.userForm.value.cpf, userName: this.userForm.value.userName, mothersName: this.userForm.value.mothersName, birth: changeBirthFormat, gender: this.userForm.value.gender});
    this.showMessage(`Usuário(a) ${this.userForm.value.userName} cadastrado(a) com sucesso!`);

   // this.userForm.reset();
   setInterval(this.reload, 700);
  }

  reload() {
    window.location.reload();
  }

}