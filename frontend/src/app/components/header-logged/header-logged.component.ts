import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { CookieService } from 'ngx-cookie-service';
import { json } from 'express';
import { users as Users } from 'src/app/models/users';
import { Event, Router } from '@angular/router';


@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, private http: HttpClient, public cookie: CookieService, public router: Router) { }
  
  public myUser: any
  public myPhoto: any

  ngOnInit(): void {
    this.getUser()
  }

  userOut() {
    console.log("Hasta otra! gracias por usar Soundtalk")
    this.cookie.delete('cookieSoundTalkSession');
    this.goodBye()
  }

  goodBye(){
    this.router.navigate(['/login'])
  }

  getUser(){
    this.registerandloginService.findUserByID(this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {this.myUser = res,
        this.registerandloginService.findPhoto(this.myUser.photoid).subscribe(
          res=> {const restring = JSON.stringify(res)
            if (restring.includes("/")){
              const res2 = restring.split('/')
              const route = res2[7].slice(0, res2[7].length - 1);
              this.myPhoto = route
              console.log(this.myPhoto)
            }
            else{
              const res2 = restring.split('\\')
              const route = res2[14].slice(0, res2[14].length - 1);
              this.myPhoto = route
            }
      },
      err => console.error(err)
    )
      },
      err => console.error(err)
    )
  }

}
