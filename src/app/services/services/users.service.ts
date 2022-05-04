import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users as Users } from 'src/app/models/users';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterAndLoginService {
  url_backendregister = 'http://localhost:4003/register'
  url_backendlogin = 'http://localhost:4003/login'
  url_contoken = 'http://localhost:4003/validate/token='+this.getUrl()
  
  constructor(private http: HttpClient, public router: Router) {}


  createdUser: Users =  {
    username: '',
    mail: '',
    password: '',
    role: 'User',
    rememberme: '',
    accountactive: 0,
  };

  getUrl(){
    var url = this.router.url
    var urldivided = url.split('token?')
    var token = urldivided[1]
    return token
  }

  createUser(users: Users){
    users.role='User';
    users.accountactive=0;
    return this.http.post(this.url_backendregister, users)
  }

  loginUser(users: Users){
    return this.http.post(this.url_backendlogin, users)
  }

  verifyToken(){
    return this.http.get(this.url_contoken)
  }

}

