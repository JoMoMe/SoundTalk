
// ~~~~~~~~~~~~~~~~~~~~ Models / Guard ~~~~~~~~~~~~~~~~~~~~ //

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoundguardGuard } from './guard/soundguard.guard';

// ~~~~~~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~ //

import { ContactsComponent } from './components/contacts/contacts.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsComponent } from './components/terms/terms.component';
import { ValidateComponent } from './components/validate/validate.component';

// ~~~~~~~~~~~~~~~~~~~~ Routes ~~~~~~~~~~~~~~~~~~~~ //

const routes: Routes = [
  {path : '', component : LandingpageComponent},
  {path : 'contacts', component : ContactsComponent},
  {path : 'createpost', component : CreatepostComponent},
  {path : 'editprofile', component : EditprofileComponent},
  {path : 'forgotpassword', component : ForgotComponent},
  {path : 'landingpage', component : LandingpageComponent},
  {path : 'login', component : LoginComponent, canActivate: [SoundguardGuard]},
  {path : 'menu', component : MenuComponent},
  {path : 'messages', component : MessagesComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'terms', component : TermsComponent},
  {path : 'validate/:token', component : ValidateComponent},
  {path : '**', component : NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
