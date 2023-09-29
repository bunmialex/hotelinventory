import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor', request);
    if (request.method === 'POST') {
      const newRequest = request.clone({
        headers: new HttpHeaders({
          token: '1234562345tyjhgnfgr67okuyjgnfbeg4y5u6ikymnheg7hjsdfghj',
        }),
      });
      return next.handle(newRequest);
    }else{
      return next.handle(request);
    }
  }
}
