import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobseekerDashboardComponent } from '../dashboard/jobseeker-dashboard/jobseeker-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class JobseekerModule { }