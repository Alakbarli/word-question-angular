import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WordDialogData } from 'src/app/models/word-dialog-data';
import { CustomValidatorsService } from '../../Utilities/custom-validators.service';
import { DialogActionTypes } from '../../const/dialog-action-types';
import { Unit } from 'src/app/models/unit';
import { LanguageService } from '../../services/language.service';
import { FormControl, Validators } from '@angular/forms';
import { CustomStateMatcher } from '../../Utilities/custom-state-matcher';
import { CasheService } from '../../services/cashe.service';

@Component({
  selector: 'app-create-word-dialog',
  templateUrl: './create-word-dialog.component.html',
  styleUrls: ['./create-word-dialog.component.scss']
})
export class CreateWordDialogComponent implements OnInit {
  dialogTitle:string="Söz əlavə et";
  mainButtonText:string="Əlavə et";
  isDelete:boolean=false;
  unitList:Array<Unit>|null|undefined;
  constructor(private cs:CasheService,public dialogRef: MatDialogRef<CreateWordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:WordDialogData,private CustomVal:CustomValidatorsService,private langService:LanguageService) { 
      this.unitList=langService.db.Units;
    }
    unitIdControl=new FormControl(+(this.data.unitId as number), [Validators.required]);
    nameAzControl=new FormControl(this.data.nameAz, [Validators.required,this.CustomVal.noWhitespaceValidator]);
    nameEnControl=new FormControl(this.data.nameEn, [Validators.required,this.CustomVal.noWhitespaceValidator]);

    matcher = new CustomStateMatcher();
  
  ngOnInit(): void {
    this.setDialogTexts();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick(): void {
    if(!this.buttonStatus){
      this.dialogRef.close(new WordDialogData(this.nameAzControl.value,this.nameEnControl.value,this.unitIdControl.value,DialogActionTypes.add));
    }
    if(this.isDelete){
      this.dialogRef.close(true);
    }
  }
  submit(){
    this.onAddClick();
  }
  get buttonStatus(){
    return (((this.unitIdControl.invalid||this.nameAzControl.invalid||this.nameEnControl.invalid)
    ||(this.unitIdControl.value==this.data.unitId&&this.nameAzControl.value==this.data.nameAz&&this.nameEnControl.value==this.data.nameEn))&&!this.isDelete)
  }
  setDialogTexts(){
    switch(this.data.actionType){
      case DialogActionTypes.update:
        this.dialogTitle="Sözdə düzəliş et";
        this.mainButtonText="Düzəliş et";
        break;
      case DialogActionTypes.delete:
        this.dialogTitle="Sözü sil";
        this.mainButtonText="Sil";
        this.isDelete=true;
        break;
      case DialogActionTypes.add:
          if(this.cs.cache.selectedUnit){
            this.unitIdControl=new FormControl(this.cs.cache.selectedUnit, [Validators.required]);
          }
        break;
    }
  }

  change(){
    this.cs.cache.selectedUnit=this.unitIdControl.value as number;
    this.cs.setCashe();
  }

}
