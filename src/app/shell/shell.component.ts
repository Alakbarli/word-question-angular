import { state, style, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../main/services/language.service';
import { ShellService } from './shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations:[],
})
export class ShellComponent implements OnInit,AfterViewInit {

  isLoading=false;
  isMobile:boolean=false;
  showMobile:boolean=false;
  showDesc:boolean=false;


  constructor(private shellService:ShellService,private router:ActivatedRoute,private langService:LanguageService,private cd:ChangeDetectorRef) { 
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
  }
  ngAfterViewInit(): void {
    //this.pageloaded=true;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.shellService.isLoading$.subscribe(res=>{
      this.isLoading=res;
    })
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
  closeSideNav(){
    if(this.isMobile){
      this.toggleMainMenu()
    }
    
  }
  onResize(event:any) {
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
  }

}
