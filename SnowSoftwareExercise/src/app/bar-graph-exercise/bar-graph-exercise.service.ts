import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HttpHeaders } from "@angular/common/http";

import { BarGraphExerciseModel } from './bar-graph-exercise.model';

@Injectable()
export class BarGraphExerciseService {
  private readonly baseUrl: string = '/api/DataSample';

  constructor(private http: HttpClient) {

  }

  uploadSampleData(value): Observable<BarGraphExerciseModel>{
    var url = this.baseUrl + '/upload-data-sample';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let formData = new FormData();
    formData.append('file[]', value);
    return this.http.post(url, formData, { headers: headers }).map((response: any) => response as BarGraphExerciseModel);
  }

  updateSampleData(barGraphExerciseModel: BarGraphExerciseModel): Observable<BarGraphExerciseModel> {
    const url = this.baseUrl + '/update-data-sample';

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post(url, barGraphExerciseModel, { headers: headers }).map((response: any) => response as BarGraphExerciseModel);
  }
}
