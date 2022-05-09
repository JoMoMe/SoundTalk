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

  url_backendregister = 'http://localhost:4001/register'
  url_backendlogin = 'http://localhost:4001/login'
  url_backendcookie = 'http://localhost:4001/login/cookie/'
  url_backendphotoprofile = 'http://localhost:4001/menu/profile/profilephoto/'
  url_backendmenu = 'http://localhost:4001/menu/posts'


  createdUser: Users =  {
    username: '',
    mail: '',
    password: '',
    role: 'User',
    rememberme: '',
    accountactive: 0,
    photoid: JSON.parse(JSON.stringify('a')),
  };
  
  findUserByID(cookie: string){
    return this.http.get(this.url_backendcookie + cookie)
  }

  findPhoto(idphoto: string){
    return this.http.get(this.url_backendphotoprofile + idphoto)
  }

  getRandomPosts(){
    return this.http.get(this.url_backendmenu+'/allpost')
  }


  createUser(users: Users){
    users.role='User';
    users.accountactive=0;
    users.photoid=JSON.parse(JSON.stringify('62791b990376f22fba505184'));
    return this.http.post(this.url_backendregister, users)
  }

  loginUser(users: Users){
    return this.http.post(this.url_backendlogin, users)
  }

  verifyToken(token: string){
    return this.http.get('http://localhost:4001/validate/' + token)
  }
}

