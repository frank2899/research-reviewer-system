import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from "@angular/forms";
import { AccountsComponent } from './accounts/accounts.component';
import { ResearchComponent } from './research/research.component';
import { ResearchDetailsComponent } from './research/research-details/research-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
    declarations : [AppComponent, ProfileComponent, AccountsComponent, ResearchComponent, ResearchDetailsComponent, DashboardComponent],
    imports : [BrowserModule, AppRoutingModule, AuthModule, FormsModule, BrowserAnimationsModule],
    bootstrap : [AppComponent]
})

export class AppModule {}