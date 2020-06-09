import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Users } from '../models/users';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlUser = 'http://localhost:3000/usuario';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  userI = localStorage.getItem('userId');

  getUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlUser + '/' + this.userI)
      .pipe(
        catchError(this.handleError),
      )
  }
  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.urlUser + '/' + this.userI, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getUserId() {
    return localStorage.getItem('userId')
  }




  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
