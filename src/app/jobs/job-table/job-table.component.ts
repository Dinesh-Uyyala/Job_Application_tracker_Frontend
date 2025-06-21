import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  role: string = '';
  
  // Base columns visible for all roles
  displayedColumns: string[] = [
    'title',
    'companyName',
    'location',
    'experience',
    'vacancies',
    'package',
    'workMode',
    'status'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Retrieve role from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.role = JSON.parse(userStr).role || '';
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        this.role = '';
      }
    }

    // Add role-specific columns
    // if (this.role === 'recruiter') {
    //   // this.displayedColumns.push('actions');
    // } else 
    if (this.role === 'jobseeker') {
      this.displayedColumns.push('applyJob');
    }

    // Load jobs data
    this.http.get<any[]>(`${environment.apiUrl}/jobs`).subscribe(
      (jobs) => {
        this.dataSource.data = jobs;
      },
      (error) => {
        console.error('Failed to load jobs', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editJob(id: number) {
    this.router.navigate(['/recruiter/job-form', id]);
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http
        .delete(`${environment.apiUrl}/jobs/${id}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((j) => j.id !== id);
        });
    }
  }

  applyJob(jobId: number) {
    this.router.navigate(['/jobseeker/job-details', jobId]);
  }
}
