import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/services/users.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerService: RegisterService) { }

  ngOnInit(): void {
  }

  searchMailAndCreate(form: NgForm){
      this.registerService.userWithMailExists(form.value.mail).subscribe(
        res => console.log(res),
        err => console.error(err)
      )

      this.registerService.createUser(form.value).subscribe(
        res => console.log(res),
        err => console.error(err)
      )
  }
}
