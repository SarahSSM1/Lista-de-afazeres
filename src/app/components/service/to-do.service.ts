import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../models/toDo';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private readonly URL = 'http://localhost:3000/toDo'

  constructor(private http: HttpClient) {}

  getListaToDo(){
    return this.http.get<ToDo[]>(this.URL)
    .pipe(
  retry(2),
  catchError(this.handleError))
    }

  getToDoId(id: number): Observable<ToDo>{
    return this.http.get<ToDo>(`${this.URL}/${id}`)
    .pipe(
  retry(2),
  catchError(this.handleError))
  }

  saveToDo(todo: ToDo): Observable<ToDo>{
    return this.http.post<ToDo>(this.URL, todo)
    .pipe(
  retry(2),
  catchError(this.handleError))
  }

  updateToDo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.URL}/${todo.id}`, todo)
    .pipe(
  retry(1),
  catchError(this.handleError));
  }

  deleteToDo(id: number): Observable<void>{
    return this.http.delete<void>(`${this.URL}/${id}`)
    .pipe(
  retry(1),
  catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Erro do lado do cliente: ${error.error.message}`
      : `Erro do lado do servidor: ${error.message}`;

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
