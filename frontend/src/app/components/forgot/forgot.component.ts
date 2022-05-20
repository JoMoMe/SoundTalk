import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { RegisterAndLoginService } from '../../services/users/users.service'

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService,) { }

  ngOnInit(): void {
  }

  created(){
    console.log("Mail enviado")
	}

  error(){
    console.log("Error")
    
  }

  searchMailAndUpdate(form: NgForm){
    this.registerandloginService.changePassword(form.value).subscribe(
      res => this.created(),
      err => this.error()
    )
  }

}
