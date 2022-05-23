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
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private http: HttpClient, public registerandloginService: RegisterAndLoginService, public postsService: PostsService, public router: Router, public cookie: CookieService, public sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  public mycookie: any
  public myuser: any
  public contacts: any
  public mychats: any
  public messages: any
  public actualuser: any
  public showForm: boolean | undefined
  public count = 0
  public idmensactual: any
  public searchContact: any

  ngOnInit(): void {
    var cookiefound = this.cookie.get('cookieSoundTalkSession')
    if (cookiefound){
      this.mycookie = cookiefound
      this.registerandloginService.findUserByID(cookiefound).subscribe(
        res=> {console.log("tienes la cookie, bienvenido!", res)
        this.downloadContacts(this.mycookie)
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
      res => {this.myuser = res
              this.myuser = [this.myuser]
              this.registerandloginService.findPhoto(this.myuser[0].photoid).subscribe(
                res=> {const restring = JSON.stringify(res)
                  if (restring.includes("/")){
                    const res2 = restring.split('/')
                    const route = res2[7].slice(0, res2[7].length - 1);
                    this.myuser[0].photoroute = route
                  }
                  else{
                    const res2 = restring.split('\\')
                    const route = res2[14].slice(0, res2[14].length - 1);
                    this.myuser[0].photoroute = route
                  }
                }
              )
              console.log("MI USER ",this.myuser)
              this.contacts = [this.contacts]
              for (let y = 0; y < this.myuser[0].contactsid.length; y++){
                this.registerandloginService.getUserInfo(this.myuser[0].contactsid[y]).subscribe(
                  res => {
                    this.contacts[y] = res                    
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
              console.log(this.contacts)             
    },
    err=>console.error(err)
    )
  }

  openChat(userid: string){
    this.registerandloginService.openOneChat(userid, this.mycookie).subscribe(
      res => {this.messages = res
              this.messages = [this.messages]
              this.registerandloginService.getUserInfo(userid).subscribe(
                res => {this.actualuser = res
                        this.actualuser = [this.actualuser]
                        this.registerandloginService.findPhoto(this.actualuser[0].photoid).subscribe(
                          res=> {const restring = JSON.stringify(res)
                            if (restring.includes("/")){
                              const res2 = restring.split('/')
                              const route = res2[7].slice(0, res2[7].length - 1);
                              this.actualuser[0].photoroute = route
                            }
                            else{
                              const res2 = restring.split('\\')
                              const route = res2[14].slice(0, res2[14].length - 1);
                              this.actualuser[0].photoroute = route
                            }
                          }
                        )              
                        console.log("LOS MENSAJES CON ESTE CHAT",this.messages)
                        console.log("EL USUARIO DE ESTE CHAT", this.actualuser)
                },
                err => console.error(err))
      },
      err => console.error(err))
  }

  seeProfile(userid: string){
    this.router.navigate(['/profile'], {queryParams: {id: userid}})
  }

  sendMessage(form: NgForm, userid: string){
    this.registerandloginService.sendAMessage(form.value, userid, this.mycookie).subscribe(
      res => {this.openChat(userid)},
      err => console.error(err)
    )
  }

  deleteMessage(userid: string, mensid: string){
    this.registerandloginService.deleteAMessage(userid, mensid, this.mycookie).subscribe(
      res => {this.openChat(userid)},
      err => console.error(err)
    )
  }

  showEditForm(mensid: string){
    this.idmensactual = mensid
    this.count+=1
    if (this.count > 1){
      if (this.showForm == true){
        this.showForm = false
      }
      if (this.showForm == false){
        this.showForm = true
      }
    }
    else{
      this.showForm = true
    }
  }

  editMessage(userid: string, form: NgForm){
    this.registerandloginService.editAMessage(userid, this.idmensactual, form.value, this.mycookie).subscribe(
      res => {this.openChat(userid)
        this.showForm = false
      },
      err => console.error(err)
    )
  }

}