import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) { // this is needed to check if user is null for first request in behaviour subject.
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            }));

    }

}