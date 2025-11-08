import { Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';

export const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: '',   redirectTo: '/students', pathMatch: 'full' }
];
