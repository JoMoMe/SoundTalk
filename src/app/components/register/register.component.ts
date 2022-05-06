import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/users/users.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService) { }

  ngOnInit(): void {
  }

  searchMailAndCreate(form: NgForm){
    this.registerandloginService.createUser(form.value).subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }
}
