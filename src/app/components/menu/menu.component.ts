import { Component, OnInit } from '@angular/core';
/* import {SidebarModule } from 'cdbangular'; */
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterAndLoginService } from '../../services/services/users.service'
import { CookieService } from 'ngx-cookie-service';
import { json } from 'express';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, public router: Router, public cookie: CookieService) { }

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

  createPost(form: NgForm){

  }

}
