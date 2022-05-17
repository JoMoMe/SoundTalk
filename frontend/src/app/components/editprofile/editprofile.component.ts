import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { PostsService } from '../../services/posts/posts.service'
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { updatedusers as Updatedusers } from 'src/app/models/updatedusers';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(private http: HttpClient, public registerandloginService: RegisterAndLoginService, public postsService: PostsService, public router: Router, public cookie: CookieService, public sanitizer: DomSanitizer, private route: ActivatedRoute) { }


  public mycookie: any
  public user: any
  public profileuser: any
  public status: any
  public gender: any

  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.mycookie = cookiefound
      this.registerandloginService.findUserByID(cookiefound).subscribe(
        res=> {console.log("tienes la cookie, bienvenido!")
        this.downloadProfile(this.mycookie)
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
                this.user = [this.user]
                console.log("userfinal",this.user)
              },
        err => console.error(err))
      },
      err => console.error(err)
    )
  }

  seeProfile(userid: string){
    this.router.navigate(['/profile'], {queryParams: {id: userid}})
  }

  updateUser(form: NgForm){
    console.log(form.value)

    let user : Updatedusers = {
      _id: this.mycookie,
      username: form.value.username,
      biography: form.value.biography,
      ubication: form.value.ubication,
      gender: form.value.gender,
      photoid: form.value.photoid,
    }
      
    if (form.value.gender) {
      const genderstring = JSON.stringify(form.value.gender)
      const mygender = JSON.parse(genderstring)
      user.gender = mygender
    }

    if (form.value.status) {
      const statusstring = JSON.stringify(form.value.status)
      const mystatus = JSON.parse(statusstring)
      user.status = mystatus
    }

    if (form.value.photoid) {
      const photostring = JSON.stringify(form.value.photoid)
      const myphoto = JSON.parse(photostring)
      user.photoid = myphoto
    }

    console.log("a ver que pasa", user )

    
    //this.registerandloginService.updatemyUser(user).subscribe(
      //res => {console.log(res)
      //},
      //err => console.error(err)
    //)
  }

  changeFilterStatus(value: string, form: NgForm){
    form.value.gender = value
  }

  changeFilterGender(value: string){
    this.status = value
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
  public photoid: any

  onFileChanged(event: any): any{
    this.selectedFile = event.target.files[0]
    this.postsService.putPhoto(this.selectedFile).subscribe(
      res => this.photoid = res,
      err => console.error(err)
    )  
  }

}
