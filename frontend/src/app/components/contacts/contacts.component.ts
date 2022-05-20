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
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private http: HttpClient, public registerandloginService: RegisterAndLoginService, public postsService: PostsService, public router: Router, public cookie: CookieService, public sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  public mycookie: any
  public myuser: any
  public profileid: any
  public contacts: any
  public myuserinfo: any
  public requests: any


  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.mycookie = cookiefound
      this.registerandloginService.findUserByID(cookiefound).subscribe(
        res=> {console.log("tienes la cookie, bienvenido!")
        this.myuser = res
        this.route.queryParamMap.subscribe((params) => {
          this.profileid = {...params };
          this.profileid = this.profileid.params.id
          }
        )
        let www = this.profileid
        this.downloadContacts(www)
        this.myRequests(www)
        this.myuser = [this.myuser]
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

  downloadContacts(userid: string){
    this.registerandloginService.getUserInfo(userid).subscribe(
      res => {this.myuserinfo = res
              for (let y = 0; y < this.myuserinfo.contactsid.length; y++){
                this.registerandloginService.getUserInfo(this.myuserinfo.contactsid[y]).subscribe(
                  res => {
                    this.contacts = res
                    this.contacts = [this.contacts]
                    console.log("LA PRUEBA DEL DELITO",this.contacts)
                    this.registerandloginService.findPhoto(this.contacts[y].photoid).subscribe(
                      res=> {const restring = JSON.stringify(res)
                        if (restring.includes("/")){
                          const res2 = restring.split('/')
                          const route = res2[7].slice(0, res2[7].length - 1);
                          this.contacts[y].photoroute = route
                        }
                        else{
                          const res2 = restring.split('\\')
                          const route = res2[14].slice(0, res2[14].length - 1);
                          this.contacts[y].photoroute = route
                        }
                      }
                    )
                  },
                  err => console.error(err)
                )
                
              }
    },
    err=>console.error(err)
    )
  }

  seeProfile(userid: string){
    this.router.navigate(['/profile'], {queryParams: {id: userid}})
  }

  myRequests(userid: string){
    this.registerandloginService.getmyRequests(userid).subscribe(
      res=> {this.requests = res
            console.log("pruebas",this.requests)
            for (let y = 0; y < this.requests.length; y++){
              this.registerandloginService.findPhoto(this.requests[y].photoid).subscribe(
              res=> {const restring = JSON.stringify(res)
                if (restring.includes("/")){
                  const res2 = restring.split('/')
                  const route = res2[7].slice(0, res2[7].length - 1);
                  this.requests[y].photoroute = route
                }
                else{
                  const res2 = restring.split('\\')
                  const route = res2[14].slice(0, res2[14].length - 1);
                  this.requests[y].photoroute = route
                }
                this.requests = [this.requests]
                console.log("pruebas",this.requests)
              }
              )
            }
            
    },
      err=> console.error(err)
    )
  }

}
