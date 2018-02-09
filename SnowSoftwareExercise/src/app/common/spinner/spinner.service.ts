import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpinnerService {
    private currentActiveRequests: number;
    public showSpinnerEvent: EventEmitter<number>;
    public hideSpinnerEvent: EventEmitter<number>;

    constructor(private router: Router) {
        this.currentActiveRequests = 0;
        this.showSpinnerEvent = new EventEmitter<number>();
        this.hideSpinnerEvent = new EventEmitter<number>();

        this.router.events.subscribe(route => {
            this.reset();
        });

    }

    public addRequest(): void {
        this.currentActiveRequests = Math.max(0, this.currentActiveRequests + 1);
        this.notifySubscribers();
    }

    public requestFinished(): void {
        this.currentActiveRequests = Math.max(0, this.currentActiveRequests - 1);
        this.notifySubscribers();
    }

    private notifySubscribers(): void {
        if (this.currentActiveRequests > 0) {
            this.showSpinnerEvent.emit(this.currentActiveRequests);
        }

        if (this.currentActiveRequests == 0) {
            this.hideSpinnerEvent.emit(this.currentActiveRequests);
        }
    }

    public reset() {
        this.currentActiveRequests = 0;
        this.notifySubscribers();
    }

}