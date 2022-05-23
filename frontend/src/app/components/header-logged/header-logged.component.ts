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
  public requests: any
  public commentsshow: any
  public count = 0
  public searchContact: any

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
            this.myUser = [this.myUser]
      },
      err => console.error(err)
    )
      },
      err => console.error(err)
    )
  }

  seeProfile(userid: string){
    this.router.navigate(['/profile'], {queryParams: {id: userid}})
  }

  seeContacts(userid: string){
    this.router.navigate(['/contacts'], {queryParams: {id: userid}})
  }

  myRequests(userid: string){
    this.registerandloginService.getmyRequests(userid).subscribe(
      res=> {this.requests = res
      console.log(this.requests)
    },
      err=> console.error(err)
    )
  }

  denyRequest(iduser: string){
    this.registerandloginService.deleteUserRequest(iduser, this.myUser[0]._id).subscribe(
      res=> {console.log(res)
        location.reload()
    },
      err=> console.error(err)
    )
  }

  acceptRequest(iduser: string){
    let request : Object = {
      status: 1,
    }
      
    this.registerandloginService.acceptUserRequest(iduser, this.myUser[0]._id, request).subscribe(
      res=> {console.log(res)
        location.reload()
    },
      err=> console.error(err)
    )
  }

  showAllContacts(){
    this.count+=1  
    this.commentsshow = true
    if (this.count == 2){
      this.commentsshow = false
      this.count=0
    }
    else{
      this.downloadAllUsers(this.myUser._id)
    }
  }

  downloadAllUsers(myid: string){

  }

}
