import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { CookieService } from 'ngx-cookie-service';
import { json } from 'express';
import { users as Users } from 'src/app/models/users';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, private http: HttpClient, public cookie: CookieService) { }
  
  public myUser: any
  public myPhoto: any

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.registerandloginService.findUserByID(this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {this.myUser = res,
        this.registerandloginService.findPhoto(this.myUser.photoid).subscribe(
          resp => {this.myPhoto = resp
          },
          err => console.error(err)
        )
      },
      err => console.error(err)
    )
  }

}
