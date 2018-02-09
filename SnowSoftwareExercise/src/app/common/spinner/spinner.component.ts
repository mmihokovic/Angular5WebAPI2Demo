import { Component, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { MatSpinner } from '@angular/material';

import { SpinnerService } from './spinner.service';

@Component({
    moduleId: module.id,
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.css']
})

export class SpinnerComponent implements AfterContentInit {
    public showSpinner: boolean;

    constructor(private spinnerService: SpinnerService,
      public cdRef: ChangeDetectorRef) {
    }

  ngAfterContentInit(): void {
    this.spinnerService.showSpinnerEvent.subscribe(() => {
      this.cdRef.markForCheck();
      this.showSpinner = true;
        this.cdRef.detectChanges();
      });

    this.spinnerService.hideSpinnerEvent.subscribe(() => {
      this.cdRef.markForCheck();
      this.showSpinner = false;
      this.cdRef.detectChanges();
      });
    }
}
