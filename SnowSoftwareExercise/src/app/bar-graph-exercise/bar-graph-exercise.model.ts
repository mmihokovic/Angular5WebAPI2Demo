import { BarInfo } from './barInfo.model';

export class BarGraphExerciseModel {
  BarDataModels: Array<BarInfo>;
  Errors: Array<string>;
  Success: Array<string>;

  constructor() {
    this.BarDataModels = new Array<BarInfo>();
  }
}
