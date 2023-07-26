import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogData } from 'src/app/models/common-dialog-data';
import { CreateWordDialogComponent } from '../create-word-dialog/create-word-dialog.component';
import { Story } from 'src/app/models/story';
import { KeyValue } from 'src/app/models/key-value';
import { Utility } from '../../Utilities/utility';
import { Fonts } from '../../const/fonts';

@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss']
})
export class ReadStoryComponent implements OnInit {

  dialogTitle:string="Hekayə";
  mainButtonText:string="Bağla";

  nightMode:boolean=false;

  content:string;

  stanartSize=1;

  fontList:Array<KeyValue<string,string>>;
  constructor(public dialogRef: MatDialogRef<CreateWordDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:CommonDialogData<Story>) {
    this.content=data.model.content;
    this.loadLookUps()
   }

  ngOnInit(): void {
  }
  onAddClick(){
    this.dialogRef.close();
  }
  changeMode(){
    this.nightMode=!this.nightMode;
    let elements=document.getElementsByTagName("mat-dialog-container");
    if(elements&&elements.length>0){
      let element=elements[0] as HTMLElement;
      if(this.nightMode){
        element.style.backgroundColor="black";
        element.style.color="white";
      }
      else{
        element.style.backgroundColor="white";
        element.style.color="black";
      }
    }
    
    
  }

  loadLookUps(){
    this.fontList=Utility.GenerateKeyValue(Fonts);
  }

  increase(){
    if(this.stanartSize<10){
      let element=document.getElementById("reaing-content") as HTMLElement;
      this.stanartSize=this.stanartSize+0.1;
      element.style.fontSize=this.stanartSize+"rem";
      element.style.lineHeight=this.stanartSize+0.5+"rem";
    }
    
  }
  decrease(){
    if(this.stanartSize>0.5){
      let element=document.getElementById("reaing-content") as HTMLElement;
      this.stanartSize=this.stanartSize-0.1;
      element.style.fontSize=this.stanartSize+"rem";
      element.style.lineHeight=this.stanartSize+0.5+"rem";
    }
  }

  changeFont(fontFamily:string):void{
    let element=document.getElementById("reaing-content") as HTMLElement;
      element.style.fontFamily=fontFamily;
  }

}
