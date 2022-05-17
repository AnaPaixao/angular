import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/users-registration/list/list.component';
import { AddComponent } from './components/users-registration/add/add.component';

const routes: Routes = [
  {
    path:"",
    component: AddComponent
  },
  {
    path:"list",
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
