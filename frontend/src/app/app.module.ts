
// ~~~~~~~~~~~~~~~~~~~~ Function imports ~~~~~~~~~~~~~~~~~~~~ //

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoTopButtonModule } from 'ng-go-top-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// ~~~~~~~~~~~~~~~~~~~~ Component/Modules imports ~~~~~~~~~~~~~~~~~~~~ //

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { TermsComponent } from './components/terms/terms.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLoggedComponent } from './components/header-logged/header-logged.component';
import { ValidateComponent } from './components/validate/validate.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    TermsComponent,
    HeaderComponent,
    FooterComponent,
    HeaderLoggedComponent,
    ValidateComponent,
    NotfoundComponent,
    CreatepostComponent,
    ProfileComponent,
    EditprofileComponent,
    MessagesComponent,
    ForgotComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    GoTopButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
