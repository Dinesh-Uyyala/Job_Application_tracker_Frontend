import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerDashboardComponent } from './dashboard/dashboard.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: JobseekerDashboardComponent },
  { path: 'application-list', component: ApplicationListComponent },
  {path: 'job-details/:id', component: JobDetailsComponent }
];

@NgModule({
  declarations: [JobseekerDashboardComponent, ApplicationListComponent, JobDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatInputModule
  ]
})
export class JobseekerModule { }