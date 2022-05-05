import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsComponent } from './components/terms/terms.component';
import { ValidateComponent } from './components/validate/validate.component';

const routes: Routes = [
  {path : '', component : LandingpageComponent},
  {path : 'landingpage', component : LandingpageComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'menu', component : MenuComponent},
  {path : 'terms', component : TermsComponent},
  {path : 'validate/:token', component : ValidateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
