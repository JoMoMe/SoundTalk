import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users as Users } from 'src/app/models/users';
import { updatedusers as Updatedusers } from 'src/app/models/updatedusers';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { contacts as Contacts } from 'src/app/models/contacts';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterAndLoginService {
  constructor(private http: HttpClient, public router: Router) {}

  url_backendregister = environment.api + '/register'
  url_backendremember = environment.api + '/rememberpassword'
  url_backendlogin = environment.api + '/login'
  url_backendcookie = environment.api + '/login/cookie/'
  url_backendphotoprofile = environment.api + '/menu/profile/profilephoto/'
  url_backendmenu = environment.api + '/menu/posts'
  url_backendprofile = environment.api + '/menu/profile/user/'


  createdUser: Users =  {
    username: '',
    mail: '',
    password: '',
    role: 'User',
    rememberme: '',
    accountactive: 0,
    photoid: JSON.parse(JSON.stringify('a')),
  };

  updatedUser: Updatedusers =  {
    username: '',
    ubication: '',
    biography: '',
    gender: '',
    status: '',
    photoid: JSON.parse(JSON.stringify('')),
  };

    
  
  findUserByID(cookie: string){
    return this.http.get(this.url_backendcookie + cookie)
  }

  getUsersofPosts(id: string){
    return this.http.get(this.url_backendprofile + id)
  }

  findPhoto(idphoto: string){
    return this.http.get(this.url_backendphotoprofile + idphoto)
  }

  getAllposts(){
    return this.http.get(this.url_backendmenu+'/allpost')
  }

  getpostsbyNews(){
    return this.http.get(this.url_backendmenu+'/allpost/news')
  }

  getpostsbyGossips(){
    return this.http.get(this.url_backendmenu+'/allpost/gossip')
  }

  getpostsbyQAndA(){
    return this.http.get(this.url_backendmenu+'/allpost/QAndA')
  }

  getpostsbyMemes(){
    return this.http.get(this.url_backendmenu+'/allpost/meme')
  }

  getAllComments(idcomment: string){
    return this.http.get(this.url_backendmenu+'/allcomments/'+idcomment)
  }

  createUser(users: Users){
    users.role='User';
    users.accountactive=0;
    users.biography='Biografía vacía';
    users.ubication='Ubicación vacía';
    users.gender='Género vacío';
    users.status='Estado vacío';
    users.photoid=JSON.parse(JSON.stringify('627d2042064ed238caba3bd6'));
    return this.http.post(this.url_backendregister, users)
  }

  changePassword(users: Users){
    return this.http.post(this.url_backendremember, users)
  }

  loginUser(users: Users){
    return this.http.post(this.url_backendlogin, users)
  }

  verifyToken(token: string){
    return this.http.get('142.132.239.200' + '/validate/' + token)
  }

  getUserInfo(userid: string){
    return this.http.get(this.url_backendprofile + userid)
  }

  findLikes(iduser: string){
    return this.http.get(this.url_backendprofile + iduser+'/mylikes')
  }

  findmyPosts(iduser: string){
    return this.http.get(this.url_backendprofile + iduser+'/myposts')
  }

  updatemyUser(updatedUser: Updatedusers){
    return this.http.put('142.132.239.200' + '/menu/profile/edit/' +updatedUser._id, updatedUser)
  }
  
  addFriendRequest(contacts: Contacts){
    return this.http.post(this.url_backendprofile+'add', contacts)
  }

  deleteUser(id: string){
    return this.http.delete(this.url_backendprofile+id+'/delete')
  }

  getmyRequests(id: string){
    return this.http.get(this.url_backendprofile + id + '/myrequests')
  }

  deleteUserRequest(iduser: string, myid: string){
    return this.http.delete(this.url_backendprofile+myid+'/myrequests/deleteone/'+iduser)
  }

  acceptUserRequest(iduser: string, myid: string, body: Object){
    return this.http.post(this.url_backendprofile+myid+'/myrequests/acceptone/'+iduser, body)
  }

  checkRequests(iduser: string, myid: string){
    return this.http.get(this.url_backendprofile+myid+'/myrequests/checkone/'+iduser)
  }

  removeFriendRequest(iduser: string, myid: string){
    return this.http.delete(this.url_backendprofile+myid+'/myfriends/deleteone/'+iduser)
  }
}
