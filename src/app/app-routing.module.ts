import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'create-task', loadChildren: './create-task/create-task.module#CreateTaskPageModule' },
  { path: 'details-task/:id', loadChildren: './details-task/details-task.module#DetailsTaskPageModule' },
  { path: 'edit-task/:id', loadChildren: './edit-task/edit-task.module#EditTaskPageModule' },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
