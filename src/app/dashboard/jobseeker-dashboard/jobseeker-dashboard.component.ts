import { Component, OnInit } from '@angular/core';
import { JobseekerService } from 'src/app/core/jobseeker.service';

@Component({
  selector: 'app-jobseeker-dashboard',
  templateUrl: './jobseeker-dashboard.component.html'
})
export class JobseekerDashboardComponent implements OnInit {
  stats: any = {};
  totalApplications = 0;

  constructor(private jobseekerService: JobseekerService) {}

  ngOnInit() {
    this.jobseekerService.getStats().subscribe(data => {
      this.stats = {};
      this.totalApplications = 0;
      data.forEach((row: any) => {
        this.stats[row.status] = row.count;
        this.totalApplications += row.count;
      });
    });
  }
}