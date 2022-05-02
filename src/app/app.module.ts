
// ~~~~~~~~~~~~~~~~~~~~ Function imports ~~~~~~~~~~~~~~~~~~~~ //

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {GoTopButtonModule} from 'ng-go-top-button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// ~~~~~~~~~~~~~~~~~~~~ Component/Modules imports ~~~~~~~~~~~~~~~~~~~~ //

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    GoTopButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
