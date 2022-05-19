import { Component, OnInit } from '@angular/core';
/* import {SidebarModule } from 'cdbangular'; */
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { PostsService } from '../../services/posts/posts.service'
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { contacts as Contacts } from 'src/app/models/contacts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, public registerandloginService: RegisterAndLoginService, public postsService: PostsService, public router: Router, public cookie: CookieService, public sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  public mycookie: any
  public user: any
  public profileuser: any
  public isContact: boolean | undefined
  public isRequested: boolean | undefined


  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.mycookie = cookiefound
      this.registerandloginService.findUserByID(cookiefound).subscribe(
        res=> {console.log("tienes la cookie, bienvenido!")
              this.route.queryParamMap.subscribe((params) => {
                this.profileuser = {...params };
                this.profileuser = this.profileuser.params.id
                }
              )
              let www = this.profileuser
              this.downloadProfile(www)
        },
        err=> {console.error(err)
        console.log("Logueate porfavor!")
        this.router.navigate(['/login'])
        }
      )
    } 
    else{
      console.log("Logueate porfavor!")
      this.router.navigate(['/login'])   
    }   
  }

  downloadProfile(userid: string){
    this.registerandloginService.getUserInfo(userid).subscribe(
      res => {this.user = res
      this.registerandloginService.findPhoto(this.user.photoid).subscribe(
        res=> {const restring = JSON.stringify(res)
              if (restring.includes("/")){
                const res2 = restring.split('/')
                const route = res2[7].slice(0, res2[7].length - 1);
                console.log(route)
                this.user.myphoto = route
              }
              else{
                const res2 = restring.split('\\')
                const route = res2[14].slice(0, res2[14].length - 1);
                console.log(route)
                this.user.myphoto = route
              }
          this.registerandloginService.findLikes(this.user._id).subscribe(
            res => {this.user.mylikes = res
                    this.registerandloginService.findmyPosts(this.user._id).subscribe(
                      res => {this.user.myposts = res
                              let photocopy = this.user.myposts
                              for (let i = 0; i < this.user.myposts.length; i++) {
                                this.postsService.getPhoto(this.user.myposts[i].photoid).subscribe(
                                  res=> {const restring = JSON.stringify(res)
                                        if (restring.includes("/")){
                                          const res2 = restring.split('/')
                                          const route = res2[7].slice(0, res2[7].length - 1);
                                          photocopy[i].photoid = route
                                        }
                                        else{
                                          const res2 = restring.split('\\')
                                          const route = res2[14].slice(0, res2[14].length - 1);
                                          photocopy[i].photoid = route
                                        }
                                        this.postsService.getAudio(photocopy[i].audioid).subscribe(
                                          res => {
                                            photocopy[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                          },
                                          err => photocopy[i].audioid = err
                                        )
                                  },
                                  err => console.error(err)
                                )
                              }
                              for (let i = 0; i < this.user.contactsid.length; i++) {
                                var coincidence=0
                                if (this.mycookie == this.user.contactsid[i]){
                                  coincidence+=1
                                }
                                if (coincidence>0){
                                  this.isContact = true
                                }
                                else{
                                  this.isContact = false
                                }
                              }
                              this.registerandloginService.checkRequests(userid, this.mycookie).subscribe(
                                (res:any) => {
                                  this.isRequested = res.isRequested
                                },
                                err=>console.error(err)
                              )
                              this.user = [this.user]
                              console.log("userfinal",this.user)
                      },
                      err => console.error(err)
                    )
            },
            err => console.error(err)
          )
        },
        err => console.error(err)
      )
    },
      err => console.error(err)
    )
  }

  downloadComments(comments: any){
    for (let x = 0; x < comments.length; x++){
      this.registerandloginService.getAllComments(comments[x]).subscribe(
        res=>{
        const a = JSON.stringify(res)
        const b = JSON.parse(a)
        comments[x] = b
        this.registerandloginService.getUsersofPosts(b.userid).subscribe(
        res=>{const a = JSON.stringify(res)
          const b = JSON.parse(a)
          comments[x].username = b.username
        },
        err=>console.error(err))
      },
        err=>console.error(err)
      )

    }
  }

  deleteComment(commentid: string, postid: string){
    this.postsService.deleteComment(commentid, postid).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    ) 
  }

  seeProfile(userid: string){
    this.registerandloginService.getUserInfo(userid).subscribe(
      res => {console.log(res)
      },
      err => console.error(err)
    ) 
  }

  putLike(postid: string){
    this.postsService.putLikeinPost(this.cookie.get('cookieSoundTalkSession'), postid).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    ) 
  }

  addComment(form: NgForm, postid: string){
    this.postsService.putCommentinPost(form.value, this.cookie.get('cookieSoundTalkSession'),postid).subscribe(
      res => {console.log(res)
        window.location.reload()   
      },
      err => console.error(err)
    ) 
  }

  deletePost(userid: string, postid: string){
    this.postsService.deleteAPost(userid, postid).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    ) 
  }

  sendFriendRequest(myuserid: string, userrequestid: string){
    const myuserstring = JSON.stringify(myuserid)
    const myuser = JSON.parse(myuserstring)

    const requeststring = JSON.stringify(userrequestid)
    const userrequest = JSON.parse(requeststring)

    let contacts: Contacts = {
      myuserid: myuser,
      userrequestid: userrequest,
      status: 0,
    }

    this.registerandloginService.addFriendRequest(contacts).subscribe(
      (res:any) => {
        this.isRequested = res.isRequested
        location.reload()
      },
      err => console.error(err)
    ) 
  }

  denyFriendRequest(myid: string, iduser: string){
    this.registerandloginService.deleteUserRequest(iduser, myid).subscribe(
      res=> {console.log(res)
        location.reload()
    },
      err=> console.error(err)
    )
  }

}
