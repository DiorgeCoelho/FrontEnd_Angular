import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { UsuarioComponent } from './usuario/usuario.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'Auth/login',
    pathMatch: 'full'
  },
 
  {
    path: 'project',
    canActivate: [AuthGuard],
    component: ProjectComponent
  },
  {
    path: 'usuario',
    canActivate: [AuthGuard],
    component: UsuarioComponent
  },
  {
    path: 'Auth/login',
    component: LoginComponent
  },
  {
    path: 'Auth/register',
    component: RegisterComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 
  
}
