import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from '../common/upload-dialog/upload-dialog.component';
import { Observable, Subscription } from 'rxjs/Rx';

import { BarGraphExerciseService } from './bar-graph-exercise.service';
import { BarGraphExerciseModel } from './bar-graph-exercise.model';

@Component({
  selector: 'bar-graph-exercise',
  templateUrl: './bar-graph-exercise.component.html'
})
export class BarGraphExerciseComponent implements OnInit, OnDestroy{
  automaticUpdates = false;
  dataLoaded = true;
  model: BarGraphExerciseModel;
  columnChartData: any;
  private timer;
  private sub: Subscription;

  constructor(public dialog: MatDialog, public barGraphExerciseService: BarGraphExerciseService) {
    this.automaticUpdates = false;
    this.dataLoaded = false;
    this.model = new BarGraphExerciseModel();
  }

  ngOnInit(): void {  }

  ngOnDestroy(): void {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  uploadDataSample() {
    var dialogref = this.dialog.open(UploadDialogComponent,
      {
        data: {
          title: " Upload data sample",
          acceptedFileTypes: ".txt"

        },
        width: '600px'
      });

    dialogref.afterClosed().subscribe((value) => {
      document.body.style.overflowX = null;
      if (value) {
        this.barGraphExerciseService.uploadSampleData(value).subscribe(r => {
          this.model = r;
          if (this.model != null && this.model.BarDataModels != null && this.model.BarDataModels.length > 0) {
            this.dataLoaded = true;
            this.mapModelToBarChart();
          }
        });
        
      }
    });
  }

  mapModelToBarChart() {
    this.columnChartData = {
      chartType: 'BarChart',
      dataTable: [],
      options: { title: 'Snow Software Data Sample' }
    };

    var dataTable = [];
    dataTable.push(['Column name', 'Value', { role: 'style' }]);
    for (var i = 0; i < this.model.BarDataModels.length; i++) {
      var barDataModel = this.model.BarDataModels[i];
      var data = new Array<any>();
      data.push(barDataModel.Name);
      data.push(barDataModel.Value);
      data.push('color: ' + barDataModel.Color);
      dataTable.push(data);
    }
    this.columnChartData.dataTable = dataTable;
  }

  tickerFunc(tick) {
    this.barGraphExerciseService.updateSampleData(this.model).subscribe(r => {
      this.model = r;
      this.mapModelToBarChart();
    });
  }

  automaticUpdatesChanged(event) {
    if (event) {
      this.timer = Observable.timer(60000, 60000);
      this.sub = this.timer.subscribe(t => this.tickerFunc(t));
    } else {
      if (this.sub != null) {
        this.sub.unsubscribe();
      }
    }
  }
}
