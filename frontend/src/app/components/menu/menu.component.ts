import { Component, OnInit } from '@angular/core';
/* import {SidebarModule } from 'cdbangular'; */
import { Router } from '@angular/router';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { PostsService } from '../../services/posts/posts.service'
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sanitization: any;

  constructor(private http: HttpClient, public registerandloginService: RegisterAndLoginService, public postsService: PostsService, public router: Router, public cookie: CookieService, public sanitizer: DomSanitizer) { }

  public posts: any
  public comments: any;
  public mycookie: any
  public commentsshow: any
  public count = 0

  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.mycookie = cookiefound
      this.downloadPosts(cookiefound)
    } 
    else{
      console.log("Logueate porfavor!")
      this.router.navigate(['/login'])   
    }      
  }

  public files: any = []
  public previsualize: any

  
  captureFile(event: any): any{
    var file = event.target.files[0]
    this.converttoBase64(file).then((image: any) => {
      this.previsualize = image.base;
    })
    this.files.push(file)
  }

  converttoBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event)
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload = () => {
        return resolve({
          base: reader.result
        })
      }
      reader.onerror = error => {
        return resolve({
          base: null
        })
      }
    }
    catch (e){
      reject(e)
    }
  })

  public selectedFile: any
  public selectedAudio: any
  public audioid: any
  public photoid: any
  public typepost: any

  onFileChanged(event: any): any{
    this.selectedFile = event.target.files[0]
    this.postsService.putPhoto(this.selectedFile).subscribe(
      res => this.photoid = res,
      err => console.error(err)
    )  
  }

  onAudioUpload(event: any): any{
    this.selectedAudio = event.target.files[0]
    this.postsService.putAudio(this.selectedAudio).subscribe(
      res => this.audioid = res,
      err => console.error(err)
    )  
  }

  changeFilter(value: string){
    this.typepost = value
  }

  searchFilter(value: string){
    this.typepost = value
  }

  createPost(form: NgForm){
    this.postsService.createPost(form.value, this.cookie.get('cookieSoundTalkSession'),this.audioid, this.photoid, this.typepost).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    )
  }

  seeProfile(userid: string){
    this.registerandloginService.getUserInfo(userid).subscribe(
      res => {console.log(res)
              const a = JSON.stringify(res)
              const b = JSON.parse(a)
        this.router.navigate(['/profile'], {queryParams: {id: b._id}})   
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

  putLike(postid: string){
    this.postsService.putLikeinPost(this.cookie.get('cookieSoundTalkSession'), postid).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    ) 
  }

  downloadPosts(cookiefound: string){
    this.registerandloginService.findUserByID(cookiefound).subscribe(
      res => {
        console.log(res)
        console.log("tienes la cookie, bienvenido!")
        this.router.navigate(['/menu'])
        this.registerandloginService.getAllposts().subscribe(
          res => {
            this.posts = res
            for (let i = 0; i < this.posts.length; i++) {
              this.registerandloginService.getUsersofPosts(this.posts[i].userid).subscribe(
                res=> {
                      const a = JSON.stringify(res)
                      const b = JSON.parse(a)
                      this.posts[i].username = b.username
                      this.registerandloginService.findUserByID(this.posts[i].userid).subscribe(
                        res => {this.posts[i].userinfo = res,
                          this.registerandloginService.findPhoto(this.posts[i].userinfo.photoid).subscribe(
                            res=> {const restring = JSON.stringify(res)
                              if (restring.includes("/")){
                                const res2 = restring.split('/')
                                const route = res2[7].slice(0, res2[7].length - 1);
                                this.posts[i].photoroute = route
                              }
                              else{
                                const res2 = restring.split('\\')
                                const route = res2[14].slice(0, res2[14].length - 1);
                                this.posts[i].photoroute = route
                              }
                              this.postsService.getPhoto(this.posts[i].photoid).subscribe(
                                res=> {const restring = JSON.stringify(res)
                                      if (restring.includes("/")){
                                        const res2 = restring.split('/')
                                        const route = res2[7].slice(0, res2[7].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      else{
                                        const res2 = restring.split('\\')
                                        const route = res2[14].slice(0, res2[14].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      this.postsService.getAudio(this.posts[i].audioid).subscribe(
                                        res => {
                                          this.posts[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                        },
                                        err => this.posts[i].audioid = err
                                      )
                                },
                                err => console.error(err)
                              )
                            },
                        err=> console.error(err) 
                      )
                            },
                        err => console.error(err)
                      )
                        },
                        err => console.error(err)
                      )
            }
            console.log("RESULTAO", this.posts)
          },
          err => console.error(err)
        )
      },
      err => console.error(err),
    )
  }

  showComments(commentsid: string, postid: string){
      this.count+=1  
      this.commentsshow = postid
      if (this.count == 2){
        this.commentsshow = null
        this.count=0
      }
      else{
        this.downloadComments(commentsid)
      }
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
          this.registerandloginService.findPhoto(b.photoid).subscribe(
            res=> {const restring = JSON.stringify(res)
              if (restring.includes("/")){
                const res2 = restring.split('/')
                const route = res2[7].slice(0, res2[7].length - 1);
                comments[x].photoroute = route
              }
              else{
                const res2 = restring.split('\\')
                const route = res2[14].slice(0, res2[14].length - 1);
                comments[x].photoroute = route
              }
            },
            err => console.error(err)
          )
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

  filterbyNews(){
    this.registerandloginService.findUserByID(this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {
        console.log(res)
        console.log("tienes la cookie, bienvenido!")
        this.router.navigate(['/menu'])
        this.registerandloginService.getpostsbyNews().subscribe(
          res => {
            this.posts = res
            for (let i = 0; i < this.posts.length; i++) {
              this.registerandloginService.getUsersofPosts(this.posts[i].userid).subscribe(
                res=> {
                      const a = JSON.stringify(res)
                      const b = JSON.parse(a)
                      this.posts[i].username = b.username
                      this.registerandloginService.findUserByID(this.posts[i].userid).subscribe(
                        res => {this.posts[i].userinfo = res,
                          this.registerandloginService.findPhoto(this.posts[i].userinfo.photoid).subscribe(
                            res=> {const restring = JSON.stringify(res)
                              if (restring.includes("/")){
                                const res2 = restring.split('/')
                                const route = res2[7].slice(0, res2[7].length - 1);
                                this.posts[i].photoroute = route
                              }
                              else{
                                const res2 = restring.split('\\')
                                const route = res2[14].slice(0, res2[14].length - 1);
                                this.posts[i].photoroute = route
                              }
                              this.postsService.getPhoto(this.posts[i].photoid).subscribe(
                                res=> {const restring = JSON.stringify(res)
                                      if (restring.includes("/")){
                                        const res2 = restring.split('/')
                                        const route = res2[7].slice(0, res2[7].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      else{
                                        const res2 = restring.split('\\')
                                        const route = res2[14].slice(0, res2[14].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      this.postsService.getAudio(this.posts[i].audioid).subscribe(
                                        res => {
                                          this.posts[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                        },
                                        err => this.posts[i].audioid = err
                                      )
                                },
                                err => console.error(err)
                              )
                            },
                        err=> console.error(err) 
                      )
                            },
                        err => console.error(err)
                      )
                        },
                        err => console.error(err)
                      )
            }
            console.log("RESULTAO", this.posts)
          },
          err => console.error(err)
        )
      },
      err => console.error(err),
    )
  }

  filterbyGossips(){
    this.registerandloginService.findUserByID(this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {
        console.log(res)
        console.log("tienes la cookie, bienvenido!")
        this.router.navigate(['/menu'])
        this.registerandloginService.getpostsbyGossips().subscribe(
          res => {
            this.posts = res
            for (let i = 0; i < this.posts.length; i++) {
              this.registerandloginService.getUsersofPosts(this.posts[i].userid).subscribe(
                res=> {
                      const a = JSON.stringify(res)
                      const b = JSON.parse(a)
                      this.posts[i].username = b.username
                      this.registerandloginService.findUserByID(this.posts[i].userid).subscribe(
                        res => {this.posts[i].userinfo = res,
                          this.registerandloginService.findPhoto(this.posts[i].userinfo.photoid).subscribe(
                            res=> {const restring = JSON.stringify(res)
                              if (restring.includes("/")){
                                const res2 = restring.split('/')
                                const route = res2[7].slice(0, res2[7].length - 1);
                                this.posts[i].photoroute = route
                              }
                              else{
                                const res2 = restring.split('\\')
                                const route = res2[14].slice(0, res2[14].length - 1);
                                this.posts[i].photoroute = route
                              }
                              this.postsService.getPhoto(this.posts[i].photoid).subscribe(
                                res=> {const restring = JSON.stringify(res)
                                      if (restring.includes("/")){
                                        const res2 = restring.split('/')
                                        const route = res2[7].slice(0, res2[7].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      else{
                                        const res2 = restring.split('\\')
                                        const route = res2[14].slice(0, res2[14].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      this.postsService.getAudio(this.posts[i].audioid).subscribe(
                                        res => {
                                          this.posts[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                        },
                                        err => this.posts[i].audioid = err
                                      )
                                },
                                err => console.error(err)
                              )
                            },
                        err=> console.error(err) 
                      )
                            },
                        err => console.error(err)
                      )
                        },
                        err => console.error(err)
                      )
            }
            console.log("RESULTAO", this.posts)
          },
          err => console.error(err)
        )
      },
      err => console.error(err),
    )
  }

  filterbyQAndA(){
    this.registerandloginService.findUserByID(this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {
        console.log(res)
        console.log("tienes la cookie, bienvenido!")
        this.router.navigate(['/menu'])
        this.registerandloginService.getpostsbyQAndA().subscribe(
          res => {
            this.posts = res
            for (let i = 0; i < this.posts.length; i++) {
              this.registerandloginService.getUsersofPosts(this.posts[i].userid).subscribe(
                res=> {
                      const a = JSON.stringify(res)
                      const b = JSON.parse(a)
                      this.posts[i].username = b.username
                      this.registerandloginService.findUserByID(this.posts[i].userid).subscribe(
                        res => {this.posts[i].userinfo = res,
                          this.registerandloginService.findPhoto(this.posts[i].userinfo.photoid).subscribe(
                            res=> {const restring = JSON.stringify(res)
                              if (restring.includes("/")){
                                const res2 = restring.split('/')
                                const route = res2[7].slice(0, res2[7].length - 1);
                                this.posts[i].photoroute = route
                              }
                              else{
                                const res2 = restring.split('\\')
                                const route = res2[14].slice(0, res2[14].length - 1);
                                this.posts[i].photoroute = route
                              }
                              this.postsService.getPhoto(this.posts[i].photoid).subscribe(
                                res=> {const restring = JSON.stringify(res)
                                      if (restring.includes("/")){
                                        const res2 = restring.split('/')
                                        const route = res2[7].slice(0, res2[7].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      else{
                                        const res2 = restring.split('\\')
                                        const route = res2[14].slice(0, res2[14].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      this.postsService.getAudio(this.posts[i].audioid).subscribe(
                                        res => {
                                          this.posts[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                        },
                                        err => this.posts[i].audioid = err
                                      )
                                },
                                err => console.error(err)
                              )
                            },
                        err=> console.error(err) 
                      )
                            },
                        err => console.error(err)
                      )
                        },
                        err => console.error(err)
                      )
            }
            console.log("RESULTAO", this.posts)
          },
          err => console.error(err)
        )
      },
      err => console.error(err),
    )
  }

  filterbyMemes(){
    this.registerandloginService.findUserByID(this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {
        console.log(res)
        console.log("tienes la cookie, bienvenido!")
        this.router.navigate(['/menu'])
        this.registerandloginService.getpostsbyMemes().subscribe(
          res => {
            this.posts = res
            for (let i = 0; i < this.posts.length; i++) {
              this.registerandloginService.getUsersofPosts(this.posts[i].userid).subscribe(
                res=> {
                      const a = JSON.stringify(res)
                      const b = JSON.parse(a)
                      this.posts[i].username = b.username
                      this.registerandloginService.findUserByID(this.posts[i].userid).subscribe(
                        res => {this.posts[i].userinfo = res,
                          this.registerandloginService.findPhoto(this.posts[i].userinfo.photoid).subscribe(
                            res=> {const restring = JSON.stringify(res)
                              if (restring.includes("/")){
                                const res2 = restring.split('/')
                                const route = res2[7].slice(0, res2[7].length - 1);
                                this.posts[i].photoroute = route
                              }
                              else{
                                const res2 = restring.split('\\')
                                const route = res2[14].slice(0, res2[14].length - 1);
                                this.posts[i].photoroute = route
                              }
                              this.postsService.getPhoto(this.posts[i].photoid).subscribe(
                                res=> {const restring = JSON.stringify(res)
                                      if (restring.includes("/")){
                                        const res2 = restring.split('/')
                                        const route = res2[7].slice(0, res2[7].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      else{
                                        const res2 = restring.split('\\')
                                        const route = res2[14].slice(0, res2[14].length - 1);
                                        this.posts[i].photoid = route
                                      }
                                      this.postsService.getAudio(this.posts[i].audioid).subscribe(
                                        res => {
                                          this.posts[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                        },
                                        err => this.posts[i].audioid = err
                                      )
                                },
                                err => console.error(err)
                              )
                            },
                        err=> console.error(err) 
                      )
                            },
                        err => console.error(err)
                      )
                        },
                        err => console.error(err)
                      )
            }
            console.log("RESULTAO", this.posts)
          },
          err => console.error(err)
        )
      },
      err => console.error(err),
    )
  }

}
