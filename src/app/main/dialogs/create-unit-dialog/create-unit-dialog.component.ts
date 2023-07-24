import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomStateMatcher } from '../../Utilities/custom-state-matcher';
import { CustomValidatorsService } from '../../Utilities/custom-validators.service';
import { UnitDialogData } from 'src/app/models/unit-dialog';
import { DialogActionTypes } from '../../const/dialog-action-types';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-create-unit-dialog',
  templateUrl: './create-unit-dialog.component.html',
  styleUrls: ['./create-unit-dialog.component.scss']
})
export class CreateUnitDialogComponent implements OnInit {
  dialogTitle:string="Bölmə əlavə et";
  mainButtonText:string="Əlavə et";
  isDelete:boolean=false;
  constructor(public dialogRef: MatDialogRef<CreateUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:UnitDialogData,private CustomVal:CustomValidatorsService) {
      this.setDialogTexts();
    }

  unitNameFormControl=new FormControl(this.data.unitName, [Validators.required,this.CustomVal.noWhitespaceValidator]);

  matcher = new CustomStateMatcher();

  ngOnInit(): void {
  }
  setDialogTexts(){
    switch(this.data.actionType){
      case DialogActionTypes.update:
        this.dialogTitle="Bölmə adını dəyişdir";
        this.mainButtonText="Düzəliş et";
        break;
      case DialogActionTypes.delete:
        this.dialogTitle="Bölməni sil";
        this.mainButtonText="Sil";
        this.isDelete=true;
        break;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick(): void {
    if((!this.unitNameFormControl.invalid)&&this.unitNameFormControl.value!=this.data.unitName){
      this.dialogRef.close(this.unitNameFormControl.value);
    }
    if(this.isDelete){
      this.dialogRef.close(true);
    }
  }
  submit(){
    this.onAddClick();
  }
  keyup(e:KeyboardEvent){
    if(e.code=='Enter'){
      this.onAddClick();
    }
  }
}
