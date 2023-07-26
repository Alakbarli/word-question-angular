import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogData } from 'src/app/models/common-dialog-data';
import { CreateWordDialogComponent } from '../create-word-dialog/create-word-dialog.component';
import { Story } from 'src/app/models/story';

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
  constructor(public dialogRef: MatDialogRef<CreateWordDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:CommonDialogData<Story>) {
    this.content=data.model.content;
   }

  ngOnInit(): void {
  }
  onAddClick(){
    this.dialogRef.close();
  }
  changeMode(){
    this.nightMode=!this.nightMode;
  }

}
