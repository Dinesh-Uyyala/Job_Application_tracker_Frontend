import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/core/recruiter.service';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {
  stats: any = {};
  jobsPosted = 0;
  totalApplications = 0;
  recruiterId = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(private recruiterService: RecruiterService) {}

  ngOnInit() {
    this.recruiterService.getStats().subscribe(data => {
      this.stats = {};
      this.totalApplications = 0;
      data.forEach((row: any) => {
        console.log(row);
        this.stats[row.status] = row.totalJobs;
        this.totalApplications += row.applications;
      });
    });

    this.recruiterService.getMyJobs(this.recruiterId).subscribe(jobs => {
      this.jobsPosted = jobs.length;
    });
  }
}