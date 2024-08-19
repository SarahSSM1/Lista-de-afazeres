import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../interface/toDo';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private readonly URL = 'http://localhost:3000/toDo'

  constructor(private http: HttpClient) {}

  getLista(){
    return this.http.get<ToDo[]>(`${this.URL}`)
      .pipe(
      retry(2),
      catchError(this.handleError))
    }

  getToDoId(id: number): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.URL + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveToDo(lista: ToDo): Observable<ToDo[]>{
    return this.http.post<ToDo[]>(this.URL, JSON.stringify)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  deleteToDo(lista: ToDo): Observable<ToDo[]>{
    return this.http.delete<ToDo[]>(this.URL + '/' + lista.id)
      .pipe(
        retry(1),
        catchError(this.handleError))
  }

 private handleError(erro: HttpErrorResponse){
  let errorMessage = '';
    if (erro.error instanceof ErrorEvent) {
      errorMessage = `Erro do lado do cliente: ${erro.error.message}`;
    } else {
      errorMessage = `Erro do lado do servidor: ${erro.message}`;
    }

  return throwError(() => new Error(errorMessage))
  }
}
