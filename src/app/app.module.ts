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
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { ReportsComponent } from './reports/reports.component';
import { NgxPrintModule } from "ngx-print";
import { CountUpModule } from "ngx-countup";
import { ContentComponent } from './theme/content/content.component';
import { ToastrModule } from "ngx-toastr";

const CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
    declarations: [CanvasJSChart, AppComponent, ProfileComponent, AccountsComponent, ResearchComponent, ResearchDetailsComponent, DashboardComponent, ReportsComponent, ContentComponent],
    imports: [CountUpModule, BrowserModule, AppRoutingModule, AuthModule, FormsModule, BrowserAnimationsModule, NgxPrintModule, ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right'
    })],
    bootstrap: [AppComponent]
})

export class AppModule { }