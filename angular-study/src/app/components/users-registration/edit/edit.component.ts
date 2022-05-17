import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { UserDataService } from '../shared/user-data.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  key: string = '';

  constructor(public dialogRef: MatDialogRef<EditComponent>, private userService: UserService, private fb: FormBuilder, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.createUserForm();

    this.user = new User();
    this.userDataService.currentUser.subscribe(data => {
      if(data.user && data.key) {
        this.user = new User();
        this.user.userName = data.user.userName;
        this.user.mothersName = data.user.mothersName;
        this.user.gender = data.user.gender;
        this.key = data.key;
      }
    })
  }

  createUserForm() {
    this.userForm = this.fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      mothersName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      gender: ['', Validators.required],
    });
  }

  onSubmit() {
    this.userService.update(this.user, this.key);
    this.cancel()
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
