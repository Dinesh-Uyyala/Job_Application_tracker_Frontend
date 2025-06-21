import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, AfterViewInit {
  jobs: any[] = [];
  columns = ['job_title', 'job_status', 'appliedCandidates', 'actions'];
  recruiterId: number = 0;
  role: any = '';
  
  // MatPaginator and MatSort
  dataSource = new MatTableDataSource<any>(this.jobs);
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    console.log(userStr);

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log(user);
        this.recruiterId = user?.id;
        console.log(this.recruiterId);
        this.role = user?.role;
        console.log(this.role);
      } catch (e) {
        console.error('Invalid user object in localStorage:', e);
      }
    }

    if (!this.recruiterId) {
      console.error('Recruiter ID not found in localStorage');
      return;
    }

    this.http.get<any[]>(`${environment.apiUrl}/jobs/recruiter/${this.recruiterId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(
      jobs => {
        this.jobs = jobs;
        this.dataSource.data = jobs;  // Set the data to MatTableDataSource
        // Sorting and pagination are applied in ngAfterViewInit
      },
      error => console.error('Error loading jobs', error)
    );
  }

  // After the view has been initialized, apply the sort and paginator to the data source
  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;  // Apply sorting
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;  // Apply pagination
    }
  }

  edit(job: any) {
    this.router.navigate(['/recruiter/job-form', job.id]);
  }

  delete(jobId: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`${environment.apiUrl}/jobs/${jobId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }).subscribe(() => this.ngOnInit());
    }
  }

  viewAppliedCandidates(id: number) {
    this.router.navigate(['/recruiter/applied-candidates', id]);
  }

  // Filter functionality
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Pagination event handler
  pageEvent(event: any) {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = event.pageIndex;
      this.dataSource.paginator.pageSize = event.pageSize;
    }
  }
}
