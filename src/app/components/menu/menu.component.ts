import { Component, OnInit } from '@angular/core';
/* import {SidebarModule } from 'cdbangular'; */
import { Router } from '@angular/router';
import { RegisterAndLoginService } from '../../services/services/users.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
