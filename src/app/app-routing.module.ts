import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [  
  { path: 'auth-home', loadChildren: './auth/auth-home/auth-home.module#AuthHomePageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },    
  { path: 'register', loadChildren: './users/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './users/login/login.module#LoginPageModule' },
  { path: 'create-task', loadChildren: './tasks/create-task/create-task.module#CreateTaskPageModule', canActivate: [AuthGuard] },
  { path: 'details-task/:id', loadChildren: './tasks/details-task/details-task.module#DetailsTaskPageModule', canActivate: [AuthGuard] },
  { path: 'edit-task/:id', loadChildren: './tasks/edit-task/edit-task.module#EditTaskPageModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth-home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
