import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Unit } from 'src/app/models/unit';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitDialogComponent } from '../../dialogs/create-unit-dialog/create-unit-dialog.component';
import { UnitDialogData } from 'src/app/models/unit-dialog';
import { DialogActionTypes } from '../../const/dialog-action-types';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'operation'];
  constructor(public dialog:MatDialog,private langService:LanguageService) {
    this.dataSource=langService.db.Units;
   }
  dataSource:Array<Unit>;
  ngOnInit(): void {
    this.dataSource=this.langService.db.Units;
  }
  addUnit(){
    let dialogRef = this.dialog.open(CreateUnitDialogComponent, {
     // height: '400px',
     // width: '600px',
     data :new UnitDialogData(null,null,DialogActionTypes.add)
    });
    dialogRef.afterClosed().subscribe(
      data=>{
      }
    )
  }

}
