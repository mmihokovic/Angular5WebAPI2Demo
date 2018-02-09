import { Routes } from "@angular/router";
import { BarGraphExerciseComponent } from './bar-graph-exercise/bar-graph-exercise.component'

export const ROUTES: Routes = [
  // Main redirect
  { path: '', redirectTo: '/exercise', pathMatch: 'full' },
  {
    path: 'exercise', component: BarGraphExerciseComponent
  },


  // Handle all other routes
  { path: '**', redirectTo: '/', pathMatch: 'full'  }
];
