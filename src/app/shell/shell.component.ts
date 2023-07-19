import { state, style, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '../main/services/language.service';
import { ShellService } from './shell.service';
import { CasheService } from '../main/services/cashe.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../main/dialogs/confirm-dialog/confirm-dialog.component';

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
  activeRoute:string;

  constructor(public dialog:MatDialog,private shellService:ShellService,private cacheService:CasheService,private router:Router,private route:ActivatedRoute,private langService:LanguageService,private cd:ChangeDetectorRef) { 
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
    if(cacheService.cache?.activePage){
      router.navigate([cacheService.cache.activePage]);
    }
  }
  ngAfterViewInit(): void {
    //this.pageloaded=true;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        let page=val.url.substring(val.url.lastIndexOf("/")+1,val.url.length);
        this.cacheService.cache.activePage=page;
        this.cacheService.setCashe();
      }
      
  });
    this.shellService.isLoading$.subscribe(res=>{
      this.isLoading=res;
    })
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
  }
  generateJson(){
    this.langService.generateJson();
  }
  clearData(){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // height: '400px',
      // width: '600px',
     });
     dialogRef.afterClosed().subscribe(
       data=>{
         if(data){
          this.langService.clear();
          window.location.reload();
         }
       }
     )
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
