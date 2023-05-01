import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations:[],
})
export class ShellComponent implements OnInit {

  isMobile:boolean=false;
  showMobile:boolean=false;
  showDesc:boolean=false;
  showNavDrop:boolean=false;


  constructor(private router:ActivatedRoute) { 
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
  }

  ngOnInit(): void {
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
  }
  toggleMainMenu():void{
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
    if (this.isMobile) {
      this.showMobile=!this.showMobile;
  } else {
    this.showDesc=!this.showDesc;
  }
  }
  toggleNavItem():void{
    this.showNavDrop=!this.showNavDrop;
  }

}
