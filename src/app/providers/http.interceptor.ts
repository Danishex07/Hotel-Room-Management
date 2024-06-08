import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


declare let window: any;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor() {
    }

    static isURL(str: string) {
        // Validate if the string is a URL using a regex pattern
        const pattern = new RegExp('^(https?:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*(:[0-9]{1,5})?(\/.*)?$', 'i');
        return pattern.test(str);
    }

    showError(response: any) {
        // Display an error message based on the server response
        let message = "Server is not responding";
        if (response.error.message) {
            message = response.error.message;
        }

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!ApiInterceptor.isURL(request.url)) {
            request = request.clone({
                url: window.__api + request.url
            });
        }

        // Set common headers for all HTTP requests
        request = request.clone({
            setHeaders: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        // Handle the HTTP request and catch any errors
        return next.handle(request).pipe(catchError(response => {
            if (response instanceof HttpErrorResponse) {
                this.showError(response);
            }
            return throwError(response);
        }));
    }
}
