import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ResearchComponent } from './research/research.component';
import { ResearchDetailsComponent } from './research/research-details/research-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ReportsComponent } from './reports/reports.component';
import { ContentComponent } from './theme/content/content.component';

const routes: Routes = [
    // {
    //     path : '',
    //     component : HomeComponent
    // },
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full'
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'register',
        component : RegisterComponent
    },
    {
        path : 'app',
        component : DashboardComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'app/profile',
        component : ProfileComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'app/accounts',
        component : AccountsComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'app/research-capsules',
        component : ResearchComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'app/research-capsules/view/:id',
        component : ResearchDetailsComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'app/reports',
        component : ReportsComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'app/content-management',
        component : ContentComponent,
        canActivate : [AuthGuard]
    }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }