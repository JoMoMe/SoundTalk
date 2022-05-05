import { Component, OnInit } from '@angular/core';
import { RegisterAndLoginService } from '../../services/services/users.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  constructor(public registerandloginService: RegisterAndLoginService, public route: ActivatedRoute, public router: Router) { 
  }

  ngOnInit() {
      let token = this.route.snapshot.params['token'];
      this.registerandloginService.verifyToken(token).subscribe(
        res => {console.log(res)
          this.router.navigate(['/login'])
        },
        err => console.error(err)
      )
  }
}
