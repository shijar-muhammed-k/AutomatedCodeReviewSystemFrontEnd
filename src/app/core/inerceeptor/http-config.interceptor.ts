import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private user: UserService,
    private loader: LoaderService,
    private router: Router,
    private toast: ToastrService
    ) {
    this.user.getUser().subscribe(user => {
      this.loggedUser = user? JSON.parse(user): '';
    })
  }

  host_url = 'http://127.0.0.1:8000/';
  loggedUser;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ url: `${this.host_url}${request.url}` });

    if (this.loggedUser != '') {
      const token = this.loggedUser.access;
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
        console.log(error)
        this.loader.stop();
        if (error.status === 401){
          this.user.user_logout();
          this.toast.info("Session Expired");
          this.router.navigate(['/login']);
        } else if (error.status === 0) {
          this.toast.error("Sorry, something went wrong, Please try again.");
        }
        return throwError(error);
      })
    );
  }
}
