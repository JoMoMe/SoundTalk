import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { addHours } from 'date-fns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, public router: Router, public cookie: CookieService) { }

  public STres: boolean = true
  public STerror: boolean = true

  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.registerandloginService.findUserByID(cookiefound).subscribe(
        res => {
          console.log(res)
          console.log("tienes la cookie, bienvenido!")
          this.router.navigate(['/menu'])
        },
        err => console.error(err),
      )
    } 
    else{
      console.log("Logueate porfavor!")
      this.router.navigate(['/login'])   
    }
  }

  myDate(){
    const date: Date = addHours(new Date(), 24);
    return date
  }

  res(){
    this.STres = false
  }

  error(){
    this.STerror = false
  }

  searchAndLoginUser(form: NgForm){
    this.registerandloginService.loginUser(form.value).subscribe(
      res => {
        this.res()
        var userObject = JSON.stringify(res)
        var user = JSON.parse(userObject)
        this.cookie.set('cookieSoundTalkSession',user._id, { expires: this.myDate() });        
        this.router.navigate(['/menu'])
      },
      err => this.error()
    )
  }
}
