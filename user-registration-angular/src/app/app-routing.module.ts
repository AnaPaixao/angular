import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddComponent } from './views/users-registration/add/add.component';
import { ListComponent } from './views/users-registration/list/list.component';


const routes: Routes = [
  {
    path: "",
    component: AddComponent
  },
  {
    path: "list",
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
