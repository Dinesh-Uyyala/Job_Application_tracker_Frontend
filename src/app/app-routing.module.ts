import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'recruiter',
    loadChildren: () => import('./recruiter/recruiter.module').then(m => m.RecruiterModule),
    canActivate:[AuthGuard],
    data: { roles: ['recruiter'] }
  },
  {
    path: 'jobseeker',
    loadChildren: () => import('./jobseeker/jobseeker.module').then(m => m.JobseekerModule),
    canActivate:[AuthGuard],
    data: { roles: ['jobseeker'] }
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule)
  },
  { path: '**', redirectTo: 'jobs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }