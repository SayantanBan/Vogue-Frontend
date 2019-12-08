import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators'

export class LogginInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<HttpEvent<any>> {
        console.log('Outgoing request');
        console.log(req.url);
        return next.handle(req).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log('Incoming response');
                    console.log(event.body);
                }
            })
        )
    }

}