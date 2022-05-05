import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, public router: Router) { 
  }
  
  ngOnInit() {
      this.registerandloginService.verifyToken().subscribe(
        res => console.log(res),
        err => console.error(err)
      )
  }
}
