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

  constructor(private http: HttpClient, public registerandloginService: RegisterAndLoginService, public postsService: PostsService, public router: Router, public cookie: CookieService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.registerandloginService.findUserByID(cookiefound).subscribe(
        res => {
          console.log(res)
          console.log("tienes la cookie, bienvenido!")
          this.router.navigate(['/menu'])
        },
        err => console.error(err),
      )
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
      console.log(image)
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
        resolve({
          base: reader.result
        })
      }
      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    }
    catch (e){
      reject(e)
    }
  })

  uploadFile(): any{
/*     try{
      const formulary = new FormData()
      this.files.forEach(element => {
        console.log(element)
        formulary.append('photo', element) 
      })

      this.http.post('http://localhost:4005/menu', formulary).subscribe(
        res => {
          console.log(res)
        },
        err => console.error(err)
      )
    }
    catch (err){
      console.log(err)
    } */
  }

  createPost(form: NgForm){
    this.postsService.createPost(form.value, this.cookie.get('cookieSoundTalkSession')).subscribe(
      res => {console.log(res)
      },
      err => console.error(err)
    )
  }
}
