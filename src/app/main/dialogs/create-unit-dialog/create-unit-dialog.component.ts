import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-unit-dialog',
  templateUrl: './create-unit-dialog.component.html',
  styleUrls: ['./create-unit-dialog.component.scss']
})
export class CreateUnitDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
