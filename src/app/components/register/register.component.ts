import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Event, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, public cookie: CookieService, public router: Router,) { }

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

  searchMailAndCreate(form: NgForm){
    this.registerandloginService.createUser(form.value).subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }
}
