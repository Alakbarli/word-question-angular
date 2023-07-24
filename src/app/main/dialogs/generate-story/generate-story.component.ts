import { Component, Inject, OnInit } from '@angular/core';
import { AIModels } from '../../const/ai-models';
import { StoryLenght } from '../../const/story-lenght';
import { LanguageLevels } from '../../const/language-levels';
import { CreateWordDialogComponent } from '../create-word-dialog/create-word-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogData } from 'src/app/models/common-dialog-data';
import { Story } from 'src/app/models/story';
import { CustomValidatorsService } from '../../Utilities/custom-validators.service';
import { LanguageService } from '../../services/language.service';
import { DialogActionTypes } from '../../const/dialog-action-types';
import { CustomStateMatcher } from '../../Utilities/custom-state-matcher';

@Component({
  selector: 'app-generate-story',
  templateUrl: './generate-story.component.html',
  styleUrls: ['./generate-story.component.scss']
})
export class GenerateStoryComponent implements OnInit {
  dialogTitle:string="Hekayə yarat";
  mainButtonText:string="Əlavə et";
  isDelete:boolean=false;

  motor:AIModels;
  tags:string;
  length:StoryLenght;
  level:LanguageLevels;

  constructor(public dialogRef: MatDialogRef<CreateWordDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:CommonDialogData<Story>,private CustomVal:CustomValidatorsService,private langService:LanguageService) {
    this.setDialogTexts();
   }
  matcher = new CustomStateMatcher();
  ngOnInit(): void {
  }
  setDialogTexts(){
    switch(this.data.actionType){
      case DialogActionTypes.delete:
        this.dialogTitle="Hekayəni sil";
        this.mainButtonText="Sil";
        this.isDelete=true;
        break;
    }
  }

}
