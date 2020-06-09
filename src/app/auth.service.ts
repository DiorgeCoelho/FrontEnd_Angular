import { Injectable } from '@angular/core';
import { Users } from './models/users'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, retry, map, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlCadastro = 'http://localhost:3000/auth/cadastro';
  urlLogin = 'http://localhost:3000/auth/authenticate';


  constructor(private http: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  register(user: Users): Observable<Users> {
    return this.http.post<Users>(this.urlCadastro, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }
  login(user: Users): Observable<Users> {
    return this.http.post<Users>(this.urlLogin, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError),

      )

  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigate(['Auth/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }




  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.error.erro}`;
    }
    return throwError(errorMessage);
  };

}
