import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomStateMatcher } from '../../Utilities/custom-state-matcher';
import { CustomValidatorsService } from '../../Utilities/custom-validators.service';
import { UnitDialogData } from 'src/app/models/unit-dialog';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-create-unit-dialog',
  templateUrl: './create-unit-dialog.component.html',
  styleUrls: ['./create-unit-dialog.component.scss']
})
export class CreateUnitDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:UnitDialogData,private CustomVal:CustomValidatorsService) {
    }

  unitNameFormControl=new FormControl(this.data, [Validators.required,this.CustomVal.noWhitespaceValidator]);

  matcher = new CustomStateMatcher();
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick(): void {
    if(!this.unitNameFormControl.invalid){
      this.dialogRef.close(this.unitNameFormControl.value);
    }
  }
}
