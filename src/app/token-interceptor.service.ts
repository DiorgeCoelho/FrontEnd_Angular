import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(request, next) {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = request.clone(
      {
        headers: request.headers.set('Authorization', 'bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq)

  }

}
