import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: AngularFireList<any>;
  users: Observable<User[]>;

  constructor(private db: AngularFireDatabase) { }

  insert(user: User) {
    this.db.list('users').push(user)
      .then((result: any) => {
        console.log(result.key)
      });
  }

  update(user: User, key: string) {
    this.db.list('users').update(key, user)
      .catch((error: any) => {
        console.log(error);
      });
  }

  getAll() {
    this.usersRef = this.db.list('users');
    return this.users = this.usersRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }))
  }

  delete(key: string) {
    this.db.object(`users/${key}`).remove();
  }
}
