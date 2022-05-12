import { Component, OnInit } from '@angular/core';
/* import {SidebarModule } from 'cdbangular'; */
import { Event, Router } from '@angular/router';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { PostsService } from '../../services/posts/posts.service'
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ObjectId } from 'mongodb';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ReadVarExpr } from '@angular/compiler';
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

  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.mycookie = cookiefound
      this.downloadPostsWithComments(cookiefound)
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

  createPost(form: NgForm){
    this.postsService.createPost(form.value, this.cookie.get('cookieSoundTalkSession'),this.audioid, this.photoid).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    )
  }

  addComment(form: NgForm, postid: string){
    this.postsService.putCommentinPost(form.value, this.cookie.get('cookieSoundTalkSession'),postid).subscribe(
      res => {console.log(res)
        location.reload()   
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

  downloadPostsWithComments(cookiefound: string){
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
                res=> {const a = JSON.stringify(res)
                      const b = JSON.parse(a)
                      this.posts[i].userid = b.username
                      this.postsService.getPhoto(this.posts[i].photoid).subscribe(
                        res=> {const restring = JSON.stringify(res)
                              const res2 = restring.slice(43)
                              const route = res2.slice(0, res2.length - 1);
                              this.posts[i].photoid = route
                              this.postsService.getAudio(this.posts[i].audioid).subscribe(
                                res => {
                                  this.posts[i].audioid = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))
                                  for (let x = 0; x < this.posts[i].commentsid.length; x++){
                                    this.registerandloginService.getAllComments(this.posts[i].commentsid[x]).subscribe(
                                      res=>{
                                      const a = JSON.stringify(res)
                                      const b = JSON.parse(a)
                                      this.posts[i].commentsid[x] = b
                                      this.registerandloginService.getUsersofPosts(b.userid).subscribe(
                                      res=>{const a = JSON.stringify(res)
                                        const b = JSON.parse(a)
                                        this.posts[i].commentsid[x].username = b.username
                                      },
                                      err=>console.error(err))
                                    },
                                      err=>console.error(err)
                                    )

                                  }
                                },
                                err => this.posts[i].audioid = err
                              )
                        },
                        err => console.error(err)
                      )
                    },
                err=> console.error(err) 
              )
            }
            this.posts = this.posts.reverse()
            console.log("EL RESULTAO",this.posts)
          },
          err => console.error(err)
        )
      },
      err => console.error(err),
    )
  }

  deleteComment(commentid: string, postid: string){
    this.postsService.deleteComment(commentid, postid).subscribe(
      res => {console.log(res)
        location.reload()   
      },
      err => console.error(err)
    ) 
  }
}
