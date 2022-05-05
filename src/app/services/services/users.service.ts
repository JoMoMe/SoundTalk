import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users as Users } from 'src/app/models/users';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterAndLoginService {
  constructor(private http: HttpClient, public router: Router) {}

  url_backendregister = 'http://localhost:4005/register'
  url_backendlogin = 'http://localhost:4005/login'

  createdUser: Users =  {
    username: '',
    mail: '',
    password: '',
    role: 'User',
    rememberme: '',
    accountactive: 0,
  };


  createUser(users: Users){
    users.role='User';
    users.accountactive=0;
    return this.http.post(this.url_backendregister, users)
  }

  loginUser(users: Users){
    return this.http.post(this.url_backendlogin, users)
  }

  verifyToken(token: string){
    return this.http.get('http://localhost:4005/validate/' + token)
  }

  loggedIn(): Boolean{
    return !!localStorage.getItem('cookieSoundTalkSession')
  }

}

