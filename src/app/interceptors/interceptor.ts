import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from './../auth/auth.guard';
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from './../shared/loader.service';

@Injectable()

export class Interceptor implements HttpInterceptor {
    constructor(private authService: AuthService
               ,public loaderService: LoaderService
               ,private authGuard:AuthGuard) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //debguger
      this.loaderService.show();
      return next.handle(request).pipe(
          finalize(() => this.loaderService.hide())
      );
    }
}
 
