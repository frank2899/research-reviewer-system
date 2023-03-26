import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AppComponent } from './app.component';
import { ResearchComponent } from './research/research.component';
import { ResearchDetailsComponent } from './research/research-details/research-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
        component : DashboardComponent
    },
    {
        path : 'app/profile',
        component : ProfileComponent
    },
    {
        path : 'app/accounts',
        component : AccountsComponent
    },
    {
        path : 'app/research-capsules',
        component : ResearchComponent
    },
    {
        path : 'app/research-capsules/view/:id',
        component : ResearchDetailsComponent
    },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }