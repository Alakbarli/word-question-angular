import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShellService } from '../shell.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  nightMode:boolean=false;
  constructor(private cd :ChangeDetectorRef,private shellService:ShellService) { }

  ngOnInit(): void {
  }
  watchNightMode(){
    this.shellService.nightMode$.subscribe(
      res=>{
        this.nightMode=res;
        this.cd.detectChanges();
      }
    )
  }

}
