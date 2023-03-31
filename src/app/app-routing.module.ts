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

const routes: Routes = [
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
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }