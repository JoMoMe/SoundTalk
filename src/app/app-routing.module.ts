import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsComponent } from './components/terms/terms.component';
import { ValidateComponent } from './components/validate/validate.component';
import { SoundguardGuard } from './guard/soundguard.guard';


const routes: Routes = [
  {path : '', component : LandingpageComponent},
  {path : 'landingpage', component : LandingpageComponent},
  {path : 'login', component : LoginComponent, canActivate: [SoundguardGuard]},
  {path : 'register', component : RegisterComponent},
  {path : 'menu', component : MenuComponent},
  {path : 'terms', component : TermsComponent},
  {path : 'validate', component : ValidateComponent},
  {path : 'createpost', component : CreatepostComponent},
  {path : '**', component : NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
