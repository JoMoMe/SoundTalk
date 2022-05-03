import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/services/users.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService) { }

  ngOnInit(): void {
  }

  searchAndLoginUser(form: NgForm){
    this.registerandloginService.loginUser(form.value).subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }
}
