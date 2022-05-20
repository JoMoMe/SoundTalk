import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public STres: boolean = true
  public STerror: boolean = true

  constructor(public registerandloginService: RegisterAndLoginService, public cookie: CookieService, public router: Router,) { }

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
      console.log("Registrate porfavor!")
      this.router.navigate(['/register'])   
    }      
  }

  created(){
    this.STerror = true
		this.STres = false
    console.log("Created")
	}

  error(){
    this.STres = true
    this.STerror = false
    console.log("Error")
    
  }

  searchMailAndCreate(form: NgForm){
    this.registerandloginService.createUser(form.value).subscribe(
      res => this.created(),
      err => this.error()
    )
  }
}
