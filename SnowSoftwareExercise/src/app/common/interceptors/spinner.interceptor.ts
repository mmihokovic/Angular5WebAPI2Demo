import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
        this.spinnerService.addRequest();

        return next.handle(req).map(event => {
            if (event instanceof HttpResponse) {
                this.spinnerService.requestFinished();
            }
            return event;
        })
            .catch(error => {
                this.spinnerService.reset();
                return Observable.throw(error);
            });
    }
}