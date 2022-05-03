import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users as Users } from 'src/app/models/users';
import { Form, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url_backend = 'http://localhost:4001/register'
  constructor(private http: HttpClient) {}
  
  createdUser: Users =  {
    username: '',
    mail: '',
    password: '',
    role: 'User'
  };

  createUser(users: Users){
    users.role='User';
    return this.http.post(this.url_backend, users)
  }
}

