import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './common/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';
import { BarGraphExerciseComponent } from './bar-graph-exercise/bar-graph-exercise.component';
import { UploadDialogComponent } from './common/upload-dialog/upload-dialog.component';
import { BarGraphExerciseService } from './bar-graph-exercise/bar-graph-exercise.service';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { SpinnerService } from './common/spinner/spinner.service';
import { SpinnerInterceptor } from './common/interceptors/spinner.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    UploadDialogComponent,
    BarGraphExerciseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    HttpClientModule,
    SpinnerService,
    BarGraphExerciseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  entryComponents: [
    UploadDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
