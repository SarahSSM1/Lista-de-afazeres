import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../interface/toDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private readonly URL = 'http://localhost:3000/toDo'

  constructor(private http: HttpClient) {}

  getToDo(){
    return this.http.get<ToDo[]>(`${this.URL}`)
  }
}
