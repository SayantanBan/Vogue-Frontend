import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from './auth.constant';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var access_token = localStorage.getItem(TOKEN_NAME);
        if (req.url.includes('authenticated')) {
            var modifiedRequest = req.clone({
                headers: req.headers.append('Content-Type', 'application/json')
                    .append('Authorization', `Bearer ${access_token}`)
            });
            return next.handle(modifiedRequest);
        }
        else {
            return next.handle(req);
        }
    }

}