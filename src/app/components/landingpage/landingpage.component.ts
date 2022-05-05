import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingpageComponent {

  images = [
    {src: "assets/img/Foto_Landing_4.png"},
    {src: "assets/img/Foto_Landing_3.png"},
    {src: "assets/img/Foto_Landing_2.png"},
    {src: "assets/img/Foto_Landing_1.png"}
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;

  }

}
