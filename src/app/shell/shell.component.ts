import { state, style, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../main/services/language.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations:[],
})
export class ShellComponent implements OnInit,AfterViewInit {

  pageloaded=false;
  isMobile:boolean=false;
  showMobile:boolean=false;
  showDesc:boolean=false;
  showNavDrop:boolean=false;


  constructor(private router:ActivatedRoute,private langService:LanguageService,private cd:ChangeDetectorRef) { 
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
  }
  ngAfterViewInit(): void {
    this.pageloaded=true;
    this.cd.detectChanges();
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
