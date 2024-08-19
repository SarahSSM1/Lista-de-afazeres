import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './components/to-do/to-do.component';

const routes: Routes = [
  { path: '', component:ToDoComponent, pathMatch:'full' },
  {
    path: 'toDo',
    loadChildren: () => import('./components/to-do/toDo.module').then(m =>m.ToDoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
