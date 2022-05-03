import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users as Users } from 'src/app/models/users';
import { Form, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterAndLoginService {
  url_backendregister = 'http://localhost:4001/register'
  url_backendlogin = 'http://localhost:4001/login'

  constructor(private http: HttpClient) {}
  
  createdUser: Users =  {
    username: '',
    mail: '',
    password: '',
    role: 'User',
    rememberme: '',
  };

  createUser(users: Users){
    users.role='User';
    return this.http.post(this.url_backendregister, users)
  }

  loginUser(users: Users){
    return this.http.post(this.url_backendlogin, users)
  }

}

