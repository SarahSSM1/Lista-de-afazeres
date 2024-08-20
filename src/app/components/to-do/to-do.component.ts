import { Component } from '@angular/core';
import { ToDo } from '../models/toDo';
import { ToDoService } from '../service/to-do.service';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {
  tarefas!: ToDo[];

  constructor(private service: ToDoService) {}

  ngOnInit(): void {
    this.getLista()
  }

  getLista(){
    this.service.getListaToDo()
    .subscribe( r => {this.tarefas = r});
  }



}

