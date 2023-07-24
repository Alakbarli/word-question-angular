import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from 'src/app/models/snack-bar-data.model';

@Component({
  selector: 'app-error-snacbar',
  templateUrl: './error-snacbar.component.html',
  styleUrls: ['./error-snacbar.component.scss']
})
export class ErrorSnacbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData,public snackBarRef: MatSnackBarRef<ErrorSnacbarComponent>,) {}

  ngOnInit(): void {
  }
  close(){
    this.snackBarRef.dismiss();
  }
  action(){
    this.snackBarRef.dismissWithAction();
  }

}
