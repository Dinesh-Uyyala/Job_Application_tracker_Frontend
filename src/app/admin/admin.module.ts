import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'user-list', component: UserListComponent }
];

@NgModule({
  declarations: [AdminDashboardComponent, UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule
  ]
})
export class AdminModule { }