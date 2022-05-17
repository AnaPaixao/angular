import { Component, OnInit } from '@angular/core';
import { EditComponent } from './../edit/edit.component';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../shared/user.service';
import { UserDataService } from '../shared/user-data.service';
import { User } from '../shared/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: Observable<any>;

  constructor(private userService: UserService, private userDataService: UserDataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.users = this.userService.getAll();
  }

  showMessage(msg:string):void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      panelClass: ['snackbar-delete'],
      horizontalPosition: "right",
      verticalPosition: "top" 
    })
  }

  delete(key: string) {
    this.userService.delete(key);
    this.showMessage('Usuário(a) deletado com sucesso')
  }

  editModal(user: User, key: string): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '280px',      
    });
    
    this.userDataService.changeContact(user,key)

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  // edit(user: User, key: string) {
  //   this.userDataService.changeContact(user, key)
  // }
}
