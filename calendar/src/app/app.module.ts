import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './screens/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateEventComponent } from './components/modal/create-event/create-event.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './components/forms/login/login.component';
import { SingupComponent } from './components/forms/singup/singup.component';
import { AccessPageComponent } from './screens/access-page/access-page.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreateEventComponent,
    NavbarComponent,
    LoginComponent,
    SingupComponent,
    AccessPageComponent,
  ],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
