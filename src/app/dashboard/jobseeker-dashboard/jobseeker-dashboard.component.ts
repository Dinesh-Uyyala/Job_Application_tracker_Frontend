import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-jobseeker-dashboard',
  templateUrl: './jobseeker-dashboard.component.html'
})
export class JobseekerDashboardComponent implements OnInit {
  stats: any = {
    Applied: 0,
    Interview: 0,
    Rejected: 0,
    Offered: 0,
    'On Hold': 0
  };
  chartLabels = ['Applied', 'Interview', 'Rejected', 'Offered', 'On Hold'];
  chartData = {
    labels: this.chartLabels,
    datasets: [
      { data: [0, 0, 0, 0, 0], label: 'Applications' }
    ]
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/stats/jobseeker`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(data => {
      data.forEach((row: any) => {
        this.stats[row.status] = row.count;
      });
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          { data: this.chartLabels.map(label => this.stats[label] || 0), label: 'Applications' }
        ]
      };
    });
  }

  get totalApplications() {
    return this.chartData.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
  }
}