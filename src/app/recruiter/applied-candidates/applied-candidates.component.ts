import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applied-candidates',
  templateUrl: './applied-candidates.component.html',
  styleUrls: ['./applied-candidates.component.css']
})
export class AppliedCandidatesComponent implements OnInit {
  jobId!: number;
  candidates: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.jobId = +this.route.snapshot.paramMap.get('id')!; // get job id from url
    this.loadCandidates();
  }

loadCandidates() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return;
  }

  this.http.get<any[]>(`${environment.apiUrl}/jobs/applied/${this.jobId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(
    data => this.candidates = data,
    err => console.error('Failed to load candidates', err)
  );
}

}
