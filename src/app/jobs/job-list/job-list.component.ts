import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'companyName', 'location', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  role = localStorage.getItem('role');
  filterStatus = '';
  statuses = ['Applied', 'Interview', 'Rejected', 'Offered', 'On Hold'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/jobs`).subscribe(jobs => {
      this.dataSource.data = jobs;
    });

    // Add or remove columns based on role
    if (this.role === 'jobseeker') {
      this.displayedColumns.push('apply');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  apply(jobId: number) {
    this.http.post(`${environment.apiUrl}/applications`, { jobId }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe({
      next: () => alert('Application submitted!'),
      error: err => alert(err.error.message || 'Error applying')
    });
  }

  delete(jobId: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`${environment.apiUrl}/jobs/${jobId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }).subscribe(() => {
        // Refresh job list
        this.dataSource.data = this.dataSource.data.filter(job => job.id !== jobId);
      });
    }
  }
}
