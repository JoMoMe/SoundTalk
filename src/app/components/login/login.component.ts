import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/services/users.service'
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

  makeCookie() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  searchAndLoginUser(form: NgForm){
    this.registerandloginService.loginUser(form.value).subscribe(
      res => {
        console.log(res)
        this.cookie.set('cookieSoundTalkSession',this.makeCookie());        
        this.router.navigate(['/menu'])
      },
      err => console.error(err)
    )
  }
}
