import { AuthService } from './services/auth.service';
import { EventEmitter, Injectable, NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { SaasService } from './services';
import { ToastrUtils } from './utils/toastr.utils';

@Injectable({
  providedIn: 'root',
})
export class CalendarInterceptor implements HttpInterceptor {
//   static interceptorEvents: EventEmitter<string> = new EventEmitter();

//   constructor(
//     private _router: Router,
//     private _authService: AuthService,
//     private _saas: SaasService
//   ) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     let headers = req.headers;

//     // recuperando configuracoes
//     try {
//       const { id, vc_slug } = this._saas.recuperaConfiguracao();
//       headers = headers.set('Saas-Config', JSON.stringify({ id, vc_slug }));
//     } catch (ignore) {}

//     if (this._authService.getToken()) {
//       headers = headers.set(
//         'Authorization',
//         `Bearer ${this._authService.getToken()}`
//       );
//     }

//     req = req.clone({ headers: headers });

//     return next.handle(req).pipe(
//       finalize(() => {}),
//       tap((event: HttpEvent<any>) => {
//         // tratando resposta
//         if (event instanceof HttpResponse)
//           this.onHttpResponse(event, req.method);
//       }),
//       catchError((error) => this.handleError(req, error))
//     );
//   }

//   onHttpResponse(event: HttpResponse<any>, method: string) {
//     // recebeu um novo token - atualize!
//     if (event.headers.has('Authorization')) {
//       let authorization = event.headers.get('Authorization');

//       if (authorization !== null)
//         this._authService.setToken(authorization.replace('Bearer ', ''));
//     }
//   }

//   handleError(req, errorResponse: any) {
//     let statusError = null,
//       errorMessage = '';

//     // client-side error
//     if (errorResponse.error instanceof ErrorEvent) errorMessage = `[Erro] WEB`;
//     else {
//       // verificando se é erro de autenticação
//       if (errorResponse.status == 401) {
//         this._authService.logout();
//         this._router.navigateByUrl('/app/autenticar?redirectTo=' + encodeURIComponent(location.pathname));

//         return throwError(() => errorResponse);
//       } else {
//         errorMessage = errorResponse.error.message;
//       }

//       if (req.url.indexOf('/carrinho') !== -1 && errorResponse.status == 403) {
//         errorMessage = null;
//         localStorage.removeItem('tx_token_carrinho');
//         this._router.navigateByUrl('/app/cardapio');
//       }
//     }

//     if (errorMessage) {
//       ToastrUtils.error(errorMessage);
//     }

//     return throwError(() => errorResponse);
//   }
}

@NgModule({
  imports: [MatSnackBarModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CalendarInterceptor,
      multi: true,
    },
  ],
})
export class HeyDeliveryInterceptor {}
