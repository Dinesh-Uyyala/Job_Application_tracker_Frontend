import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterDashboardComponent } from './dashboard/dashboard.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AppliedCandidatesComponent } from './applied-candidates/applied-candidates.component';

const routes: Routes = [
  { path: '', component: RecruiterDashboardComponent },
  { path: 'job-list', component: JobListComponent },
  { path: 'job-form', component: JobFormComponent },
  { path: 'job-form/:id', component: JobFormComponent },
  { path: 'applied-candidates/:id', component: AppliedCandidatesComponent },
];

@NgModule({
  declarations: [RecruiterDashboardComponent, JobListComponent, JobFormComponent, AppliedCandidatesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class RecruiterModule { }