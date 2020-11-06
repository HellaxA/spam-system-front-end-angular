import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserViewComponent} from "./user-view/user-view.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {SendFormComponent} from "./send-form/send-form.component";

const routes: Routes = [
  {path: 'users', component: UserViewComponent},
  {path: 'user-form', component: UserFormComponent},
  {path: 'user-form/:id', component: UserFormComponent},
  {path: 'send-form', component: SendFormComponent},
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
