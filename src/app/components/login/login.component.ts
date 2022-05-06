import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, public router: Router, public cookie: CookieService) { }

  ngOnInit(): void {
  }

  searchAndLoginUser(form: NgForm){
    this.registerandloginService.loginUser(form.value).subscribe(
      res => {
        console.log(res)
        this.cookie.set('cookieSoundTalkSession','s');        
        this.router.navigate(['/menu'])
      },
      err => console.error(err)
    )
  }
}
